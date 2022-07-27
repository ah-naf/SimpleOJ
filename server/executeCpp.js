const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, userInput) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);
 
  const child = execSync(
    `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
    { input: userInput }
  );

  // console.log(child.toString());
  return child.toString();
};

module.exports = {
  executeCpp,
};

