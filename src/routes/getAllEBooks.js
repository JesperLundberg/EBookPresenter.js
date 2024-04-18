import express from "express";
import fileSystem from "../services/filesystem.js";

const routes = express.Router();

/** HTTPGET Get all ebooks
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 */
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

// Export the routes
export default routes;
