# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack TypeScript naturopathy e-commerce application with separate Frontend (React) and Backend (Express) services:

- **Frontend**: React 19 with TypeScript, Redux Toolkit, React Router, Auth Context, i18n support (Hebrew/English RTL)
- **Backend**: Express.js with TypeScript, MySQL2, JWT auth, file uploads, role-based authentication
- **Database**: MySQL with structured tables for products, articles, users, roles, sessions
- **Architecture**: Layered backend (models, services, controllers, middleware) with authentication system
- **UI Components**: Responsive design with mobile-first approach, custom components, and WhatsApp integration

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
- **Authentication**: JWT-based auth with role-based permissions and session management
- **Controllers**: `user-controller.ts`, `product-controllet.ts`, `article-controller.ts`
- **Services**: Business logic layer for users, products, articles, categories
- **Models**: TypeScript interfaces for User, Product, Article, Role, Session, etc.
- **Middleware**: Auth, logging, security, error handling, user injection
- **File Handling**: Product and article images with express-fileupload and uploaded-file-saver
- **Security**: Helmet, CORS, rate limiting, XSS prevention
- **Configuration**: Environment-based config in `app-config.ts`

## Frontend Architecture

React application with:

- **State Management**: Redux Toolkit with separate slices (products, user)
- **Routing**: React Router with nested routes and protected routes
- **Authentication**: Auth Context with JWT token management and session validation
- **Internationalization**: Custom language context supporting English/Hebrew
- **Styling**: CSS modules and utility classes
- **Components**: Organized by feature areas (pages, UI, layout, auth, specials)

### Key Frontend Features

- **Authentication System**: Role-based admin authentication with protected routes
- **Multi-language Support**: Hebrew and English with RTL support using custom language context
- **Admin Dashboard**: Protected admin routes for product/article management
- **E-commerce Pages**: Store, product details, articles, contact with hero sections
- **Redux Integration**: Product and user state management with middleware
- **Responsive Design**: Mobile-first CSS with utility classes, viewport-based hero sections
- **Interactive Elements**: WhatsApp bubble integration (+972 53-335-3481), animated mobile menu
- **Layout System**: Centralized Layout component with Header, Footer, and routing

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
- **users**: Customer accounts and admin users with role-based permissions
- **roles**: User permission levels (1 = Admin, 2 = Customer)
- **user_sessions**: JWT session management for authentication
- **products**: Naturopathy products with images, descriptions, and slugs
- **articles**: Educational content about naturopathy with images
- **categories**: Product categorization system

## Key Development Patterns

### Backend Patterns
- Controllers use Express Router instances exported as objects
- Services contain business logic and call DAL functions
- Middleware functions follow Express patterns (req, res, next)
- Models define TypeScript interfaces for data structures
- Error handling through centralized error middleware

### Frontend Patterns  
- Redux slices for state management with async thunks and middleware
- Auth Context provider with JWT token management and persistence
- Language Context provider for Hebrew/English RTL support with localStorage persistence
- Protected route components for admin-only access
- Custom hooks for reusable logic (useTitle, useAuth, useCart, useHapticFeedback)
- Component composition with Layout wrapper and context providers
- Service layer for API calls with Axios
- CSS modules for component-specific styling with responsive breakpoints
- Hero sections with consistent viewport sizing (100vh on mobile)
- Animated UI components with cubic-bezier transitions

## File Upload System

- Product images saved to `Backend/src/1-assets/images/products/`
- Article images saved to `Backend/src/1-assets/images/articles/`
- Static file serving configured for both image types
- Rate limiting bypassed for image requests

## Security Features

- JWT authentication with role-based authorization (Admin/Customer roles)
- Session validation on frontend with automatic logout on invalid tokens
- CORS configured for specific origins (localhost:3000, localhost:3100)
- Helmet for security headers with crossOriginResourcePolicy disabled for images
- Rate limiting (1000 requests per 5 seconds) with bypassed paths for image serving
- XSS prevention middleware using striptags
- Input validation and sanitization
- Protected admin routes with authentication checks

## Authentication System

### Backend Authentication
- JWT token generation and validation
- Role-based authorization (roleId: 1=Admin, 2=Customer)
- Session management with user_sessions table
- Password hashing with configurable salt
- Profile endpoint for token validation

### Frontend Authentication
- AuthProvider context with persistent login state
- localStorage-based token and user data persistence
- Automatic session validation on app load
- Protected route components requiring admin access
- Login/logout functionality with error handling

## API Endpoints

### User Management
- `POST /api/login` - User authentication
- `GET /api/profile` - Get current user profile (protected)
- User registration and management endpoints

### Product Management
- Product CRUD operations with image handling
- Category management for product organization
- Slug-based product URLs

### Article Management
- Article CRUD operations with image handling
- Educational content management for naturopathy

### File Upload
- Multi-part form uploads for product/article images
- Separate image paths and static serving
- Rate limiting bypass for image requests

## Dependencies

### Backend Key Dependencies
- `express` - Web framework
- `mysql2` - MySQL database driver
- `jsonwebtoken` - JWT authentication
- `express-fileupload` - File upload handling
- `uploaded-file-saver` - File saving utility
- `helmet` - Security middleware
- `express-rate-limit` - Rate limiting
- `joi` - Input validation
- `striptags` - XSS prevention
- `dayjs` - Date/time handling
- `exceljs`, `xlsx` - Excel file handling

### Frontend Key Dependencies
- `react` 19+ - UI framework
- `@reduxjs/toolkit` - State management
- `react-router-dom` 7+ - Routing
- `axios` - HTTP client
- `jwt-decode` - JWT token decoding
- `@radix-ui/react-slot` - UI primitives
- `lucide-react` - Icon library
- `class-variance-authority` - CSS utilities

## Testing

- Backend uses Mocha with Chai for testing
- Frontend uses React Testing Library with Jest
- Test files located in respective test directories
- Note: User handles all testing - no automatic test execution

## Important Development Notes

### Responsive Design Standards
- All hero sections use `min-height: 100vh` for full viewport coverage on mobile
- CSS follows mobile-first approach with specific breakpoints: 320px, 768px, 1024px
- Typography scales with `clamp()` and responsive font sizes
- RTL support implemented through direction attributes and text alignment

### Component Architecture
- WhatsAppBubble component fixed positioned with phone number +972 53-335-3481
- Layout component includes ScrollToTop utility for route navigation
- Language context manages Hebrew/English state with document attribute updates
- Mobile menu uses smooth animations with staggered transitions

### Database Connection Pattern
- DAL (Data Access Layer) uses MySQL2 connection pooling
- Services layer calls DAL methods for database operations
- Environment variables configured through app-config.ts centralization
- File uploads handled through express-fileupload with path organization

### Authentication Flow
- JWT tokens managed through both localStorage and context state
- Role-based access: roleId 1=Admin, 2=Customer
- Session validation on frontend with automatic cleanup
- Protected routes wrap components requiring authentication