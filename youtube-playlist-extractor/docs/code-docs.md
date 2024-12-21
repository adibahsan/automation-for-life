# Code Documentation

## Core Components

### Entry Point (`bin/playlist-extractor.ts`)
The main entry point for the CLI application.

```typescript
async function main(): Promise<void>
```
**Purpose**: Initializes and orchestrates the application flow
**Parameters**: None
**Returns**: Promise<void>

### Playlist Extractor (`src/core/PlaylistExtractor.ts`)
Main class responsible for extracting playlist data.

```typescript
class PlaylistExtractor
```
**Methods**:
- `extractLinks(playlistUrl: string, outputFormat: OutputFormat): Promise<VideoData[]>`
  - Extracts video links from a playlist
  - Validates URL
  - Processes playlist data
  - Returns array of video data

- `private execYoutubeDl(url: string): Promise<PlaylistInfo>`
  - Executes yt-dlp
  - Processes raw output
  - Returns structured playlist info

### File Handler (`src/utils/fileHandler.ts`)
Manages file operations and data formatting.

```typescript
class FileHandler
```
**Methods**:
- `writeVideos(videos: VideoData[], format: OutputFormat): Promise<void>`
  - Writes video data to file
  - Handles different formats
  - Creates necessary directories

## Supporting Modules

### CLI Arguments (`src/cli/args.ts`)
Configures and processes command line arguments.

```typescript
function createCliParser(): Promise<Arguments>
```
**Options**:
- `output (-o)`: Output directory
- `format (-f)`: Output format (txt/json/csv)

### Types (`src/types/index.ts`)
Core type definitions.

```typescript
interface VideoData {
    index: number;
    title: string;
    url: string;
}

interface PlaylistInfo {
    entries: Array<{
        id: string;
        title: string;
    }>;
}

type OutputFormat = 'txt' | 'json' | 'csv';
```

### Utils

#### Logger (`src/utils/logger.ts`)
Provides colorful console logging.

```typescript
const logger = {
    info(message: string): void
    success(message: string): void
    error(message: string): void
    warn(message: string): void
}
```

#### Spinner (`src/utils/spinner.ts`)
Creates loading spinners for better UX.

```typescript
function createSpinner(text: string): Ora
```

## Data Flow

1. **Input Processing**:
   ```
   CLI Arguments → Args Parser → Playlist Extractor
   ```

2. **Playlist Extraction**:
   ```
   Playlist URL → URL Validator → yt-dlp Execution → JSON Parsing
   ```

3. **Data Processing**:
   ```
   Raw Data → Data Formatting → File Writing → Output Files
   ```

## Extension Points

### Adding New Output Formats
1. Update `OutputFormat` type
2. Add formatter in `FileHandler`
3. Update CLI arguments

### Adding New Features
1. New CLI Options:
   - Add to `args.ts`
   - Update types
   - Implement in `PlaylistExtractor`

2. Custom Extractors:
   - Extend `PlaylistExtractor`
   - Add new methods
   - Update types

3. Output Processors:
   - Add to `FileHandler`
   - Create utility functions
   - Update type definitions
