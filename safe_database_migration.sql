-- Safe database migration - adds only missing columns
USE dhnaturally_db;

-- Add columns only if they don't exist
-- Note: MySQL doesn't have IF NOT EXISTS for ALTER COLUMN, so we handle errors

-- Add isActive column if it doesn't exist
SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
               WHERE TABLE_SCHEMA = 'dhnaturally_db' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'isActive') = 0,
              'ALTER TABLE users ADD COLUMN isActive TINYINT(1) DEFAULT 1',
              'SELECT "isActive column already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add emailVerified column if it doesn't exist
SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
               WHERE TABLE_SCHEMA = 'dhnaturally_db' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'emailVerified') = 0,
              'ALTER TABLE users ADD COLUMN emailVerified TINYINT(1) DEFAULT 0',
              'SELECT "emailVerified column already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add lastLogin column if it doesn't exist
SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
               WHERE TABLE_SCHEMA = 'dhnaturally_db' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'lastLogin') = 0,
              'ALTER TABLE users ADD COLUMN lastLogin TIMESTAMP NULL',
              'SELECT "lastLogin column already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add created_at column if it doesn't exist
SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
               WHERE TABLE_SCHEMA = 'dhnaturally_db' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'created_at') = 0,
              'ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
              'SELECT "created_at column already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add updated_at column if it doesn't exist
SET @sql = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
               WHERE TABLE_SCHEMA = 'dhnaturally_db' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'updated_at') = 0,
              'ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
              'SELECT "updated_at column already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Update existing users to be active if isActive was just added
UPDATE users SET isActive = 1 WHERE isActive IS NULL;

-- Create user_sessions table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    token_hash VARCHAR(64) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token_hash (token_hash),
    INDEX idx_expires_at (expires_at)
);

-- Create contact_forms table if it doesn't exist  
CREATE TABLE IF NOT EXISTS contact_forms (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    subject VARCHAR(255) NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);