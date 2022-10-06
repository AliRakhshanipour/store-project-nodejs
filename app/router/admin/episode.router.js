const {
  EpisodeController,
} = require("../../http/controllers/admin/episode.controller");
const { uploadVideo } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add", uploadVideo.single("video"), EpisodeController.newEpisode);
router.delete("/remove/:episodeId", EpisodeController.removeEpisode);
// router.get
router.patch(
  "/edit/:episodeId",
  uploadVideo.single("video"),
  EpisodeController.editEpisode
);

module.exports = {
  AdminEpisodeRouter: router,
};
