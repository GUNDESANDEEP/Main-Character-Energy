# Task Manager Application

A full task tracking web app with user login, task filtering, and MongoDB storage.

## Structure

- `backend/` — Express API with authentication and task management
- `frontend/` — React + Vite user interface with login, register, and dashboard

## Backend Setup

1. Open `backend/`
2. Copy `.env.example` to `.env`
3. Set `MONGO_URI` and `JWT_SECRET`
4. Run:
   ```bash
   npm install
   npm run dev
   ```

The backend runs by default on `http://localhost:5006`.

## Frontend Setup

1. Open `frontend/`
2. Run:
   ```bash
   npm install
   npm run dev
   ```

The app will start on `http://localhost:5177`.

## Features

- Register and login with JWT authentication
- Add, update, delete, and complete tasks
- Search tasks and filter by status or priority
- Task persistence using MongoDB

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
