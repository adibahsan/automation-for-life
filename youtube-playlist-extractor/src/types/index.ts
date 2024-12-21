export interface VideoData {
    index: number;
    url: string;
    title: string;
}

export interface PlaylistInfo {
    title: string;
    entries: Array<{
        id: string;
        title: string;
    }>;
}

export interface ExtractorOptions {
    outputDir: string;
}

export type OutputFormat = 'txt' | 'csv';