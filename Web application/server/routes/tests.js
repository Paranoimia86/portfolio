const express = require("express");
const { requireAuth } = require("../middleware/auth");
const pool = require("../database");
const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get("/list-test", requireAuth, async (req, res) => {
  try {
    const student_id = req.user.id;
    const result = await pool.query(
      `SELECT 
        t.id,
        t.title,
        ta.submitted_at as completion_date,
        ta.total_score,
        (SELECT SUM(points) FROM test_questions WHERE test_id = t.id) as max_score,
        CASE 
          WHEN ta.status = 'submitted' THEN 'completed'
          WHEN ta.status = 'graded' THEN CASE WHEN ta.passed THEN 'successful' ELSE 'unsuccessful' END
          ELSE 'not_attempted'
        END as status
      FROM tests t
      INNER JOIN student_test_access sta ON t.id = sta.test_id
      LEFT JOIN LATERAL (
        SELECT * FROM test_attempts 
        WHERE test_id = t.id AND student_id = $1 
        ORDER BY created_at DESC LIMIT 1
      ) ta ON true
      WHERE sta.student_id = $1
      ORDER BY t.created_at DESC`,
      [student_id],
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res
      .status(500)
      .json({ message: "Error fetching tests", error: error.message });
  }
});

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const testResult = await pool.query("SELECT * FROM tests WHERE id=$1", [
      id,
    ]);
    if (testResult.rows.length === 0) {
      return res.status(404).json({ message: "Test not found" });
    }
    const questionResult = await pool.query(
      "SELECT id, question_text, question_type, points FROM test_questions WHERE test_id=$1",
      [id],
    );

    const questions = await Promise.all(
      questionResult.rows.map(async (question) => {
        if (
          question.question_type === "single_choice" ||
          question.question_type === "multiple_choice"
        ) {
          const optionsResult = await pool.query(
            "SELECT id, option_text, is_correct, option_order FROM question_options WHERE question_id=$1 ORDER BY option_order",
            [question.id],
          );
          return { ...question, options: optionsResult.rows };
        }
        return question;
      }),
    );

    res.json({ ...testResult.rows[0], questions });
  } catch (error) {
    console.error("Error fetching test details:", error);
    res
      .status(500)
      .json({ message: "Error fetching test details", error: error.message });
  }
});

router.post("/:id/save", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, time_limit_minutes, questions_to_display, questions } =
      req.body;

    await pool.query(
      "UPDATE tests SET title = $1, time_limit_minutes = $2, questions_to_display = $3 WHERE id = $4",
      [title, time_limit_minutes, questions_to_display, id],
    );

    const existingQuestions = questions.filter((q) => q.id && q.id > 0);
    const newQuestions = questions.filter((q) => !q.id || q.id <= 0);

    // Aktualizuj existujúce otázky
    for (const q of existingQuestions) {
      if (q.question_text && q.question_type) {
        await pool.query(
          "UPDATE test_questions SET question_text = $1, question_type = $2, points = $3 WHERE id = $4 AND test_id = $5",
          [q.question_text, q.question_type, q.points || 1, q.id, id],
        );
      }
    }

    for (const q of newQuestions) {
      if (!q.question_text || !q.question_type) {
        continue;
      }

      const qResult = await pool.query(
        "INSERT INTO test_questions (test_id, question_text, question_type, points) VALUES ($1, $2, $3, $4) RETURNING id",
        [id, q.question_text, q.question_type, q.points || 1],
      );

      if (
        q.question_type === "single_choice" ||
        q.question_type === "multiple_choice"
      ) {
        if (q.options && Array.isArray(q.options)) {
          for (const opt of q.options) {
            if (opt.option_text) {
              await pool.query(
                "INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES ($1, $2, $3, $4)",
                [
                  qResult.rows[0].id,
                  opt.option_text,
                  opt.is_correct || false,
                  opt.option_order || 0,
                ],
              );
            }
          }
        }
      }
    }

    res.json({ message: "Test saved successfully" });
  } catch (error) {
    console.error("Error saving test:", error);
    res.status(500).json({ error: "Failed to save test" });
  }
});

