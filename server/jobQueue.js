const Queue = require("bull");
const Job = require("./models/Job");
const { executeCpp } = require("./ExecuteCode/executeCpp");
const Problem = require("./models/Problem");
const { executePy } = require("./ExecuteCode/executePy");
const { executeJava } = require("./ExecuteCode/executeJava");

const CONCURRENCY_LEVEL = 4;

const jobQueue = new Queue("job-queue", {
  redis: { host: "redis", port: 6379 },
});

async function executeJob(job) {
  try {
    const userInput = job.userInput;
    job = job._doc;
    if (job.language === "cpp" || job.language === "c") {
      return executeCpp(job.filepath, userInput || "");
    } else if (job.language === "java") {
      return executeJava(job.filepath, userInput || "");
    } else {
      return executePy(job.filepath, userInput || "");
    }
  } catch (error) {
    console.log(error);
  }
}

async function checkTestcases(job, testcases) {
  for (const testcase of testcases) {
    const output = await executeJob({ ...job, userInput: testcase.input });
    if (output.trim() !== testcase.output.trim()) return false;
  }
  return true;
}

function updateProblemSolvers(problem, userId) {
  const distinctUsers = new Set(problem.whoSolved);
  distinctUsers.add(userId);
  problem.whoSolved = [...distinctUsers];
  return problem.save();
}

async function processSubmission(job) {
  const problem = await Problem.findById(job.problemId);
  if (!problem) throw new Error(`Cannot find problem with id ${job.problemId}`);

  const startTime = new Date().getTime(); // Start time for execution
  let passed = await checkTestcases(job, problem.testcase);
  const endTime = new Date().getTime(); // End time for execution

  const executionTime = endTime - startTime; // Calculate execution time
  if (executionTime / 2 > problem.timelimit * 1000) {
    job.verdict = "tle"; // Set verdict as TLE if execution time exceeds the limit
    passed = false;
  } else {
    job.verdict = passed ? "ac" : job.verdict || "wa"; // Set verdict based on test case results
  }

  if (passed) updateProblemSolvers(problem, job.userId);
}

async function processJob(jobId) {
  const job = await Job.findById(jobId);
  if (!job) throw new Error(`Cannot find job with id ${jobId}`);

  job.startedAt = new Date();
  job.status = "running";
  await job.save();
  try {
    if (job.problemId) {
      await processSubmission(job);
    } else {
      job.output = await executeJob(job);
    }

    job.completedAt = new Date();
    job.status = "success";
  } catch (err) {
    job.completedAt = new Date();
    job.status = err.type;
    job.output = err.message;
  } finally {
    await job.save();
  }
}

jobQueue.process(CONCURRENCY_LEVEL, async ({ data }) => {
  await processJob(data.id);
});

jobQueue.on("failed", (error) => {
  console.error(`Job ${error.data.id} failed: ${error.failedReason}`);
});

module.exports = {
  addJobToQueue: async (jobId) => {
    const job = await Job.findById(jobId);
    job.status = "in queue"; // Set the verdict to "in queue"
    await job.save(); // Save the updated job
    await jobQueue.add({ id: jobId });
  },
  addSubmitToQueue: async (jobId, problemId, userId) => {
    const job = await Job.findById(jobId);
    if (!job) throw new Error(`Cannot find job with id ${jobId}`);
    Object.assign(job, { problemId, userId, status: "in queue" }); // Include the "in queue" verdict here as well
    await job.save();
    await jobQueue.add({ id: jobId });
  },
};
