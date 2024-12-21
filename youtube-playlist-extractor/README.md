# YouTube Playlist Extractor

> Turn chaos into organized bliss - Extract, save, and manage your YouTube playlists with style!

A lightning-fast ⚡️ command-line tool that helps you extract and organize video links from YouTube playlists. Built with TypeScript and powered by modern Node.js, this tool makes playlist management a breeze.

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/)

</div>

## Features

🎯 **Core Features**
- 🔍 Extract links from any public YouTube playlist
- 💾 Multiple output formats (TXT, JSON, CSV)
- 📁 Custom output directory support
- 🌈 Colorful console output

🛠️ **Technical Highlights**
- 🏃‍♂️ Blazing fast execution with yt-dlp
- 📦 Modern ESM modules
- 🔒 Type-safe with TypeScript
- 🎯 Zero runtime dependencies (except yt-dlp)

## System Requirements

- Node.js v20.x or later
- pnpm (recommended) or npm
- yt-dlp (required for YouTube data extraction)
- macOS, Linux, or Windows with WSL

## Installation

1. **Install yt-dlp** (our YouTube wizard):
   ```bash
   # On macOS (using Homebrew)
   brew install yt-dlp

   # On Linux/WSL
   sudo apt update && sudo apt install python3-pip
   sudo pip3 install yt-dlp
   ```

2. **Clone & Setup**:
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd youtube-playlist-extractor

   # Install dependencies
   pnpm install

   # Build the project
   pnpm run build
   ```

## Usage

### Development Mode
```bash
pnpm run dev "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID" [options]
```

### Production Mode
```bash
pnpm start "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID" [options]
```

### Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--output, -o` | Output directory | `"./output"` |
| `--format, -f` | Output format (txt/json/csv) | `"txt"` |

### Examples

```bash
# Basic usage - extracts to TXT
pnpm run dev "https://www.youtube.com/playlist?list=PLAYLIST_ID"

# Save as JSON in custom directory
pnpm run dev "https://www.youtube.com/playlist?list=PLAYLIST_ID" --output ./my-playlists --format json

# Export as CSV
pnpm run dev "https://www.youtube.com/playlist?list=PLAYLIST_ID" --format csv
```

## Project Structure

```
youtube-playlist-extractor/
├── bin/                    # Command-line entry point
├── src/
│   ├── cli/               # CLI magic happens here
│   ├── core/              # Core extraction logic
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Helpful utilities
├── dist/                  # Built JavaScript files
└── output/                # Where your playlists go
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

---

<div align="center">

Made with ❤️ for the Automators and YouTube playlist enthusiasts

</div>
