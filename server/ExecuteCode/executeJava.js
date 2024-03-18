const { spawn, exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "codes");

const executeJava = (filepath, userInput) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath).split(".")[0];

    const compileProcess = spawn("javac", [filepath]);

    let compileError = ""; // Variable to store the compilation error message

    compileProcess.on("error", (error) => {
      console.log(error);
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

      const executeDirectory = path.dirname(filepath); // Directory where the file is
      const executeProcess = spawn("java", ["-cp", executeDirectory, "Main"], {
        cwd: executeDirectory,
      });

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
  executeJava,
};
