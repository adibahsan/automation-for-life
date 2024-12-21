/**
 * args.ts
 * Command-line argument parsing and validation.
 * 
 * This module:
 * - Defines available CLI options
 * - Validates user input
 * - Provides default values
 * - Generates help text
 */

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import type { OutputFormat } from '../types/index.js';

/**
 * Default values for CLI options
 */
const defaults = {
    outputDir: './output',
    format: 'txt' as OutputFormat
};

/**
 * Creates and configures the CLI argument parser
 * @returns {Promise<any>} Parsed command line arguments
 * 
 * @example
 * const argv = await createCliParser();
 * console.log(argv.output); // Output directory
 * console.log(argv.format); // Output format
 */
export const createCliParser = async (): Promise<{
    _: string[];
    format: OutputFormat;
    output: string;
}> => {
    const argv = await yargs(hideBin(process.argv))
        .usage('Usage: $0 <playlist-url> [options]')
        .positional('playlist-url', {
            describe: 'YouTube playlist URL',
            type: 'string',
            demandOption: true
        })
        .option('output', {
            alias: 'o',
            describe: 'Output directory path',
            type: 'string',
            default: defaults.outputDir
        })
        .option('format', {
            alias: 'f',
            describe: 'Output format',
            choices: ['txt', 'json', 'csv'] as OutputFormat[],
            default: defaults.format
        })
        .example('$0 https://youtube.com/playlist?list=xyz', 'Extract playlist with default options')
        .example('$0 https://youtube.com/playlist?list=xyz -f json', 'Extract playlist in JSON format')
        .example('$0 https://youtube.com/playlist?list=xyz -o ./my-playlists', 'Save to custom directory')
        .epilogue('For more information, visit: https://github.com/yourusername/youtube-playlist-extractor')
        .help()
        .alias('help', 'h')
        .version()
        .alias('version', 'v')
        .strict()
        .argv;

    return {
        _: argv._.map(arg => String(arg)),
        format: argv.format as OutputFormat,
        output: argv.output
    };
};