# API Reference

## Core Classes

### PlaylistExtractor

#### Constructor
```typescript
constructor(options: ExtractorOptions)
```
**Parameters**:
- `options`: Configuration options
  - `outputDir`: Output directory path

#### Methods

##### extractLinks
```typescript
async extractLinks(playlistUrl: string, outputFormat: OutputFormat = 'txt'): Promise<VideoData[]>
```
**Parameters**:
- `playlistUrl`: YouTube playlist URL
- `outputFormat`: Output format (default: 'txt')

**Returns**: Promise resolving to array of video data

**Throws**:
- `Error`: If playlist URL is invalid
- `Error`: If extraction fails

### FileHandler

#### Constructor
```typescript
constructor(outputDir?: string)
```
**Parameters**:
- `outputDir`: Optional output directory path (default: './output')

#### Methods

##### writeVideos
```typescript
async writeVideos(videos: VideoData[], format: OutputFormat): Promise<void>
```
**Parameters**:
- `videos`: Array of video data
- `format`: Output format

**Throws**:
- `Error`: If writing fails
- `Error`: If format is invalid

## Utility Functions

### createCliParser
```typescript
async function createCliParser(): Promise<Arguments>
```
**Returns**: Promise resolving to parsed arguments

### validatePlaylistUrl
```typescript
async function validatePlaylistUrl(url: string): Promise<boolean>
```
**Parameters**:
- `url`: URL to validate

**Returns**: Promise resolving to boolean

### createSpinner
```typescript
function createSpinner(text: string): Ora
```
**Parameters**:
- `text`: Spinner text

**Returns**: Ora spinner instance

## Types

### VideoData
```typescript
interface VideoData {
    index: number;    // Position in playlist
    title: string;    // Video title
    url: string;      // Video URL
}
```

### PlaylistInfo
```typescript
interface PlaylistInfo {
    entries: Array<{
        id: string;     // Video ID
        title: string;  // Video title
    }>;
}
```

### ExtractorOptions
```typescript
interface ExtractorOptions {
    outputDir?: string;  // Output directory
}
```

### OutputFormat
```typescript
type OutputFormat = 'txt' | 'json' | 'csv';
```

## Constants

### Default Values
```typescript
const DEFAULT_OUTPUT_DIR = './output';
const DEFAULT_FORMAT: OutputFormat = 'txt';
```

## Error Handling

### Error Types
```typescript
class ValidationError extends Error {
    constructor(message: string)
}

class ExtractionError extends Error {
    constructor(message: string)
}
```

## Events

### Spinner Events
- `start`: When operation starts
- `succeed`: When operation succeeds
- `fail`: When operation fails

### Logger Events
- `info`: Information messages
- `success`: Success messages
- `error`: Error messages
- `warn`: Warning messages
