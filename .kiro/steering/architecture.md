# Architecture Rules

1. Frontend never calls DynamoDB or Cognito directly
2. All AWS operations go through the Express backend
3. Zustand is the single source of truth for UI state
4. File system lives in Zustand (runtime) + DynamoDB (persistence)
5. Each app is a self-contained React component registered in appRegistry
6. Windows are managed by a central WindowManager Zustand slice
7. AI service is a separate FastAPI process, called by backend only
8. All components use TypeScript strict mode — no `any` types
9. Tailwind only for styling — no inline styles, no CSS modules
10. Framer Motion for all enter/exit animations
