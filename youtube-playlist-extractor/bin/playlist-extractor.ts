#!/usr/bin/env node
import { PlaylistExtractor } from '../src/core/PlaylistExtractor.js';
import { createCliParser } from '../src/cli/args.js';
import { logger } from '../src/utils/logger.js';

async function main(): Promise<void> {
    try {
        const argv = await createCliParser();
        const playlistUrl = argv._[0];

        if (!playlistUrl) {
            logger.error('Please provide a YouTube playlist URL');
            process.exit(1);
        }

        const extractor = new PlaylistExtractor({
            outputDir: argv.output
        });

        await extractor.extractLinks(playlistUrl, argv.format);
    } catch (error) {
        logger.error(error instanceof Error ? error.message : 'An unknown error occurred');
        process.exit(1);
    }
}

main().catch((error) => {
    logger.error(`Fatal error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
});