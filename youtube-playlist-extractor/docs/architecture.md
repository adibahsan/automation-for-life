# Architecture Overview

## System Architecture

The YouTube Playlist Extractor follows a modular architecture with clear separation of concerns:

```
                                    ┌─────────────────┐
                                    │  CLI Interface  │
                                    └────────┬────────┘
                                             │
                                    ┌────────▼────────┐
                                    │     Args        │
                                    │    Parser       │
                                    └────────┬────────┘
                                             │
┌─────────────────┐              ┌──────────▼─────────┐
│    yt-dlp      │◄─────────────►│  PlaylistExtractor │
└─────────────────┘              └──────────┬─────────┘
                                            │
                                 ┌──────────▼─────────┐
                                 │    FileHandler     │
                                 └──────────┬─────────┘
                                            │
                                 ┌──────────▼─────────┐
                                 │   Output Files     │
                                 └──────────┬─────────┘
```

## Core Components

### 1. CLI Interface
- Entry point for the application
- Handles user input and command-line arguments
- Provides feedback through spinner and logger

### 2. Args Parser
- Processes command-line arguments
- Validates input parameters
- Provides default values when needed

### 3. Playlist Extractor
- Core business logic
- Interacts with yt-dlp
- Processes playlist data
- Manages the extraction workflow

### 4. File Handler
- Manages file operations
- Handles different output formats
- Creates and manages directories

## Design Decisions

### 1. ESM Modules
We chose ESM modules for:
- Better compatibility with modern JavaScript
- Improved tree-shaking
- Native async/await support

### 2. Class-Based Structure
The project uses classes for:
- Better encapsulation
- Easy extension points
- Clear interfaces

### 3. Type Safety
TypeScript is used throughout for:
- Better developer experience
- Compile-time error catching
- Self-documenting code

### 4. Error Handling Strategy
- Graceful error recovery
- User-friendly error messages
- Comprehensive error logging
