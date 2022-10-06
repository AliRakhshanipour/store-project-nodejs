const { Schema, model, Types } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const schema = new Schema(
  {
    author: { type: Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: [Types.ObjectId], ref: "category", required: true },
    comments: { type: [CommentSchema], default: [] },
    like: { type: [Types.ObjectId], ref: "users", default: [] },
    dislike: { type: [Types.ObjectId], ref: "users", default: [] },
    bookmark: { type: [Types.ObjectId], ref: "users", default: [] },
  },
  { timestamps: true, versionKey: 0 }
);

schema.virtual("imageURL").get(() => {
  return `http://localhost:3000/${this.image}`;
});

module.exports = {
  BlogModel: model("blog", schema),
};
