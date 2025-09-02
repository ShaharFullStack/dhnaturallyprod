#!/usr/bin/env node
// Creates an admin user by calling the backend /api/register endpoint.
// Usage: node create_admin_api.js
// The script prompts for first name, last name, email and password.

const readline = require('readline');
const http = require('http');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function question(q) {
  return new Promise((resolve) => rl.question(q, resolve));
}

(async () => {
  try {
    const firstName = (await question('First name: ')).trim();
    const lastName = (await question('Last name: ')).trim();
    const email = (await question('Email: ')).trim();
    const password = (await question('Password (will be sent over localhost): ')).trim();

    rl.close();

    if (!firstName || !lastName || !email || !password) {
      console.error('All fields are required');
      process.exit(1);
    }

    const payload = JSON.stringify({ firstName, lastName, email, password, roleId: 1 });

    const options = {
      hostname: 'localhost',
      port: 4000,
      path: '/api/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          console.log('Admin registered successfully. Response:');
          try { console.log(JSON.parse(data)); } catch (e) { console.log(data); }
        } else {
          console.error('Failed to register admin. Status:', res.statusCode);
          console.error('Response:', data);
        }
      });
    });

    req.on('error', (e) => { console.error('Request error:', e.message); });
    req.write(payload);
    req.end();

  } catch (err) {
    console.error('Error', err);
    rl.close();
  }
})();
