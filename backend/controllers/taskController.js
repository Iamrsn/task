const Task = require('../models/Task');

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ success: false, error: 'Failed to load tasks' });
  }
};

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, status = 'todo' } = req.body;

    // Server-side input validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ success: false, error: 'Task title cannot be empty' });
    }

    const validStatuses = ['todo', 'in-progress', 'done'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    const newTask = await Task.create({
      title: title.trim(),
      status,
    });

    return res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ success: false, error: 'Failed to create task' });
  }
};

// UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['todo', 'in-progress', 'done'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid or missing status value' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    return res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ success: false, error: 'Failed to update task' });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    return res.status(200).json({ success: true, data: { id } });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete task' });
  }
};