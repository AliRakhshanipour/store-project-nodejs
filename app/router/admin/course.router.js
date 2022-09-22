const {
  CourseController,
} = require("../../http/controllers/admin/course.controller");
const { stringToArray } = require("../../http/middlewares/string-to-array");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/list", CourseController.getCourses); //get all courses

router.post(
  "/add",
  uploadFile.array("images", 5),
  stringToArray("tags"),
  CourseController.createCourse
); // add a new course

router.get("/:id", CourseController.getCourse); //get a course

// router.post("/"); // create a course
// router.put("/"); // create a episode
// router.patch("/");
// router.delete("/");

module.exports = {
  AdminCourseRouter: router,
};
