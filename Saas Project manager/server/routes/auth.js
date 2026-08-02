const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Workspace = require("../models/Workspace");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireAuth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email.toLowerCase(),
      password: hashPassword,
    });

    await newUser.save();

    const defaultWorkspace = new Workspace({
      name: `${email.split("@")[0]}'s Workspace`,
      description: "Default workspace",
      owner: newUser._id,
      members: [
        {
          userId: newUser._id,
          role: "owner",
        },
      ],
    });

    await defaultWorkspace.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { email: newUser.email },
      workspaceId: defaultWorkspace._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      },
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: { email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        country: user.country,
        bio: user.bio,
        phone: user.phone,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users/search", requireAuth, async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(404).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "-password",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
