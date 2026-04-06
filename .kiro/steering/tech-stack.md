# Tech Stack

## Frontend
- React 18 + Vite + TypeScript
- Tailwind CSS (styling)
- Framer Motion (animations)
- Zustand (global state)
- react-rnd (drag + resize windows)
- Monaco Editor (code editor app)
- @aws-sdk/client-cognito-identity-provider (auth)

## Backend
- Node.js + Express + TypeScript
- AWS SDK v3 (@aws-sdk/lib-dynamodb)
- AWS Cognito (authentication)
- AWS DynamoDB (database)
- REST API — frontend never touches AWS directly

## AI Service
- Python 3.11 + FastAPI
- Anthropic Claude API (claude-sonnet-4-20250514)
- Streamed responses via SSE
- Context-aware (open file, terminal path, error logs)

## Deployment
- Frontend: Vercel
- Backend + AI: Railway
- Database: AWS DynamoDB (on-demand)
- Auth: AWS Cognito User Pool
