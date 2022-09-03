const { Schema, model, Types } = require("mongoose");
const CommentSchema = new Schema({
  user: { type: Types.ObjectId, ref: "users", required: true },
  comment: { type: String, required: true },
  parent: { type: Types.ObjectId },
  createdAt: { type: Date, default: new Date().getTime() },
});
const schema = new Schema(
  {
    author: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: [Types.ObjectId], required: true },
    comments: { type: [CommentSchema], default: [] },
    like: { type: [Types.ObjectId], ref: "users", default: [] },
    dislike: { type: [Types.ObjectId], ref: "users", default: [] },
    bookmark: { type: [Types.ObjectId], ref: "users", default: [] },
  },
  { timestamps: true, versionKey: 0 }
);

module.exports = {
  BlogModel: model("blog", schema),
};
