const {
  verifyAccessToken,
} = require("../../http/middlewares/verify_access_token");
const { BlogAdminApiRotes } = require("./blog.router");
const { CategoryRoutes } = require("./category.router");
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *    - name: Admin Panel
 *      description: All Actions Of Admin
 *    - name: Category(Admin Panel)
 *      description: All Methods And Routes Of Category Section
 *    - name: Blog(Admin Panel)
 *      description: All Methods And Routes Of Blog Section
 */

router.use("/category", CategoryRoutes);
router.use("/blog", verifyAccessToken, BlogAdminApiRotes);

module.exports = {
  AdminRoutes: router,
};
