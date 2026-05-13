# Image Upload Feature

This project includes:

- `server.js`: Express backend with a Multer file upload endpoint at `POST /upload`
- `uploads/`: directory for saved images
- `src/App.jsx`: React app with preview and uploaded image display
- `vite.config.js`: Vite configuration for the React frontend

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the backend server:
   ```bash
   npm run server
   ```
3. In a separate terminal, start the React frontend:
   ```bash
   npm run dev
   ```

## Usage

- Choose an image file in the React app.
- Preview the file locally.
- Upload it to the backend.
- The app shows the uploaded image from the server and a direct URL.
