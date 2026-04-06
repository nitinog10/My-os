# Spec: Code Editor App

## Feature
Monaco-based code editor with syntax highlighting and multi-tab support.

## Requirements
- [ ] Monaco Editor integration
- [ ] Multi-tab interface (open multiple files)
- [ ] Tab bar with close buttons
- [ ] Syntax highlighting for: .js .ts .py .json .md .txt
- [ ] Auto-save on edit (debounced 2s)
- [ ] File tree sidebar (read-only, click to open)
- [ ] Active tab state persisted in Zustand
- [ ] Integrates with fileSystemStore for read/write

## Tasks
1. Install @monaco-editor/react
2. Create CodeEditor/index.tsx (main component)
3. Create CodeEditor/TabBar.tsx
4. Create CodeEditor/FileSidebar.tsx
5. Create editorStore.ts (openTabs, activeTab, addTab, closeTab)
6. Wire file open → add to tabs
7. Wire content change → debounced writeFile to fileSystemStore
8. Configure Monaco themes (dark mode)

## Acceptance Criteria
- Can open 5+ files in tabs
- Syntax highlighting works for all supported types
- Changes auto-save after 2s
- Closing tab removes it from UI
