Admin creation scripts

1) create_admin_api.js
- Purpose: calls the backend `/api/register` endpoint to create an admin user.
- Usage: ensure backend is running (http://localhost:4000), then run:

  node scripts/create_admin_api.js

- The script prompts for first name, last name, email and password. It sends roleId:1 so the created user will be an Admin.

2) create_admin_sql.js
- Purpose: generate an SQL INSERT statement with the password hashed in the same way the backend does.
- Usage:

  node scripts/create_admin_sql.js

- The script reads `Backend/.env` to get `HASHING_SALT`. It outputs `create_admin.sql` in the current directory and prints the SQL to stdout. Use your DB client to run it.

Notes
- Preferred method: use `create_admin_api.js` while backend is running so the server validates and creates the session correctly.
- If you run the SQL directly, the password stored will be HMAC-SHA512 with the same salt used by the backend, so login via `/api/login` will work.
- Ensure the `users` table exists and column names match (the SQL generator writes `created_at` and `updated_at` columns; adjust if your schema differs).
