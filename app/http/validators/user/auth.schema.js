const joi = require("@hapi/joi");

const getOtpSchema = joi.object({
  phone: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("Invalid phone number")),
});

const checkOtpSchema = joi.object({
  phone: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("Invalid phone number")),
  code: joi.string().min(4).max(6).error(new Error("Code Is Not Correct")),
});

module.exports = {
  getOtpSchema,
  checkOtpSchema,
};
