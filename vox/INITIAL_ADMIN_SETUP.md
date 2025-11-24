# Initial Admin Creation

When `ALLOW_INITIAL_ADMIN_CREATION=true` is set in your `.env` file, the system allows creating the first admin account from the login page when no admin users exist.

## Demo Admin Credentials

After running the seed script (`/next/seed` in admin UI), you can log in with:

- **Email**: `demo-admin@example.com`
- **Password**: `password`

**Important**: Change this password immediately in production!

## How it works

1. If no admin users exist in the database, the user creation access control allows anyone to create a user
2. The first user created should be set to type "admin"
3. Once an admin exists, normal access controls apply (only admins can create users)

## Security Note

**Important**: Set `ALLOW_INITIAL_ADMIN_CREATION=false` or remove this variable in production after creating your initial admin account.

## Usage

### Option 1: Use Seed Data (Development)
1. Run the seed script from `/admin/next/seed`
2. Log in with demo credentials above
3. Change the password

### Option 2: Create First Admin Manually
1. Start with an empty database
2. Ensure `ALLOW_INITIAL_ADMIN_CREATION=true` in `.env`
3. Navigate to `http://localhost:3000/setup-admin` or directly to `/admin/create-first-user`
4. Fill in the admin account details (make sure to set type to "admin")
5. Set `ALLOW_INITIAL_ADMIN_CREATION=false` in `.env`
6. Restart the application
