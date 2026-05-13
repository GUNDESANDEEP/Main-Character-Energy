const express = require('express');
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  getNotesByCategory,
  searchNotes
} = require('../controllers/noteController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// All note routes are protected with JWT
router.use(verifyToken);

// CRUD operations
router.get('/', getAllNotes);
router.get('/search', searchNotes);
router.post('/', createNote);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

// Category routes
router.get('/category/:category', getNotesByCategory);

module.exports = router;
