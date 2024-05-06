const cors = require("cors");
const express = require("express");

const download = require("./routes/download.js");
const eBookRouter = require("./routes/getAllEBooks.js");
const specificEBookRouter = require("./routes/getSpecificEBook.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (_, res) => {
  res.json({ message: "I live ...again!" });
});

app.get("/ebooks", eBookRouter.routes);
app.get("/specificebook", specificEBookRouter.routes);
app.get("/download", download.routes);

app.use((err, _, res, _1) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
