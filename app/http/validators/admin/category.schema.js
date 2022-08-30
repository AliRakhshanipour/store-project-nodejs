const joi = require("@hapi/joi");

const createCategorySchema = joi.object({
  title: joi
    .string()
    .min(3)
    .max(30)
    .error(new Error("Title Must Be Between 3 & 30 Characters")),
  parent: joi
    .string()
    .allow("")
    .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .allow("")
    .error(new Error("Parent Is Not Correct")),
});

module.exports = {
  createCategorySchema,
};
