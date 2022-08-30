const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { UserModel } = require("../../../../models/user.model");
const { ROLES, EXPIRES_IN } = require("../../../../utils/constants");

const {
  randomNumberGenerator,
} = require("../../../../utils/random-number-generator");
const {
  signAccessToken,
  signRefreshToken,
} = require("../../../../utils/token-generator");
const {
  verifyRefreshToken,
} = require("../../../../utils/verify-refresh-token");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const { Controller } = require("../../controller");

class UserAthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { phone } = req.body;
      const code = randomNumberGenerator();
      const result = await this.saveUser(phone, code);
      if (!result)
        throw createHttpError.Unauthorized("Unsuccessful Logging In");
      return res.status(200).send({
        statusCode: 200,
        message: "Authorization Code Sent Successfully",
        code,
        phone,
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { phone, code } = req.body;
      const user = await UserModel.findOne({ phone });
      if (!user) createHttpError.NotFound("User Not Found");
      if (user.otp.code != code)
        throw createHttpError.Unauthorized("Code Is Not Correct");
      const now = Date.now();
      if (now > +user.otp.expiresIn)
        throw createHttpError.Unauthorized("Code Has Expired");
      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);

      return res.json({ data: { accessToken, refreshToken } });
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const phone = await verifyRefreshToken(refreshToken);
      const user = await UserModel.findOne({ phone });
      const accessToken = await signAccessToken(user._id);
      const newRefreshToken = await signRefreshToken(user._id);
      return res.json({ data: { accessToken, refreshToken: newRefreshToken } });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }

  async saveUser(phone, code) {
    let otp = {
      code,
      expiresIn: EXPIRES_IN(),
    };
    const result = await this.checkExistUser(phone);
    console.log(result);
    if (result) {
      return await this.updateUser(phone, otp);
    }
    return !!(await UserModel.create({ phone, otp, roles: [ROLES.USER] }));
  }
  async checkExistUser(phone) {
    const user = await UserModel.findOne({ phone });
    return !!user;
  }
  async updateUser(phone, objectData = {}) {
    Object.keys(objectData).forEach(async (key) => {
      if (["", " ", null, undefined, 0].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { phone },
      { $set: { otp: objectData } }
    );
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAthController: new UserAthController(),
};
