// Generates an INSERT SQL for an admin user with hashed password using the project's hashing salt.
// Usage: node create_admin_sql.js

const crypto = require('crypto');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function q(s) { return new Promise(r => rl.question(s, r)); }

(async () => {
  try {
    const firstName = (await q('First name: ')).trim();
    const lastName = (await q('Last name: ')).trim();
    const email = (await q('Email: ')).trim();
    const password = (await q('Password: ')).trim();

    rl.close();

    if (!firstName || !lastName || !email || !password) {
      console.error('All fields required');
      process.exit(1);
    }

    // Read backend .env to get HASHING_SALT
    const envPath = path.join(__dirname, '..', 'Backend', '.env');
    let salt = '10';
    try {
      const env = fs.readFileSync(envPath, 'utf8');
      const m = env.match(/^HASHING_SALT=(.*)$/m);
      if (m) salt = m[1].trim();
    } catch (e) {
      console.warn('Could not read Backend/.env, falling back to salt=10');
    }

    const hashed = crypto.createHmac('sha512', salt).update(password).digest('hex');
    const id = crypto.randomUUID();
    const created = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql = `INSERT INTO users (id, firstName, lastName, email, password, roleId, isActive, emailVerified, created_at, updated_at) \
VALUES ('${id}', '${firstName.replace("'","''")}', '${lastName.replace("'","''")}', '${email.replace("'","''")}', '${hashed}', 1, 1, 1, '${created}', '${created}');`;

    console.log('\nRun the following SQL in your database (Workbench or mysql CLI):\n');
    console.log(sql);
    console.log('\nOr save to file create_admin.sql');
    fs.writeFileSync(path.join(process.cwd(), 'create_admin.sql'), sql);
    console.log('Saved create_admin.sql in current directory');

  } catch (err) {
    console.error(err);
    rl.close();
  }
})();
