# Spec: Virtual File System

## Feature
In-memory file system (Zustand) synced to DynamoDB, with full CRUD.

## Requirements
- [ ] Tree structure: folders + files with metadata
- [ ] Operations: createFile, createFolder, deleteNode, renameNode, moveNode, readFile, writeFile
- [ ] Path-based addressing (/home/user/documents/file.txt)
- [ ] File types: .txt .md .js .ts .py .json + folders
- [ ] Zustand fileSystemStore as runtime state
- [ ] Sync to DynamoDB via backend API on every mutation
- [ ] Load from DynamoDB on login
- [ ] Default file tree created on first login

## DynamoDB Keys
PK: user#<userId>
SK: FS#<fullPath>
Data: { type, name, content, size, createdAt, updatedAt, parentPath }

## Tasks
1. Define FSNode TypeScript interface
2. Create fileSystemStore.ts with all operations
3. Create backend route: GET /api/files, POST /api/files, DELETE /api/files, PATCH /api/files
4. Create dynamoService.ts with putItem, getItem, deleteItem, query helpers
5. Implement path resolver utility
6. Seed default file tree on new user creation

## Acceptance Criteria
- Files persist across page refresh (loaded from DynamoDB)
- Rename/move updates DynamoDB correctly
- File content saved on write
