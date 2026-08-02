const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../database");
const router = express.Router();
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_TOKEN,
    {
      expiresIn: "15m",
    },
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_TOKEN,
    {
      expiresIn: "7d",
    },
  );
  return { accessToken, refreshToken };
};

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, exercise_group_id } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.register(first_name, last_name, email, password, exercise_group_id);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await User.login(email, password);

    const { accessToken, refreshToken } = generateTokens(user);

    await User.updateRefreshToken(user.id, refreshToken);

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Error logging in", error: error.message });
  }
});

router.post("/logout", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    await User.updateRefreshToken(userId, null);
    res.json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    const user = await pool.query("SELECT * FROM users WHERE id=$1", [
      decoded.id,
    ]);

    const userData = user.rows[0];

    if (user.rows.length === 0 || userData.refresh_token !== refreshToken) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token or user not found" });
    }

    const newAccessToken = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        role: userData.role,
      },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" },
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Error refreshing token", error: error.message });
  }
});

module.exports = router;
