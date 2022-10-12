const createHttpError = require("http-errors");
const { PermissionsModel } = require("../../models/permissions");
const { RoleModel } = require("../../models/role.schema");

const checkPermission = (requiredPermission = []) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const role = await RoleModel.findOne({ title: user.role });
      const permissions = await PermissionsModel.find({
        _id: { $in: role.permissions },
      });
      console.log(requiredPermission);
      const userPermissions = permissions.map((item) => item.title);
      console.log(userPermissions);
      const hasPermission = requiredPermission.every((permission) =>
        userPermissions.includes(permission)
      );
      if (hasPermission || requiredPermission.length === 0) return next();
      throw createHttpError.Forbidden("No Access To This Section");
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  checkPermission,
};
