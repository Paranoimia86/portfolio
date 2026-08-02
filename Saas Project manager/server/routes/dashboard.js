const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Project = require("../models/Project");
const Workspace = require("../models/Workspace");
const User = require("../models/User");

const buildLastSevenDays = () => {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let offset = 6; offset >= 0; offset -= 1) {
    const day = new Date(today);
    day.setDate(today.getDate() - offset);
    days.push({
      key: day.toISOString().slice(0, 10),
      label: day.toLocaleDateString("sk-SK", { weekday: "short" }),
      count: 0,
    });
  }
  return days;
};

router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("email name surname");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const displayName =
      user.name && user.surname
        ? `${user.name} ${user.surname}`
        : user.name || user.surname || user.email.split("@")[0];
    const workspaces = await Workspace.find({
      $or: [{ owner: req.userId }, { "members.userId": req.userId }],
    });
    const workspaceId = workspaces.map((w) => w._id);
    const projects = await Project.find({ workspaceId: { $in: workspaceId } });

    const activity = buildLastSevenDays();
    const activityMap = new Map(activity.map((day) => [day.key, day]));

    for (const workspace of workspaces) {
      const dayKey = new Date(workspace.createdAt).toISOString().slice(0, 10);
      const day = activityMap.get(dayKey);
      if (day) {
        day.count += 1;
      }
    }

    for (const project of projects) {
      const dayKey = new Date(project.createdAt).toISOString().slice(0, 10);
      const day = activityMap.get(dayKey);
      if (day) {
        day.count += 1;
      }
    }

    const totalWorkspaces = workspaces.length;
    const totalProjects = projects.length;
    const activeProjects = projects.filter((p) => p.status === "active").length;
    const completedProjects = projects.filter(
      (p) => p.status === "completed",
    ).length;
    const archivedProjects = projects.filter(
      (p) => p.status === "archived",
    ).length;
    res.json({
      message: "Dashboard data",
      userId: req.userId,
      user: {
        displayName: displayName,
        email: user.email,
        hasName: !!user.name,
      },
      stats: {
        totalWorkspaces: totalWorkspaces,
        totalProjects: totalProjects,
        activeProjects: activeProjects,
        completedProjects: completedProjects,
        archivedProjects: archivedProjects,
      },
      activity,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
module.exports = router;
