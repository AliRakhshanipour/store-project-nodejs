const { AdminBlogRouter } = require("./blog.router");
const { AdminCategoryRouter } = require("./category.router");
const { AdminProductRouter } = require("./product.router");
const { AdminCourseRouter } = require("./course.router");
const { AdminChapterRouter } = require("./chapter.router");
const { AdminEpisodeRouter } = require("./episode.router");
const router = require("express").Router();

router.use("/category", AdminCategoryRouter);
router.use("/blog", AdminBlogRouter);
router.use("/product", AdminProductRouter);
router.use("/course", AdminCourseRouter);
router.use("/chapter", AdminChapterRouter);
router.use("/episode", AdminEpisodeRouter);

module.exports = {
  AdminRoutes: router,
};
