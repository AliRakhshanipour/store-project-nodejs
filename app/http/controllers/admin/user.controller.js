const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { UserModel } = require("../../../models/user.model");
const {
  deleteEmptyValuesOfRequest,
} = require("../../../utils/deletePropertyOfRequest");
const {
  userUpdateValidator,
} = require("../../validators/admin/user-profile.schema");
const { Controller } = require("../controller");

class UserController extends Controller {
  async getUsers(req, res, next) {
    try {
      const users = await UserModel.find({});
      if (!users) throw createHttpError.BadRequest("No User Exists");
      return res.status(httpStatus.OK).json({
        data: { users },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async getUserById(req, res, next) {
    try {
      const { userId: id } = req.params;
      const user = await UserModel.findOne({ _id: id });
      if (!user) throw createHttpError.BadRequest("No User Found With This ID");
      else
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          data: {
            user,
          },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async updateUser(req, res, next) {
    try {
      const { userId } = req.params;

      await userUpdateValidator.validateAsync(req.body);
      const data = { ...req.body };
      deleteEmptyValuesOfRequest(data, ["", " ", "0", 0, undefined, null]);
      const user = await UserModel.findOne({ _id: userId });
      if (!user) throw createHttpError.BadRequest("No User Found With This Id");
      await this.phoneCheck(data.phone);
      await this.usernameCheck(data.username);
      await this.emailCheck(data.email);
      const updateResult = await UserModel.updateOne(
        { _id: userId },
        { $set: data }
      );
      return res.status(httpStatus.OK).json({
        data: {
          message: "Update User Successfully done",
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async usernameCheck(username) {
    const user = await UserModel.findOne({ username });
    if (user)
      throw createHttpError.BadRequest("There Is A User With This Username");
  }
  async phoneCheck(phone) {
    const user = await UserModel.findOne({ phone });
    if (user)
      throw createHttpError.BadRequest(
        "There Is A User With This Phone Number"
      );
  }
  async emailCheck(email) {
    const user = await UserModel.findOne({ email });
    if (user)
      throw createHttpError.BadRequest("There Is A User With This Email");
  }
}

module.exports = {
  UserController: new UserController(),
};
