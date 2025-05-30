# Styles

This directory contains global styles and reusable style modules that can be used across the application.

## Structure

- Global styles should be placed at the root level
- Component-specific styles should be co-located with their components
- Use `.module.css` or `.module.scss` for CSS Modules
- Follow a consistent naming convention for classes (e.g., camelCase)

Example structure:
```
styles/
  ├── variables.css      # CSS variables and theme definitions
  ├── globals.css        # Global styles
  └── mixins.scss        # SCSS mixins and functions
```

Note: Component-specific styles should be placed in the component's directory instead of here.
