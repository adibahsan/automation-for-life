# YouTube Playlist Extractor

A command-line tool to extract video links from YouTube playlists. Built with TypeScript and Node.js, this tool allows you to save playlist information in various formats (TXT, JSON, CSV).

## Features

- Extract video links from any public YouTube playlist
- Support for multiple output formats (TXT, JSON, CSV)
- Progress indicators and colorful console output
- Custom output directory support
- Built with TypeScript for better type safety and developer experience

## System Requirements

- Node.js v20.x or later
- pnpm (recommended) or npm
- yt-dlp (required for YouTube data extraction)
- macOS, Linux, or Windows with WSL

## Installation

1. **Install yt-dlp**:
   - macOS (using Homebrew):
     ```bash
     brew install yt-dlp
     ```
   - Linux:
     ```bash
     sudo apt update
     sudo apt install python3-pip
     sudo pip3 install yt-dlp
     ```
   - Windows (WSL):
     ```bash
     sudo apt update
     sudo apt install python3-pip
     sudo pip3 install yt-dlp
     ```

2. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd youtube-playlist-extractor
   ```

3. **Install dependencies**:
   ```bash
   pnpm install
   ```

4. **Build the project**:
   ```bash
   pnpm run build
   ```

## Usage

### Development Mode
Run the application in development mode with TypeScript:
```bash
pnpm run dev "<playlist-url>" [options]
```

### Production Mode
Run the compiled version:
```bash
pnpm start "<playlist-url>" [options]
```

### Command Line Options

- `--output, -o`: Specify output directory (default: "./output")
- `--format, -f`: Specify output format: "txt", "json", or "csv" (default: "txt")

### Examples

1. Extract playlist with default settings:
   ```bash
   pnpm run dev "https://www.youtube.com/playlist?list=PLAYLIST_ID"
   ```

2. Save as JSON in a custom directory:
   ```bash
   pnpm run dev "https://www.youtube.com/playlist?list=PLAYLIST_ID" --output ./my-playlists --format json
   ```

3. Export as CSV:
   ```bash
   pnpm run dev "https://www.youtube.com/playlist?list=PLAYLIST_ID" --format csv
   ```

## Project Structure

```
youtube-playlist-extractor/
├── bin/                    # Command-line entry point
├── src/
│   ├── cli/               # Command-line interface logic
│   ├── core/              # Core functionality
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── dist/                  # Compiled JavaScript files
└── output/                # Default output directory
```

## Configuration Files

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": ".",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*", "bin/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Package Scripts

- `build`: Compile TypeScript to JavaScript
- `start`: Run the compiled version
- `dev`: Run in development mode with ts-node
- `watch`: Watch for changes and recompile
- `test`: Run tests
- `lint`: Run ESLint
- `format`: Format code with Prettier
- `clean`: Clean the dist directory

## Error Handling

The application includes comprehensive error handling for common scenarios:
- Invalid playlist URLs
- Network connectivity issues
- YouTube API rate limiting
- File system permissions
- Invalid output formats

## Development

### Prerequisites for Development

- TypeScript 5.x
- Node.js v20.x or later
- pnpm (recommended) or npm
- Git

### Setting Up Development Environment

1. Install development dependencies:
   ```bash
   pnpm install
   ```

2. Start in watch mode:
   ```bash
   pnpm run watch
   ```

### Running Tests

```bash
pnpm test
```

### Code Formatting

Format code using Prettier:
```bash
pnpm run format
```

### Linting

Run ESLint:
```bash
pnpm run lint
```

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Troubleshooting

### Common Issues

1. **yt-dlp not found**:
   - Ensure yt-dlp is installed and accessible in your PATH
   - Try reinstalling yt-dlp

2. **Permission Errors**:
   - Check output directory permissions
   - Run with appropriate user permissions

3. **TypeScript Compilation Errors**:
   - Ensure all dependencies are installed
   - Check TypeScript version compatibility

### Debug Mode

Run with debug logging:
```bash
DEBUG=* pnpm run dev "<playlist-url>"
```

## Support

For issues and feature requests, please use the GitHub issue tracker.
