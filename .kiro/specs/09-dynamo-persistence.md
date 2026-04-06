# Spec: DynamoDB Persistence

## Feature
Full backend integration with DynamoDB for user data persistence.

## Requirements
- [ ] Single-table design (see dynamo-schema.md)
- [ ] Backend routes for all data operations
- [ ] File system sync (FS# items)
- [ ] Desktop state sync (DESKTOP item)
- [ ] App state sync (APP# items)
- [ ] User profile sync (PROFILE item)
- [ ] Settings sync (SETTINGS item)
- [ ] Batch operations for efficiency
- [ ] Error handling and retry logic

## Tasks
1. Create dynamoClient.ts (AWS SDK v3 setup)
2. Create dynamoService.ts with CRUD helpers
3. Create routes: /api/desktop, /api/settings, /api/profile
4. Implement batch write for file system operations
5. Implement query for loading all user data on login
6. Add error handling middleware
7. Test with real DynamoDB table

## Acceptance Criteria
- All user data persists across sessions
- File operations sync to DynamoDB within 1s
- Desktop icon positions saved on drag
- Settings changes persist immediately
