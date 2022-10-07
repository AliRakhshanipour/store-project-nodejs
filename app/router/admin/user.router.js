const {
  UserController,
} = require("../../http/controllers/admin/user.controller");

const router = require("express").Router();

router.get("/list", UserController.getUsers);
router.get("/get-user/:userId", UserController.getUserById);
router.patch("/update/:userId", UserController.updateUser);

module.exports = {
  AdminUserRouter: router,
};
