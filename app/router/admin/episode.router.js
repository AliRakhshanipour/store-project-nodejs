const {
  EpisodeController,
} = require("../../http/controllers/admin/episode.controller");
const { uploadVideo } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add", uploadVideo.single("video"), EpisodeController.newEpisode);
// router.get
// router.patch
// router.delete

module.exports = {
  AdminEpisodeRouter: router,
};
