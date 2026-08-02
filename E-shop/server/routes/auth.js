const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

const accessSecret = process.env.JWT_ACCESS_TOKEN;
const refreshSecret = process.env.JWT_REFRESH_TOKEN;

const createAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    accessSecret,
    {
      expiresIn: "15m",
    },
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    refreshSecret,
    {
      expiresIn: "7d",
    },
  );
};

router.post("/register", async (req, res) => {
  const { name, surname, city, street, postal_code, phone, email, password } =
    req.body;

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  if (existingUser.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, surname, city, street, postal_code, phone, email, password_hash, role)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, name, surname, city, street, postal_code, phone, email, role,
               bank_account, card_holder, card_last4, card_expiry`,
    [
      name,
      surname,
      city || null,
      street || null,
      postal_code || null,
      phone || null,
      email,
      passwordHash,
      "customer",
    ],
  );

  const user = result.rows[0];

  res.status(201).json({
    user,
    accessToken: createAccessToken(user),
    refreshToken: createRefreshToken(user),
    message: "User registered successfully",
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `SELECT id, name, surname, city, street, postal_code, phone, email, role, password_hash,
              bank_account, card_holder, card_last4, card_expiry
       FROM users WHERE email = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const userData = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      city: user.city,
      street: user.street,
      postal_code: user.postal_code,
      phone: user.phone,
      email: user.email,
      role: user.role,
      bank_account: user.bank_account,
      card_holder: user.card_holder,
      card_last4: user.card_last4,
      card_expiry: user.card_expiry,
    };

    res.json({
      user: userData,
      accessToken: createAccessToken(userData),
      refreshToken: createRefreshToken(userData),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
});

router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    const accessToken = createAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });

    return res.json({ accessToken });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
});

router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { name, surname, city, street, postal_code, phone } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `UPDATE users 
       SET name = $1, surname = $2, city = $3, street = $4, postal_code = $5, phone = $6
       WHERE id = $7
       RETURNING id, name, surname, city, street, postal_code, phone, email, role,
                 bank_account, card_holder, card_last4, card_expiry`,
      [
        name,
        surname,
        city || null,
        street || null,
        postal_code || null,
        phone || null,
        userId,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: result.rows[0],
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});

const ibanLikePattern = /^[A-Za-z0-9\s]{0,34}$/;
const cardExpiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

router.put("/update-payment", authMiddleware, async (req, res) => {
  try {
    const { bank_account, card_holder, card_number, card_expiry } = req.body;
    const userId = req.user.id;

    const bankAccount = (bank_account || "").trim();
    if (bankAccount && !ibanLikePattern.test(bankAccount)) {
      return res.status(400).json({ message: "Neplatné číslo účtu" });
    }

    const cardHolder = (card_holder || "").trim().slice(0, 150) || null;

    if (card_expiry && !cardExpiryPattern.test(card_expiry.trim())) {
      return res
        .status(400)
        .json({ message: "Neplatný formát platnosti karty (MM/RR)" });
    }

    // Security: never persist the full card number or CVV, only the last 4
    // digits so the UI can show "•••• 1234" without storing sensitive PAN data.
    let cardLast4;
    let cardLast4Provided = false;
    if (card_number !== undefined) {
      cardLast4Provided = true;
      const digitsOnly = String(card_number).replace(/\D/g, "");
      if (digitsOnly) {
        if (digitsOnly.length < 12 || digitsOnly.length > 19) {
          return res.status(400).json({ message: "Neplatné číslo karty" });
        }
        cardLast4 = digitsOnly.slice(-4);
      } else {
        cardLast4 = null;
      }
    }

    const current = await pool.query(
      "SELECT card_last4 FROM users WHERE id = $1",
      [userId],
    );
    if (current.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const finalCardLast4 = cardLast4Provided
      ? cardLast4
      : current.rows[0].card_last4;

    const result = await pool.query(
      `UPDATE users
       SET bank_account = $1, card_holder = $2, card_last4 = $3, card_expiry = $4
       WHERE id = $5
       RETURNING id, name, surname, city, street, postal_code, phone, email, role,
                 bank_account, card_holder, card_last4, card_expiry`,
      [
        bankAccount || null,
        cardHolder,
        finalCardLast4 || null,
        (card_expiry || "").trim() || null,
        userId,
      ],
    );

    res.json({
      user: result.rows[0],
      message: "Payment details updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});

router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const userResult = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [userId],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(
      currentPassword,
      userResult.rows[0].password_hash,
    );

    if (!valid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      passwordHash,
      userId,
    ]);

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Password change failed", error: error.message });
  }
});

module.exports = router;
