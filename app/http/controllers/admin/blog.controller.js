const createHttpError = require("http-errors");
const { BlogModel } = require("../../../models/blog.model");
const { stringToArray } = require("../../middlewares/string-to-array");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const { Controller } = require("../controller");
const path = require("path");
const { deleteFileInPublic } = require("../../../utils/unlink-file");
const { Types } = require("mongoose");
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
  async getBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog({ _id: id });
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
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
  async deleteBlogById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog({ _id: id });
      const deleteResult = await BlogModel.deleteOne({ _id: id });
      if (deleteResult.deletedCount == 0)
        throw createHttpError.BadRequest("Blog Deletion Failed");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "Blog Deleted Successfully",
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async GetCommentsOfBlog() {
    try {
    } catch (error) {}
  }
  async updateBlogById(req, res, next) {
    try {
      const { blogId } = req.params;
      if (req?.body?.fileUploadPath && req?.body?.file_name) {
        req.body.image = path.join(fileUploadPath, file_name);
      }
      const data = req.body;
      let nullishData = ["", " ", 0, undefined, "0", null];
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0)
          data[key] = data[key].map((item) => item.trim());
        let blackList = ["comments", "like", "dislike", "bookmark", "author"];
        if (blackList.includes(key)) delete data[key];
        if (nullishData.includes(data[key])) delete data[key];
      });
      await this.findBlog({ _id: blogId });
      const blogUpdateResult = await BlogModel.updateOne(
        { _id: blogId },
        { $set: data }
      );
      if (blogUpdateResult.modifiedCount == 0)
        throw createHttpError.BadRequest("Blog Update Failed");
      return res.json({
        data: {
          statusCode: 201,
          message: "Blog Updated Successfully",
        },
      });
    } catch (error) {
      deleteFileInPublic(req?.body?.image || "");
      next(createHttpError.BadRequest(error.message));
    }
  }
  async findBlog(query = {}) {
    const blog = await BlogModel.findOne(query).populate([
      { path: "category" },
      { path: "author" },
    ]);
    console.log(blog);
    if (!blog) throw createHttpError.NotFound("Blog Not Found");
    return blog;
  }
}

module.exports = {
  BlogController: new BlogController(),
};
