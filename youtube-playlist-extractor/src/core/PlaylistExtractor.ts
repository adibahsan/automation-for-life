/**
 * PlaylistExtractor.ts
 * Core class responsible for extracting video information from YouTube playlists.
 * 
 * This class handles:
 * - Playlist data extraction using yt-dlp
 * - Video information processing
 * - Output formatting and saving
 */

import { spawn } from 'child_process';
import { validatePlaylistUrl } from './validator.js';
import { FileHandler } from '../utils/fileHandler.js';
import { createSpinner } from '../utils/spinner.js';
import { logger } from '../utils/logger.js';
import type { VideoData, PlaylistInfo, ExtractorOptions, OutputFormat } from '../types/index.js';

/**
 * Main class for extracting YouTube playlist information
 * @class PlaylistExtractor
 */
export class PlaylistExtractor {
    private fileHandler: FileHandler;

    /**
     * Creates an instance of PlaylistExtractor
     * @param {ExtractorOptions} options - Configuration options
     */
    constructor(options: ExtractorOptions) {
        this.fileHandler = new FileHandler(options.outputDir);
    }

    /**
     * Executes yt-dlp to extract playlist information
     * @private
     * @param {string} url - YouTube playlist URL
     * @returns {Promise<PlaylistInfo>} Parsed playlist information
     * @throws {Error} If yt-dlp execution fails
     */
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

    /**
     * Extracts video links from a YouTube playlist
     * @param {string} playlistUrl - YouTube playlist URL
     * @param {OutputFormat} [outputFormat='txt'] - Desired output format
     * @returns {Promise<VideoData[]>} Array of extracted video information
     * @throws {Error} If URL is invalid or extraction fails
     */
    async extractLinks(playlistUrl: string, outputFormat: OutputFormat = 'txt'): Promise<VideoData[]> {
        const spinner = createSpinner('Validating playlist URL...');

        try {
            // Validate the playlist URL
            await validatePlaylistUrl(playlistUrl);
            spinner.succeed('Playlist URL is valid');
        } catch (error) {
            spinner.fail('Invalid playlist URL');
            throw error;
        }

        spinner.start('Extracting video links...');
        
        try {
            // Extract playlist information using yt-dlp
            const result = await this.execYoutubeDl(playlistUrl);

            // Transform raw data into VideoData format
            const videos: VideoData[] = result.entries.map((entry, index) => ({
                index: index + 1,
                title: entry.title,
                url: `https://www.youtube.com/watch?v=${entry.id}`
            }));

            spinner.succeed(`Successfully extracted ${videos.length} video links`);
            
            // Save the extracted data
            await this.fileHandler.writeVideos(videos, outputFormat);
            return videos;
        } catch (error) {
            spinner.fail('Failed to extract video links');
            throw error;
        }
    }
}