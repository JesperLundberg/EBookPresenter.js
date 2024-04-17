const express = require("express");
const app = express();
const eBookRouter = require("./routes/getAllEBooks");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.json({ message: "ok" });
});
app.get("/ebooks", eBookRouter);

app.use((err, _, res, _1) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
