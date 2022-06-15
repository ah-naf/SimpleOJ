const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const mongoose = require("mongoose");
dotenv.config();
const MongoStore = require("connect-mongo");
const { generateFile } = require("./generateFile");
const cors = require("cors");
const app = express();
const Problem = require("./models/Problem");
const Job = require("./models/Job");
const { addJobToQueue, addSubmitToQueue } = require("./jobQueue");
const session = require("express-session");

require("./config/passport")(passport);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "some random secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  process.env.MONGO_URI,
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

app.post("/submit",verify, async (req, res) => {
  let { language = "cpp", code, userInput, problemId, userId } = req.body;

  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  let job;
  try {
    // need to generate a c++ file with content from the request
    const filepath = await generateFile(language, code);

    job = await Job({ language, filepath, userInput }).save();
    const jobId = job["_id"];
    addSubmitToQueue(jobId, problemId, userId);

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

    res.status(200).json({ job, success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
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

// Auth related
app.get("/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);

app.get("/success", (req, res) => {
  res.status(200).json(req.user);
});

app.get("/logout", (req, res) => {
  req.logout(err => {
    return res.status(200).json({})
  })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is listening"));

function verify(req, res, next) {
  if(req.isAuthenticated()) return next()
  else return res.status(403).json("You are not authenticated")
}