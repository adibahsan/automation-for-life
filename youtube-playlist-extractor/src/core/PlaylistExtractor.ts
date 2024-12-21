// src/core/PlaylistExtractor.ts
import youtubeDl from 'youtube-dl-exec';
import { validatePlaylistUrl } from './validators.js';
import { FileHandler } from '../utils/fileHandler.js';
import { createSpinner } from '../utils/spinner.js';
import { logger } from '../utils/logger.js';
import type { VideoData, PlaylistInfo, ExtractorOptions, OutputFormat } from '../types/index.js';

export class PlaylistExtractor {
    private fileHandler: FileHandler;

    constructor(options: ExtractorOptions) {
        this.fileHandler = new FileHandler(options.outputDir);
    }

    async extractLinks(playlistUrl: string, outputFormat: OutputFormat = 'txt'): Promise<VideoData[]> {
        if (!validatePlaylistUrl(playlistUrl)) {
            throw new Error('Invalid YouTube playlist URL');
        }

        const spinner = createSpinner('Fetching playlist information...');
        spinner.start();

        try {
            await this.fileHandler.ensureOutputDir();

            const playlistInfo = await youtubeDl(playlistUrl, {
                dumpSingleJson: true,
                noWarnings: true,
                noCallHome: true,
                extractFlat: true,
            }) as PlaylistInfo;

            if (!playlistInfo.entries?.length) {
                throw new Error('No videos found in playlist');
            }

            const videoData: VideoData[] = playlistInfo.entries.map((entry, index) => ({
                index: index + 1,
                url: `https://www.youtube.com/watch?v=${entry.id}`,
                title: entry.title
            }));

            const fileName = this.fileHandler.generateFileName(playlistInfo.title);
            const content = this.fileHandler.formatDataForSaving(videoData, outputFormat);
            const outputPath = await this.fileHandler.saveToFile(fileName, content, outputFormat);

            spinner.succeed(`Successfully extracted ${videoData.length} video links!`);
            logger.info(`Output saved to: ${outputPath}`);

            return videoData;
        } catch (error) {
            spinner.fail('Extraction failed');
            throw error;
        }
    }
}