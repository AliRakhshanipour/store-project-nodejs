const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/user.model");

const getToken = (headers) => {
  if (headers?.authorization) {
    return headers.authorization.split(" ")[1];
  }
  return headers.accesstoken;
};

const verifyAccessToken = async (req, res, next) => {
  const token = getToken(req.headers);
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

const checkRole = (role) => {
  return (req, res, next) => {
    try {
      const user = req.user;
      if (!user.roles.includes(role))
        throw createHttpError.Forbidden("Access Denied");
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  verifyAccessToken,
  checkRole,
};
