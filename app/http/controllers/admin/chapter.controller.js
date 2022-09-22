const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../models/course");
const { Controller } = require("../controller");
const { CourseController } = require("./course.controller");

class ChapterController extends Controller {
  async addNewChapter(req, res, next) {
    try {
      const { id, title, text } = req.body;
      const course = await CourseModel.findOne({ _id: id });
      if (!course) throw createHttpError.NotFound("No course Found");
      const saveChapterResult = await CourseModel.updateOne(
        { _id: id },
        {
          $push: {
            chapters: { title, text, episode: [] },
          },
        }
      );
      if (saveChapterResult.modifiedCount == 0)
        throw createHttpError.BadRequest("chapter addition unsuccessful");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "Chapter Added Successfully",
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async listOfChapters(req, res, next) {
    try {
      const { courseId } = req.params;
      const chapters = await this.getChapters(courseId);
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          chapters,
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async getChapter(req, res, next) {
    try {
      const { chapterId } = req.params;
      const chapter = await this.getOneChapter(chapterId);
      return res
        .status(httpStatus.OK)
        .json({ statusCode: httpStatus.OK, data: { chapter } });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async getChapters(id) {
    const chapters = await CourseModel.findOne({ _id: id }, { chapters: 1 });
    if (!chapters) createHttpError.NotFound("Course Not Found");
    return chapters;
  }
  async getOneChapter(id) {
    const chapter = await CourseModel.findOne(
      { "chapters._id": id },
      { "chapters.$": 1 }
    );
    if (!chapter) throw createHttpError.NotFound("No Chapter Found");
    else return chapter;
  }
}

module.exports = {
  ChapterController: new ChapterController(),
};
