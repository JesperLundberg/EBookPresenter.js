import express from "express";
import filesystem from "../services/filesystem.js";

const routes = express.Router();

/** HTTPGET Get the file info for a specific ebook
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 */
routes.get("/specificebook", async (req, res, next) => {
  try {
    res.json(await filesystem.getSpecificEBook(req.query.path));
  } catch (error) {
    console.error(
      "An error occurred when trying to get " + req.query.path + " ebook",
      error.message,
    );
    next(error);
  }
});

// Export the routes
export default routes;
