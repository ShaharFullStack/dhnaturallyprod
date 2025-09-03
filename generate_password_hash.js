// Simple script to generate the correct password hash
// Run this with: node generate_password_hash.js

const crypto = require('crypto');

// You need to check your .env file for the HASHING_SALT value
// Replace 'your_salt_here' with the actual salt from your .env file
const HASHING_SALT = 'your_salt_here'; // UPDATE THIS WITH YOUR ACTUAL SALT

const password = 'admin123456';

function hash(plainText) {
    if (!plainText) return null;
    return crypto.createHmac("sha512", HASHING_SALT).update(plainText).digest("hex");
}

const hashedPassword = hash(password);
console.log('Password:', password);
console.log('Hashed:', hashedPassword);
console.log('\nSQL to update admin user:');
console.log(`UPDATE users SET password = '${hashedPassword}' WHERE email = 'admin@dhnaturally.com';`);