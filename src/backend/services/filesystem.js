var { readdirSync, statSync, existsSync } = require("fs");
var path = require("path");

/**
 * @function doesFileExist
 * Checks if a file exists
 * @param {string} filePath
 * @returns {boolean}
 */
async function fileExist(filePath) {
  if (existsSync(filePath)) {
    return true;
  }
  return false;
}

/**
 * @function getAllEBooks
 * Gets all ebooks (including subfolders) from the path set in config.folderToRead
 * @param {string} path
 * @exception {Error} Path is required
 * @returns {Array}
 */
// TODO: Extend to take which extension to look for
async function getAllEBooks(path) {
  if (!path || typeof path != "string" || path === "") {
    throw new Error("Path is required");
  }

  if (existsSync(path)) {
    // Files exists so return file info
    return getAllFiles(path);
  } else {
    throw new Error("Path does not exist");
  }
}

/**
 * @function getSpecificEBook
 * Gets the specific ebook from the Path
 * @param {string} Path
 * @exception {Error} Path is required

 * @returns {Object} */
async function getSpecificEBook(path) {
  if (!path || typeof path != "string" || path === "") {
    throw new Error("Path is required");
  }

  if (existsSync(path)) {
    // Files exists so return file info
    return await getSpecificFileWithInfo(path);
  } else {
    throw new Error("File does not exist");
  }
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
      arrayOfFiles.push({
        href: path.join(dirPath, "/", file),
        name: path.basename(file, ".epub"), // TODO: Remove the hardcoded extension and use the extension array
      });
    }
  });

  return arrayOfFiles;
}

/**
 * @function getSpecificFileWithInfo
 * This method gets the specific file and returns the file info
 * @param {string} filePath
 * @returns {Object}
 */
async function getSpecificFileWithInfo(filePath) {
  const fileInfo = statSync(filePath);

  const fileInfoToReturn = {
    name: path.basename(filePath, ".epub"), // TODO: Remove the hardcoded extension and use the extension array
    path: filePath,
    size: fileInfo.size,
    lastModified: fileInfo.mtime,
    birthtime: fileInfo.birthtime,
  };

  return fileInfoToReturn;
}

// Export the public functions
module.exports = {
  fileExist: fileExist,
  getAllEBooks: getAllEBooks,
  getSpecificEBook: getSpecificEBook,
};
