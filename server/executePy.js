const { spawn } = require("child_process");
const path = require("path");

const executePy = (filepath, userInput) => {
  return new Promise((resolve, reject) => {
    const execute = spawn("python3", [filepath]);

    // If you need to send input to the Python script, you can write to stdin
    execute.stdin.write(userInput);
    execute.stdin.end();

    let output = "";
    let errorOutput = ""; // Variable to store error messages

    // Handling the output of the Python script
    execute.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Handling error output
    execute.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    // Handle errors
    execute.on("error", (err) => {
      reject(err);
    });

    // Handle the child process exit
    execute.on("close", (code) => {
      if (code) {
        reject(new Error(`Script execution failed: ${errorOutput}`)); // Reject with the error output
      } else {
        resolve(output);
      }
    });
  });
};

module.exports = {
  executePy,
};
