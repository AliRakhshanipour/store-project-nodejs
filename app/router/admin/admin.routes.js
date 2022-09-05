const {
  verifyAccessToken,
} = require("../../http/middlewares/verify_access_token");
const { AdminBlogRouter } = require("./blog.router");
const { AdminCategoryRouter } = require("./category.router");
const { AdminProductRouter } = require("./product.router");
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *    - name: Admin Panel
 *      description: All Actions Of Admin
 *    - name: Product(Admin Panel)
 *      description: All Methods And Routes Of Product Section
 *    - name: Category(Admin Panel)
 *      description: All Methods And Routes Of Category Section
 *    - name: Blog(Admin Panel)
 *      description: All Methods And Routes Of Blog Section
 */

router.use("/category", AdminCategoryRouter);
router.use("/blog", AdminBlogRouter);
router.use("/product", AdminProductRouter);

module.exports = {
  AdminRoutes: router,
};
