const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  surname: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  refreshToken: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
