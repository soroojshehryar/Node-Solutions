const fs = require("fs");
const path = require("path");

const listFilesWithExtension = (directory, fileExtension) => {
  try {
    const files = fs.readdirSync(directory);
    const filteredFiles = files.filter(
      (file) => path.extname(file) === `.${fileExtension}`
    );
    console.log(
      `Files with extension .${fileExtension} in directory ${directory}:`
    );
    filteredFiles.forEach((file) => {
      console.log(file);
    });
  } catch (error) {
    console.error("Error reading directory:", error.message);
  }
};

const directoryPath = "sampleDirectory1";
const fileExtension = "txt";

listFilesWithExtension(directoryPath, fileExtension);
