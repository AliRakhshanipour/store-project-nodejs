const path = require("path");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../models/course");
const { Controller } = require("../controller");
const { listOfImages } = require("../../../utils/image-list");
const { courseValidator } = require("../../validators/admin/course.schema");
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
        }).sort({ _id: -1 });
      // sort from last course created to first
      else courses = await CourseModel.find({}).sort({ _id: -1 }); // sort from last course created to first

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
      await courseValidator.validateAsync(req.body);
      const images = listOfImages(req?.files || [], req.body.fileUploadPath);
      req.body.images = images;
      req.body.supplier = req.user._id;
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
      await this.checkExistCourse(req.body.title);
      return res.status(httpStatus.CREATED).json({
        data: {
          statusCode: httpStatus.CREATED,
          message: "Course Creation Successful",
        },
      });
    } catch (error) {
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
  async addNewChapter(req, res, next) {
    try {
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async addNewEpisode(req, res, next) {
    try {
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async checkExistCourse(title) {
    let course = CourseModel.findOne({ title });
    if (course) throw createHttpError.BadRequest("This Title Already Exists");
  }
}

module.exports = {
  CourseController: new CourseController(),
};
