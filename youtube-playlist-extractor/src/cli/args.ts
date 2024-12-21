// src/cli/args.ts
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import type { OutputFormat } from '../types/index.js';

export const createCliParser = async (): Promise<{
    _: string[];
    format: OutputFormat;
    output: string;
}> => {
    const argv = await yargs(hideBin(process.argv))
        .usage('Usage: $0 <playlist-url> [options]')
        .positional('playlist-url', {
            describe: 'YouTube playlist URL',
            type: 'string'
        })
        .option('format', {
            alias: 'f',
            describe: 'Output format',
            choices: ['txt', 'csv'] as const,
            default: 'txt'
        })
        .option('output', {
            alias: 'o',
            describe: 'Output directory',
            type: 'string',
            default: './output'
        })
        .help()
        .argv;

    return {
        _: argv._.map(arg => String(arg)),
        format: argv.format as OutputFormat,
        output: argv.output
    };
};