# Contributing to Cassanova Casino

First off, thank you for considering contributing to Cassanova Casino! It's people like you that make this project such a great tool for learning and development.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

---

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** after following the steps
- **Explain which behavior you expected** to see instead and why
- **Include screenshots** if possible
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description** of the suggested enhancement
- **Provide specific examples** to demonstrate the steps
- **Describe the current behavior** and **explain the behavior you expected** to see instead
- **Explain why this enhancement would be useful**
- **List some other applications where this enhancement exists** (if applicable)

### Your First Code Contribution

Unsure where to begin? You can start by looking through these issues:

- **Beginner issues** - issues that should only require a few lines of code
- **Help wanted issues** - issues that might be a bit more involved
- **Good first issue** - issues that are good for newcomers

### Pull Requests

We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue the pull request!

---

## Development Setup

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- MongoDB (local or cloud instance)
- Git

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Cassanova.git
   cd Cassanova
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix-name
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your settings
   npm run dev
   ```

4. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Make your changes**
   - Write your code
   - Add tests if applicable
   - Update documentation as needed

6. **Test your changes**
   ```bash
   # Backend
   cd backend
   npm test
   npm run lint
   
   # Frontend
   cd frontend
   npm test
   npm run lint
   ```

7. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Submit!

---

## Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow the existing code style
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable and function names
- Avoid code duplication (DRY principle)

### TypeScript Guidelines

```typescript
// ✅ Good
interface User {
  id: string;
  username: string;
  email: string;
}

function getUserById(id: string): User | null {
  // Implementation
}

// ❌ Bad
function getUser(x: any): any {
  // Implementation
}
```

### React Component Guidelines

```tsx
// ✅ Good - Functional component with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}

// ❌ Bad - No types, unclear naming
export default function Btn(props: any) {
  return <button onClick={props.o}>{props.l}</button>;
}
```

### Backend API Guidelines

```typescript
// ✅ Good - Clear structure with error handling
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }
    
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { message: 'Internal server error' }
    });
  }
};

// ❌ Bad - No error handling, unclear response
export const getUser = async (req: any, res: any) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};
```

### File Naming Conventions

- **React Components**: PascalCase (e.g., `UserProfile.tsx`, `GameCard.tsx`)
- **Utilities**: camelCase (e.g., `apiClient.ts`, `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Types/Interfaces**: PascalCase (e.g., `User.ts`, `GameTypes.ts`)

### Directory Structure

Keep related files together:

```
components/
├── common/           # Shared components
│   ├── Button.tsx
│   └── Input.tsx
├── layout/          # Layout components
│   ├── Header.tsx
│   └── Footer.tsx
└── features/        # Feature-specific components
    ├── games/
    └── users/
```

---

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```bash
# Good commits
feat(auth): add two-factor authentication
fix(games): resolve jackpot display issue
docs(api): update authentication endpoint documentation
style(frontend): format code with prettier
refactor(backend): simplify user validation logic
perf(database): add indexes for faster queries
test(auth): add unit tests for login flow
chore(deps): update dependencies

# Bad commits
update stuff
fix bug
changes
WIP
```

### Scope

The scope should be the name of the affected module:

- **auth** - Authentication related
- **games** - Game functionality
- **users** - User management
- **promotions** - Promotions system
- **transactions** - Transaction handling
- **frontend** - Frontend changes
- **backend** - Backend changes
- **database** - Database changes
- **docs** - Documentation

---

## Pull Request Process

### Before Submitting

1. ✅ **Ensure your code builds without errors**
   ```bash
   npm run build
   ```

2. ✅ **Run tests and ensure they pass**
   ```bash
   npm test
   ```

3. ✅ **Run linter and fix any issues**
   ```bash
   npm run lint
   ```

4. ✅ **Update documentation** if you've changed APIs or added features

5. ✅ **Add tests** for new functionality

6. ✅ **Rebase your branch** on the latest main
   ```bash
   git fetch origin
   git rebase origin/main
   ```

### PR Title Format

Follow the same format as commit messages:

```
feat(auth): add password reset functionality
fix(games): correct jackpot calculation
docs: update API reference
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran to verify your changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)
Add screenshots to demonstrate the changes.

## Related Issues
Closes #123
Related to #456
```

### Review Process

1. A maintainer will review your PR
2. Address any requested changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be acknowledged in the release notes

---

## Bug Reports

### Before Submitting a Bug Report

- Check the documentation
- Search existing issues to avoid duplicates
- Collect information about the bug:
  - Stack trace
  - OS, Platform and Version
  - Browser (for frontend issues)
  - Node.js version (for backend issues)
  - MongoDB version
  - Steps to reproduce
  - Expected vs actual behavior

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS 13.0]
 - Node.js: [e.g. 20.10.0]
 - Browser: [e.g. Chrome 120, Safari 17]
 - MongoDB: [e.g. 8.0]

**Additional context**
Add any other context about the problem here.
```

---

## Feature Requests

### Before Submitting a Feature Request

- Check if the feature already exists
- Search existing feature requests
- Consider if the feature aligns with the project goals

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.

**Would you like to work on this feature?**
- [ ] Yes, I'd like to implement this
- [ ] No, just suggesting
```

---

## Development Workflow

### Branch Naming

- **Feature branches**: `feature/description-of-feature`
- **Bug fix branches**: `fix/description-of-bug`
- **Documentation**: `docs/description-of-change`
- **Refactoring**: `refactor/description-of-refactor`

### Working with Issues

1. Comment on the issue you want to work on
2. Wait for approval/assignment from a maintainer
3. Create your branch and start working
4. Reference the issue in your commits and PR

### Code Review Feedback

When receiving feedback:
- Be open to suggestions
- Ask questions if something is unclear
- Explain your reasoning if you disagree
- Make requested changes promptly
- Thank reviewers for their time

---

## Style Guide

### JavaScript/TypeScript

- Use ES6+ features
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Use destructuring where appropriate
- Use async/await over promises when possible

### React/JSX

- One component per file
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use PropTypes or TypeScript interfaces

### CSS/Tailwind

- Use Tailwind utility classes
- Keep custom CSS minimal
- Follow mobile-first approach
- Use semantic class names for custom CSS

---

## Testing Guidelines

### Unit Tests

```typescript
// Example test structure
describe('UserController', () => {
  describe('register', () => {
    it('should register a new user with valid data', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123',
        username: 'testuser'
      };

      // Act
      const result = await registerUser(userData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data.email).toBe(userData.email);
    });

    it('should reject duplicate email', async () => {
      // Test implementation
    });
  });
});
```

### Integration Tests

Test the interaction between different parts of the application.

### E2E Tests

Test complete user flows through the application.

---

## Questions?

If you have questions, feel free to:
- Open a discussion on GitHub
- Comment on relevant issues
- Contact the maintainers

Thank you for contributing to Cassanova Casino! 🎰🎉
