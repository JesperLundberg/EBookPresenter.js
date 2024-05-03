const express = require("express");

const routes = express.Router();

routes.get("/download", async (req, res, next) => {
  try {
    const fullFilePath = req.query.path;
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