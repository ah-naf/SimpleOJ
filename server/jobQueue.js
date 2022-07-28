const Queue = require("bull");
const moment = require("moment");
const Job = require("./models/Job");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const Problem = require("./models/Problem");

// For running code with sample user input


const jobQueue = new Queue("job-runner-queue", {
  redis: { host: "redis", port: 6379,  }
});


jobQueue.process(async ({ data }) => {
  const jobId = data.id;
  const job = await Job.findById(jobId);

  if (job === undefined) {
    throw Error(`Cannot find job with id ${jobId}`);
  }

  try {
    let output;
    job["startedAt"] = new Date();
    // we need to run the file and send the response
    if (job.language === "cpp" || job.language === "c")
      output = await executeCpp(job.filepath, job.userInput);
    else output = await executePy(job.filepath, job.userInput);

    job["completedAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;
    await job.save();

    return true;
  } catch (err) {
    job["completedAt"] = new Date();
    job["status"] = "error";
    job["output"] = err;
    await job.save();
    throw Error(err);
  }
});

jobQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addJobToQueue = async (jobId) => {
  jobQueue.add({
    id: jobId,
  });
};

// For submitting code and check testcase

const submitQueue = new Queue("job-submit-queue", {
  redis: { host: "redis", port: 6379 },
});

submitQueue.process(async ({ data }) => {
  const jobId = data.id;
  const problemId = data.problemId;
  const job = await Job.findById(jobId);
  const problem = await Problem.findById(problemId);

  if (job === undefined || problem === undefined) {
    throw Error(`Invalid job/problem id`);
  }

  const testcases = problem.testcase;

  try {
    let output;
    job["startedAt"] = new Date();
    job["userId"] = data.userId;
    job["problemId"] = problemId;

    let passed = true

    const checkTestcase = testcases.map((item) => {
      const start = moment(new Date());
      try {
        const end = moment(new Date());
        if (job.language === "cpp" || job.language === "c")
          output = executeCpp(job.filepath, item.input);
        else output = executePy(job.filepath, item.input);


        let outputUser = output.trim();
        let outputTestcase = item.output.trim()


        const executionTime = end.diff(start, "seconds", true);
        if (executionTime > problem.timelimit) {
          job["verdict"] = "tle";
          passed &= false;
          return false;
        }
        passed &= outputUser === outputTestcase;
        return outputUser === outputTestcase;
      } catch (error) {
        console.log({ error });
      }
    });

    passed && (job["verdict"] = "ac");
    !passed && job["verdict"] !== "tle" && (job["verdict"] = "wa");

    if (passed) {
      const distinct_user = new Set(problem.whoSolved);
      distinct_user.add(data.userId);
      problem.whoSolved = [...distinct_user];
      await problem.save();
    }

    job["completedAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;
    await job.save();

    return true;
  } catch (err) {
    job["completedAt"] = new Date();
    job["status"] = "error";
    job["output"] = err;
    await job.save();
    throw Error(err);
  }
});

submitQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addSubmitToQueue = async (jobId, problemId, userId) => {
  submitQueue.add({
    id: jobId,
    problemId,
    userId,
  });
};

module.exports = {
  addJobToQueue,
  addSubmitToQueue,
};
