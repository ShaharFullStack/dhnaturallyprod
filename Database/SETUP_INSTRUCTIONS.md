# DHnaturally Database Setup Instructions

This document provides comprehensive instructions for setting up the bilingual DHnaturally database with user authentication and e-commerce functionality.

## 🗂️ Files Overview

### Database Files
- `comprehensive_schema.sql` - Complete database schema with bilingual support
- `seed_bilingual_data.sql` - Sample data in Hebrew and English
- `SETUP_INSTRUCTIONS.md` - This file

### Backend Files Updated/Created
- `src/3-models/user-model.ts` - Enhanced user model with validation
- `src/3-models/product-model.ts` - Bilingual product model
- `src/3-models/category-model.ts` - Bilingual category model
- `src/3-models/session-model.ts` - Session management model
- `src/4-services/user-service.ts` - Complete user authentication service
- `src/4-services/product-service-updated.ts` - Bilingual product service
- `src/4-services/category-service.ts` - Category management service
- `src/5-controllers/user-controller.ts` - Enhanced user controller
- `src/6-middleware/auth-middleware.ts` - JWT and role-based authentication

## 🚀 Database Setup Steps

### Step 1: Create Database
```bash
mysql -u root -p
```

```sql
-- Create database with proper UTF-8MB4 support for Hebrew
CREATE DATABASE IF NOT EXISTS dhnaturally_db
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

### Step 2: Run Schema Creation
```bash
mysql -u root -p dhnaturally_db < comprehensive_schema.sql
```

### Step 3: Seed Sample Data
```bash
mysql -u root -p dhnaturally_db < seed_bilingual_data.sql
```

## 📋 Environment Configuration

Update your `.env` file with the following variables:

```env
# Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
MYSQL_DATABASE=dhnaturally_db

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
HASHING_SALT=your-salt-for-password-hashing

# Application
ENVIRONMENT=development
PORT=4000
DHNATURALLY_IMAGES_WEB_PATH=https://localhost:4000/api/assets/images/
```

## 👤 Default User Accounts

### Admin Account
- **Email:** admin@dhnaturally.com
- **Password:** password123
- **Role:** Admin (Full access)

### Developer Account
- **Email:** dev@dhnaturally.com
- **Password:** password123
- **Role:** Developer (Extended access for testing)

### Test Users
- **Email:** yossi.cohen@example.com
- **Password:** password123
- **Role:** User

- **Email:** rachel.levi@example.com
- **Password:** password123
- **Role:** User

## 🔧 Backend Integration

### Step 1: Install Dependencies
```bash
cd Backend
npm install bcryptjs crypto
```

### Step 2: Update Service Files
Replace or update the following files with the new versions:
- Replace `src/4-services/product-service.ts` with `src/4-services/product-service-updated.ts`
- The user service has been completely rewritten with session management

### Step 3: Update Routes
Update your main app file to use the new authentication middleware:

```typescript
import { authMiddleware } from "./src/6-middleware/auth-middleware";

// Apply to protected routes
app.use("/api/products", authMiddleware.optionalAuth, productController.router);
app.use("/api/users", userController.router);
app.use("/api/categories", categoryController.router);
```

## 📊 Database Schema Overview

### Core Tables
- **users** - User accounts with authentication
- **user_sessions** - JWT token session management
- **products** - Bilingual product catalog
- **categories** - Hierarchical bilingual categories
- **orders & order_items** - E-commerce order system
- **shopping_cart** - Persistent cart storage
- **contact_forms** - Contact form submissions
- **settings** - System configuration

### Bilingual Support
All user-facing content supports both Hebrew and English:
- Products: `name_en`, `name_he`, `description_en`, `description_he`
- Categories: `name_en`, `name_he`, `description_en`, `description_he`
- Proper UTF8MB4 collation for Hebrew text support

### Security Features
- Password hashing with salt
- JWT token authentication
- Session management with expiration
- Role-based access control (Admin, User, Developer)
- Rate limiting by user
- Active account verification

## 🔐 Authentication Flow

### Registration
1. User submits registration data
2. Email uniqueness validation
3. Password hashing
4. User created with default role
5. JWT token generated
6. Session stored in database
7. Return token and user data

### Login
1. Validate credentials
2. Verify account is active
3. Update last login timestamp
4. Generate JWT token
5. Create new session
6. Return token and user data

### Token Validation
1. Extract JWT from Authorization header
2. Validate token format and expiration
3. Check session exists in database
4. Verify user account is active
5. Add user to request object

## 🌐 API Endpoints

### Public Endpoints
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/contact-us` - Contact form submission

