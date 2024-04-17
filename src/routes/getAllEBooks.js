const express = require("express");
const routes = express.Router();
const fileSystem = require("../services/filesystem");

// *httpget* Get all ebooks
routes.get("/ebooks", async (_, res, next) => {
  try {
    res.json(await fileSystem.getAllEBooks());
  } catch (error) {
    console.error(
      "An error occurred when trying to get all ebooks",
      error.message,
    );
    next(error);
  }
});

module.exports = routes;
