const { Types, Schema, model } = require("mongoose");

const roleSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    permissions: {
      type: [Types.ObjectId],
      ref: "permissions",
      default: [],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = {
  RoleModel: model("role", roleSchema),
};
