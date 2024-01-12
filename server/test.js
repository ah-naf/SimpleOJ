const { spawn } = require("child_process");

// Replace 'script.py' with the name of your Python script
const execute = spawn("python3", ["script.py"]);

// If you need to send input to the Python script, you can write to stdin
execute.stdin.write("10 20");
execute.stdin.end();

// Handling the output of the Python script
execute.stdout.on("data", (data) => {
  console.log(`Child Process Output: ${data}`);
});

// Handle errors
execute.on("error", (err) => {
  console.error(`Error executing script.py: ${err}`);
});

// Handle the child process exit
execute.on("close", (code) => {
  console.log(`Child Process exited with code ${code}`);
});
