const createHttpError = require("http-errors");
const { Controller } = require("../controller");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      return res.json({ data: req.body });
    } catch (error) {
      next(createHttpError(error.message));
    }
  }
  async editProduct(req, res, next) {
    try {
    } catch (error) {
      next(createHttpError(error.message));
    }
  }
  async removeProduct(req, res, next) {
    try {
    } catch (error) {
      next(createHttpError(error.message));
    }
  }
  async getAllProducts(req, res, next) {
    try {
    } catch (error) {
      next(createHttpError(error.message));
    }
  }
  async getOneProduct(req, res, next) {
    try {
    } catch (error) {
      next(createHttpError(error.message));
    }
  }
}

module.exports = {
  ProductController: new ProductController(),
};
