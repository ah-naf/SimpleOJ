const router = require("express").Router();
const Problem = require("../models/Problem");
const verify = require("../middleware/verify");

// Problem Related Route

router.post("/add",verify, async (req, res) => {
  const { testcase, detail } = req.body;

  if (!testcase || !detail) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const data = { ...detail, testcase: [...testcase], createdBy: req.user._id };

  try {
    const newProblem = new Problem(data);
    const saved = await newProblem.save();

    return res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.put("/edit/:id",verify, async (req, res) => {
  const { testcase, detail } = req.body;
  const id = req.params.id

  if (!testcase || !detail || !id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const data = { ...detail, testcase: [...testcase], createdBy: req.user._id };

  try {
    const saved = await Problem.findByIdAndUpdate(id, data);

    return res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.delete("/delete/:id",verify, async (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await Problem.findByIdAndDelete(id);

    return res.status(201).json("Problem Delete Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Problem.find();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Problem.findById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
});


module.exports = router;
