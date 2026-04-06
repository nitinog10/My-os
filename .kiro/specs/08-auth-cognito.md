# Spec: Authentication — AWS Cognito

## Feature
User login/signup using AWS Cognito, JWT stored in memory, all API calls authenticated.

## Requirements
- [ ] Login screen rendered when no session
- [ ] Sign up: email + password + display name
- [ ] Login: email + password
- [ ] Google OAuth via Cognito Hosted UI
- [ ] JWT stored in memory (not localStorage)
- [ ] authStore.ts: user, token, login, logout, signup
- [ ] Backend validates JWT on every request via middleware
- [ ] Auto-refresh token before expiry
- [ ] On login: load user's DynamoDB data, seed defaults if new user

## Tasks
1. Create Cognito User Pool via AWS Console (document steps)
2. Create authStore.ts with Zustand
3. Create LoginScreen.tsx + SignupScreen.tsx
4. Create cognitoService.ts (backend) — AdminInitiateAuth flow
5. Create authMiddleware.ts — verify Cognito JWT on every route
6. Wire login success → load file system + desktop state
7. Wire logout → clear all Zustand stores

## Acceptance Criteria
- New user can sign up and see empty desktop
- Returning user sees their files and desktop state
- Invalid credentials show error message
- All API routes reject requests without valid token
