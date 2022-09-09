const {
  ProductController
} = require("../../http/controllers/admin/product.controller");
const {stringToArray} = require("../../http/middlewares/string-to-array");
const {uploadFile} = require("../../utils/multer");

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
 *            height:
 *               type: string
 *               description: heigh of the product package
 *            weight:
 *               type: string
 *               description: weight of the product package
 *            width:
 *               type: string
 *               description: width of the product package
 *            length:
 *               type: string
 *               description: length of the product package
 *            images:
 *               type: array
 *               items:
 *                  type: string
 *                  format: binary
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

/**
 * @swagger
 *  components:
 *   schemas:
 *      editProduct:
 *          type: object
 *          required:
 *            - title
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
 *            price:
 *               type: string
 *               description: price of the product
 *            count:
 *               type: string
 *               description: count of the product
 *            discount:
 *               type: string
 *               description: discount of the product
 *            height:
 *               type: string
 *               description: heigh of the product package
 *            weight:
 *               type: string
 *               description: weight of the product package
 *            width:
 *               type: string
 *               description: width of the product package
 *            length:
 *               type: string
 *               description: length of the product package
 *            images:
 *               type: array
 *               items:
 *                  type: string
 *                  format: binary
 *                  description: images of product
 *
 *
 */

/**
 * @swagger
 *  /admin/product/edit/{id}:
 *   patch:
 *          tags: [Product(Admin Panel)]
 *          summary: edit and save products
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: product id
 *              type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/editProduct'
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 *
 */

router.patch(
  "/edit/:id",
  uploadFile.array("images", 10),
  stringToArray("tags"),
  ProductController.editProduct
);

/**
 * @swagger
 *  /admin/product:
 *   get:
 *          tags: [Product(Admin Panel)]
 *          summary: get all products
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 *
 */

router.get("/", ProductController.getAllProducts);

/**
 * @swagger
 *  /admin/product/{id}:
 *   get:
 *          tags: [Product(Admin Panel)]
 *          summary: get product with id
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: product mongo id
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 *
 */

router.get("/:id", ProductController.getOneProduct);

/**
 * @swagger
 *  /admin/product/remove/{id}:
 *   delete:
 *          tags: [Product(Admin Panel)]
 *          summary: remove product with id
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: product mongo id
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 *
 */

router.delete("/remove/:id", ProductController.removeProduct);

module.exports = {
  AdminProductRouter: router
};
