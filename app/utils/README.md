# Utils

This directory contains utility functions and helper methods that can be reused across the application.

## Structure

- Group related utilities in separate files
- Export all utilities as named exports
- Include proper TypeScript types and documentation
- Use camelCase for function and file names

Example structure:
```
utils/
  ├── date.js           # Date formatting and manipulation
  ├── validation.js     # Form validation helpers
  └── api.js           # API-related utilities
```

Best practices:
- Keep functions pure and focused
- Add JSDoc comments for complex functions
- Write unit tests for utilities
- Avoid side effects
