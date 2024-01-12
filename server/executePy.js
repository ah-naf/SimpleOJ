const { execSync } = require("child_process");
const path = require("path");

const executePy = (filepath, userInput) => {
  return new Promise((resolve, reject) => {
    // console.log(filepath);
    const child = execSync(`python3 ${filepath}`, { input: userInput });

    resolve(child.toString());
  });
};

module.exports = {
  executePy,
};