router.post("/:id/start", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const student_id = req.user.id;

    const existingAttempt = await pool.query(
      "SELECT id, status FROM test_attempts WHERE test_id = $1 AND student_id = $2 AND status IN ('submitted', 'graded') LIMIT 1",
      [id, student_id],
    );

    if (existingAttempt.rows.length > 0) {
      return res.status(403).json({
        error: "Test already completed - only one attempt allowed",
      });
    }

    const inProgressAttempt = await pool.query(
      "SELECT id FROM test_attempts WHERE test_id = $1 AND student_id = $2 AND status = 'in_progress' LIMIT 1",
      [id, student_id],
    );

    if (inProgressAttempt.rows.length > 0) {
      return res.json({
        attempt_id: inProgressAttempt.rows[0].id,
        message: "Existing attempt",
      });
    }

    const result = await pool.query(
      "INSERT INTO test_attempts (test_id, student_id, status) VALUES ($1, $2, 'in_progress') RETURNING id",
      [id, student_id],
    );

    res.json({ attempt_id: result.rows[0].id, message: "Test started" });
  } catch (error) {
    console.error("Error starting test:", error);
    res.status(500).json({ error: "Failed to start test" });
  }
});

router.get("/professor/list", requireAuth, async (req, res) => {
  try {
    const created_by = req.user.id;

    const result = await pool.query(
      `SELECT 
        t.id,
        t.title,
        t.created_at,
        COUNT(DISTINCT ta.student_id) as total_attempts,
        AVG(ta.total_score) as avg_score,
        (SELECT SUM(points) FROM test_questions WHERE test_id = t.id) as max_score,
        ROUND(
          (COUNT(CASE WHEN ta.passed = true THEN 1 END)::float / 
           NULLIF(COUNT(DISTINCT ta.student_id), 0) * 100)::numeric, 2
        ) as success_rate,
        COALESCE(SUM(CASE WHEN ta.passed = true THEN 1 ELSE 0 END), 0) as correct_attempts,
        COUNT(DISTINCT ta.student_id) as total_student_attempts,
        COALESCE(
          ROUND(
            (SUM(EXTRACT(EPOCH FROM (ta.submitted_at - ta.started_at))) / 
             NULLIF(COUNT(DISTINCT aq.id), 0))::numeric, 2
          ), 0
        ) as avg_time_per_question,
        COALESCE(
          ROUND(
            (SUM(EXTRACT(EPOCH FROM (ta.submitted_at - ta.started_at))) / 
             NULLIF(COUNT(DISTINCT ta.id), 0))::numeric, 2
          ), 0
        ) as avg_time_per_test
      FROM tests t
      LEFT JOIN test_attempts ta ON t.id = ta.test_id AND ta.status IN ('submitted', 'graded')
      LEFT JOIN attempt_questions aq ON ta.id = aq.attempt_id
      WHERE t.created_by = $1
        AND (ta.id IS NULL OR (ta.student_id, ta.test_id, ta.submitted_at) IN (
          SELECT ta2.student_id, ta2.test_id, MAX(ta2.submitted_at)
          FROM test_attempts ta2
          WHERE ta2.status IN ('submitted', 'graded')
          AND ta2.test_id IN (SELECT id FROM tests WHERE created_by = $1)
          GROUP BY ta2.student_id, ta2.test_id
        ))
      GROUP BY t.id, t.title, t.created_at
      ORDER BY t.created_at DESC`,
      [created_by],
    );

    const statsResult = await pool.query(
      `SELECT 
        COALESCE(ROUND(AVG(test_success_rate)::numeric, 2), 0) as average_success_rate,
        COALESCE(
          ROUND(
            (SUM(EXTRACT(EPOCH FROM (ta.submitted_at - ta.started_at))) / 
             NULLIF(COUNT(DISTINCT aq.id), 0))::numeric, 2
          ), 0
        ) as average_time_per_question,
        COALESCE(
          ROUND(
            (SUM(EXTRACT(EPOCH FROM (ta.submitted_at - ta.started_at))) / 
             NULLIF(COUNT(DISTINCT ta.id), 0))::numeric, 2
          ), 0
        ) as average_time_per_test
      FROM tests t
      LEFT JOIN test_attempts ta ON t.id = ta.test_id AND ta.status IN ('submitted', 'graded')
      LEFT JOIN attempt_questions aq ON ta.id = aq.attempt_id
      LEFT JOIN LATERAL (
        SELECT 
          (COUNT(CASE WHEN sa.is_correct = true THEN 1 END)::float / 
           NULLIF(COUNT(*), 0) * 100) as test_success_rate
        FROM attempt_questions aq2
        INNER JOIN student_answers sa ON aq2.id = sa.attempt_question_id
        WHERE aq2.attempt_id = ta.id
      ) sr ON true
      WHERE t.created_by = $1 
        AND (ta.id IS NULL OR (ta.student_id, ta.test_id, ta.submitted_at) IN (
          SELECT ta2.student_id, ta2.test_id, MAX(ta2.submitted_at)
          FROM test_attempts ta2
          WHERE ta2.status IN ('submitted', 'graded')
          AND ta2.test_id IN (SELECT id FROM tests WHERE created_by = $1)
          GROUP BY ta2.student_id, ta2.test_id
        ))
      GROUP BY t.id`,
      [created_by],
    );

    res.json({
      tests: result.rows,
      stats: statsResult.rows[0],
    });
  } catch (error) {
    console.error("Error fetching professor tests:", error);
    res.status(500).json({ message: "Error fetching tests" });
  }
});

