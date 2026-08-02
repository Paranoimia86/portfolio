const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const pool = require("../database");
const upload = require("../middleware/upload");

router.get("/profile", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.first_name, u.last_name, u.email, u.role, u.profile_photo, ueg.exercise_group_id
       FROM users u
       LEFT JOIN user_exercise_groups ueg ON u.id = ueg.user_id
       WHERE u.id = $1`,
      [req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    if (user.profile_photo && !user.profile_photo.startsWith("http")) {
      user.profile_photo = `http://localhost:5000${user.profile_photo}`;
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.get("/professor/groups", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        eg.id,
        eg.day,
        eg.time,
        COUNT(DISTINCT ueg.user_id) as student_count
       FROM exercise_groups eg
       LEFT JOIN user_exercise_groups ueg ON eg.id = ueg.exercise_group_id AND ueg.user_id != $1
       WHERE eg.id IN (
         SELECT exercise_group_id FROM user_exercise_groups WHERE user_id = $1
       )
       GROUP BY eg.id, eg.day, eg.time
       ORDER BY eg.day, eg.time`,
      [req.user.id],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching professor groups:", error);
    res.status(500).json({ error: "Failed to fetch professor groups" });
  }
});

router.delete(
  "/professor/groups/:groupId/leave",
  requireAuth,
  async (req, res) => {
    try {
      const { groupId } = req.params;

      const result = await pool.query(
        `DELETE FROM user_exercise_groups 
       WHERE user_id = $1 AND exercise_group_id = $2
       RETURNING user_id`,
        [req.user.id, groupId],
      );

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Group not found or already removed" });
      }

      res.json({ message: "Successfully removed from group" });
    } catch (error) {
      console.error("Error removing from group:", error);
      res.status(500).json({ error: "Failed to remove from group" });
    }
  },
);

router.get("/group/:groupId/students", requireAuth, async (req, res) => {
  try {
    const { groupId } = req.params;

    const result = await pool.query(
      `SELECT 
        u.id, 
        u.first_name, 
        u.last_name,
        u.student_id_number,
        eg.day,
        eg.time,
        COALESCE(SUM(ta.total_score), 0) as total_points,
        100 as max_points,
        CASE 
          WHEN 100 = 0 THEN 0
          ELSE ROUND((COALESCE(SUM(ta.total_score), 0)::NUMERIC / 100) * 100, 2)
        END as percentage,
        COUNT(DISTINCT ta.id) as attempts
       FROM users u
       JOIN user_exercise_groups ueg ON u.id = ueg.user_id
       JOIN exercise_groups eg ON ueg.exercise_group_id = eg.id
       LEFT JOIN test_attempts ta ON u.id = ta.student_id AND ta.status = 'graded'
       WHERE ueg.exercise_group_id = $1 AND u.role = 'student'
       GROUP BY u.id, u.first_name, u.last_name, u.student_id_number, eg.day, eg.time
       ORDER BY u.first_name, u.last_name`,
      [groupId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

router.get("/:userId/tests", requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT 
        t.id,
        t.title,
        COALESCE(ta.total_score, 0) as score,
        COALESCE((SELECT SUM(points) FROM test_questions WHERE test_id = t.id), 0) as max_score,
        ta.status,
        ta.submitted_at,
        ta.started_at
       FROM tests t
       LEFT JOIN (
         SELECT test_id, student_id, total_score, max_score, status, submitted_at, started_at,
                ROW_NUMBER() OVER (PARTITION BY test_id ORDER BY submitted_at DESC) as rn
         FROM test_attempts
         WHERE student_id = $1 AND status IN ('submitted', 'graded')
       ) ta ON t.id = ta.test_id AND ta.rn = 1
       WHERE t.is_active = TRUE
       ORDER BY t.title`,
      [userId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching student tests:", error);
    res.status(500).json({ error: "Failed to fetch student tests" });
  }
});

