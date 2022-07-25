const { execSync } = require("child_process");
const path = require("path");

// const executePy = (filepath, userInput) => {
//   return new Promise((resolve, reject) => {
//     const child = exec(`python3 ${filepath}`);
//     child.stdin.write(userInput);
//     child.stdin.end();
//     let output = "";
//     child.stdout.on("data", (data) => {
//       output += data;
//     });
//     child.stderr.on("data", (err) => {
//       reject(err);
//     });
//     child.on("exit", () => {
//       resolve(output);
//     });
//   });
// };

const executePy = (filepath, userInput) => {
  const child = execSync(`python3 ${filepath}`, { input: userInput });

  // console.log(child.toString());

  return child.toString();
};

module.exports = {
  executePy,
};
