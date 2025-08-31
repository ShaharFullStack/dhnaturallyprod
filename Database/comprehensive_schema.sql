-- DHnaturally Comprehensive Database Schema
-- Bilingual Natural Medicine E-commerce Database with User Authentication
-- Supports Hebrew and English with proper UTF-8MB4 collation

-- Create database with proper character set for Hebrew support
CREATE DATABASE IF NOT EXISTS dhnaturally_db
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE dhnaturally_db;

-- =====================================================
-- ROLES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- USERS TABLE - Enhanced with proper authentication
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Will store hashed passwords
    phone VARCHAR(20),
    roleId INT NOT NULL DEFAULT 2,
    isActive BOOLEAN DEFAULT TRUE,
    emailVerified BOOLEAN DEFAULT FALSE,
    lastLogin TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (roleId) REFERENCES roles(id),
    INDEX idx_email (email),
    INDEX idx_role (roleId),
    INDEX idx_active (isActive),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- USER SESSIONS TABLE - For session management
-- =====================================================
CREATE TABLE IF NOT EXISTS user_sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token_hash (token_hash),
    INDEX idx_expires_at (expires_at)
);

-- =====================================================
-- CATEGORIES TABLE - Bilingual support
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_he VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_he TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_id VARCHAR(36) NULL, -- For hierarchical categories
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent_id (parent_id),
    INDEX idx_active (is_active),
    INDEX idx_sort_order (sort_order)
);

-- =====================================================
-- PRODUCTS TABLE - Enhanced with bilingual support
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    name_en VARCHAR(200) NOT NULL,
    name_he VARCHAR(200) NOT NULL,
    description_en TEXT NOT NULL,
    description_he TEXT NOT NULL,
    short_description_en VARCHAR(500),
    short_description_he VARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2) NULL,
    sku VARCHAR(100) UNIQUE,
    stock_quantity INT DEFAULT 0,
    manage_stock BOOLEAN DEFAULT TRUE,
    in_stock BOOLEAN DEFAULT TRUE,
    weight DECIMAL(8,2) NULL,
    dimensions VARCHAR(100) NULL, -- e.g., "10x5x2 cm"
    imageName VARCHAR(255),
    gallery JSON, -- Array of additional image names
    meta_title_en VARCHAR(200),
    meta_title_he VARCHAR(200),
    meta_description_en VARCHAR(300),
    meta_description_he VARCHAR(300),
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_name_en (name_en),
    INDEX idx_name_he (name_he),
    INDEX idx_sku (sku),
    INDEX idx_price (price),
    INDEX idx_active (is_active),
    INDEX idx_featured (is_featured),
    INDEX idx_stock (in_stock),
    INDEX idx_created_at (created_at),
    FULLTEXT idx_search_en (name_en, description_en, short_description_en),
    FULLTEXT idx_search_he (name_he, description_he, short_description_he)
);

-- =====================================================
-- PRODUCT CATEGORIES JUNCTION TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS product_categories (
    product_id VARCHAR(36),
    category_id VARCHAR(36),
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- =====================================================
-- PRODUCT ATTRIBUTES TABLE - For flexible product properties
-- =====================================================
CREATE TABLE IF NOT EXISTS product_attributes (
    id VARCHAR(36) PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_he VARCHAR(100) NOT NULL,
    type ENUM('text', 'number', 'boolean', 'select', 'multiselect') DEFAULT 'text',
    is_required BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PRODUCT ATTRIBUTE VALUES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS product_attribute_values (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    attribute_id VARCHAR(36) NOT NULL,
    value_en TEXT,
    value_he TEXT,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES product_attributes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_attribute (product_id, attribute_id)
);

-- =====================================================
-- ORDERS TABLE - Enhanced e-commerce functionality
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    
    -- Amounts
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Customer information (stored for order history)
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    
    -- Billing address
    billing_first_name VARCHAR(100),
    billing_last_name VARCHAR(100),
    billing_company VARCHAR(100),
    billing_address_1 VARCHAR(200),
    billing_address_2 VARCHAR(200),
    billing_city VARCHAR(100),
    billing_state VARCHAR(100),
    billing_postcode VARCHAR(20),
    billing_country VARCHAR(2) DEFAULT 'IL',
    
    -- Shipping address
    shipping_first_name VARCHAR(100),
    shipping_last_name VARCHAR(100),
    shipping_company VARCHAR(100),
    shipping_address_1 VARCHAR(200),
    shipping_address_2 VARCHAR(200),
    shipping_city VARCHAR(100),
    shipping_state VARCHAR(100),
    shipping_postcode VARCHAR(20),
    shipping_country VARCHAR(2) DEFAULT 'IL',
    
    -- Order notes
    customer_notes TEXT,
    admin_notes TEXT,
    
    -- Timestamps
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_order_number (order_number),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_created_at (created_at),
    INDEX idx_customer_email (customer_email)
);

-- =====================================================
-- ORDER ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    
    -- Product details at time of order (for historical accuracy)
    product_name_en VARCHAR(200) NOT NULL,
    product_name_he VARCHAR(200) NOT NULL,
    product_sku VARCHAR(100),
    
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL, -- Price at time of order
    total DECIMAL(10,2) NOT NULL, -- quantity * price
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
);

