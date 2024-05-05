const express = require("express");

const routes = express.Router();

routes.get("/download", async (req, res, next) => {
  console.log("Download request received");
  console.log("req.query", req.query.path.trim());
  try {
    const fullFilePath = req.query.path.trim();
    console.log("fullFilePath", fullFilePath);
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
