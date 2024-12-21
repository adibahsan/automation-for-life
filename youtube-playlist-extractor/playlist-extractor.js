// playlist-extractor.js
import youtubeDl from 'youtube-dl-exec';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class PlaylistExtractor {
    constructor() {
        this.spinner = ora();
    }

    validateUrl(url) {
        const playlistPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/playlist\?list=[\w-]+$/;
        return playlistPattern.test(url);
    }

    async extractLinks(playlistUrl, outputFormat = 'txt') {
        if (!this.validateUrl(playlistUrl)) {
            throw new Error('Invalid YouTube playlist URL');
        }

        this.spinner.start(chalk.yellow('Fetching playlist information...'));

        try {
            // Get playlist info
            const playlistInfo = await youtubeDl(playlistUrl, {
                dumpSingleJson: true,
                noWarnings: true,
                noCallHome: true,
                extractFlat: true,
                format: 'best',
                noCheckCertificates: true,
                preferFreeFormats: true,
                addHeader: [
                    'referer:youtube.com',
                    'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                ],
                youtubeDlPath: 'yt-dlp'
            });

            if (!playlistInfo || !playlistInfo.entries || !playlistInfo.entries.length) {
                throw new Error('No videos found in playlist or unable to fetch playlist information');
            }

            // Prepare video data
            const videoData = playlistInfo.entries.map((entry, index) => ({
                index: index + 1,
                url: `https://www.youtube.com/watch?v=${entry.id}`,
                title: entry.title
            }));

            // Create output filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const sanitizedTitle = playlistInfo.title.replace(/[\\/:*?"<>|]/g, '_');
            const outputFileName = `${sanitizedTitle}_${timestamp}`;
            const outputPath = path.join(__dirname, 'output');

            // Ensure output directory exists
            await fs.mkdir(outputPath, { recursive: true });

            // Save the extracted links
            if (outputFormat === 'csv') {
                const csvContent = [
                    'Index,Title,URL',
                    ...videoData.map(video => 
                        `${video.index},"${video.title}",${video.url}`
                    )
                ].join('\n');

                await fs.writeFile(
                    path.join(outputPath, `${outputFileName}.csv`),
                    csvContent,
                    'utf-8'
                );
            } else {
                const txtContent = videoData
                    .map(video => `${video.url}`)
                    .join('\n');

                await fs.writeFile(
                    path.join(outputPath, `${outputFileName}.txt`),
                    txtContent,
                    'utf-8'
                );
            }

            this.spinner.succeed(chalk.green(
                `Successfully extracted ${videoData.length} video links!`
            ));
            console.log(chalk.blue(
                `Output saved to: ${path.join(outputPath, outputFileName)}.${outputFormat}`
            ));

            return videoData;
        } catch (error) {
            this.spinner.fail(chalk.red('Error occurred:'));
            console.error(chalk.red(error.stack || error.message));
            throw error;
        }
    }
}

// CLI Configuration
const cli = yargs(hideBin(process.argv))
    .usage('Usage: $0 <playlist-url> [options]')
    .positional('playlist-url', {
        describe: 'YouTube playlist URL',
        type: 'string'
    })
    .option('format', {
        alias: 'f',
        describe: 'Output format',
        choices: ['txt', 'csv'],
        default: 'txt'
    })
    .help()
    .alias('help', 'h');

// Main function
async function main() {
    try {
        const argv = await cli.argv;
        const playlistUrl = argv._[0];

        if (!playlistUrl) {
            throw new Error('Please provide a YouTube playlist URL');
        }

        console.log(chalk.blue(`Attempting to extract playlist: ${playlistUrl}`));
        const extractor = new PlaylistExtractor();
        await extractor.extractLinks(playlistUrl, argv.format);
    } catch (error) {
        console.error(chalk.red('Error occurred:'));
        console.error(chalk.red(error.stack || error.message));
        process.exit(1);
    }
}

main();