router.get("/:userId", requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT u.id, u.first_name, u.last_name, u.email, u.role, 
              u.student_id_number, u.address, u.date_of_birth, u.school, 
              u.profile_photo, ueg.exercise_group_id, eg.day, eg.time
       FROM users u
       LEFT JOIN user_exercise_groups ueg ON u.id = ueg.user_id
       LEFT JOIN exercise_groups eg ON ueg.exercise_group_id = eg.id
       WHERE u.id = $1`,
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    if (user.profile_photo && !user.profile_photo.startsWith("http")) {
      user.profile_photo = `http://localhost:5000${user.profile_photo}`;
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.get("/:userId/grades", requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT 
        COALESCE(homework_points, 0) as homework_points,
        COALESCE(exam_points, 0) as exam_points,
        COALESCE(homework_points, 0) + COALESCE(exam_points, 0) as total_points
       FROM student_grades
       WHERE student_id = $1`,
      [userId],
    );

    if (result.rows.length === 0) {
      return res.json({
        homework_points: 0,
        exam_points: 0,
        total_points: 0,
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching student grades:", error);
    res.status(500).json({ error: "Failed to fetch student grades" });
  }
});

router.put("/:userId/grades", requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { homework_points, exam_points } = req.body;

    if (
      homework_points !== undefined &&
      (homework_points < 0 || homework_points > 40)
    ) {
      return res
        .status(400)
        .json({ error: "Homework points must be between 0 and 40" });
    }
    if (exam_points !== undefined && (exam_points < 0 || exam_points > 60)) {
      return res
        .status(400)
        .json({ error: "Exam points must be between 0 and 60" });
    }

    const result = await pool.query(
      `INSERT INTO student_grades (student_id, homework_points, exam_points, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (student_id) DO UPDATE SET
         homework_points = COALESCE($2, student_grades.homework_points),
         exam_points = COALESCE($3, student_grades.exam_points),
         updated_at = NOW()
       RETURNING homework_points, exam_points, homework_points + exam_points as total_points`,
      [userId, homework_points ?? 0, exam_points ?? 0],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating student grades:", error);
    res.status(500).json({ error: "Failed to update student grades" });
  }
});

router.get("/:userId/attendance", requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT 
        week_number,
        COALESCE(attended, 'no') as attended,
        COALESCE(excused, FALSE) as excused
       FROM attendance
       WHERE student_id = $1
       ORDER BY week_number`,
      [userId],
    );

    const attendanceMap = new Map(result.rows.map((r) => [r.week_number, r]));
    const fullAttendance = [];

    for (let week = 1; week <= 13; week++) {
      if (attendanceMap.has(week)) {
        fullAttendance.push(attendanceMap.get(week));
      } else {
        fullAttendance.push({
          week_number: week,
          attended: "no",
          excused: false,
        });
      }
    }

    res.json(fullAttendance);
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    res.status(500).json({ error: "Failed to fetch student attendance" });
  }
});

router.put("/:userId/attendance/:week", requireAuth, async (req, res) => {
  try {
    const { userId, week } = req.params;
    const { attended, excused } = req.body;

    if (!["yes", "late", "no"].includes(attended)) {
      return res.status(400).json({ error: "Invalid attended value" });
    }

    if (typeof excused !== "boolean") {
      return res.status(400).json({ error: "Invalid excused value" });
    }

    const result = await pool.query(
      `INSERT INTO attendance (student_id, week_number, attended, excused, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (student_id, week_number) DO UPDATE SET
         attended = $3,
         excused = $4,
         updated_at = NOW()
       RETURNING week_number, attended, excused`,
      [userId, week, attended, excused],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating student attendance:", error);
    res.status(500).json({ error: "Failed to update student attendance" });
  }
});

router.put("/profile/update", requireAuth, async (req, res) => {
  try {
    const { student_id_number, address, date_of_birth, school } = req.body;

    if (student_id_number && !/^S\d{10}$/.test(student_id_number)) {
      return res.status(400).json({
        error:
          "Študentské číslo musí mať formát S + 10 číslic (napr. S0123456789)",
      });
    }

    if (date_of_birth && date_of_birth.trim()) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date_of_birth)) {
        return res
          .status(400)
          .json({ error: "Neplatný formát dátuma (YYYY-MM-DD)" });
      }
    }

    const dateValue =
      date_of_birth && date_of_birth.trim() ? date_of_birth : null;

    const result = await pool.query(
      `UPDATE users SET 
        student_id_number = COALESCE($2, student_id_number),
        address = COALESCE($3, address),
        date_of_birth = COALESCE($4::DATE, date_of_birth),
        school = COALESCE($5, school),
        updated_at = NOW()
       WHERE id = $1
       RETURNING id, first_name, last_name, email, student_id_number, address, date_of_birth, school, profile_photo`,
      [req.user.id, student_id_number, address, dateValue, school],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Používateľ sa nenašiel" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

router.post(
  "/profile/upload-photo",
  requireAuth,
  upload.single("photo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Žiadny súbor nebol nahraný" });
      }

      const photoPath = `/uploads/profile-photos/${req.file.filename}`;

      const result = await pool.query(
        `UPDATE users SET 
        profile_photo = $2,
        updated_at = NOW()
       WHERE id = $1
       RETURNING id, first_name, last_name, email, profile_photo`,
        [req.user.id, photoPath],
      );

      res.json({
        message: "Fotka bola úspešne nahraná",
        profile_photo: photoPath,
        user: result.rows[0],
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ error: "Failed to upload photo" });
    }
  },
);

router.post("/change-password", requireAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Validácia
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: "Všetky polia sú povinné" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Nové heslá sa nezhodujú" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Nové heslo musí mať aspoň 6 znakov" });
    }

    const userResult = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [req.user.id],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Používateľ sa nenašiel" });
    }

    const user = userResult.rows[0];

    const bcryptjs = require("bcryptjs");
    const isPasswordValid = await bcryptjs.compare(
      oldPassword,
      user.password_hash,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Staré heslo je nesprávne" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password_hash = $2, updated_at = NOW() WHERE id = $1",
      [req.user.id, hashedPassword],
    );

    res.json({ message: "Heslo bolo úspešne zmenené" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
});

module.exports = router;
