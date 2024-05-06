const express = require("express");

const routes = express.Router();

/**
 * Route to download a file from the server
 * @param {string} path - The path to the file to download
 * @returns {void} - Downloads the file from the server
 */
routes.get("/download", async (req, res, next) => {
  try {
    // Strip any leading/trailing whitespace from the path read from the query string
    const fullFilePath = req.query.path.trim();

    // Set the correct mime type for the file
    res.header("Content-Type", "application/epub+zip");
    res.download(fullFilePath);
  } catch (error) {
    console.error(
      "An error occurred when trying to download a file",
      error.message,
    );
    next(error);
  }
});

// Export the routes
module.exports = { routes };
