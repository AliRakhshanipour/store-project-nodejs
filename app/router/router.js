const { IndexRoutes } = require("./api/index.router");
const { UserAuthRoutes } = require("./user/auth.router");

const router = require("express").Router();
router.use("/user", UserAuthRoutes);
router.use("/", IndexRoutes);
module.exports = {
  AllRoutes: router,
};
