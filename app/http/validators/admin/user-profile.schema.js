const joi = require("@hapi/joi");
const createHttpError = require("http-errors");

const userUpdateValidator = joi.object({
  first_name: joi
    .string()
    .min(3)
    .trim()
    .allow("")
    .error(createHttpError.BadRequest("enter first name Correctly")),
  last_name: joi
    .string()
    .min(3)
    .trim()
    .allow("")
    .error(createHttpError.BadRequest("enter last name Correctly")),
  username: joi
    .string()
    .trim()
    .min(3)
    .error(createHttpError.BadRequest("enter username Correctly")),
  phone: joi
    .string()
    .trim()
    .pattern(/09[0-9]{9}/)
    .error(createHttpError.BadRequest("Enter phone Correctly")),
  email: joi
    .string()
    .trim()
    .email()
    .error(createHttpError.BadRequest("Enter email Correctly")),
  birthday: joi
    .string()
    .trim()
    .min(8)
    .allow("")
    .error(createHttpError.BadRequest("Enter birthday Correctly")),
});

module.exports = {
  userUpdateValidator,
};
