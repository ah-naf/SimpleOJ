const { spawn } = require("child_process");
const path = require("path");

const executePy = (filepath, userInput) => {
  return new Promise((resolve, reject) => {
    // console.log(filepath);
    const execute = spawn("python3", [filepath]);

    // If you need to send input to the Python script, you can write to stdin
    execute.stdin.write(userInput);
    execute.stdin.end();

    let output = "";
    // Handling the output of the Python script
    execute.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Handle errors
    execute.on("error", (err) => {
      console.error(`Error executing script.py: ${err}`);
      reject(err);
    });

    // Handle the child process exit
    execute.on("close", (code) => {
      console.log(`Child Process exited with code ${code}`);
      resolve(output);
    });
  });
};

module.exports = {
  executePy,
};
