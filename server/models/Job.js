const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ["cpp", "py", "c"],
  },
  filepath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  userInput: {
    type: String,
  },
  startedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  status: {
    type: String,
    default: "in queue",
    enum: ["in queue", "success", "error"],
  },
  output: {
    type: String,
  },
  verdict: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
  },
});

module.exports = mongoose.model("Job", JobSchema);
