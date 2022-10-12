const joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGOIDPATTERN } = require("../../../utils/constants");

const roleValidator = joi.object({
  title: joi
    .string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("Please Enter Role Correctly")),
  permissions: joi
    .array()
    .items(joi.string().pattern(MONGOIDPATTERN))
    .error(createHttpError.BadRequest("Please Enter Permissions Correctly")),
});
const permissionValidator = joi.object({
  title: joi
    .string()
    .min(4)
    .max(30)
    .error(
      createHttpError.BadRequest("Please Enter Permission Title Correctly")
    ),
  description: joi
    .string()
    .min(4)
    .max(60)
    .error(
      createHttpError.BadRequest(
        "Please Enter Permission Description Correctly"
      )
    ),
});
module.exports = {
  roleValidator,
  permissionValidator,
};
