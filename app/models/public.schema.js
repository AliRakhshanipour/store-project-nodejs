const { Schema, model, Types } = require("mongoose");
const CommentSchema = new Schema({
  user: { type: Types.ObjectId, ref: "users", required: true },
  comment: { type: String, required: true },
  parent: { type: Types.ObjectId, ref: "comment" },
  createdAt: { type: Date, default: new Date().getTime() },
});

module.exports = {
  CommentSchema,
};
