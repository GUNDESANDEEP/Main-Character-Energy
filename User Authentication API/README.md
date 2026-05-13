# User Authentication API

A secure REST API for user registration and login with JWT authentication and bcrypt password encryption.

## Features

- ✅ User Registration with password encryption
- ✅ User Login with JWT tokens
- ✅ Password comparison using bcryptjs
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Profile management
- ✅ Change password functionality
- ✅ Secure password hashing (10 salt rounds)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas URI)
- Postman (for testing)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
MONGO_URI=mongodb://localhost:27017/user-auth
PORT=5001
JWT_SECRET=your-very-secure-secret-key-change-this
NODE_ENV=development
```

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

The server will run on `http://localhost:5001`

## API Endpoints

### 1. Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "123-456-7890"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
  }
}
```

### 2. Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
  }
}
```

### 3. Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer <token>
```
**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "createdAt": "2026-05-11T10:30:00.000Z"
  }
}
```

### 4. Update Profile (Protected)
```
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "987-654-3210"
}
```
**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "john@example.com",
    "phone": "987-654-3210"
  }
}
```

### 5. Change Password (Protected)
```
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "securePassword123",
  "newPassword": "newSecurePassword456"
}
```
**Response:**
```json
{
  "message": "Password changed successfully"
}
```

## Testing with Postman

### Import Collection

1. Open Postman
2. Click "Import" → Select the `postman-collection.json` file

### Manual Setup

1. **Set JWT Token Variable** (After Login/Register):
   - In Postman, go to "Environments"
   - Create a new environment or use existing
   - Set variable: `token` = (paste token from login response)

2. **Use in Protected Routes**:
   - Authorization header: `Bearer {{token}}`

## User Schema

```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  phone: String,
  isVerified: Boolean (default: false),
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
}
```

## Security Features

- **Password Encryption**: Uses bcryptjs with 10 salt rounds
- **JWT Tokens**: 7-day expiration
- **Password Comparison**: Secure bcrypt comparison for login
- **Email Validation**: Basic email format validation
- **Password Requirements**: Minimum 6 characters
- **Password Select**: Password field not returned by default

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (invalid/expired token)
- `404` - Not Found (user not found)
- `409` - Conflict (email already registered)
- `500` - Server Error

## Error Response Format

```json
{
  "error": "Error message description"
}
```

## Project Structure

```
User Authentication API/
├── server.js                 # Main server file
├── package.json              # Dependencies
├── .env.example              # Environment variables template
├── controllers/
│   └── authController.js     # Authentication logic
├── models/
│   └── User.js               # MongoDB User schema
├── routes/
│   └── auth.js               # Auth routes
├── middleware/
│   └── auth.js               # JWT verification middleware
└── README.md                 # This file
```

## Usage Example

### 1. Register User
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith",
    "email": "alice@example.com",
    "password": "password123",
    "phone": "555-1234"
  }'
```

### 2. Save the Token and Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }'
```

### 3. Use Token for Protected Routes
```bash
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Next Steps

- Add email verification
- Add password reset functionality
- Add role-based access control (RBAC)
- Add rate limiting
- Add refresh token mechanism
- Add OAuth integration (Google, GitHub)
- Add Two-factor authentication (2FA)
- Add user profile picture upload

## Security Recommendations

1. **Change JWT_SECRET** in production
2. **Use HTTPS** in production
3. **Set secure CORS** policies
4. **Enable rate limiting** to prevent brute force attacks
5. **Use environment variables** for sensitive data
6. **Add email verification** for new accounts
7. **Implement password reset** functionality
8. **Add logging** for security audits