router.post("/professor/create", requireAuth, async (req, res) => {
  try {
    if (req.user.role !== "professor") {
      return res
        .status(403)
        .json({ message: "Only professors can create tests" });
    }

    const { title } = req.body;
    const created_by = req.user.id;

    const result = await pool.query(
      `INSERT INTO tests (title, time_limit_minutes, questions_to_display, created_by) 
       VALUES ($1, 60, 10, $2) 
       RETURNING id, title, time_limit_minutes, questions_to_display, created_at`,
      [title, created_by],
    );

    const testId = result.rows[0].id;

    await pool.query(
      `INSERT INTO student_test_access (student_id, test_id)
       SELECT id, $1 FROM users WHERE role = 'student'
       ON CONFLICT (student_id, test_id) DO NOTHING`,
      [testId],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ message: "Error creating test" });
  }
});

router.delete("/:testId", requireAuth, async (req, res) => {
  try {
    if (req.user.role !== "professor") {
      return res
        .status(403)
        .json({ message: "Only professors can delete tests" });
    }

    const { testId } = req.params;
    const created_by = req.user.id;

    const testCheck = await pool.query(
      "SELECT created_by FROM tests WHERE id = $1",
      [testId],
    );

    if (
      testCheck.rows.length === 0 ||
      testCheck.rows[0].created_by !== created_by
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await pool.query(
      `
      DELETE FROM student_answer_options
      WHERE student_answer_id IN (
        SELECT sa.id FROM student_answers sa
        INNER JOIN attempt_questions aq ON sa.attempt_question_id = aq.id
        WHERE aq.attempt_id IN (
          SELECT id FROM test_attempts WHERE test_id = $1
        )
      )
    `,
      [testId],
    );

    await pool.query(
      `
      DELETE FROM student_answers
      WHERE attempt_question_id IN (
        SELECT aq.id FROM attempt_questions aq
        WHERE aq.attempt_id IN (
          SELECT id FROM test_attempts WHERE test_id = $1
        )
      )
    `,
      [testId],
    );

    await pool.query(
      `
      DELETE FROM attempt_questions
      WHERE attempt_id IN (
        SELECT id FROM test_attempts WHERE test_id = $1
      )
    `,
      [testId],
    );

    await pool.query("DELETE FROM test_attempts WHERE test_id = $1", [testId]);

    await pool.query(
      `
      DELETE FROM question_options
      WHERE question_id IN (
        SELECT id FROM test_questions WHERE test_id = $1
      )
    `,
      [testId],
    );

    await pool.query(
      `
      DELETE FROM question_text_answers
      WHERE question_id IN (
        SELECT id FROM test_questions WHERE test_id = $1
      )
    `,
      [testId],
    );

    await pool.query("DELETE FROM test_questions WHERE test_id = $1", [testId]);

    await pool.query("DELETE FROM student_test_access WHERE test_id = $1", [
      testId,
    ]);

    await pool.query("DELETE FROM tests WHERE id = $1", [testId]);
    res.json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ error: "Failed to delete test" });
  }
});

router.post("/:testId/questions/add", requireAuth, async (req, res) => {
  try {
    if (req.user.role !== "professor") {
      return res
        .status(403)
        .json({ message: "Only professors can add questions" });
    }

    const { testId } = req.params;
    const { question_text, question_type, points, options, correct_answers } =
      req.body;

    const testCheck = await pool.query(
      "SELECT created_by FROM tests WHERE id = $1",
      [testId],
    );

    if (
      testCheck.rows.length === 0 ||
      testCheck.rows[0].created_by !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized - not your test" });
    }

    const qResult = await pool.query(
      `INSERT INTO test_questions (test_id, question_text, question_type, points) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id`,
      [testId, question_text, question_type, points],
    );

    const questionId = qResult.rows[0].id;

    if (
      question_type === "single_choice" ||
      question_type === "multiple_choice"
    ) {
      for (let i = 0; i < options.length; i++) {
        await pool.query(
          `INSERT INTO question_options (question_id, option_text, is_correct, option_order) 
   VALUES ($1, $2, $3, $4)`,
          [questionId, options[i].option_text, options[i].is_correct, i + 1],
        );
      }
    }

    if (question_type === "short_text" || question_type === "long_text") {
      for (const answer of correct_answers || []) {
        await pool.query(
          `INSERT INTO question_text_answers (question_id, accepted_answer, case_sensitive) 
     VALUES ($1, $2, $3)`,
          [questionId, answer.text, answer.case_sensitive || false],
        );
      }
    }

    res.json({ id: questionId, message: "Question added successfully" });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Failed to add question" });
  }
});

