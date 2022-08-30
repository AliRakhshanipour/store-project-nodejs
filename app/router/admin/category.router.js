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
module.exports = {
  CategoryRoutes: router,
};
