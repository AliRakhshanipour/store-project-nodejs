const {
  ChapterController,
} = require("../../http/controllers/admin/chapter.controller");

const router = require("express").Router();
router.put("/add", ChapterController.addNewChapter); // create new chapter
router.get("/list/:courseId", ChapterController.listOfChapters);
router.patch("/remove/:chapterId", ChapterController.removeChapter);
router.get("/:chapterId", ChapterController.getChapter);

module.exports = {
  AdminChapterRouter: router,
};
