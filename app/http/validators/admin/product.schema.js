const joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGOIDPATTERN } = require("../../../utils/constants");

const createProductSchema = joi.object({
  title: joi
    .string()
    .min(3)
    .max(30)
    .trim()
    .error(createHttpError.BadRequest("Please Enter Title Correctly")),
  text: joi
    .string()
    .trim()
    .error(createHttpError.BadRequest("Please Enter Text Correctly")),
  short_text: joi
    .string()
    .trim()
    .error(createHttpError.BadRequest("Please Enter Short Text Correctly")),
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
    .error(createHttpError.BadRequest("Tags Must Be Less Than 30")),
  category: joi
    .string()
    .pattern(MONGOIDPATTERN)
    .error(createHttpError.BadRequest("Category Not Found")),
  price: joi.number().error(createHttpError.BadRequest("Price Is Not Correct")),
  count: joi.number().error(createHttpError.BadRequest("count Is Not Correct")),
  discount: joi
    .number()
    .error(createHttpError.BadRequest("Discount Is Not Correct")),
  height: joi
    .number()
    .empty()
    .allow("")
    .error(createHttpError.BadRequest("Height Is Not Correct")),
  weight: joi
    .number()
    .empty()
    .allow("")
    .error(createHttpError.BadRequest("Weight Is Not Correct")),
  width: joi
    .number()
    .empty()
    .allow("")
    .error(createHttpError.BadRequest("Width Is Not Correct")),
  length: joi
    .number()
    .empty()
    .allow("")
    .error(createHttpError.BadRequest("Length Is Not Correct")),
});

module.exports = {
  createProductSchema,
};
