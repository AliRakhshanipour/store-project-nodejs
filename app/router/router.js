const { AdminRoutes } = require("./admin/admin.routes");
const { IndexRoutes } = require("./api/index.router");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth.router");
// redis config
// const { redisClient } = require("../utils/redis-init");

// (async () => {
//   await redisClient.set("key", "value");
//   const value = await redisClient.get("key");
//   console.log(value);
// })();

const router = require("express").Router();
router.use("/dev-route", DeveloperRoutes);
router.use("/user", UserAuthRoutes);
router.use("/", IndexRoutes);
router.use("/admin", AdminRoutes);
module.exports = {
  AllRoutes: router,
};
