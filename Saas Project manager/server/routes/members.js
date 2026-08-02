const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Member = require("../models/Member");

router.get("/", requireAuth, async (req, res) => {
  try {
    const member = await Member.find({ addedBy: req.userId });
    res.json({
      message: "Members route",
      members: member,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { email, name, surname, projectId, role } = req.body;
    const newMember = new Member({
      email,
      name,
      surname,
      role: role || "member",
      projectId,
      addedBy: req.userId,
    });
    await newMember.save();
    res.status(201).json({
      message: "Member added",
      member: newMember,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({
      message: "Member removed",
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
