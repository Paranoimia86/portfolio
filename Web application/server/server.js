const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Server is active..." });
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);
const groupRoutes = require("./routes/group");
app.use("/api/group", groupRoutes);
const professorRoutes = require("./routes/professor");
app.use("/api/professor", professorRoutes);
const testRoutes = require("./routes/tests");
app.use("/api/tests", testRoutes);
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);
const lectureRoutes = require("./routes/lectures");
app.use("/api/lectures", lectureRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
