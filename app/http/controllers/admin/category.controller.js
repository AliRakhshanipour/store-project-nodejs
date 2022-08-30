const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/category.model");
const {
  createCategorySchema,
} = require("../../validators/admin/category.schema");
const { Controller } = require("../controller");

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
  removeCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  editCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  getAllCategories(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  getParentCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  getCategoryById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  getChildOfParents(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
