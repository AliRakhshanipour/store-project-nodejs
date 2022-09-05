const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Category:
 *        type: object
 *        required:
 *          - title
 *        properties:
 *          title:
 *            type: string
 *            description: title of the category
 *          parent:
 *            type: string
 *            description: parent of the category
 *      RemoveCategory:
 *        type: object
 *        required:
 *          - categoryId
 *        properties:
 *            categoryId:
 *              type: string
 *              description: category id that you want to delete that
 *      refreshToken:
 *        type: object
 *        required:
 *          - refreshToken
 *        properties:
 *            refreshToken:
 *              type: string
 *              description: refresh token
 */

/**
 * @swagger
 * /admin/category/add:
 *  post:
 *      tags: [Category(Admin Panel)]
 *      summary: Add New Category to database
 *      parameters:
 *          -   in: header
 *              type: string
 *              value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTIwMzQzMjIxIiwiaWF0IjoxNjYyMjkzNTg3LCJleHAiOjE2NjIyOTcxODd9.JxiPgnJPxtTXmQ70hZUmbEE-sDVqLbs7h4LdSFnDQaM
 *              required: true
 *              name: accesstoken
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      responses:
 *          201:
 *              description: success
 *          400:
 *              description: bad request
 *          500:
 *              description: internal server error
 */
router.post("/add", CategoryController.addCategory);

/**
 * @swagger
 * /admin/category/remove/{categoryId}:
 *  delete:
 *      tags: [Category(Admin Panel)]
 *      summary: Remove A Category By ID From Database
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/RemoveCategory'
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RemoveCategory'
 *      responses:
 *          201:
 *              description: success
 *          400:
 *              description: bad request
 *          500:
 *              description: internal server error
 */

router.delete("/remove/:categoryId", CategoryController.removeCategory);

/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      tags: [Category(Admin Panel)]
 *      summary: Get Parent Categories From Database
 *      responses:
 *          201:
 *              description: success
 *          400:
 *              description: bad request
 *          500:
 *              description: internal server error
 */

router.get("/parents", CategoryController.getParentCategory);

/**
 * @swagger
 * /admin/category/children/{parentId}:
 *  get:
 *      tags: [Category(Admin Panel)]
 *      summary: Get Children of Major Categories From Database
 *      parameters:
 *          -   in: path
 *              type: string
 *              required: true
 *              name: parentId
 *      responses:
 *          201:
 *              description: success
 *          400:
 *              description: bad request
 *          500:
 *              description: internal server error
 */
router.get("/children/:parentId", CategoryController.getChildrenOfParent);

/**
 * @swagger
 * /admin/category/children-all:
 *  get:
 *      tags: [Category(Admin Panel)]
 *      summary: Get Children Categories From Database
 *      responses:
 *          201:
 *              description: success
 *          400:
 *              description: bad request
 *          500:
 *              description: internal server error
 */

router.get("/children-all", CategoryController.getAllCategories);

/**
 * @swagger
 * /admin/category/edit-category/{categoryId}:
 *  patch:
 *      tags: [Category(Admin Panel)]
 *      summary: Edit Category
 *      parameters:
 *          -   in: formData
 *              type: string
 *              required: true
 *              name: title
 *          -   in: path
 *              type: string
 *              required: true
 *              name: categoryId
 *      responses:
 *          201:
 *              description: success
 *          400:
 *              description: bad request
 *          500:
 *              description: internal server error
 */

router.patch("/edit-category/:categoryId", CategoryController.editCategory);

/**
 * @swagger
 * /admin/category/get-category/{categoryId}:
 *  get:
 *      tags: [Category(Admin Panel)]
 *      summary: Get Category  From Database
 *      parameters:
 *          -   in: path
 *              type: string
 *              required: true
 *              name: categoryId
 *      responses:
 *          201:
 *              description: success
 *          400:
 *              description: bad request
 *          500:
 *              description: internal server error
 */

router.get("/get-category/:categoryId", CategoryController.getCategoryById);
module.exports = {
  AdminCategoryRouter: router,
};
