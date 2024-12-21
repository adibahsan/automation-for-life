// src/utils/fileHandler.ts
import fs from 'fs/promises';
import path from 'path';
import { VideoData } from '../types/index.js';

export class FileHandler {
    private outputDir: string;

    constructor(outputDir: string) {
        this.outputDir = outputDir;
    }

    async ensureOutputDir(): Promise<void> {
        await fs.mkdir(this.outputDir, { recursive: true });
    }

    async saveToFile(filename: string, content: string, format: string): Promise<string> {
        const fullPath = path.join(this.outputDir, `${filename}.${format}`);
        await fs.writeFile(fullPath, content, 'utf-8');
        return fullPath;
    }

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

    generateFileName(playlistTitle: string): string {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const sanitizedTitle = playlistTitle.replace(/[\\/:*?"<>|]/g, '_');
        return `${sanitizedTitle}_${timestamp}`;
    }
}