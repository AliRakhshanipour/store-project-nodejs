const {
  ProductController,
} = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/string-to-array");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *   schemas:
 *      Product:
 *          type: object
 *          required:
 *            - title
 *            - text
 *            - short_text
 *            - tags
 *            - category
 *            - count
 *            - price
 *            - discount
 *            - images
 *          properties:
 *            title:
 *               type: string
 *               description: title of the product
 *            text:
 *               type: string
 *               description: description of the product
 *            short_text:
 *               type: string
 *               description: short description of the product
 *            tags:
 *               type: array
 *               description: tags of the product
 *            category:
 *               type: string
 *               description: category of the product
 *            price:
 *               type: string
 *               description: price of the product
 *            count:
 *               type: string
 *               description: count of the product
 *            discount:
 *               type: string
 *               description: discount of the product
 *            images:
 *               type: file
 *               description: images of product
 *
 *
 */

/**
 * @swagger
 *  /admin/product/add:
 *   post:
 *          tags: [Product(Admin Panel)]
 *          summary: create and save products
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 *
 */

router.post(
  "/add",
  uploadFile.array("images", 5),
  stringToArray("tags"),
  ProductController.addProduct
);

module.exports = {
  AdminProductRouter: router,
};
