const { Schema, model, Types } = require("mongoose");

const schema = new Schema(
  {
    title: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: "category", default: undefined },
  },
  {
    id: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);
schema.virtual("children", {
  ref: "category",
  localField: "_id",
  foreignField: "parent",
});

const autoPopulate = function (next) {
  this.populate([{ path: "children" }]);
  next();
};

schema.pre("findOne", autoPopulate).pre("find", autoPopulate);

module.exports = {
  CategoryModel: model("category", schema),
};
