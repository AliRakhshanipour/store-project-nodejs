const path = require("path");
const createHttpError = require("http-errors");

const listOfImages = (files, fileUploadPath) => {
  if (files?.length > 0)
    return files.map((file) => path.join(fileUploadPath, file.filename));
  else return [];
};

module.exports = {
  listOfImages,
};
