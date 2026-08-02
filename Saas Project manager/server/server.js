const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB pripojené"))
  .catch((err) => console.error("MongoDB chyba:", err));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

//Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);

const projectRoutes = require("./routes/projects");
app.use("/api/projects", projectRoutes);

const workspaceRoutes = require("./routes/workspaces");
app.use("/api/workspaces", workspaceRoutes);

const settingsRoutes = require("./routes/settings");
app.use("/api/settings", settingsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
