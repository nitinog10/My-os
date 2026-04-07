# WebOS Quick Start Guide

Get WebOS running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Python 3.11+ installed
- AWS Account (free tier works)
- Anthropic API key

## Step 1: Clone and Install (2 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd webos

# Install all dependencies
npm run install:all

# Install AI service dependencies
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

## Step 2: AWS Setup (2 minutes)

### DynamoDB
1. Go to AWS Console → DynamoDB
2. Create table: `webos-main`
3. Partition key: `PK` (String)
4. Sort key: `SK` (String)
5. Billing: On-demand

### Cognito
1. Go to AWS Console → Cognito
2. Create User Pool
3. Enable email sign-in
4. Create App Client (public, no secret)
5. Enable `ALLOW_USER_PASSWORD_AUTH`
6. Copy User Pool ID and Client ID

## Step 3: Configure Environment (1 minute)

```bash
# Frontend
cp frontend/.env.example frontend/.env
# Edit: Add Cognito User Pool ID and Client ID

# Backend
cp backend/.env.example backend/.env
# Edit: Add AWS credentials and Cognito details

# AI Service
cp ai-service/.env.example ai-service/.env
# Edit: Add Anthropic API key
```

## Step 4: Start Services (30 seconds)

Open 3 terminals:

**Terminal 1:**
```bash
npm run dev:frontend
```

**Terminal 2:**
```bash
npm run dev:backend
```

**Terminal 3:**
```bash
cd ai-service
source venv/bin/activate  # Windows: venv\Scripts\activate
python main.py
```

## Step 5: Use WebOS! 🎉

1. Open `http://localhost:3000`
2. Sign up with email/password
3. Explore the desktop!

## What to Try

### Terminal
```bash
ls                    # List files
cd documents          # Change directory
cat welcome.txt       # Read file
echo "Hello WebOS"    # Print text
help                  # Show commands
```

### Code Editor
1. Click 📝 icon
2. Open File Explorer (📁 icon)
3. Double-click `welcome.txt`
4. Edit and save (auto-saves in 2s)

### File Explorer
1. Click 📁 icon
2. Browse folders
3. Double-click files to open in editor

### Notes
1. Click 📋 icon
2. Write Markdown on left
3. See preview on right

## Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't start
- Check AWS credentials
- Verify DynamoDB table exists
- Check Cognito configuration

### AI Service won't start
- Check Python version: `python --version`
- Verify virtual environment is activated
- Check Anthropic API key

### Can't login
- Verify Cognito User Pool exists
- Check App Client configuration
- Ensure `ALLOW_USER_PASSWORD_AUTH` is enabled

## Next Steps

- Read `README.md` for full documentation
- Check `FEATURES.md` for available features
- See `DEVELOPER_GUIDE.md` to add features
- Review `ARCHITECTURE.md` for system design

## Need Help?

- Check documentation files
- Open an issue on GitHub
- Join Discord community

## Production Deployment

See `SETUP.md` for production deployment instructions to:
- Vercel (Frontend)
- Railway (Backend + AI Service)

Enjoy WebOS! 🚀
