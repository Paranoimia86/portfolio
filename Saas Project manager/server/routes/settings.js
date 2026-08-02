const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const requireAuth = require("../middleware/auth");

router.put("/update-profile", requireAuth, async (req, res) => {
  try {
    const { name, surname, country, phone, bio, email } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    if (email && email.toLowerCase() !== user.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email.toLowerCase();
    }

    user.name = name;
    user.surname = surname;
    user.country = country;
    user.phone = phone;
    user.bio = bio;
    await user.save();
    res.json({
      massage: "Profile updated",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        bio: user.bio,
        country: user.country,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// router.post("/change-email", requireAuth, async (req, res) => {
//   try {
//     const { email } = req.body;
//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser && existingUser._id.toString() !== req.userId) {
//       return res.status(400).json({ message: "Email already exists." });
//     }
//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(500).json({ message: "User not found" });
//     }

//     user.email = email.toLowerCase();
//     await user.save();
//     res.json({
//       message: "Email updated",
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

router.put("/update-password", requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password changed" });
  } catch (error) {
    res.status(500).json({ message: "Server error: ", error: error.message });
  }
});

module.exports = router;
