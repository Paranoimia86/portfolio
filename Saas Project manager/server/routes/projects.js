const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Project = require("../models/Project");

// GET všetky projekty používateľa
router.get("/", requireAuth, async (req, res) => {
  try {
    const { workspaceId } = req.query;
    if (!workspaceId) {
      return res.json({ message: "workspaceId is required" });
    }

    const projects = await Project.find({ workspaceId }).populate(
      "createdBy",
      "name surname email",
    );
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST vytvor nový projekt
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, description, status, workspaceId } = req.body;
    const newProject = new Project({
      name,
      description,
      workspaceId,
      status,
      createdBy: req.userId,
    });
    await newProject.save();
    res.status(201).json({ project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE zmaž projekt
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
