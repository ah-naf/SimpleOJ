const { spawn } = require("child_process");
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

    compileProcess.on("error", (error) => {
      console.error(`Compilation error: ${error.message}`);
      reject(error);
    });

    compileProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Compilation process exited with code ${code}`);
        reject(new Error(`Compilation process exited with code ${code}`));
        return;
      }
      const executeProcess = spawn("./outputs/" + jobId + ".out");

      executeProcess.stdin.write(userInput);
      executeProcess.stdin.end();

      let output = "";

      executeProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      executeProcess.on("error", (error) => {
        console.error(`Execution error: ${error.message}`);
        reject(error);
      });

      executeProcess.on("close", (code) => {
        console.log(`Child Process exited with code ${code}`);
        resolve(output);
      });
    });
  });
};

module.exports = {
  executeCpp,
};
