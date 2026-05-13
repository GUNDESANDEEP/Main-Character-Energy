const Note = require('../models/Note');

// GET all notes for user
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId })
      .sort({ isPinned: -1, createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single note by ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to access this note' });
    }

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE new note
exports.createNote = async (req, res) => {
  const { title, content, category, color, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const newNote = new Note({
      title,
      content,
      category,
      color,
      tags,
      userId: req.userId
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check authorization
    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to update this note' });
    }

    // Update fields
    if (req.body.title) note.title = req.body.title;
    if (req.body.content) note.content = req.body.content;
    if (req.body.category) note.category = req.body.category;
    if (req.body.color) note.color = req.body.color;
    if (req.body.tags) note.tags = req.body.tags;
    if (req.body.isPinned !== undefined) note.isPinned = req.body.isPinned;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check authorization
    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this note' });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET notes by category
exports.getNotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const notes = await Note.find({ userId: req.userId, category })
      .sort({ isPinned: -1, createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH notes
exports.searchNotes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const notes = await Note.find({
      userId: req.userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    }).sort({ isPinned: -1, createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
