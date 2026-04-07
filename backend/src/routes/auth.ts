import { Router } from 'express';
import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();
const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await cognitoClient.send(command);
    
    res.json({
      token: response.AuthenticationResult?.AccessToken,
      user: {
        id: response.AuthenticationResult?.AccessToken, // Extract from token in production
        email,
        name: email.split('@')[0],
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Login failed' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'name', Value: name },
      ],
    });

    await cognitoClient.send(command);
    
    // Auto-login after signup
    const loginCommand = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const loginResponse = await cognitoClient.send(loginCommand);
    
    res.json({
      token: loginResponse.AuthenticationResult?.AccessToken,
      user: {
        id: loginResponse.AuthenticationResult?.AccessToken,
        email,
        name,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ error: 'Signup failed' });
  }
});

router.get('/me', authMiddleware, async (req: AuthRequest, res) => {
  res.json({
    id: req.userId,
    email: 'user@example.com', // Get from Cognito in production
    name: 'User',
  });
});

export default router;
