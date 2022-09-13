const { Schema, model, Types } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const ProductSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  short_text: { type: String, required: true },
  images: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: Types.ObjectId, ref: "category", required: true },
  comments: { type: [CommentSchema], default: [] },
  like: { type: [Types.ObjectId], default: [] },
  dislike: { type: [Types.ObjectId], default: [] },
  bookmark: { type: [Types.ObjectId], default: [] },
  count: { type: Number },
  discount: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  time: { type: String },
  format: { type: String },
  supplier: { type: Types.ObjectId, required: true },
  feature: {
    type: Object,
    default: {
      length: "",
      height: "",
      width: "",
      weight: "",
      colors: [],
      model: [],
      made_in: "",
    },
    required: true,
  },
  rate: { type: Number },
});
ProductSchema.index({ title: "text", short_text: "text", text: "text" });
module.exports = {
  ProductModel: model("product", ProductSchema),
};
