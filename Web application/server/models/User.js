const pool = require("../database");
const bcryptjs = require("bcryptjs");

const updateRefreshToken = async (userId, refreshToken) => {
  await pool.query("UPDATE users SET refresh_token=$1 WHERE id=$2", [
    refreshToken,
    userId,
  ]);
};

const register = async (
  first_name,
  last_name,
  email,
  password,
  exercise_group_id,
) => {
  const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists.");
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await pool.query(
    "INSERT INTO users (first_name, last_name, email, password_hash, role, is_active) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, first_name, last_name, email, role",
    [first_name, last_name, email, hashPassword, "student", true],
  );

  if (exercise_group_id) {
    await pool.query(
      "INSERT INTO user_exercise_groups (user_id, exercise_group_id) VALUES ($1, $2)",
      [newUser.rows[0].id, exercise_group_id],
    );
  }

  return newUser.rows[0];
};

const login = async (email, password) => {
  const findUser = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  if (findUser.rows.length === 0) {
    throw new Error("User not found.");
  }

  const user = findUser.rows[0];

  const isValidPassword = await bcryptjs.compare(password, user.password_hash);
  if (!isValidPassword) {
    throw new Error("Invalid password.");
  }

  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
  };
};

module.exports = { updateRefreshToken, register, login };
