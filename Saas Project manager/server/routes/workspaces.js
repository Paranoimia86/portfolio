const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Workspace = require("../models/Workspace");

router.get("/", requireAuth, async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      $or: [{ owner: req.userId }, { "members.userId": req.userId }],
    });
    res.json({ workspaces });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const newWorkspace = new Workspace({
      name,
      description,
      owner: req.userId,
      members: [{ userId: req.userId, role: "owner" }],
    });
    await newWorkspace.save();
    res.status(201).json({ workspace: newWorkspace });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id).populate(
      "members.userId",
      "email name surname",
    );
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    res.json({ workspace });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/:id/members", requireAuth, async (req, res) => {
  try {
    const { userId, role } = req.body;
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    const currentMember = workspace.members.find(
      (member) => member.userId.toString() === req.userId,
    );
    if (!currentMember) {
      return res
        .status(403)
        .json({ messsage: "You are not a member of this workspace" });
    }

    const canManageMembers =
      currentMember.role === "owner" || currentMember.role === "admin";

    if (!canManageMembers) {
      return res
        .status(403)
        .json({ message: "You do not have permission to manage members" });
    }

    const alreadyMember = workspace.members.some(
      (member) => member.userId.toString() === userId,
    );

    if (alreadyMember) {
      return res
        .status(400)
        .json({ message: "User is already a member of this workspace" });
    }

    workspace.members.push({ userId, role: role || "member" });
    await workspace.save();
    res.json({ workspace });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
});

router.delete("/:id/members/:userId", requireAuth, async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    workspace.members = workspace.members.filter(
      (m) => m.userId.toString() !== req.params.userId,
    );
    await workspace.save();
    res.json({ workspace });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
