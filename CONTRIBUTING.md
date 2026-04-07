# Contributing to WebOS

Thank you for your interest in contributing to WebOS! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, versions)

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Potential implementation approach
   - Mockups or examples if applicable

### Contributing Code

#### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/webos.git
   cd webos
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original/webos.git
   ```

4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Workflow

1. Follow the setup instructions in `SETUP.md`
2. Make your changes
3. Test your changes thoroughly
4. Write/update tests if applicable
5. Update documentation if needed
6. Commit your changes with clear messages

#### Commit Messages

Follow conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(terminal): add mkdir command
fix(editor): resolve auto-save race condition
docs(readme): update setup instructions
```

#### Code Style

- Use TypeScript strict mode
- Follow existing code patterns
- Use Tailwind CSS for styling
- Write descriptive variable names
- Add comments for complex logic
- Keep functions small and focused

#### Testing

Before submitting:

1. Test all affected features
2. Test in multiple browsers
3. Check for console errors
4. Verify responsive design
5. Test authentication flow
6. Test file operations

#### Pull Request Process

1. Update your branch with latest upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Create a Pull Request with:
   - Clear title and description
   - Link to related issues
   - Screenshots/videos if applicable
   - List of changes made
   - Testing performed

4. Address review feedback
5. Wait for approval and merge

### Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add examples or tutorials
- Improve setup instructions
- Add architecture diagrams
- Write developer guides

### Design Contributions

- UI/UX improvements
- Icon designs
- Theme designs
- Wallpaper designs
- Logo designs

## Project Structure

```
webos/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── stores/        # Zustand stores
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utilities
│   └── package.json
├── backend/           # Express backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Auth middleware
│   │   └── types/         # TypeScript types
│   └── package.json
└── ai-service/        # FastAPI AI service
    ├── main.py
    └── requirements.txt
```

## Development Guidelines

### Frontend

- Use functional components with hooks
- Use Zustand for state management
- Use Tailwind CSS for styling
- Use Framer Motion for animations
- Follow React best practices

### Backend

- Use Express with TypeScript
- Implement proper error handling
- Validate all input data
- Use middleware for common tasks
- Follow REST API conventions

### AI Service

- Use FastAPI with Python
- Implement streaming responses
- Handle errors gracefully
- Add context to prompts
- Monitor token usage

## Areas Needing Help

Check `FEATURES.md` for incomplete features:

### High Priority
- Terminal commands (mkdir, touch, rm)
- File Explorer context menu
- AI assistant integration
- Keyboard shortcuts
- Settings panel

### Medium Priority
- Browser app
- Calculator app
- File search
- Notification system
- Theme customization

### Low Priority
- Real-time collaboration
- Mobile support
- Offline mode
- Analytics

## Getting Help

- Read the documentation
- Check existing issues
- Ask in discussions
- Join Discord community
- Tag maintainers in issues

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation
- Invited to maintainer team (for significant contributions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to:
- Open an issue
- Start a discussion
- Contact maintainers
- Join our Discord

Thank you for contributing to WebOS! 🚀
