# Server Restart Required

The backend code has been modified but the changes may not have taken effect.

**Please restart your backend server:**

1. Stop the current server (Ctrl+C)
2. Run: `cd Backend && npm start`

This will ensure all the validation fixes I made are active.

After restart, try this exact request:

```json
POST http://localhost:4000/api/register
{
  "firstName": "TestUser", 
  "lastName": "Example",
  "email": "test@example.com",
  "password": "password123",
  "roleId": 2
}
```

If it still fails, the issue is deeper in the code structure.