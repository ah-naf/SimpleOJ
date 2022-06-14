const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const { generateFile } = require("./generateFile");
const cors = require("cors");
const app = express();
const Problem = require("./models/Problem");
const Job = require("./models/Job");
const { addJobToQueue, addSubmitToQueue } = require("./jobQueue");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://ahnaf:8880@cluster0.ma2wh.mongodb.net/simpleoj?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DB Connected")
);

// Code Related Route

app.post("/run", async (req, res) => {
  let { language = "cpp", code, userInput } = req.body;

  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  let job;
  try {
    // need to generate a c++ file with content from the request
    const filepath = await generateFile(language, code);

    job = await Job({ language, filepath, userInput }).save();
    const jobId = job["_id"];
    addJobToQueue(jobId);

    res.status(201).json({ sueccess: true, jobId });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post("/submit", async (req, res) => {
  let { language = "cpp", code, userInput, problemId } = req.body;

  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  let job;
  try {
    // need to generate a c++ file with content from the request
    const filepath = await generateFile(language, code);

    job = await Job({ language, filepath, userInput }).save();
    const jobId = job["_id"];
    addSubmitToQueue(jobId, problemId);

    res.status(201).json({ sueccess: true, jobId });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/status/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json("Missing required fields");
  }

  try {
    const job = await Job.findById(req.params.id);

    res.status(200).json({job, success: true});
  } catch (error) {
    res.status(500).json({error, success: false});
  }
});

// Problem Related Route

app.post("/add", async (req, res) => {
  const { testcase, detail } = req.body;

  if (!testcase || !detail) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const data = { ...detail, testcase: [...testcase] };

  try {
    const newProblem = new Problem(data);
    const saved = await newProblem.save();

    return res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/problems", async (req, res) => {
  try {
    const data = await Problem.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.get("/problems/:id", async (req, res) => {
  try {
    const data = await Problem.findById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is listening"));
