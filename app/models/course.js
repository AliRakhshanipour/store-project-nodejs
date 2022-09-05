const { Schema, model, Types } = require("mongoose");
const { CommentSchema } = require("./public.schema");
const Episode = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
});
const Chapter = new Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episode: { type: [Episode], default: [] },
});

const schema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  short_text: { type: String, required: true },
  images: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: Types.ObjectId, ref: "category", required: true },
  comments: { type: [CommentSchema], default: [] },
  like: { type: [Types.ObjectId], default: [] },
  dislike: { type: [Types.ObjectId], default: [] },
  bookmark: { type: [Types.ObjectId], default: [] },
  discount: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  chapter: { type: [Chapter], default: [] },
  type: {
    type: String,
    required: true,
    default: "free" /* free / cash / special */,
  },
  time: { type: String, default: "00:00:00" },
  supplier: { type: Types.ObjectId, ref: "user", required: true },
  rate: { type: Number, required: true },
  students: { type: Types.ObjectId, default: [], ref: "user" },
});

module.exports = {
  CourseModel: model("course", schema),
};
