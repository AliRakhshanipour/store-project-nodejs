const createHttpError = require("http-errors");
const { BlogModel } = require("../../../models/blog.model");
const { stringToArray } = require("../../middlewares/string-to-array");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const { Controller } = require("../controller");
const path = require("path");
const { deleteFileInPublic } = require("../../../utils/unlink-file");
class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      await createBlogSchema.validateAsync(req.body);
      const {
        title,
        text,
        short_text,
        tags,
        category,
        fileUploadPath,
        file_name,
      } = req.body;
      const author = req.user._id;
      const image = path.join(fileUploadPath, file_name);
      const blogTitle = await BlogModel.findOne({ title });
      if (blogTitle)
        throw createHttpError.BadRequest("This Title Already Exists");
      const blog = await BlogModel.create({
        title,
        text,
        short_text,
        tags,
        category,
        image,
        author,
      });
      if (!blog) throw createHttpError.BadRequest("Blog Creation Failed");
      return res.json({
        data: {
          statusCode: 201,
          message: "Blog Creation Successfully Done",
        },
      });
    } catch (error) {
      const image = path.join(req.body.fileUploadPath, req.body.file_name);
      console.log(image);
      deleteFileInPublic(image);
      next(createHttpError.BadRequest(error.message));
    }
  }
  async getBlogById() {
    try {
    } catch (error) {}
  }
  async getListOfBlogs(req, res, next) {
    try {
      const blogs = await BlogModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
      ]);

      return res.status(200).json({ data: { blogs } });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async GetCommentsOfBlog() {
    try {
    } catch (error) {}
  }
  async deleteBlogById() {
    try {
    } catch (error) {}
  }
  async updateBlogById() {
    try {
    } catch (error) {}
  }
}

module.exports = {
  BlogController: new BlogController(),
};
