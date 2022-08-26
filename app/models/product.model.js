const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  short_description: { type: String, required: true },
  images: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: Types.ObjectId, required: true },
  comments: { type: [], default: [] },
  like: { type: [Types.ObjectId], default: [] },
  dislike: { type: [Types.ObjectId], default: [] },
  bookmark: { type: [Types.ObjectId], default: [] },
  count: { type: Number },
  discount: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  type: { type: String, required: true },
  time: { type: String },
  format: { type: String },
  teacher: { type: Types.ObjectId, required: true },
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
  rate: { type: Number, required: true },
});

module.exports = {
  ProductModel: model("product", schema),
};
