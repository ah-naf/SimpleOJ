const { exec } = require("child_process");
const path = require("path");

const executePy = (filepath: string) => {
  return new Promise((resolve, reject) => {
    const child = exec(`python3 ${filepath}`);
    child.stdin.write(
        `5 1 2 3 4 5`
    );
    child.stdin.end();
    let output = ""
    child.stdout.on("data", (data: string) => {
      output += data;
    });
    child.stderr.on("data", (err: any) => {
      reject(err);
    });
    child.on('exit', () => {
        resolve(output)
    })
  });
};

module.exports = {
  executePy,
};

export {};
