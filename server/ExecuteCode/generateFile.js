const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
  // console.log("first");
  const jobId = uuid();
  const dirPath = path.join(dirCodes, jobId); // Directory path for the new folder
  try {
    await fs.promises.mkdir(dirPath, { recursive: true }); // Create the directory if it doesn't exist

    const filename = `Main.${format}`; // Filename is now always Main.format
    const filepath = path.join(dirPath, filename); // Adjust filepath to include the new folder

    await fs.promises.writeFile(filepath, content); // Use fs.promises.writeFile to save the file asynchronously
    return filepath; // Return the full path to the saved file
  } catch (error) {
    console.error("Error creating file:", error);
    throw error; // Rethrow the error for further handling if necessary
  }
};

module.exports = {
  generateFile,
};
