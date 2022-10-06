const createHttpError = require("http-errors");
const { episodeValidator } = require("../../validators/admin/course.schema");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { Controller } = require("../controller");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { join } = require("path");
const { getTime } = require("../../../utils/get-video-duration");
const { deleteFileInPublic } = require("../../../utils/unlink-file");
const { CourseModel } = require("../../../models/course");

class EpisodeController extends Controller {
  async newEpisode(req, res, next) {
    try {
      const {
        title,
        text,
        type,
        chapterId,
        courseId,
        fileUploadPath,
        file_name,
      } = await episodeValidator.validateAsync(req.body);
      const videoAddress = join(fileUploadPath, file_name);
      const videoURL = `http://localhost:3000/${videoAddress}`;
      const seconds = await getVideoDurationInSeconds(videoURL);
      const time = getTime(seconds);
      const episode = {
        title,
        text,
        type,
        time,
        videoAddress,
      };
      const addEpisodeResult = await CourseModel.updateOne(
        {
          _id: courseId,
          "chapters._id": chapterId,
        },
        {
          $push: {
            "chapters.$.episode": episode,
          },
        }
      );
      if (addEpisodeResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("No Episode Added");
      else
        return res.status(httpStatus.CREATED).json({
          statusCode: httpStatus.CREATED,
          data: { message: "Episode Added Successfully" },
        });
    } catch (error) {
      const video = join(req.body.fileUploadPath, req.body.file_name);
      deleteFileInPublic(video);
      next(createHttpError.BadRequest(error.message));
    }
  }
  async removeEpisode(req, res, next) {
    try {
      const { episodeId } = req.params;
      const removeEpisodeResult = await CourseModel.updateOne(
        {
          "chapters.episode._id": episodeId,
        },
        {
          $pull: {
            "chapters.$.episode": {
              _id: episodeId,
            },
          },
        }
      );
      if (removeEpisodeResult.modifiedCount === 0)
        throw createHttpError.InternalServerError("No Episode Deleted");
      else
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          data: {
            message: "Episode Deleted Successfully",
          },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async editEpisode(req, res, next) {
    try {
      const { episodeId } = req.params;
      console.log(episodeId);
      console.log(req.body);
      const { file_name, fileUploadPath } = req.body;
      if (fileUploadPath && file_name) {
        const videoAddress = join(fileUploadPath, file_name);
        req.body.videoAddress = videoAddress;
        const videoURL = `http://localhost:3000/${videoAddress}`;
        const seconds = await getVideoDurationInSeconds(videoURL);
        const time = getTime(seconds);
        req.body.time = time;
      }
      const data = { ...req.body };
      console.log(data);
      const editEpisodeResult = await CourseModel.updateOne(
        {
          "chapters.episode._id": episodeId,
        },
        {
          $set: {
            "chapters.$.episode": data,
          },
        }
      );
      console.log(editEpisodeResult.modifiedCount);
      if (editEpisodeResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("Episode Update Failed");
      else
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          data: {
            message: "Update Episode Successful",
          },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
}

module.exports = {
  EpisodeController: new EpisodeController(),
};
