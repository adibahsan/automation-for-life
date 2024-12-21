/**
 * fileHandler.ts
 * Handles all file operations for the YouTube playlist extractor.
 * 
 * This module is responsible for:
 * - Creating and managing output directories
 * - Writing data in different formats (TXT, JSON, CSV)
 * - Managing file paths and names
 */

import fs from 'fs/promises';
import path from 'path';
import { VideoData, OutputFormat } from '../types/index.js';

/**
 * Default output directory if none specified
 */
const DEFAULT_OUTPUT_DIR = './output';

/**
 * Handles file operations for saving playlist data
 * @class FileHandler
 */
export class FileHandler {
    private outputDir: string;

    /**
     * Creates an instance of FileHandler
     * @param {string} [outputDir] - Directory to save files (default: './output')
     */
    constructor(outputDir?: string) {
        this.outputDir = outputDir || DEFAULT_OUTPUT_DIR;
    }

    /**
     * Ensures the output directory exists
     * @private
     * @returns {Promise<void>}
     */
    async ensureOutputDir(): Promise<void> {
        await fs.mkdir(this.outputDir, { recursive: true });
    }

    /**
     * Formats video data based on specified output format
     * @private
     * @param {VideoData[]} videos - Array of video information
     * @param {OutputFormat} format - Desired output format
     * @returns {string} Formatted data string
     */
    private formatVideoData(videos: VideoData[], format: OutputFormat): string {
        if (format === 'csv') {
            const header = 'Index,Title,URL\n';
            const rows = videos.map(video => `${video.index},"${video.title}",${video.url}`).join('\n');
            return header + rows;
        } else {
            return videos.map(video => `${video.index}. ${video.title}\n${video.url}`).join('\n\n');
        }
    }

    /**
     * Writes video data to a file in the specified format
     * @param {VideoData[]} videos - Array of video information
     * @param {OutputFormat} format - Desired output format
     * @returns {Promise<string>} Path to the written file
     */
    async writeVideos(videos: VideoData[], format: OutputFormat): Promise<string> {
        await this.ensureOutputDir();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `playlist_${timestamp}`;
        const content = this.formatVideoData(videos, format);
        return this.saveToFile(filename, content, format);
    }

    /**
     * Saves data to a file
     * @private
     * @param {string} filename - Name of the file to save
     * @param {string} content - Data to save
     * @param {string} format - File format
     * @returns {Promise<string>} Path to the written file
     */
    async saveToFile(filename: string, content: string, format: string): Promise<string> {
        const fullPath = path.join(this.outputDir, `${filename}.${format}`);
        await fs.writeFile(fullPath, content, 'utf-8');
        return fullPath;
    }

    /**
     * Formats data for saving
     * @param {VideoData[]} videos - Array of video information
     * @param {string} format - Desired output format
     * @returns {string} Formatted data string
     */
    formatDataForSaving(videos: VideoData[], format: string): string {
        if (format === 'csv') {
            return [
                'Index,Title,URL',
                ...videos.map(video => 
                    `${video.index},"${video.title}",${video.url}`
                )
            ].join('\n');
        }
        return videos.map(video => video.url).join('\n');
    }

    /**
     * Generates a filename based on the playlist title and current timestamp
     * @param {string} playlistTitle - Title of the playlist
     * @returns {string} Generated filename
     */
    generateFileName(playlistTitle: string): string {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const sanitizedTitle = playlistTitle.replace(/[\\/:*?"<>|]/g, '_');
        return `${sanitizedTitle}_${timestamp}`;
    }
}