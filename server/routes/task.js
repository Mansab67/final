const express = require("express");
const {
  getAllTasks,
  searchTasks,
  sortTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus, // ✅ Add new controller for drag-and-drop
} = require("../controller/taskController");

const router = express.Router();

router.get("/", getAllTasks);
router.get("/search", searchTasks);
router.get("/sort", sortTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.put("/:id/status", updateTaskStatus); // ✅ New route for drag-and-drop updates
router.delete("/:id", deleteTask);

module.exports = router;
