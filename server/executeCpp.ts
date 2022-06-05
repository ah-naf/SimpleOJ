const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath: string) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    const child = exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`
    );
    child.stdin.write(
        `10\n1 2 3 4 5 6 7 8 9 10`
    );
    child.stdin.end();
    let output = ""
    child.stdout.on("data", (data: string) => {
      output += data;
    });
    child.stderr.on("data", (err: any) => {
      reject(err);
    });
    child.on('exit', () => resolve(output))
  });
};

module.exports = {
  executeCpp,
};

export {};
