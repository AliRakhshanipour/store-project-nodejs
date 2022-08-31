const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      name: Add-Category
 *      description: Add New Category
 */

/**
 * @swagger
 * /admin/category/add:
 *  post:
 *      tags: [Add-Category]
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
 *  tags:
 *      name: Remove-Category
 *      description: Remove A Category By ID
 */

/**
 * @swagger
 * /admin/category/remove/{categoryId}:
 *  post:
 *      tags: [Remove-Category]
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

router.post("/remove/:categoryId", CategoryController.removeCategory);

/**
 * @swagger
 *  tags:
 *      name: Get-Parent
 *      description: Get Parent Categories
 */

/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      tags: [Get-Parent]
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
 *  tags:
 *      name: Get-Children
 *      description: Get Child Categories
 */

/**
 * @swagger
 * /admin/category/children/{parentId}:
 *  get:
 *      tags: [Get-Children]
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
 *  tags:
 *      name: Get-All-Children
 *      description: Get All Children Categories
 */

/**
 * @swagger
 * /admin/category/children-all:
 *  get:
 *      tags: [Get-All-Children]
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
 *  tags:
 *      name: Add-Category
 *      description: Edit Category
 */

/**
 * @swagger
 * /admin/category/edit-category/{categoryId}:
 *  post:
 *      tags: [Edit-Category]
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

router.post("/edit-category/:categoryId", CategoryController.editCategory);

/**
 * @swagger
 *  tags:
 *      name: Get-Category
 *      description: Get Category by ID
 */

/**
 * @swagger
 * /admin/category/get-category/{categoryId}:
 *  get:
 *      tags: [Get-Category]
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
