const { Schema, model } = require("mongoose");

const permissionsSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = {
  PermissionsModel: model("permission", permissionsSchema),
};
