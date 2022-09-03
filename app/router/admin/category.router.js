const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();

/**
 * @swagger
 * /admin/category/add:
 *  post:
 *      tags: [Category(Admin Panel)]
 *      summary: Add New Category to database
 *      parameters:
 *          -   in: formData
 *              type: string
 *              required: true
 *              name: title
 *          -   in: formData
 *              type: string
 *              name: parent
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
  CategoryRoutes: router,
};
