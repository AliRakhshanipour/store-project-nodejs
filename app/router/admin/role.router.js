const {
  RoleController,
} = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../http/middlewares/string-to-array");

const router = require("express").Router();

router.get("/list", RoleController.getListOfRoles);
router.post("/add", stringToArray("permissions"), RoleController.addRole);
router.delete("/delete/:id", RoleController.deleteRole);
router.patch(
  "/edit/:id",
  stringToArray("permissions"),
  RoleController.editRole
);

module.exports = {
  AdminRoleRouter: router,
};
