const path = require("path");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../models/course");
const { Controller } = require("../controller");
const { listOfImages } = require("../../../utils/image-list");
const {
  courseValidator,
  objectIdValidator,
} = require("../../validators/admin/course.schema");
const { deleteFileInPublic } = require("../../../utils/unlink-file");
const { isValidObjectId } = require("mongoose");
const {
  deletePropertyOfRequest,
  deleteEmptyValuesOfRequest,
} = require("../../../utils/deletePropertyOfRequest");

class CourseController extends Controller {
  async getCourses(req, res, next) {
    try {
      const { search } = req?.query;
      let courses;
      if (search)
        await CourseModel.find({
          $text: {
            $search: search,
          },
        })
          .populate([
            { path: "category", select: { children: 0, parent: 0 } },
            {
              path: "supplier",
              select: { file_name: 1, last_name: 1, phone: 1, email: 1 },
            },
          ])
          .sort({ _id: -1 });
      // sort from last course created to first
      else
        courses = await CourseModel.find({})
          .populate([
            { path: "category", select: { children: 0, parent: 0 } },
            {
              path: "supplier",
              select: { file_name: 1, last_name: 1, phone: 1, email: 1 },
            },
          ])
          .sort({ _id: -1 }); // sort from last course created to first

      if (!courses) throw createHttpError.NotFound("No Course Found");
      return res.status(httpStatus.OK).json({
        data: {
          courses,
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async createCourse(req, res, next) {
    try {
      await this.checkExistCourse(req.body.title);
      await courseValidator.validateAsync(req.body);
      const images = listOfImages(req?.files || [], req.body.fileUploadPath);
      req.body.images = images;
      req.body.supplier = req.user._id;
      const { price, type } = req.body;
      if (Number(price) > 0 && type === "free")
        throw createHttpError.BadRequest(
          "For Free Courses ,You Can Not Set Price"
        );
      let data = { ...req.body };
      Object.keys(data).forEach((key) => {
        if (data[key] == "" || data[key] == null) {
          delete data[key];
        }
        if (key == "fileUploadPath" || key == "file_name") {
          delete data[key];
        }
      });
      const course = await CourseModel.create(data);
      if (!course)
        throw createHttpError.BadRequest("Course Creation Unsuccessful");
      return res.status(httpStatus.CREATED).json({
        data: {
          statusCode: httpStatus.CREATED,
          message: "Course Creation Successful",
        },
      });
    } catch (error) {
      const image = path.join(req.body.fileUploadPath, req.body.file_name);
      deleteFileInPublic(image);
      next(createHttpError.BadRequest(error.message));
    }
  }
  async getCourse(req, res, next) {
    try {
      const { id } = req.params;
      const course = await CourseModel.findOne({ _id: id });
      if (!course)
        throw createHttpError.NotFound("No Course Found With This Id");
      return res.status(httpStatus.OK).json({
        data: {
          statusCode: httpStatus.OK,
          course,
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async editCourse(req, res, next) {
    try {
      const { id } = req.params;
      await objectIdValidator.validateAsync({ id });
      await this.findCourseById(id);
      const images = listOfImages(req?.files || [], req.body.fileUploadPath);
      req.body.images = images;
      let data = { ...req.body };
      deletePropertyOfRequest(data, ["fileUploadPath", "file_name"]);
      let blackListEmptyValues = ["", " ", 0, "0", [], null, undefined];
      deleteEmptyValuesOfRequest(data, blackListEmptyValues);
      const updateResult = await CourseModel.updateOne(
        { _id: id },
        { $set: data }
      );
      if (updateResult.modifiedCount === 0)
        throw createHttpError.BadRequest("Update Failed");
      else
        return res.status(httpStatus.OK).json({
          data: {
            message: "Edit Course Successfully",
          },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async deleteCourse(req, res, next) {
    try {
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async findCourseById(id) {
    let course = await CourseModel.findOne({ _id: id });
    if (!course) throw createHttpError.NotFound("No Course Found");
    return course;
  }
  async checkExistCourse(title) {
    try {
      let checkCourse = await CourseModel.findOne({ title: title });
      if (checkCourse)
        throw createHttpError.BadRequest("This Title Already Exists");
    } catch (error) {
      throw createHttpError.BadRequest(error.message);
    }
  }
}

module.exports = {
  CourseController: new CourseController(),
};