router.delete(
  "/:testId/questions/:questionId",
  requireAuth,
  async (req, res) => {
    try {
      if (req.user.role !== "professor") {
        return res
          .status(403)
          .json({ message: "Only professors can delete questions" });
      }

      const { testId, questionId } = req.params;
      const created_by = req.user.id;

      const testCheck = await pool.query(
        "SELECT created_by FROM tests WHERE id = $1",
        [testId],
      );

      if (
        testCheck.rows.length === 0 ||
        testCheck.rows[0].created_by !== created_by
      ) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await pool.query("DELETE FROM test_questions WHERE id = $1", [
        questionId,
      ]);

      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ error: "Failed to delete question" });
    }
  },
);

router.post("/:testId/submit-answers", requireAuth, async (req, res) => {
  try {
    const { testId } = req.params;
    const { attempt_id, answers } = req.body;
    const student_id = req.user.id;

    const attemptCheck = await pool.query(
      "SELECT student_id FROM test_attempts WHERE id = $1",
      [attempt_id],
    );

    if (
      attemptCheck.rows.length === 0 ||
      attemptCheck.rows[0].student_id !== student_id
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      const { question_id, answer_text, selected_options } = answer;

      const attemptQResult = await pool.query(
        "INSERT INTO attempt_questions (attempt_id, question_id, display_order) VALUES ($1, $2, $3) ON CONFLICT (attempt_id, question_id) DO UPDATE SET display_order = $3 RETURNING id",
        [attempt_id, question_id, i + 1],
      );

      const attempt_question_id = attemptQResult.rows[0].id;

      if (selected_options && selected_options.length > 0) {
        const studentAnswerResult = await pool.query(
          "INSERT INTO student_answers (attempt_question_id) VALUES ($1) RETURNING id",
          [attempt_question_id],
        );
        const student_answer_id = studentAnswerResult.rows[0].id;

        for (const optionId of selected_options) {
          await pool.query(
            "INSERT INTO student_answer_options (student_answer_id, option_id) VALUES ($1, $2)",
            [student_answer_id, optionId],
          );
        }
      }

      if (answer_text) {
        await pool.query(
          "INSERT INTO student_answers (attempt_question_id, answer_text) VALUES ($1, $2)",
          [attempt_question_id, answer_text],
        );
      }
    }

    const multipleChoiceScore = await pool.query(
      `SELECT SUM(
        CASE 
          WHEN (
            -- Počet vybraných správnych odpovedí
            SELECT COUNT(DISTINCT sao.option_id)
            FROM student_answers sa2
            JOIN student_answer_options sao ON sa2.id = sao.student_answer_id
            WHERE sa2.attempt_question_id = aq.id
            AND sao.option_id IN (
              SELECT id FROM question_options WHERE question_id = tq.id AND is_correct = true
            )
          ) = 0 THEN 0
          ELSE
            -- Vypočítaj percento správných odpovedí
            (tq.points * 
              CAST(
                (SELECT COUNT(DISTINCT sao.option_id)
                 FROM student_answers sa2
                 JOIN student_answer_options sao ON sa2.id = sao.student_answer_id
                 WHERE sa2.attempt_question_id = aq.id
                 AND sao.option_id IN (
                   SELECT id FROM question_options WHERE question_id = tq.id AND is_correct = true
                 ))
                AS DECIMAL
              ) / 
              CAST(
                (SELECT COUNT(id) FROM question_options WHERE question_id = tq.id AND is_correct = true)
                AS DECIMAL
              )
            )::NUMERIC(6,2)
        END
      ) as score
       FROM test_questions tq
       JOIN attempt_questions aq ON aq.question_id = tq.id
       WHERE tq.test_id = $1
       AND tq.question_type IN ('single_choice', 'multiple_choice')
       AND aq.attempt_id = $2
       AND EXISTS (
         SELECT 1 FROM student_answers sa
         WHERE sa.attempt_question_id = aq.id
       )`,
      [testId, attempt_id],
    );

    const textScore = await pool.query(
      `SELECT SUM(tq.points) as score
       FROM test_questions tq
       WHERE tq.test_id = $1
       AND tq.question_type IN ('short_text', 'long_text')
       AND EXISTS (
         SELECT 1 FROM attempt_questions aq
          JOIN student_answers sa ON aq.id = sa.attempt_question_id
          WHERE aq.attempt_id = $2 
          AND aq.question_id = tq.id
          AND sa.answer_text IS NOT NULL
          AND EXISTS (
            SELECT 1 FROM question_text_answers qta
            WHERE qta.question_id = tq.id
            AND (
              CASE 
                WHEN qta.case_sensitive = true THEN sa.answer_text = qta.accepted_answer
                ELSE LOWER(sa.answer_text) = LOWER(qta.accepted_answer)
              END
            )
          )
       )`,
      [testId, attempt_id],
    );

    const multiChoiceScore = parseFloat(multipleChoiceScore.rows[0].score) || 0;
    const textQuestionScore = parseFloat(textScore.rows[0].score) || 0;
    const total_score = multiChoiceScore + textQuestionScore;

    const maxScore = await pool.query(
      "SELECT SUM(points) as max FROM test_questions WHERE test_id = $1",
      [testId],
    );

    const maxScoreValue = parseFloat(maxScore.rows[0].max) || 0;
    const passed = total_score >= maxScoreValue * 0.51;

    await pool.query(
      `UPDATE student_answers sa
       SET is_correct = true
       WHERE sa.attempt_question_id IN (
         SELECT aq.id FROM attempt_questions aq
         WHERE aq.attempt_id = $1
       )
       AND NOT EXISTS (
         -- Kontrola: či existuje vybraná nesprávna možnosť
         SELECT 1 FROM student_answer_options sao
         JOIN question_options qo ON sao.option_id = qo.id
         WHERE sao.student_answer_id = sa.id
         AND qo.is_correct = false
       )
       AND NOT EXISTS (
         -- Kontrola: či CHÝBA niektorá správna možnosť
         SELECT 1 FROM question_options qo
         WHERE qo.question_id IN (
           SELECT tq.id FROM test_questions tq
           WHERE tq.id = (
             SELECT aq.question_id FROM attempt_questions aq
             WHERE aq.id = sa.attempt_question_id
           )
         )
         AND qo.is_correct = true
         AND NOT EXISTS (
           SELECT 1 FROM student_answer_options sao2
           WHERE sao2.student_answer_id = sa.id
           AND sao2.option_id = qo.id
         )
       )`,
      [attempt_id],
    );

    await pool.query(
      `UPDATE student_answers sa
       SET is_correct = false
       WHERE is_correct IS NULL
       AND sa.attempt_question_id IN (
         SELECT id FROM attempt_questions WHERE attempt_id = $1
       )`,
      [attempt_id],
    );

    await pool.query(
      "UPDATE test_attempts SET status = 'graded', total_score = $1, passed = $2, submitted_at = NOW() WHERE id = $3",
      [total_score, passed, attempt_id],
    );

    res.json({
      message: "Answers submitted and graded successfully",
      total_score,
      passed,
    });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ error: "Failed to submit answers" });
  }
});

router.get("/:testId/attempt/:attemptId", requireAuth, async (req, res) => {
  try {
    const { testId, attemptId } = req.params;
    const student_id = req.user.id;

    const attemptCheck = await pool.query(
      "SELECT * FROM test_attempts WHERE id = $1 AND test_id = $2",
      [attemptId, testId],
    );

    if (
      attemptCheck.rows.length === 0 ||
      attemptCheck.rows[0].student_id !== student_id
    ) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    const attempt = attemptCheck.rows[0];

    const questionsResult = await pool.query(
      "SELECT id, question_text, question_type, points FROM test_questions WHERE test_id = $1",
      [testId],
    );

    const questions = await Promise.all(
      questionsResult.rows.map(async (question) => {
        const answersResult = await pool.query(
          "SELECT * FROM student_answers WHERE attempt_question_id IN (SELECT id FROM attempt_questions WHERE attempt_id = $1 AND question_id = $2)",
          [attemptId, question.id],
        );

        return { ...question, answers: answersResult.rows };
      }),
    );

    res.json({ attempt, questions });
  } catch (error) {
    console.error("Error fetching attempt:", error);
    res.status(500).json({ error: "Failed to fetch attempt" });
  }
});

module.exports = router;
