const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    default: () => {
      const projectImages = [
        "/img/project1.png",
        "/img/project2.jpg",
        "/img/project3.jpg",
      ];
      return projectImages[Math.floor(Math.random() * projectImages.length)];
    },
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["active", "completed", "archived"],
    default: "active",
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
