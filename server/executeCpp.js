const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, userInput) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    const child = exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`
    );
    child.stdin.write(userInput);
    child.stdin.end();
    let output = "";
    child.stdout.on("data", (data) => {
      output += data;
    });
    child.stderr.on("data", (err) => {
      reject(err);
    });
    child.on("exit", () => resolve(output));
  });
};

module.exports = {
  executeCpp,
};

