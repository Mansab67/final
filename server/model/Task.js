const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    comments: { type: Number, default: 0 },
    files: { type: Number, default: 0 },
    users: { type: [String], default: [] },
    status: { type: String, enum: ["not started", "in progress", "completed"], required: true },
    image: { type: [String], default: [] },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Task", TaskSchema);
