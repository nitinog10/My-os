# Spec: File Explorer App

## Feature
Visual file browser with tree view, context menus, and file operations.

## Requirements
- [ ] Tree view of file system (expandable folders)
- [ ] Icons for file types and folders
- [ ] Right-click context menu: New File, New Folder, Rename, Delete, Open
- [ ] Double-click file → open in Code Editor
- [ ] Double-click folder → expand/collapse
- [ ] Breadcrumb navigation at top
- [ ] Drag-and-drop file move (optional for v1)
- [ ] Integrates with fileSystemStore

## Tasks
1. Create FileExplorer/index.tsx
2. Create FileExplorer/TreeNode.tsx (recursive component)
3. Create FileExplorer/ContextMenu.tsx
4. Create FileExplorer/Breadcrumb.tsx
5. Wire context menu actions to fileSystemStore operations
6. Wire double-click → openWindow('code-editor', { filePath })
7. Add file type icons (lucide-react)

## Acceptance Criteria
- Tree reflects current file system state
- Context menu operations work correctly
- Double-click file opens in editor
- Breadcrumb shows current path
