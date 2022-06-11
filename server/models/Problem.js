const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: { type: String },
    input: { type: String, required: true },
    output: { type: String, required: true },
    constraints: { type: String },
    statement: { type: String, required: true },
    testcase: [
      {
        input: { type: String },
        output: { type: String },
        sample: { type: Boolean },
        explanation: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Problem = mongoose.model("problem", ProblemSchema);

module.exports = Problem;
