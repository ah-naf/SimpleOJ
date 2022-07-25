const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// const executeCpp = (filepath, userInput) => {
//   const jobId = path.basename(filepath).split(".")[0];
//   const outPath = path.join(outputPath, `${jobId}.out`);

//   return new Promise((resolve, reject) => {
//     const child = execSync(
//       `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
//       { input: userInput }
//     );

//     // console.log(child.toString());
//     resolve(child.toString());
//   });
// };

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

// child.stdin.write(userInput);
// child.stdin.end();
// let output = "";
// child.stdout.on("data", (data) => {
//   output += data;
//   // process.exit();
// });
// child.stderr.on("data", (err) => {
//   reject(err);
//   // process.exit();
// });
// child.on("exit", () => {
//   resolve(output);
// });
