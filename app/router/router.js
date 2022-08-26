const { IndexRoutes } = require("./api/index.router");

const router = require("express").Router();

router.use("/", IndexRoutes);
module.exports = {
  AllRoutes: router,
};
