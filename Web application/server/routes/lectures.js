const express = require("express");
const { requireAuth } = require("../middleware/auth");
const pool = require("../database");
const router = express.Router();

router.post("/:lectureNumber/track-open", requireAuth, async (req, res) => {
  try {
    const { lectureNumber } = req.params;
    const student_id = req.user.id;

    const result = await pool.query(
      `INSERT INTO lecture_tracking (student_id, lecture_number, opened_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       RETURNING id, opened_at`,
      [student_id, lectureNumber],
    );

    res.json({ tracking_id: result.rows[0].id });
  } catch (error) {
    console.error("Error tracking lecture open:", error);
    res.status(500).json({ error: "Failed to track lecture open" });
  }
});

router.post("/:lectureNumber/track-close", requireAuth, async (req, res) => {
  try {
    const { lectureNumber } = req.params;
    const student_id = req.user.id;

    // Najprv nájdi posledný otvorený záznam
    const lastOpenResult = await pool.query(
      `SELECT id FROM lecture_tracking
       WHERE student_id = $1 
       AND lecture_number = $2 
       AND closed_at IS NULL
       ORDER BY opened_at DESC
       LIMIT 1`,
      [student_id, lectureNumber],
    );

    if (lastOpenResult.rows.length === 0) {
      return res.status(404).json({ error: "No open lecture tracking found" });
    }

    const trackingId = lastOpenResult.rows[0].id;

    const result = await pool.query(
      `UPDATE lecture_tracking 
       SET closed_at = CURRENT_TIMESTAMP,
           time_spent_seconds = EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - opened_at))::INTEGER
       WHERE id = $1
       RETURNING time_spent_seconds`,
      [trackingId],
    );

    res.json({ time_spent: result.rows[0]?.time_spent_seconds || 0 });
  } catch (error) {
    console.error("Error tracking lecture close:", error);
    res.status(500).json({ error: "Failed to track lecture close" });
  }
});

router.get("/student/:studentId/stats", requireAuth, async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await pool.query(
      `SELECT 
        lecture_number,
        COUNT(*) as views,
        SUM(time_spent_seconds) as total_seconds,
        AVG(time_spent_seconds) as avg_seconds,
        MAX(opened_at) as last_opened
       FROM lecture_tracking
       WHERE student_id = $1 AND closed_at IS NOT NULL
       GROUP BY lecture_number
       ORDER BY lecture_number`,
      [studentId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching lecture stats:", error);
    res.status(500).json({ error: "Failed to fetch lecture stats" });
  }
});

router.get("/:lectureNumber/stats", requireAuth, async (req, res) => {
  try {
    const { lectureNumber } = req.params;

    const result = await pool.query(
      `SELECT 
        u.id,
        u.first_name,
        u.last_name,
        COUNT(lt.id) as views,
        SUM(lt.time_spent_seconds) as total_seconds,
        AVG(lt.time_spent_seconds) as avg_seconds,
        MAX(lt.opened_at) as last_opened
       FROM users u
       LEFT JOIN lecture_tracking lt ON u.id = lt.student_id 
         AND lt.lecture_number = $1 
         AND lt.closed_at IS NOT NULL
       WHERE u.role = 'student'
       GROUP BY u.id, u.first_name, u.last_name
       ORDER BY u.first_name, u.last_name`,
      [lectureNumber],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching lecture stats:", error);
    res.status(500).json({ error: "Failed to fetch lecture stats" });
  }
});

module.exports = router;
