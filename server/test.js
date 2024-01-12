const { spawn } = require("child_process");

const ps = spawn("g++", ["cc.cc", "-o", "cc.out"]);

ps.on("close", (code) => {
  if (code !== 0) {
    console.error(`Compilation process exited with code ${code}`);
    return;
  }

  const execute = spawn("./cc.out"); // Pass "10" as a command-line argument

  // Handle the output of the child process if needed
  execute.stdin.write("2 3");
  execute.stdin.end();

  // Handle the output of the child process
  execute.stdout.on("data", (data) => {
    console.log(`Child Process Output: ${data}`);
  });

  // Handle errors if needed
  execute.on("error", (err) => {
    console.error(`Error executing cc.out: ${err}`);
  });

  // Handle the child process exit
  execute.on("close", (code) => {
    console.log(`Child Process exited with code ${code}`);
  });
});
