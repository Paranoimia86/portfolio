const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["owner", "admin", "member"],
        default: "member",
      },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Workspace", workspaceSchema);
