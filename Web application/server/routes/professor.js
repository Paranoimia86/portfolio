const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/get-lecture-content", requireAuth, async (req, res) => {
  try {
    const { week, language } = req.query;

    if (!week || !language) {
      return res.status(400).json({ error: "Missing week or language" });
    }

    const filePath = path.join(
      __dirname,
      "../content/lectures",
      language,
      `week${week}.md`,
    );

    const content = await fs.readFile(filePath, "utf8");
    res.json({ content });
  } catch (error) {
    console.error("Error reading lecture:", error);
    res.status(404).json({ error: "Lecture not found" });
  }
});

router.post("/save-lecture", requireAuth, async (req, res) => {
  try {
    const { week, language, content } = req.body;

    if (!week || !language || !content) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const dirPath = path.join(__dirname, "../content/lectures", language);

    await fs.mkdir(dirPath, { recursive: true });

    const filePath = path.join(dirPath, `week${week}.md`);
    await fs.writeFile(filePath, content, "utf8");

    res.json({ message: "Lecture saved successfully" });
  } catch (error) {
    console.error("Error saving lecture:", error);
    res.status(500).json({ error: "Failed to save lecture" });
  }
});

router.get("/get-exercise-content", requireAuth, async (req, res) => {
  try {
    const { week, language } = req.query;

    if (!week || !language) {
      return res.status(400).json({ error: "Missing week or language" });
    }

    const filePath = path.join(
      __dirname,
      "../content/excercises",
      language,
      `week${week}.md`,
    );

    const content = await fs.readFile(filePath, "utf8");
    res.json({ content });
  } catch (error) {
    console.error("Error reading exercise:", error);
    res.status(404).json({ error: "Exercise not found" });
  }
});

router.post("/save-exercise", requireAuth, async (req, res) => {
  try {
    const { week, language, content } = req.body;

    if (!week || !language || !content) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const dirPath = path.join(__dirname, "../content/excercises", language);

    await fs.mkdir(dirPath, { recursive: true });

    const filePath = path.join(dirPath, `week${week}.md`);
    await fs.writeFile(filePath, content, "utf8");

    res.json({ message: "Exercise saved successfully" });
  } catch (error) {
    console.error("Error saving exercise:", error);
    res.status(500).json({ error: "Failed to save exercise" });
  }
});

router.get("/get-assigment-content", requireAuth, async (req, res) => {
  try {
    const { week, language } = req.query;

    if (!week || !language) {
      return res.status(400).json({ error: "Missing week or language" });
    }
    const filePath = path.join(
      __dirname,
      "../content/assigments",
      language,
      `assigment${week}.md`,
    );
    const content = await fs.readFile(filePath, "utf8");
    res.json({ content });
  } catch (error) {
    console.error("Error reading assigment:", error);
    res.status(404).json({ error: "Assigment not found" });
  }
});

router.post("/save-assigment", requireAuth, async (req, res) => {
  try {
    const { week, language, content } = req.body;

    if (!week || !language || !content) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const dirPath = path.join(__dirname, "../content/assigments", language);

    await fs.mkdir(dirPath, { recursive: true });
    const filePath = path.join(dirPath, `assigment${week}.md`);
    await fs.writeFile(filePath, content, "utf8");

    res.json({ message: "Assigment saved successfully" });
  } catch (error) {
    console.error("Error saving assigment:", error);
    res.status(500).json({ error: "Failed to save assigment" });
  }
});

router.get("/get-information-content", requireAuth, async (req, res) => {
  try {
    const { language } = req.query;

    if (!language) {
      return res.status(400).json({ error: "Missing language" });
    }
    const filePath = path.join(
      __dirname,
      "../content/informations",
      language,
      `information.md`,
    );
    const content = await fs.readFile(filePath, "utf8");
    res.json({ content });
  } catch (error) {
    console.error("Error reading information:", error);
    res.status(404).json({ error: "Information not found" });
  }
});

router.post("/save-information", requireAuth, async (req, res) => {
  try {
    const { language, content } = req.body;

    if (!language || !content) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const dirPath = path.join(__dirname, "../content/informations");

    await fs.mkdir(dirPath, { recursive: true });
    const filePath = path.join(dirPath, `${language}.md`);
    await fs.writeFile(filePath, content, "utf8");

    res.json({ message: "Information saved successfully" });
  } catch (error) {
    console.error("Error saving information:", error);
    res.status(500).json({ error: "Failed to save information" });
  }
});
module.exports = router;
