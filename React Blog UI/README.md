# React Blog UI

A simple React-based blog layout that displays post cards from a JSON file with search and filter functionality.

## Features

- Display blog posts in card format
- Search posts by title or content
- Filter posts by category
- Responsive design

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/App.jsx` - Main application component
- `src/components/PostCard.jsx` - Post card component
- `src/data/posts.json` - Blog posts data
- `src/App.css` - Styles

## Data Format

Posts are stored in `src/data/posts.json` with the following structure:

```json
{
  "id": 1,
  "title": "Post Title",
  "excerpt": "Short excerpt",
  "content": "Full content",
  "date": "2023-10-01",
  "category": "Category"
}
```
