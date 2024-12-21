/**
 * index.ts
 * Core type definitions for the YouTube playlist extractor.
 * 
 * This module contains all the TypeScript interfaces and types used throughout the application.
 * It serves as a central location for type definitions to ensure consistency across the codebase.
 */

/**
 * Represents a video entry in a playlist
 * @interface VideoData
 */
export interface VideoData {
    /** Position of the video in the playlist (1-based) */
    index: number;
    /** Title of the video */
    title: string;
    /** Full URL to the video */
    url: string;
}

/**
 * Raw playlist information from yt-dlp
 * @interface PlaylistInfo
 */
export interface PlaylistInfo {
    /** Title of the playlist */
    title: string;
    /** Array of video entries in the playlist */
    entries: Array<{
        /** YouTube video ID */
        id: string;
        /** Video title */
        title: string;
    }>;
}

/**
 * Configuration options for the PlaylistExtractor
 * @interface ExtractorOptions
 */
export interface ExtractorOptions {
    /** Directory to save output files */
    outputDir?: string;
}

/**
 * Supported output formats for playlist data
 * @type OutputFormat
 */
export type OutputFormat = 'txt' | 'json' | 'csv';