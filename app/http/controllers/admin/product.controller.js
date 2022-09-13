const { StatusCodes: httpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const { deleteFileInPublic } = require("../../../utils/unlink-file");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const { Controller } = require("../controller");
const path = require("path");
const { ProductModel } = require("../../../models/product.model");
const productModel = require("../../../models/product.model");
const { listOfImages } = require("../../../utils/image-list");
const { checkMongoId } = require("../../validators/public.validator");
const { Types } = require("mongoose");
class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      await createProductSchema.validateAsync(req.body);
      await this.checkProductExist(req.body.title);
      const images = listOfImages(req?.files || [], req.body.fileUploadPath);
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
      return res.status(httpStatus.CREATED).json({
        data: {
          statusCode: httpStatus.CREATED,
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
      const { id } = req.params;
      Object.keys(req.body).forEach((key) => {
        if (req.body[key] == "" || req.body[key] == null) delete req.body[key];
      });
      const feature = {};
      const optionalProperties = ["width", "weight", "height", "length"];
      optionalProperties.forEach((item) => {
        if (req.body[item] != "" || req.body[item] != 0)
          feature[item] = req.body[item];
      });
      req.body.feature = feature;
      const data = req.body;
      const updateResult = await ProductModel.updateOne(
        { _id: id },
        { $set: data }
      );
      if (updateResult.modifiedCount == 0)
        throw createHttpError.BadRequest("No Update Result Found");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: "Update Successfully Done",
      });
    } catch (error) {
      next(createHttpError(error.message));
    }
  }
  async removeProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProduct(id);
      if (!product)
        throw createHttpError.NotFound("No Product Found With This Id");
      const deleteResult = await ProductModel.deleteOne({ _id: product._id });
      if (deleteResult.deletedCount == 0)
        throw createHttpError.BadRequest("No Product Deleted");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "Product Deleted Successfully",
        },
      });
    } catch (error) {
      next(createHttpError(error.message));
    }
  }
  async getAllProducts(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let products;
      if (search) {
        products = await ProductModel.find({
          $text: {
            $search: new RegExp(search),
          },
        });
      } else {
        products = await ProductModel.find({});
      }

      if (!products) throw createHttpError.NotFound("No Product Found");
      return res.status(200).json({
        data: {
          statusCode: 200,
          products,
        },
      });
    } catch (error) {
      next(createHttpError(error.message));
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProduct(id);
      if (!product)
        throw createHttpError.NotFound("No Product Found With This Id");
      return res.status(201).json({
        data: {
          statusCode: 200,
          product,
        },
      });
    } catch (error) {
      next(createHttpError(error.message));
    }
  }
  async checkProductExist(title) {
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
  async findProduct(productId) {
    const { id } = await checkMongoId.validateAsync({ id: productId });
    const product = await ProductModel.findOne({ _id: id });
    if (!product)
      throw createHttpError.NotFound("No Product Found With This Id");
    return product;
  }
}

module.exports = {
  ProductController: new ProductController(),
};
