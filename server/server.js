const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
