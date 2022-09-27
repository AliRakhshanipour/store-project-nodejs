const { Schema, model, Types } = require("mongoose");

const schema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    phone: { type: String },
    email: { type: String },
    otp: {
      type: Object,
      default: {
        code: 0,
        expires: 0,
      },
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    roles: { type: [String], default: ["USER"] },
    courses: { type: [Types.ObjectId], ref: "course", default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = {
  UserModel: model("user", schema),
};
