# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack natural medicine e-commerce application with separate Backend and Frontend directories:

- **Backend/**: Node.js/Express API with TypeScript, MySQL database
- **Frontend/**: React TypeScript application with TailwindCSS and i18n support
- **Database/**: Contains product documentation and marketing materials

## Development Commands

### Backend
- `npm start`: Run development server with nodemon and ts-node on src/app.ts
- `npm test`: Run Mocha tests (tests/**/*.test.ts)
- `npm run clean`: Clean dist directory

### Frontend  
- `npm start`: Run React development server (port 3000)
- `npm run build`: Build for production
- `npm test`: Run React testing suite with Jest

## Architecture

### Backend Architecture
The backend follows a layered architecture pattern with numbered folders:

1. **1-assets/**: Static files (certificates, images)
2. **2-utils/**: Configuration, database access layer (DAL), logging, security utilities
3. **3-models/**: Data models, enums, error models
4. **4-services/**: Business logic layer 
5. **5-controllers/**: HTTP request handlers and routing
6. **6-middleware/**: Express middleware (security, etc.)

Key patterns:
- Controllers use dependency injection and async/await error handling
- Services handle business logic and database operations via DAL
- All routes prefixed with `/dhnaturally/`
- Uses UUID for entity IDs
- File uploads handled with uploaded-file-saver package

### Frontend Architecture
React application with:
- **Components/**: Organized by LayoutArea (Header, Footer, Layout, Routing), UI components, and page components
- **Contexts/**: React Context for language management
- **hooks/**: Custom React hooks (cart, haptic feedback, toast)
- **lib/**: Utilities including i18n translations, queryClient, general utils
- **types/**: TypeScript definitions

Key features:
- Bilingual support (Hebrew/English) with comprehensive translation system
- TailwindCSS with custom design system including dh-* color palette
- React Router for navigation
- Custom UI components with shadcn/ui influence

## Database & Configuration

- Backend uses MySQL2 with environment-based configuration
- Configuration managed through app-config.ts with dotenv
- SSL certificates provided for localhost development

## Important Notes

- The application is specifically for natural medicine/homeopathy e-commerce
- Comprehensive Hebrew/English translation system in Frontend/src/lib/i18b.ts
- Custom TailwindCSS theme with brand colors (dh-navy, dh-ocean, dh-sky, etc.)
- Backend API uses structured error handling and validation
- Image management with file upload capabilities