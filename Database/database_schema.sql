-- DHnaturally Database Schema
-- Natural Medicine E-commerce Database

-- Create database
CREATE DATABASE IF NOT EXISTS dhnaturally_db
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE dhnaturally_db;

-- Products table based on ProductModel structure
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,  -- UUID
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    imageName VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_name (name),
    INDEX idx_price (price),
    INDEX idx_created_at (created_at)
);

-- Optional: Categories table for product classification
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Product categories junction table
CREATE TABLE IF NOT EXISTS product_categories (
    product_id VARCHAR(36),
    category_id VARCHAR(36),
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Optional: Users table for future functionality
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: Orders table for future functionality
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Optional: Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create categories for natural medicine products
INSERT INTO categories (id, name, description) VALUES
(UUID(), 'Homeopathic Remedies', 'Traditional homeopathic medicines for various health conditions'),
(UUID(), 'Herbal Medicine', 'Natural plant-based remedies and supplements'),
(UUID(), 'Digestive Health', 'Natural remedies for digestive and gastrointestinal health'),
(UUID(), 'Immune Support', 'Natural products to support and boost immune system function'),
(UUID(), 'Pain Relief', 'Natural remedies for pain management and inflammation'),
(UUID(), 'Stress & Anxiety', 'Natural solutions for stress, anxiety, and mental wellness'),
(UUID(), 'Sleep Support', 'Natural products to improve sleep quality and relaxation'),
(UUID(), 'Cardiovascular Health', 'Natural remedies for heart and circulatory health'),
(UUID(), 'Diabetes Support', 'Natural supplements and remedies for blood sugar management'),
(UUID(), 'Skin Health', 'Natural products for skin conditions and dermatological health');