const { spawn, exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, userInput) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);

    const compileProcess = spawn("g++", [filepath, "-o", outPath]);

    let compileError = ""; // Variable to store the compilation error message

    compileProcess.on("error", (error) => {
      reject({ type: "c_error", message: error.message });
    });

    compileProcess.stderr.on("data", (data) => {
      compileError += data.toString();
    });

    compileProcess.on("close", (code) => {
      if (code !== 0) {
        reject({
          type: "c_error",
          message: `Compilation Failed:\n${compileError}`,
        }); // Reject with the compilation error
        return;
      }
      const executeProcess = spawn("./outputs/" + jobId + ".out");

      executeProcess.stdin.write(userInput);
      executeProcess.stdin.end();

      let output = "";
      let runtimeError = "";

      executeProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      executeProcess.stderr.on("data", (data) => {
        runtimeError += data.toString();
      });

      executeProcess.on("error", (error) => {
        reject({ type: "r_error", message: error.message });
      });

      executeProcess.on("close", (code) => {
        if (code !== 0) {
          reject({
            type: "r_error",
            message: `Executation Failed:\n${
              runtimeError || "Unknown runtime error"
            }`,
          });
          return;
        }
        resolve(output);
      });
    });
  });
};

module.exports = {
  executeCpp,
};
