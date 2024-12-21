# Development Guide

## Getting Started

### Prerequisites
- Node.js v20.x or later
- pnpm (recommended) or npm
- yt-dlp
- TypeScript knowledge

### Setting Up Development Environment

1. **Clone & Install**:
   ```bash
   git clone <repository-url>
   cd youtube-playlist-extractor
   pnpm install
   ```

2. **Start Development**:
   ```bash
   pnpm run watch  # Auto-compile on changes
   ```

## Development Workflow

### 1. Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make your changes
3. Run tests:
   ```bash
   pnpm test
   ```

4. Format code:
   ```bash
   pnpm run format
   ```

### 2. Testing

#### Running Tests
```bash
pnpm test
```

#### Adding Tests
1. Create test file: `__tests__/your-test.test.ts`
2. Write tests using Jest
3. Run test suite

### 3. Code Style

#### TypeScript Guidelines
- Use explicit types
- Avoid `any`
- Use interfaces for objects
- Document public APIs

#### Formatting
- Use Prettier for formatting
- Run `pnpm run format` before committing

## Common Development Tasks

### Adding a New Output Format

1. Update Types:
   ```typescript
   // src/types/index.ts
   export type OutputFormat = 'txt' | 'json' | 'csv' | 'your-format';
   ```

2. Add Formatter:
   ```typescript
   // src/utils/fileHandler.ts
   private formatVideoData(videos: VideoData[], format: OutputFormat): string {
       switch (format) {
           case 'your-format':
               return // your formatting logic
       }
   }
   ```

3. Update CLI:
   ```typescript
   // src/cli/args.ts
   .option('format', {
       choices: ['txt', 'json', 'csv', 'your-format']
   })
   ```

### Adding New Features

1. Plan the feature
2. Update types if needed
3. Implement the feature
4. Add tests
5. Update documentation

## Debugging

### Debug Mode
```bash
DEBUG=* pnpm run dev
```

### Common Issues

1. **yt-dlp errors**:
   - Check yt-dlp installation
   - Verify YouTube URL
   - Check network connection

2. **Type errors**:
   - Verify type definitions
   - Check import paths
   - Ensure proper type usage

## Best Practices

1. **Code Organization**:
   - Keep files focused and small
   - Use meaningful names
   - Group related functionality

2. **Error Handling**:
   - Use try-catch blocks
   - Provide helpful error messages
   - Log errors appropriately

3. **Documentation**:
   - Document public APIs
   - Add JSDoc comments
   - Keep README updated

4. **Testing**:
   - Write unit tests
   - Test edge cases
   - Maintain test coverage

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [yt-dlp Documentation](https://github.com/yt-dlp/yt-dlp#readme)
- [Node.js Documentation](https://nodejs.org/docs/latest-v20.x/api/)
