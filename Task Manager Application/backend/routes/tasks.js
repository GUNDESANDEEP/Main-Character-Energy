const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const { status, priority, search } = req.query;
  const query = { user: req.user.id };
  if (status === 'completed') query.completed = true;
  if (status === 'pending') query.completed = false;
  if (priority && ['low', 'medium', 'high'].includes(priority)) query.priority = priority;
  if (search) query.title = { $regex: search, $options: 'i' };

  try {
    const tasks = await Task.find(query).sort({ dueDate: 1, createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch tasks' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  try {
    const task = new Task({
      user: req.user.id,
      title,
      description,
      priority: priority || 'medium',
      dueDate: dueDate || null,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Could not create task' });
  }
});

router.put('/:id', async (req, res) => {
  const { title, description, completed, priority, dueDate } = req.body;
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate ?? task.dueDate;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Could not update task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete task' });
  }
});

module.exports = router;
