const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const pool = require("../database");
const bcryptjs = require("bcryptjs");

const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  next();
};

router.post("/create-group", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { day, time } = req.body;
    if (!day || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const validDays = ["PO", "UT", "ST", "STV", "PIA"];
    if (!validDays.includes(day)) {
      return res
        .status(400)
        .json({ message: "Invalid day. Must be one of: PO, UT, ST, STV, PIA" });
    }

    if (!/^\d{2}:\d{2}$/.test(time)) {
      return res
        .status(400)
        .json({ message: "Invalid time format. Use HH:MM" });
    }

    const group = await pool.query(
      "INSERT INTO exercise_groups (day, time) VALUES ($1, $2) RETURNING id, day, time",
      [day, time],
    );

    res
      .status(201)
      .json({ message: "Group created successfully", group: group.rows[0] });
  } catch (error) {
    console.error("Error in /create-group:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/groups", requireAuth, requireAdmin, async (req, res) => {
  try {
    const groups = await pool.query(
      "SELECT id, day, time FROM exercise_groups ORDER BY day, time",
    );
    res.json(groups.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching groups", error: error.message });
  }
});

router.get("/professors", requireAuth, requireAdmin, async (req, res) => {
  try {
    const professors = await pool.query(
      "SELECT id, first_name, last_name, email FROM users WHERE role='professor'",
    );
    res.json(professors.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching professors", error: error.message });
  }
});

router.post(
  "/assign-group-to-professor",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const { professorId, groupId } = req.body;

      if (!professorId || !groupId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const professor = await pool.query(
        "SELECT * FROM users WHERE id=$1 AND role='professor'",
        [professorId],
      );

      if (professor.rows.length === 0) {
        return res.status(404).json({ message: "Professor not found" });
      }

      const existingAssignment = await pool.query(
        "SELECT * FROM user_exercise_groups WHERE user_id=$1 AND exercise_group_id=$2",
        [professorId, groupId],
      );

      if (existingAssignment.rows.length > 0) {
        return res
          .status(400)
          .json({ message: "Professor already assigned to this group" });
      }

      await pool.query(
        "INSERT INTO user_exercise_groups (user_id, exercise_group_id) VALUES ($1, $2)",
        [professorId, groupId],
      );

      res
        .status(200)
        .json({ message: "Group assigned to professor successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error assigning group to professor",
        error: error.message,
      });
    }
  },
);

router.get("/professor-groups", requireAuth, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.id, u.first_name, u.last_name, u.email,
        eg.id as group_id, eg.day, eg.time
      FROM users u
      LEFT JOIN user_exercise_groups ueg ON u.id = ueg.user_id
      LEFT JOIN exercise_groups eg ON ueg.exercise_group_id = eg.id
      WHERE u.role = 'professor'
      ORDER BY u.first_name, eg.day, eg.time
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching professor groups",
      error: error.message,
    });
  }
});

router.post("/add-professor", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    if (!first_name || !last_name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!email.endsWith("@tuke.sk")) {
      return res.status(400).json({ message: "Email must end with @tuke.sk" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email],
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcryptjs.hash(tempPassword, 10);

    const newProfessor = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password_hash, role, is_active) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, first_name, last_name, email, role",
      [first_name, last_name, email, hashedPassword, "professor", true],
    );

    res.status(201).json({
      message: "Professor added successfully",
      professor: newProfessor.rows[0],
      tempPassword: tempPassword,
    });
  } catch (error) {
    console.error("Error in /add-professor:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
