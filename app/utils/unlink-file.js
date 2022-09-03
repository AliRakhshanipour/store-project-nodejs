const path = require("path");
const fs = require("fs");
const deleteFileInPublic = (file) => {
  const filePath = path.join(__dirname, "..", "..", "public", file);
  console.log(filePath);
  fs.unlinkSync(filePath);
};

module.exports = {
  deleteFileInPublic,
};
