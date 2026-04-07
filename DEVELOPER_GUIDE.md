# WebOS Developer Guide

## Adding a New App

### 1. Create the App Component

Create a new file in `frontend/src/components/YourApp/index.tsx`:

```typescript
interface YourAppProps {
  windowId: string;
}

export default function YourApp({ windowId }: YourAppProps) {
  return (
    <div className="h-full w-full bg-gray-900 text-white p-4">
      <h1>Your App</h1>
      {/* Your app content */}
    </div>
  );
}
```

### 2. Register the App

Add your app to `frontend/src/utils/appRegistry.ts`:

```typescript
import YourApp from '../components/YourApp';

export const appRegistry: AppDefinition[] = [
  // ... existing apps
  {
    id: 'your-app',
    name: 'Your App',
    icon: '🎨',
    component: YourApp,
    defaultWidth: 800,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 300,
  },
];
```

### 3. Test Your App

Your app will now appear in the app launcher. Click the icon to open it!

## Creating a New Zustand Store

### 1. Define the Store

Create `frontend/src/stores/yourStore.ts`:

```typescript
import { create } from 'zustand';

interface YourStore {
  data: string;
  setData: (data: string) => void;
}

export const useYourStore = create<YourStore>((set) => ({
  data: '',
  setData: (data) => set({ data }),
}));
```

### 2. Use the Store

In any component:

```typescript
import { useYourStore } from '../stores/yourStore';

function MyComponent() {
  const { data, setData } = useYourStore();
  
  return (
    <div>
      <p>{data}</p>
      <button onClick={() => setData('new value')}>Update</button>
    </div>
  );
}
```

## Adding a Backend Route

### 1. Create the Route File

Create `backend/src/routes/yourRoute.ts`:

```typescript
import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    // Your logic here
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
```

### 2. Register the Route

In `backend/src/server.ts`:

```typescript
import yourRoute from './routes/yourRoute.js';

app.use('/api/your-route', yourRoute);
```

## Adding a Terminal Command

Edit `frontend/src/utils/commandExecutor.ts`:

```typescript
export async function executeCommand(
  cmd: string,
  cwd: string,
  root: FSNode | null
): Promise<CommandResult> {
  const parts = cmd.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  switch (command) {
    // ... existing commands
    
    case 'yourcommand':
      // Your command logic
      return { output: 'Command executed!' };
    
    default:
      return { output: `${command}: command not found`, error: true };
  }
}
```

## Styling Guidelines

### Use Tailwind Classes

```typescript
// Good
<div className="bg-gray-900 text-white p-4 rounded-lg">

// Bad
<div style={{ backgroundColor: '#111', color: '#fff' }}>
```

### Common Patterns

```typescript
// Glassmorphism
className="bg-gray-800/80 backdrop-blur-md"

// Hover effects
className="hover:bg-gray-700 transition-colors"

// Focus states
className="focus:outline-none focus:ring-2 focus:ring-blue-500"

// Responsive
className="text-sm md:text-base lg:text-lg"
```

## State Management Patterns

### Local State (useState)
Use for component-specific state that doesn't need to be shared:

```typescript
const [isOpen, setIsOpen] = useState(false);
```

### Global State (Zustand)
Use for state shared across components:

```typescript
const { windows, openWindow } = useWindowStore();
```

### Server State (API calls)
Use for data from backend:

```typescript
const { loadFileSystem } = useFileSystemStore();

useEffect(() => {
  loadFileSystem();
}, []);
```

## API Integration

### Making API Calls

```typescript
import axios from 'axios';

const token = localStorage.getItem('token');

const response = await axios.get('/api/your-endpoint', {
  headers: { Authorization: `Bearer ${token}` },
});
```

### Error Handling

```typescript
try {
  const response = await axios.get('/api/data');
  // Handle success
} catch (error) {
  console.error('API error:', error);
  // Handle error
}
```

## DynamoDB Patterns

### Saving Data

```typescript
await docClient.send(
  new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      PK: `user#${userId}`,
      SK: `TYPE#${id}`,
      // ... your data
    },
  })
);
```

### Querying Data

```typescript
const result = await docClient.send(
  new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `user#${userId}`,
      ':sk': 'TYPE#',
    },
  })
);
```

## Testing

### Frontend Testing

```bash
cd frontend
npm test
```

### Backend Testing

```bash
cd backend
npm test
```

### Manual Testing Checklist

- [ ] App opens without errors
- [ ] Window can be dragged
- [ ] Window can be resized
- [ ] Window can be minimized/maximized
- [ ] Window can be closed
- [ ] Data persists after refresh
- [ ] Works in different browsers
- [ ] Responsive on different screen sizes

## Debugging Tips

### Frontend Debugging

1. Use React DevTools
2. Check Zustand state in DevTools
3. Use console.log strategically
4. Check Network tab for API calls
5. Use breakpoints in browser DevTools

### Backend Debugging

1. Check server logs
2. Use console.log in routes
3. Test endpoints with curl/Postman
4. Check AWS CloudWatch logs
5. Verify environment variables

### Common Issues

**Issue**: Window won't open
- Check app is registered in appRegistry
- Check component exports correctly
- Check for console errors

**Issue**: API call fails
- Check backend is running
- Check token is valid
- Check CORS configuration
- Check route exists

**Issue**: File system not loading
- Check DynamoDB table exists
- Check AWS credentials
- Check user is authenticated
- Check backend logs

## Performance Optimization

### Frontend

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});

// Use useCallback for functions
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);

// Use useMemo for expensive calculations
const result = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

### Backend

```typescript
// Cache frequently accessed data
const cache = new Map();

router.get('/data', async (req, res) => {
  const cached = cache.get(req.userId);
  if (cached) return res.json(cached);
  
  const data = await fetchData(req.userId);
  cache.set(req.userId, data);
  res.json(data);
});
```

## Security Best Practices

### Frontend

- Never store sensitive data in localStorage
- Always validate user input
- Use HTTPS in production
- Sanitize HTML content
- Implement CSRF protection

### Backend

- Always verify JWT tokens
- Validate all input data
- Use parameterized queries
- Implement rate limiting
- Log security events

## Deployment Checklist

### Before Deploying

- [ ] All tests pass
- [ ] No console errors
- [ ] Environment variables configured
- [ ] AWS services set up
- [ ] API keys secured
- [ ] CORS configured for production
- [ ] Build succeeds
- [ ] Documentation updated

### After Deploying

- [ ] Test all features in production
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify authentication works
- [ ] Test file operations
- [ ] Verify AI service works

## Getting Help

- Check `README.md` for overview
- Check `SETUP.md` for setup instructions
- Check `ARCHITECTURE.md` for system design
- Check `FEATURES.md` for feature status
- Open an issue on GitHub
- Join the Discord community

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Update documentation
6. Submit a pull request

## Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive variable names
- Add comments for complex logic
- Keep functions small and focused
- Use async/await over promises
- Handle errors gracefully

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [AWS SDK](https://docs.aws.amazon.com/sdk-for-javascript/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Anthropic API](https://docs.anthropic.com/)
