# Notes App Backend

A secure REST API for a notes-taking application with complete CRUD operations, JWT authentication, and advanced features like categorization, pinning, and search.

## Features

- ✅ User Registration and Login with JWT
- ✅ Complete CRUD operations for notes
- ✅ JWT-protected routes
- ✅ Note categorization (personal, work, ideas, todo, other)
- ✅ Pin/unpin notes
- ✅ Color-coded notes
- ✅ Tag-based organization
- ✅ Full-text search functionality
- ✅ User authorization checks
- ✅ Timestamps for all notes

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
MONGO_URI=mongodb://localhost:27017/notes-app
PORT=5002
JWT_SECRET=your-very-secure-secret-key
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

The server will run on `http://localhost:5002`

## API Endpoints

### Authentication Endpoints (Public)

#### 1. Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```
**Response:** 201 Created
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 2. Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
**Response:** 200 OK
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 3. Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Notes Endpoints (All Protected with JWT)

#### 4. Get All Notes
```
GET /api/notes
Authorization: Bearer <token>
```
**Response:** 200 OK
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Meeting Notes",
    "content": "Discussed Q2 roadmap...",
    "category": "work",
    "color": "#FFE082",
    "isPinned": true,
    "tags": ["meeting", "important"],
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2026-05-11T10:30:00.000Z",
    "updatedAt": "2026-05-11T10:30:00.000Z"
  }
]
```

#### 5. Get Single Note
```
GET /api/notes/:id
Authorization: Bearer <token>
```

#### 6. Create Note
```
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content of my note",
  "category": "personal",
  "color": "#FFFFFF",
  "tags": ["important", "reminder"]
}
```
**Response:** 201 Created

#### 7. Update Note
```
PUT /api/notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "category": "work",
  "isPinned": true,
  "tags": ["updated"]
}
```

#### 8. Delete Note
```
DELETE /api/notes/:id
Authorization: Bearer <token>
```
**Response:** 200 OK
```json
{
  "message": "Note deleted successfully"
}
```

#### 9. Get Notes by Category
```
GET /api/notes/category/:category
Authorization: Bearer <token>
```
Categories: `personal`, `work`, `ideas`, `todo`, `other`

#### 10. Search Notes
```
GET /api/notes/search?query=meeting
Authorization: Bearer <token>
```
Searches in title, content, and tags

## Note Schema

```javascript
{
  _id: ObjectId,
  title: String (required),
  content: String (required),
  category: String (enum: 'personal', 'work', 'ideas', 'todo', 'other'),
  color: String (hex color),
  isPinned: Boolean (default: false),
  tags: [String],
  userId: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## Testing with Postman

### Import Collection

1. Open Postman
2. Click "Import" → Select the `postman-collection.json` file

### Manual Testing Steps

1. **Register a new user** → Copy the token
2. **Set environment variable** `token` with the JWT token
3. **Create a note** → Use POST /api/notes
4. **Get all notes** → Use GET /api/notes
5. **Update a note** → Use PUT /api/notes/:id
6. **Delete a note** → Use DELETE /api/notes/:id
7. **Search notes** → Use GET /api/notes/search?query=keyword

## Security Features

- **Password Encryption**: bcryptjs with 10 salt rounds
- **JWT Authentication**: 7-day token expiration
- **User Authorization**: Users can only access their own notes
- **Route Protection**: All note routes require valid JWT token
- **Email Validation**: Basic email format validation
- **Password Requirements**: Minimum 6 characters

## Error Handling

| Status | Meaning |
|--------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid credentials |
| 403 | Forbidden - Invalid token or no authorization |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Email already registered |
| 500 | Server Error |

## Project Structure

```
Notes App Backend/
├── server.js                   # Main server file
├── package.json                # Dependencies
├── .env.example                # Environment variables template
├── controllers/
│   ├── authController.js       # Authentication logic
│   └── noteController.js       # Notes CRUD logic
├── models/
│   ├── User.js                 # User schema
│   └── Note.js                 # Note schema
├── routes/
│   ├── auth.js                 # Auth routes
│   └── notes.js                # Note routes
├── middleware/
│   └── auth.js                 # JWT verification
├── postman-collection.json     # Postman collection
├── .gitignore                  # Git ignore file
└── README.md                   # This file
```

## Usage Examples

### Example 1: Create and Search Notes

```bash
# 1. Register
curl -X POST http://localhost:5002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@example.com",
    "password": "password123"
  }'

# Save the token from response

# 2. Create a note
curl -X POST http://localhost:5002/api/notes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meeting with team",
    "content": "Discussed project timeline",
    "category": "work",
    "tags": ["meeting", "important"]
  }'

# 3. Search for notes
curl -X GET "http://localhost:5002/api/notes/search?query=meeting" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Advanced Features

### Pin Important Notes
```json
{
  "isPinned": true
}
```
Pinned notes appear at the top of the list.

### Color-Code Notes
```json
{
  "color": "#FFE082"
}
```
Valid hex colors: #FFFFFF, #FFE082, #C5CAE9, #F8BBD0, etc.

### Organize with Tags
```json
{
  "tags": ["important", "urgent", "review"]
}
```

### Categorize Notes
- `personal` - Personal thoughts and reminders
- `work` - Work-related notes
- `ideas` - Brainstorming and ideas
- `todo` - Action items and tasks
- `other` - Miscellaneous notes

## Next Steps

- Add note sharing with other users
- Add collaborative editing
- Add rich text formatting (markdown support)
- Add file attachments
- Add reminders/notifications
- Add export functionality (PDF, Word)
- Add offline sync capability
- Add version history/revisions

## Security Recommendations

1. **Change JWT_SECRET** in production
2. **Use HTTPS** in production
3. **Set secure CORS** policies
4. **Enable rate limiting** for auth endpoints
5. **Add email verification** for new accounts
6. **Implement password reset** functionality
7. **Add audit logging** for security events
8. **Use environment variables** for sensitive data
9. **Enable CSRF protection** if needed
10. **Add request validation** for all inputs
