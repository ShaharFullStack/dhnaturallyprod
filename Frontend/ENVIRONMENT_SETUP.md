# DHnaturally Frontend Environment Setup

## Overview
This guide explains how to configure the frontend environment variables for the DHnaturally application.

## 🚀 Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the configuration** in `.env` file

3. **Restart your development server:**
   ```bash
   npm start
   ```

## 📋 Environment Variables

### Required Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `REACT_APP_BASE_URL` | Backend API base URL | Required | `http://localhost:3001/` |

### Optional Variables

#### Development Settings
| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `REACT_APP_ENV` | Environment mode | `development` | `development`, `production` |
| `REACT_APP_ENABLE_DEBUG` | Enable debug logging | `true` | `true`, `false` |
| `REACT_APP_ENABLE_ANALYTICS` | Enable analytics tracking | `false` | `true`, `false` |

#### API Configuration
| Variable | Description | Default | Unit |
|----------|-------------|---------|------|
| `REACT_APP_API_TIMEOUT` | API request timeout | `10000` | milliseconds |
| `REACT_APP_MAX_RETRIES` | Maximum API retry attempts | `3` | attempts |

#### Media & Assets
| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_IMAGES_BASE_URL` | Base URL for product images | `http://localhost:4000/uploads/` |

#### New Database Features
| Variable | Description | Default | Purpose |
|----------|-------------|---------|---------|
| `REACT_APP_ENABLE_PRODUCT_REVIEWS` | Enable product reviews | `true` | Customer reviews & ratings |
| `REACT_APP_ENABLE_PRODUCT_VARIANTS` | Enable product variants | `true` | Different potencies/packages |
| `REACT_APP_ENABLE_WISHLIST` | Enable wishlist | `true` | User wishlists |
| `REACT_APP_ENABLE_DISCOUNT_CODES` | Enable discount codes | `true` | Promotional codes |
| `REACT_APP_ENABLE_ANALYTICS` | Enable product analytics | `true` | Performance tracking |

#### Internationalization
| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `REACT_APP_DEFAULT_LANGUAGE` | Default language | `en` | `en`, `he` |
| `REACT_APP_SUPPORTED_LANGUAGES` | Supported languages | `en,he` | Comma-separated list |

#### Security
| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_CSP_ENABLED` | Enable Content Security Policy | `false` |

## 🔧 Configuration Examples

### Development Environment
```env
REACT_APP_BASE_URL=http://localhost:4000/
REACT_APP_ENV=development
REACT_APP_ENABLE_DEBUG=true
REACT_APP_ENABLE_ANALYTICS=false
```

### Production Environment
```env
REACT_APP_BASE_URL=https://api.dhnaturally.com/
REACT_APP_ENV=production
REACT_APP_ENABLE_DEBUG=false
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_API_TIMEOUT=15000
```

### Staging Environment
```env
REACT_APP_BASE_URL=https://staging-api.dhnaturally.com/
REACT_APP_ENV=staging
REACT_APP_ENABLE_DEBUG=true
REACT_APP_ENABLE_ANALYTICS=true
```

## 🌐 Backend URL Configuration

### Local Development
```env
REACT_APP_BASE_URL=http://localhost:4000/
```

### Docker Development
```env
REACT_APP_BASE_URL=http://localhost:8000/
```

### Production
```env
REACT_APP_BASE_URL=https://your-api-domain.com/
```

## ⚙️ Feature Flags

The application uses feature flags to enable/disable new database features:

- **Product Reviews**: Customer reviews and ratings system
- **Product Variants**: Different potencies and package sizes
- **Wishlist**: User wishlists and favorites
- **Discount Codes**: Promotional codes and discounts
- **Analytics**: Product performance tracking

## 🔒 Security Notes

- Never commit the `.env` file to version control
- Use different configurations for different environments
- Keep sensitive information secure
- The `.env` file is already in `.gitignore`

## 🚨 Troubleshooting

### Common Issues

1. **"Base URL is missing" error**
   - Ensure `REACT_APP_BASE_URL` is set in `.env`
   - Restart the development server after changes

2. **API calls failing**
   - Check that the backend server is running
   - Verify the `REACT_APP_BASE_URL` points to the correct address
   - Check network connectivity

3. **Environment variables not loading**
   - Restart the development server
   - Ensure `.env` is in the root of the frontend directory
   - Check for typos in variable names

### Debug Mode

Enable debug mode to see detailed logging:
```env
REACT_APP_ENABLE_DEBUG=true
```

## 📱 Mobile Development

For React Native or mobile development, you may need additional configuration:

```env
# Mobile-specific settings
REACT_APP_PLATFORM=mobile
REACT_APP_API_BASE_URL=https://api.dhnaturally.com/
```

## 🔄 Environment Switching

You can create multiple `.env` files for different environments:

- `.env.development` - Development settings
- `.env.production` - Production settings
- `.env.staging` - Staging settings

Then use the appropriate file based on your build process.

---

## 📞 Support

If you encounter issues with the environment configuration:

1. Check the console for error messages
2. Verify all required variables are set
3. Ensure the backend API is accessible
4. Review the troubleshooting section above

For backend configuration help, see the backend documentation.
