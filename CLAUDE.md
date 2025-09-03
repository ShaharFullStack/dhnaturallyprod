# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack TypeScript naturopathy e-commerce application with separate Frontend (React) and Backend (Express) services:

- **Frontend**: React 19 with TypeScript, Redux Toolkit, React Router, i18n support
- **Backend**: Express.js with TypeScript, MySQL2, JWT auth, file uploads
- **Database**: MySQL with structured tables for products, articles, users, roles
- **Architecture**: Layered backend (models, services, controllers, middleware)

## Development Commands

### Backend Development
```bash
cd Backend
npm start           # Start development server with nodemon and ts-node
npm run test        # Run Mocha tests
npm run clean       # Clean dist directory
```

### Frontend Development  
```bash
cd Frontend
npm start           # Start React development server
npm run build       # Build for production
npm run test        # Run Jest tests
```

## Backend Architecture

The backend follows a layered architecture pattern:

- `src/1-assets/` - Static files (images, certificates)
- `src/2-utils/` - Utilities (app-config, cyber, dal, logger)
- `src/3-models/` - TypeScript models and enums
- `src/4-services/` - Business logic layer
- `src/5-controllers/` - HTTP request handlers with Express routers
- `src/6-middleware/` - Custom middleware (auth, logging, security, error handling)

### Key Backend Components

- **Database Access**: `dal.ts` handles MySQL connections and queries
- **Authentication**: JWT-based auth with role-based permissions
- **File Handling**: Product and article images with express-fileupload
- **Security**: Helmet, CORS, rate limiting, XSS prevention
- **Configuration**: Environment-based config in `app-config.ts`

## Frontend Architecture

React application with:

- **State Management**: Redux Toolkit with separate slices
- **Routing**: React Router with nested routes
- **Internationalization**: Custom language context supporting English/Hebrew
- **Styling**: CSS modules and utility classes
- **Components**: Organized by feature areas (pages, UI, layout, specials)

### Key Frontend Features

- **Multi-language Support**: Hebrew and English with RTL support
- **E-commerce Pages**: Store, product details, articles, admin dashboard
- **Redux Integration**: Product and user state management
- **Responsive Design**: Mobile-first CSS with utility classes

## Environment Configuration

### Backend (.env required)
```
ENVIRONMENT=development
PORT=4000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=dhnaturally_db
JWT_SECRET=your_jwt_secret
HASHING_SALT=your_salt
DHNATURALLY_IMAGES_WEB_PATH=path_to_images
```

### Frontend (.env optional)
```
REACT_APP_BASE_URL=http://localhost:4000/
REACT_APP_ENV=development
REACT_APP_ENABLE_DEBUG=true
```

## Database Schema

The application uses a MySQL database with tables for:
- **users**: Customer accounts and admin users
- **roles**: User permission levels
- **products**: Naturopathy products with images and descriptions
- **articles**: Educational content about naturopathy
- **categories**: Product categorization

## Key Development Patterns

### Backend Patterns
- Controllers use Express Router instances exported as objects
- Services contain business logic and call DAL functions
- Middleware functions follow Express patterns (req, res, next)
- Models define TypeScript interfaces for data structures
- Error handling through centralized error middleware

### Frontend Patterns  
- Redux slices for state management with async thunks
- Custom hooks for reusable logic (useTitle)
- Component composition with Layout wrapper
- Service layer for API calls with Axios
- CSS modules for component-specific styling

## File Upload System

- Product images saved to `Backend/src/1-assets/images/products/`
- Article images saved to `Backend/src/1-assets/images/articles/`
- Static file serving configured for both image types
- Rate limiting bypassed for image requests

## Security Features

- JWT authentication with role-based authorization
- CORS configured for specific origins
- Helmet for security headers
- Rate limiting (1000 requests per 5 seconds)
- XSS prevention middleware
- Input validation and sanitization

## Testing

- Backend uses Mocha with Chai for testing
- Frontend uses React Testing Library with Jest
- Test files located in respective test directories