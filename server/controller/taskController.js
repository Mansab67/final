const Task = require("../model/Task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Search tasks
exports.searchTasks = async (req, res) => {
  try {
    const query = req.query.q.toLowerCase();
    const tasks = await Task.find({
      $or: [
        { title: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
      ],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Sort tasks
exports.sortTasks = async (req, res) => {
  try {
    const { key, order = "asc" } = req.query;
    if (!["priority", "status", "comments"].includes(key)) {
      return res.status(400).json({ error: "Invalid sorting key" });
    }
    const tasks = await Task.find().sort({ [key]: order === "asc" ? 1 : -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Fix: Create a single task correctly
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Invalid input" });
  }
};

// ✅ New: Update task status for drag-and-drop
exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
