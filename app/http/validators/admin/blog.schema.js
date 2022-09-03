const joi = require("@hapi/joi");
const { MONGOIDPATTERN } = require("../../../utils/constants");

const createBlogSchema = joi.object({
  title: joi
    .string()
    .trim()
    .pattern(/^[a-zA-z]{3}[a-zA-Z\s]{3,20}$/)
    .error(new Error("Invalid Title")),
  text: joi.string().trim().error(new Error("Text Is Not Correct")),
  short_text: joi.string().trim().error(new Error("Short Text Is Not Correct")),
  fileUploadPath: joi
    .string()
    .trim()
    .error(new Error("File Upload Path Is Not Correct")),
  file_name: joi.string().error(new Error("Image Is Not Correct")),
  tags: joi
    .array()
    .min(0)
    .max(30)
    .error(new Error("Tags Must Be Less Than 30")),
  category: joi
    .string()
    .pattern(MONGOIDPATTERN)
    .error(new Error("Category Not Found")),
});

module.exports = {
  createBlogSchema,
};
