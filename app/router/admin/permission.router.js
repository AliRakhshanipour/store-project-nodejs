const {
  PermissionsController,
} = require("../../http/controllers/admin/RBAC/permissions.controller");

const router = require("express").Router();
router.post("/add", PermissionsController.addPermission);
router.get("/list", PermissionsController.getPermissions);
router.delete("/delete/:id", PermissionsController.deletePermission);

module.exports = {
  AdminPermissionsRouter: router,
};
