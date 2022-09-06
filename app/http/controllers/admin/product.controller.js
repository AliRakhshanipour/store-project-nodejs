const createHttpError = require("http-errors");
const { deleteFileInPublic } = require("../../../utils/unlink-file");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const { Controller } = require("../controller");
const path = require("path");
const { ProductModel } = require("../../../models/product.model");
const productModel = require("../../../models/product.model");
class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      await createProductSchema.validateAsync(req.body);
      await this.productFinder(req.body.title);
      const images = path.join(req.body.fileUploadPath, req.body.file_name);
      req.body.images = images;
      req.body.supplier = req.user._id;
      const feature = {};
      const optionalProperties = ["width", "weight", "height", "length"];
      optionalProperties.forEach((item) => {
        if (req.body[item] != "" || req.body[item] != 0)
          feature[item] = req.body[item];
      });
      req.body.feature = feature;
      console.log(feature);
      const data = req.body;

      const product = await ProductModel.create(data);
      if (!product) throw createHttpError.BadRequest("Product Creation Failed");
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "Product Created Successfully",
        },
      });
    } catch (error) {
      const image = path.join(req.body.fileUploadPath, req.body.file_name);
      deleteFileInPublic(image);
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
  async productFinder(title) {
    try {
      const product = await ProductModel.findOne({ title });
      if (product)
        return createHttpError.BadRequest(
          "There Is Another Product With This Title"
        );
    } catch (error) {
      createHttpError.BadRequest(error.message);
    }
  }
  async checkNullItem(data) {}
}

module.exports = {
  ProductController: new ProductController(),
};