### Protected Endpoints
- `POST /api/users/logout` - Logout current session
- `POST /api/users/logout-all` - Logout all sessions
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change password

### Admin Endpoints
- `GET /api/users/all` - Get all users (Admin/Dev only)
- `GET /api/users/:userId` - Get user by ID (Owner/Admin only)
- `PUT /api/users/:userId` - Update user (Owner/Admin only)
- `DELETE /api/users/:userId` - Delete user (Admin only)

## 🎨 Frontend Integration

### Language Support
The frontend can request localized content by passing language parameter:

```typescript
// Get products in Hebrew
fetch('/api/products?lang=he')

// Get categories in English
fetch('/api/categories?lang=en')
```

### Authentication Headers
Include JWT token in all authenticated requests:

```typescript
const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
};
```

## 📝 Sample Data Included

### Categories (Bilingual)
- Homeopathic Remedies / תרופות הומיאופתיות
- Herbal Medicine / צמחי מרפא
- Digestive Health / בריאות העיכול
- Immune Support / תמיכה במערכת החיסון
- Pain Relief / הקלה על כאבים
- Stress & Anxiety / לחץ וחרדה
- Sleep Support / תמיכה בשינה
- Cardiovascular Health / בריאות הלב וכלי הדם
- Diabetes Support / תמיכה בסוכרת
- Skin Health / בריאות העור

### Products (Bilingual)
- Homeopathic remedies (Anacardium, Arnica, Apis, Nux Vomica)
- Herbal extracts (Ginkgo Biloba, Milk Thistle, Green Tea)
- Diabetes support supplements (Gymnema Sylvestre, Bitter Melon)

### System Settings
- Site configuration in both languages
- Contact information
- Business hours
- Order limits and policies

## 🔧 Maintenance Tasks

### Regular Cleanup
```sql
-- Clean expired sessions (run daily)
DELETE FROM user_sessions WHERE expires_at < NOW();

-- Clean old contact forms (optional)
DELETE FROM contact_forms WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
```

### Performance Monitoring
- Monitor database connection pool
- Check JWT token validation performance
- Review API response times
- Monitor session table growth

## 🚨 Security Considerations

1. **Environment Variables** - Never commit `.env` files
2. **JWT Secrets** - Use strong, unique keys
3. **Password Hashing** - Implemented with salt
4. **Rate Limiting** - Basic implementation provided
5. **SQL Injection** - Parameterized queries used throughout
6. **CORS** - Configure appropriately for production
7. **HTTPS** - Always use in production

## 🐛 Troubleshooting

### Common Issues

1. **Character Encoding**
   ```sql
   -- Check database charset
   SHOW CREATE DATABASE dhnaturally_db;
   
   -- Should show: CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
   ```

2. **JWT Token Issues**
   - Verify JWT_SECRET in .env
   - Check token expiration (default 3 hours)
   - Ensure proper Authorization header format

3. **Database Connection**
   - Verify MySQL credentials in .env
   - Check database exists and user has permissions
   - Test connection manually

4. **Hebrew Text Display**
   - Ensure frontend uses UTF-8 encoding
   - Check database collation is utf8mb4_unicode_ci
   - Verify proper content-type headers

## 📚 Additional Resources

- [MySQL UTF8MB4 Documentation](https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8mb4.html)
- [JWT.io](https://jwt.io/) - JWT debugger and information
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

---

**Note:** This setup provides a production-ready bilingual e-commerce database with proper authentication, session management, and security measures. All passwords in the sample data are hashed versions of "password123" and should be changed in production.