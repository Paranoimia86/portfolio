const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const User = require("../models/User");
const pool = require("../database");
const bcryptjs = require("bcryptjs");

router.get("/groups", async (req, res) => {
  try {
    const groups = await pool.query(
      "SELECT id, day, time FROM exercise_groups ORDER BY day, time",
    );
    res.json(groups.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching groups",
      error: error.message,
    });
  }
});

module.exports = router;
