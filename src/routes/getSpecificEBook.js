const filesystem = require("fs");
const path = require("path");

async function getSpecificEBook(pathToEbook) {
  if (!filesystem.existsSync(pathToEbook)) {
  }
  return filesystem.readFileSync(pathToEbook);
}
