const {
  BlogController,
} = require("../../http/controllers/admin/blog.controller.js");
const { stringToArray } = require("../../http/middlewares/string-to-array");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/", BlogController.getListOfBlogs);

router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  BlogController.createBlog
);

router.get("/get-blog/:id", BlogController.getBlogById);

router.delete("/delete-blog/:id", BlogController.deleteBlogById);

router.patch(
  "/update/:blogId",
  uploadFile.single("image"),
  stringToArray("tags"),
  BlogController.updateBlogById
);
module.exports = {
  AdminBlogRouter: router,
};
