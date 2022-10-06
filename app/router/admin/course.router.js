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
router.patch(
  "/edit/:id",
  uploadFile.array("images", 5),
  stringToArray("tags"),
  CourseController.editCourse
);

// router.post("/"); // create a course
// router.put("/"); // create a episode
// router.delete("/");

module.exports = {
  AdminCourseRouter: router,
};
