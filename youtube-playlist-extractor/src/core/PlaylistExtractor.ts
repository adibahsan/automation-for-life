// src/core/PlaylistExtractor.ts
import { spawn } from 'child_process';
import { validatePlaylistUrl } from './validator.js';
import { FileHandler } from '../utils/fileHandler.js';
import { createSpinner } from '../utils/spinner.js';
import { logger } from '../utils/logger.js';
import type { VideoData, PlaylistInfo, ExtractorOptions, OutputFormat } from '../types/index.js';

export class PlaylistExtractor {
    private fileHandler: FileHandler;

    constructor(options: ExtractorOptions) {
        this.fileHandler = new FileHandler(options.outputDir);
    }

    private async execYoutubeDl(url: string): Promise<PlaylistInfo> {
        const args = [
            url,
            '--dump-single-json',
            '--flat-playlist',
            '--no-warnings',
            '--no-check-certificates',
            '--prefer-free-formats',
            '--referer', 'youtube.com',
            '--user-agent', 'googlebot'
        ];

        return new Promise((resolve, reject) => {
            const process = spawn('yt-dlp', args);
            let stdout = '';
            let stderr = '';

            process.stdout.on('data', (data) => {
                stdout += data;
            });

            process.stderr.on('data', (data) => {
                stderr += data;
            });

            process.on('close', (code) => {
                if (code === 0) {
                    try {
                        resolve(JSON.parse(stdout) as PlaylistInfo);
                    } catch (error) {
                        reject(new Error('Failed to parse yt-dlp output'));
                    }
                } else {
                    reject(new Error(`yt-dlp failed with code ${code}: ${stderr}`));
                }
            });

            process.on('error', (error) => {
                logger.error(`Failed to spawn yt-dlp: ${error.message}`);
                reject(error);
            });
        });
    }

    async extractLinks(playlistUrl: string, outputFormat: OutputFormat = 'txt'): Promise<VideoData[]> {
        const spinner = createSpinner('Validating playlist URL...');

        try {
            await validatePlaylistUrl(playlistUrl);
            spinner.succeed('Playlist URL is valid');
        } catch (error) {
            spinner.fail('Invalid playlist URL');
            throw error;
        }

        spinner.start('Extracting video links...');
        
        try {
            const result = await this.execYoutubeDl(playlistUrl);

            const videos: VideoData[] = result.entries.map((entry, index) => ({
                index: index + 1,
                title: entry.title,
                url: `https://www.youtube.com/watch?v=${entry.id}`
            }));

            spinner.succeed(`Successfully extracted ${videos.length} video links`);
            
            await this.fileHandler.writeVideos(videos, outputFormat);
            return videos;
        } catch (error) {
            spinner.fail('Failed to extract video links');
            throw error;
        }
    }
}