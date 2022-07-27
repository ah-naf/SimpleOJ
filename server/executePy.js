const { execSync } = require("child_process");
const path = require("path");


const executePy = (filepath, userInput) => {
  const child = execSync(`python3 ${filepath}`, { input: userInput });

  return child.toString();
};

module.exports = {
  executePy,
};
