const createHttpError = require("http-errors");
const { RoleModel } = require("../../../../models/role.schema");
const { Controller } = require("../../controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { roleValidator } = require("../../../validators/admin/RBAC.schema");
const {
  deleteEmptyValuesOfRequest,
} = require("../../../../utils/deletePropertyOfRequest");

class RoleController extends Controller {
  async getListOfRoles(req, res, next) {
    try {
      const roles = await RoleModel.find({});
      if (!roles) throw createHttpError.NotFound("No Role Found");
      else
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          data: {
            roles,
          },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async addRole(req, res, next) {
    try {
      const { title, permissions } = req.body;
      await this.findRoleByTitle(title);
      console.log(req.body);
      await roleValidator.validateAsync(req.body);
      const role = await RoleModel.create({ title, permissions });
      if (!role) throw createHttpError.InternalServerError("No Role Added");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: { message: "Role Added Successfully" },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async deleteRole(req, res, next) {
    try {
      const { id } = req.params;
      const deleteResult = await RoleModel.deleteOne({ _id: id });
      if (deleteResult.deletedCount == 0)
        throw createHttpError.InternalServerError("No Role Deleted");
      else
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          data: { message: "Role Deleted Successfully" },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async editRole(req, res, next) {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      deleteEmptyValuesOfRequest(data, ["", " ", null, undefined]);
      const role = await RoleModel.findOne({ _id: id });
      if (!role) throw createHttpError.NotFound("No Role Found To Edit");
      const updateResult = await RoleModel.updateOne(
        { _id: id },
        { $push: data }
      );
      if (updateResult.matchedCount === 0)
        throw createHttpError.BadRequest("Update Role Failed");
      else
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          data: {
            message: "Role Updated Successfully",
          },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async findRoleByTitle(title) {
    const role = await RoleModel.findOne({ title });
    if (role) throw createHttpError.BadRequest("This Role Already Exists");
    else return true;
  }
}

module.exports = {
  RoleController: new RoleController(),
};