-- =====================================================
-- SHOPPING CART TABLE - Persistent cart storage
-- =====================================================
CREATE TABLE IF NOT EXISTS shopping_cart (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NULL, -- NULL for guest carts
    session_id VARCHAR(255) NULL, -- For guest carts
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_id (session_id),
    INDEX idx_product_id (product_id),
    UNIQUE KEY unique_user_product (user_id, product_id),
    UNIQUE KEY unique_session_product (session_id, product_id)
);

-- =====================================================
-- CONTACT FORMS TABLE - Instead of file storage
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_forms (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
    replied_at TIMESTAMP NULL,
    replied_by VARCHAR(36) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (replied_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- SYSTEM SETTINGS TABLE - For configuration
-- =====================================================
CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description_en VARCHAR(200),
    description_he VARCHAR(200),
    is_public BOOLEAN DEFAULT FALSE, -- Whether setting can be accessed by frontend
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
);

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert roles
INSERT INTO roles (id, name, description) VALUES 
(1, 'admin', 'Administrator with full system access'),
(2, 'user', 'Regular user with basic access'),
(3, 'developer', 'Developer with extended access for testing')
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- Insert default categories with bilingual names
INSERT INTO categories (id, name_en, name_he, description_en, description_he, slug) VALUES
(UUID(), 'Homeopathic Remedies', 'תרופות הומיאופתיות', 'Traditional homeopathic medicines for various health conditions', 'תרופות הומיאופתיות מסורתיות למצבי בריאות שונים', 'homeopathic-remedies'),
(UUID(), 'Herbal Medicine', 'צמחי מרפא', 'Natural plant-based remedies and supplements', 'תרופות וביטוח טבעיים מבוססי צמחים', 'herbal-medicine'),
(UUID(), 'Digestive Health', 'בריאות העיכול', 'Natural remedies for digestive and gastrointestinal health', 'תרופות טבעיות לבריאות העיכול והמעי', 'digestive-health'),
(UUID(), 'Immune Support', 'תמיכה במערכת החיסון', 'Natural products to support and boost immune system function', 'מוצרים טבעיים לתמיכה וחיזוק תפקוד מערכת החיסון', 'immune-support'),
(UUID(), 'Pain Relief', 'הקלה על כאבים', 'Natural remedies for pain management and inflammation', 'תרופות טבעיות לטיפול בכאבים ודלקות', 'pain-relief'),
(UUID(), 'Stress & Anxiety', 'לחץ וחרדה', 'Natural solutions for stress, anxiety, and mental wellness', 'פתרונות טבעיים ללחץ, חרדה ובריאות נפשית', 'stress-anxiety'),
(UUID(), 'Sleep Support', 'תמיכה בשינה', 'Natural products to improve sleep quality and relaxation', 'מוצרים טבעיים לשיפור איכות השינה והרפיה', 'sleep-support'),
(UUID(), 'Cardiovascular Health', 'בריאות הלב וכלי הדם', 'Natural remedies for heart and circulatory health', 'תרופות טבעיות לבריאות הלב ומערכת הדם', 'cardiovascular-health'),
(UUID(), 'Diabetes Support', 'תמיכה בסוכרת', 'Natural supplements and remedies for blood sugar management', 'תוספי מזון ותרופות טבעיות לניהול רמת הסוכר בדם', 'diabetes-support'),
(UUID(), 'Skin Health', 'בריאות העור', 'Natural products for skin conditions and dermatological health', 'מוצרים טבעיים למצבי עור ובריאות דרמטולוגית', 'skin-health');

-- Insert default admin and developer users
INSERT INTO users (id, firstName, lastName, email, password, roleId, isActive, emailVerified) VALUES 
(UUID(), 'Admin', 'User', 'admin@dhnaturally.com', '$2b$10$rQZ9YjKGvZc8F1L2mHx1UeB6y6CUQhWXz8m5p1Q3r2N4v5K6L7M8N', 1, TRUE, TRUE),
(UUID(), 'Developer', 'User', 'dev@dhnaturally.com', '$2b$10$rQZ9YjKGvZc8F1L2mHx1UeB6y6CUQhWXz8m5p1Q3r2N4v5K6L7M8N', 3, TRUE, TRUE);

-- Insert default system settings
INSERT INTO settings (setting_key, setting_value, setting_type, description_en, description_he, is_public) VALUES 
('site_name_en', 'DHnaturally', 'string', 'Site name in English', 'שם האתר באנגלית', TRUE),
('site_name_he', 'DHnaturally', 'string', 'Site name in Hebrew', 'שם האתר בעברית', TRUE),
('default_language', 'he', 'string', 'Default site language', 'שפת ברירת מחדל של האתר', TRUE),
('currency', 'ILS', 'string', 'Default currency', 'מטבע ברירת מחדל', TRUE),
('currency_symbol', '₪', 'string', 'Currency symbol', 'סמל המטבע', TRUE),
('tax_rate', '0.17', 'number', 'Default tax rate (VAT)', 'שיעור מס ברירת מחדל (מעמ)', FALSE),
('shipping_cost', '25.00', 'number', 'Default shipping cost', 'עלות משלוח ברירת מחדל', TRUE),
('free_shipping_minimum', '200.00', 'number', 'Minimum amount for free shipping', 'סכום מינימלי למשלוח חינם', TRUE);

-- Create indexes for better performance
CREATE INDEX idx_products_bilingual_search ON products (name_en, name_he, description_en, description_he);
CREATE INDEX idx_categories_bilingual ON categories (name_en, name_he);
CREATE INDEX idx_orders_date_status ON orders (created_at, status);
CREATE INDEX idx_users_email_active ON users (email, isActive);