const { CategoryRoutes } = require("./category.router");
const router = require("express").Router();

router.use("/category", CategoryRoutes);

module.exports = {
  AdminRoutes: router,
};
