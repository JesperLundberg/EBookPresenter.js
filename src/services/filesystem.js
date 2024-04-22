import { readdirSync, statSync } from "fs";
import path from "path";

/**
 * @function getAllEBooks
 * Gets all ebooks (including subfolders) from the path set in config.folderToRead
 */
// TODO: Extend to take which extension to look for
async function getAllEBooks(path) {
  return getAllFiles(path);
}

/**
 * @function getAllFiles
 * This method gets all files with extension .epub recursively from @oaram {string} dirPath
 * @param {string} dirPath
 * @param {Array} arrayOfFiles
 * @returns {Array}
 */
// TODO: Extend to take which extension to look for
function getAllFiles(dirPath, arrayOfFiles) {
  // Get all elements in the directory
  const files = readdirSync(dirPath);

  // Initialize array of files, if it is nil then initialize it as an empty array
  arrayOfFiles = arrayOfFiles || [];

  // Iterate through all the files in the directory and follow into subdirectories by recursion
  files.forEach(function (file) {
    if (statSync(dirPath + "/" + file).isDirectory()) {
      // This is a directory so recurse into it
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    }

    // TODO: Loop over the array of extensions to and add the file to the array if it matches
    if (path.extname(file) === ".epub") {
      // This is a file with the .epub extension so add it to the array
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

// Export the public functions
export default {
  getAllEBooks: getAllEBooks,
};
