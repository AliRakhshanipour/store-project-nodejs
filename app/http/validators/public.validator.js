const joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGOIDPATTERN } = require("../../utils/constants");

const checkMongoId = joi.object({
  id: joi
    .string()
    .pattern(MONGOIDPATTERN)
    .error(createHttpError.BadRequest("Id Is Not Valid")),
});

module.exports = {
  checkMongoId,
};
