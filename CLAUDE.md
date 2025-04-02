# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines
- **TypeScript**: Use strict typing with interfaces/types defined in app/types/
- **Components**: Functional components with React.FC type annotations
- **Imports**: React/hooks first, contexts second, styling third, followed by Next.js imports
- **Naming**: PascalCase for components, camelCase for functions/variables
- **State**: Use Context API for global state, useState for component-local state
- **Styling**: Use Tailwind CSS with className, responsive design using breakpoint prefixes
- **Error Handling**: Defensive programming with nullish checks and default values
- **Formatting**: Follow existing indentation (2 spaces) and bracket style
- **Functions**: Use arrow functions for component methods with descriptive names (handle*, toggle*)
- **Props**: Define prop types using TypeScript interfaces with descriptive names