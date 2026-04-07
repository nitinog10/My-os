import { Router } from 'express';
import axios from 'axios';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

router.post('/chat', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { message, context } = req.body;

    // Proxy request to AI service with SSE
    const response = await axios.post(
      `${AI_SERVICE_URL}/chat`,
      { message, context },
      {
        responseType: 'stream',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    response.data.pipe(res);
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ error: 'AI service unavailable' });
  }
});

export default router;
