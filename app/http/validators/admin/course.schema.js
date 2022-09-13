const joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGOIDPATTERN } = require("../../../utils/constants");

const courseValidator = joi.object({
  title: joi
    .string()
    .min(3)
    .trim()
    .error(createHttpError.BadRequest("Must Be At Least 3 Characters")),
  text: joi
    .string()
    .trim()
    .error(createHttpError.BadRequest("Please Enter Text Correctly")),
  short_text: joi
    .string()
    .trim()
    .error(createHttpError.BadRequest("Please Enter Text Correctly")),
  fileUploadPath: joi
    .string()
    .trim()
    .error(
      createHttpError.BadRequest("Please Enter File Upload Path Correctly")
    ),
  file_name: joi
    .string()
    .error(createHttpError.BadRequest("Please Upload Image Correctly")),
  tags: joi
    .array()
    .min(0)
    .max(30)
    .allow("", null)
    .error(createHttpError.BadRequest("Tags Must Be Less Than 30")),
  type: joi.string().error(createHttpError.BadRequest("Type Is Not Correct")),
  category: joi
    .string()
    .pattern(MONGOIDPATTERN)
    .error(createHttpError.BadRequest("Category Not Found")),
  discount: joi
    .number()
    .allow("", null)
    .error(createHttpError.BadRequest("Discount Is Not Correct")),
  price: joi
    .number()
    .allow("", null)
    .error(createHttpError.BadRequest("Price Is Not Correct")),
});

module.exports = {
  courseValidator,
};
