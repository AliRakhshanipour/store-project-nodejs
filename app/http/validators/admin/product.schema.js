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
});
