# Spec: Notes App

## Feature
Simple rich-text note-taking app with markdown preview.

## Requirements
- [ ] Textarea for markdown input
- [ ] Live preview pane (split view)
- [ ] Save button (writes to /home/notes/[timestamp].md)
- [ ] List of saved notes in sidebar
- [ ] Click note → load into editor
- [ ] Delete note button
- [ ] Markdown rendering (headings, lists, code blocks, links)

## Tasks
1. Install markdown parser (e.g., marked or react-markdown)
2. Create Notes/index.tsx (split layout)
3. Create Notes/Editor.tsx
4. Create Notes/Preview.tsx
5. Create Notes/NotesList.tsx
6. Wire save → createFile in fileSystemStore
7. Wire load → readFile from fileSystemStore
8. Style: clean, minimal, glassmorphism panels

## Acceptance Criteria
- Can create and save notes
- Preview updates in real-time
- Saved notes persist across sessions
- Markdown renders correctly
