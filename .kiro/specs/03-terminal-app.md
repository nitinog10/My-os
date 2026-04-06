# Spec: Terminal App

## Feature
CLI simulator inside a window with command execution engine.

## Requirements
- [ ] Shell prompt: user@webos:~$
- [ ] Command history (up/down arrow)
- [ ] Auto-scroll to latest output
- [ ] Supported commands:
  - ls [path]       → list directory contents
  - cd [path]       → change directory
  - pwd             → print working directory
  - mkdir [name]    → create folder
  - touch [name]    → create empty file
  - rm [name]       → delete file/folder
  - cat [file]      → print file contents
  - echo [text]     → print text
  - clear           → clear terminal
  - help            → list commands
- [ ] Error messages for invalid commands
- [ ] Terminal state (cwd, history) persisted in Zustand
- [ ] AI command: `ai [prompt]` → sends to AI assistant

## Tasks
1. Create Terminal/index.tsx (UI component)
2. Create commandParser.ts (input → command + args)
3. Create commandExecutor.ts (command → output using fileSystemStore)
4. Wire terminal cwd to fileSystemStore
5. Implement command history with arrow key navigation
6. Style: dark background, green/white monospace text, blinking cursor

## Acceptance Criteria
- ls shows correct files for current directory
- cd updates prompt path
- mkdir/touch creates nodes visible in File Explorer
- clear wipes terminal output
