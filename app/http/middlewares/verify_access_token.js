const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/user.model");
const verifyAccessToken = async (req, res, next) => {
  const headers = req.headers;
  const token = headers?.accesstoken;
  if (token) {
    const decodeToken = JWT.decode(token, { complete: true });
    if (!decodeToken)
      return next(createHttpError.Unauthorized("Please Login To Your Account"));
    const { phone } = decodeToken.payload;
    const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });

    if (!user) throw createHttpError.Unauthorized("No Account Found");
    req.user = user;
    return next();
  }
  return next(createHttpError.Unauthorized("Please Login To Your Account"));
};

module.exports = {
  verifyAccessToken,
};
