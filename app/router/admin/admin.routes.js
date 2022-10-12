const { AdminBlogRouter } = require("./blog.router");
const { AdminCategoryRouter } = require("./category.router");
const { AdminProductRouter } = require("./product.router");
const { AdminCourseRouter } = require("./course.router");
const { AdminChapterRouter } = require("./chapter.router");
const { AdminEpisodeRouter } = require("./episode.router");
const { AdminUserRouter } = require("./user.router");
const { AdminPermissionsRouter } = require("./permission.router");
const { AdminRoleRouter } = require("./role.router");
const router = require("express").Router();

router.use("/category", AdminCategoryRouter);
router.use("/blog", AdminBlogRouter);
router.use("/product", AdminProductRouter);
router.use("/course", AdminCourseRouter);
router.use("/chapter", AdminChapterRouter);
router.use("/episode", AdminEpisodeRouter);
router.use("/user", AdminUserRouter);
router.use("/role", AdminRoleRouter);
router.use("/permissions", AdminPermissionsRouter);

module.exports = {
  AdminRoutes: router,
};
