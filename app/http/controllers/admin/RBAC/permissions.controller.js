const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { PermissionsModel } = require("../../../../models/permissions");
const {
  permissionValidator,
} = require("../../../validators/admin/RBAC.schema");
const { Controller } = require("../../controller");

class PermissionsController extends Controller {
  async getPermissions(req, res, next) {
    try {
      const permissions = await PermissionsModel.find({});
      if (!permissions) throw createHttpError.BadRequest("No Permission Found");
      else
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          data: {
            permissions,
          },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async addPermission(req, res, next) {
    try {
      const { title, description } = req.body;
      await permissionValidator.validateAsync(req.body);
      await this.findPermission(title);
      const permission = await PermissionsModel.create({ title, description });
      if (!permission)
        throw createHttpError.InternalServerError("No Permission Added");
      else
        return res.status(httpStatus.OK).json({
          data: { message: "Permission Added Successfully" },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async deletePermission(req, res, next) {
    try {
      const { id } = req.params;
      const deleteResult = await PermissionsModel.deleteOne({ _id: id });
      if (deleteResult.deletedCount === 0)
        throw createHttpError.BadRequest("No Permission Deleted");
      else
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          data: { message: "Permission Deleted Successfully" },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }

  async findPermission(title) {
    const permission = await PermissionsModel.findOne({ title });
    if (permission)
      throw createHttpError.BadRequest("This Permission Already Exists");
    else return true;
  }
}

module.exports = {
  PermissionsController: new PermissionsController(),
};
