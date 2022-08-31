const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/category.model");
const {
  createCategorySchema,
  removeCategorySchema,
  editCategorySchema,
} = require("../../validators/admin/category.schema");
const { Controller } = require("../controller");
const { Types } = require("mongoose");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await createCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category)
        throw createHttpError.InternalServerError(
          "Internal error creating category"
        );
      return res.status(201).json({
        data: {
          status: 201,
          message: "Category created successfully",
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async removeCategory(req, res, next) {
    try {
      // await removeCategorySchema.validateAsync(req.params);
      const { categoryId } = req.params;
      const category = await CategoryModel.findOne({ _id: categoryId });
      if (!category) throw createHttpError.NotFound("Category Not Found");
      const removeCategoryResult = await CategoryModel.deleteOne({
        _id: categoryId,
      });
      if (removeCategoryResult.deletedCount == 0)
        throw createHttpError.BadRequest("Remove category failed");
      return res.status(200).json({
        data: {
          status: 200,
          message: "Category Deleted Successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getParentCategory(req, res, next) {
    try {
      const parents = await CategoryModel.find({ parent: undefined });
      console.log(parents);
      if (!parents)
        throw createHttpError.NotFound("There Is No Parent Category");
      return res.status(200).json({
        data: { parent: parents },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildrenOfParent(req, res, next) {
    try {
      const { parentId } = req.params;
      const parent = await CategoryModel.find({ _id: parentId });
      if (!parent) throw createHttpError.NotFound("Category Not Found");
      const children = await CategoryModel.find({ parent: parentId });
      if (!children) throw createHttpError.NotFound("No Category Found");
      return res.status(200).json({ data: { children } });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }

  async getAllCategories(req, res, next) {
    try {
      const children = await CategoryModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
          },
        },
      ]);
      return res.status(200).json({ data: { children } });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }

  async editCategory(req, res, next) {
    await editCategorySchema.validateAsync(req.body);
    const { categoryId } = req.params;
    const { title } = req.body;
    const checkTitle = await CategoryModel.findOne({ title });
    if (checkTitle)
      throw createHttpError.BadRequest(
        "Title Unavailable , Please Try Another"
      );
    const editCategory = await CategoryModel.updateOne(
      { _id: categoryId },
      { $set: { title } }
    );
    if (editCategory.modifiedCount === 0)
      throw createHttpError.BadRequest("Update Category Failed");
    return res
      .status(200)
      .json({ status: 200, message: "Category Updated Successfully" });
    try {
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const { categoryId } = req.params;
      const category = await CategoryModel.findOne({ _id: categoryId });
      if (!category) throw createHttpError.NotFound("Category Not Found");
      return res.status(200).json({ data: category });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
