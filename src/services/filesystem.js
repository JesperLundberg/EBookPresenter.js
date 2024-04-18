import * as filesystem from "fs";
import path from "path";
import config from "../config.js";

// const config = require("../config");
// const filesystem = require("fs");
// const path = require("path");

async function getAllEBooks() {
  return getAllFiles(config.folderToRead);
}

const getAllFiles = function (dirPath, arrayOfFiles) {
  // Get all elements in the directory
  const files = filesystem.readdirSync(dirPath);

  // Initialize array of files, if it is nil then initialize it as an empty array
  arrayOfFiles = arrayOfFiles || [];

  // Iterate through all the files in the directory and follow into subdirectories by recursion
  files.forEach(function (file) {
    if (filesystem.statSync(dirPath + "/" + file).isDirectory()) {
      // This is a directory so recurse into it
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    }

    if (path.extname(file) === ".epub") {
      // This is a file with the .epub extension so add it to the array
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

// Export the public functions
export default {
  getAllEBooks: getAllEBooks,
};
