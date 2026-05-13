# To-Do List REST API

A simple CRUD REST API for managing to-do tasks using Express.js and MongoDB.

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
MONGO_URI=mongodb://localhost:27017/todo-list
PORT=5005
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

The server will run on `http://localhost:5005`

## API Endpoints

### 1. GET all tasks
```
GET /api/tasks
```
**Response:** Array of all tasks

### 2. GET a single task by ID
```
GET /api/tasks/:id
```
**Response:** Single task object

### 3. CREATE a new task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high",
  "dueDate": "2026-05-15"
}
```
**Response:** Created task with ID and timestamps

### 4. UPDATE a task
```
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Buy groceries",
  "completed": true,
  "priority": "medium"
}
```
**Response:** Updated task object

### 5. DELETE a task
```
DELETE /api/tasks/:id
```
**Response:** Confirmation message and deleted task

## Testing with Postman

### Import Collection

1. Open Postman
2. Click "Import" → Select the `postman-collection.json` file

### Manual Testing

1. **Create a Task:**
   - Method: POST
   - URL: `http://localhost:5005/api/tasks`
   - Body (JSON):
   ```json
   {
     "title": "Complete project",
     "description": "Finish MEAN Stack project",
     "priority": "high",
     "dueDate": "2026-05-20"
   }
   ```

2. **Get All Tasks:**
   - Method: GET
   - URL: `http://localhost:5005/api/tasks`

3. **Get Task by ID:**
   - Method: GET
   - URL: `http://localhost:5005/api/tasks/{taskId}`

4. **Update a Task:**
   - Method: PUT
   - URL: `http://localhost:5005/api/tasks/{taskId}`
   - Body (JSON):
   ```json
   {
     "completed": true
   }
   ```

5. **Delete a Task:**
   - Method: DELETE
   - URL: `http://localhost:5005/api/tasks/{taskId}`

## Task Schema

```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: 'low', 'medium', 'high'),
  dueDate: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Project Structure

```
To-Do List REST API/
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env.example        # Environment variables template
├── .env                # Environment variables (create from .env.example)
├── models/
│   └── Task.js         # MongoDB Task schema
└── routes/
    └── tasks.js        # API routes for tasks
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing required fields)
- `404` - Not Found
- `500` - Server Error

## Next Steps

- Add authentication (JWT)
- Add pagination for GET /api/tasks
- Add filtering by status/priority
- Add user authentication
