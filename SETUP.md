# WebOS Setup Guide

## Quick Start (Development)

### 1. Install Dependencies

```bash
# Install frontend and backend dependencies
npm run install:all

# Install AI service dependencies
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 2. Configure Environment Variables

```bash
# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your AWS Cognito credentials

# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your AWS credentials

# AI Service
cp ai-service/.env.example ai-service/.env
# Edit ai-service/.env with your Anthropic API key
```

### 3. Start All Services

Open 3 terminal windows:

**Terminal 1 - Frontend:**
```bash
npm run dev:frontend
```

**Terminal 2 - Backend:**
```bash
npm run dev:backend
```

**Terminal 3 - AI Service:**
```bash
cd ai-service
source venv/bin/activate  # Windows: venv\Scripts\activate
python main.py
```

### 4. Access WebOS

Open your browser to `http://localhost:3000`

## AWS Setup (Required)

### DynamoDB Table Setup

1. Go to AWS Console → DynamoDB
2. Create table:
   - Table name: `webos-main`
   - Partition key: `PK` (String)
   - Sort key: `SK` (String)
   - Billing mode: On-demand
3. Click "Create table"

### Cognito User Pool Setup

1. Go to AWS Console → Cognito
2. Create User Pool:
   - Sign-in options: Email
   - Password policy: Default
   - MFA: Optional (recommended: OFF for development)
   - User account recovery: Email only
   - Self-service sign-up: Enabled
   - Attribute verification: Email
3. Configure App Client:
   - App type: Public client
   - App client name: `webos-client`
   - Authentication flows: `ALLOW_USER_PASSWORD_AUTH`, `ALLOW_REFRESH_TOKEN_AUTH`
   - Don't generate client secret
4. Note your:
   - User Pool ID (e.g., `us-east-1_xxxxxxxxx`)
   - App Client ID (e.g., `xxxxxxxxxxxxxxxxxxxxxxxxxx`)

### IAM Permissions

Your AWS credentials need these permissions:
- `dynamodb:GetItem`
- `dynamodb:PutItem`
- `dynamodb:Query`
- `dynamodb:DeleteItem`
- `cognito-idp:InitiateAuth`
- `cognito-idp:SignUp`

## OpenAI API Key

1. Go to https://platform.openai.com/
2. Create an account or sign in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `sk-`)
6. Add to `ai-service/.env`: `OPENAI_API_KEY=sk-...`

Note: OpenAI offers pay-as-you-go pricing. GPT-3.5-turbo is very affordable (~$0.0005 per 1K tokens).

## Testing the Setup

### 1. Test Backend Health
```bash
curl http://localhost:4000/health
# Should return: {"status":"ok"}
```

### 2. Test AI Service Health
```bash
curl http://localhost:8000/health
# Should return: {"status":"ok"}
```

### 3. Test Frontend
- Open `http://localhost:3000`
- You should see the login screen
- Try signing up with a test account

## Troubleshooting

### Frontend won't start
- Check Node.js version (18+)
- Delete `node_modules` and run `npm install` again
- Check for port conflicts on 3000

### Backend won't start
- Check AWS credentials are configured
- Verify DynamoDB table exists
- Check Cognito User Pool ID and Client ID
- Check for port conflicts on 4000

### AI Service won't start
- Check Python version (3.11+)
- Verify virtual environment is activated
- Check Anthropic API key is valid
- Check for port conflicts on 8000

### Authentication fails
- Verify Cognito User Pool configuration
- Check App Client has correct auth flows enabled
- Ensure no client secret is configured
- Check AWS region matches in all configs

### File system not loading
- Verify DynamoDB table exists
- Check AWS credentials have DynamoDB permissions
- Check table name matches in backend .env

## Production Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Add environment variables
5. Deploy

### Backend (Railway)
1. Create new project in Railway
2. Add Node.js service
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

### AI Service (Railway)
1. Add Python service to same project
2. Set root directory to `ai-service`
3. Add environment variables
4. Deploy

### Update Frontend API URL
After deploying backend and AI service, update:
- `frontend/.env` → `VITE_API_URL` to backend URL
- `backend/.env` → `AI_SERVICE_URL` to AI service URL

## Next Steps

- Customize the wallpaper and theme
- Add more terminal commands
- Implement file upload/download
- Add more apps (Browser, Calculator, etc.)
- Implement keyboard shortcuts
- Add notification system
- Implement search functionality
