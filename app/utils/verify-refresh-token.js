const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { redisClient } = require("./redis-init");

const verifyRefreshToken = (token) => {
  return new Promise(async (resolve, reject) => {
    const decodeToken = JWT.decode(token, { complete: true });
    if (!decodeToken)
      return reject(
        createHttpError.Unauthorized("Please Login To Your Account")
      );
    const { phone } = decodeToken.payload;
    const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
    if (!user) reject(createHttpError.Unauthorized("No Account Found"));
    const refreshToken = await redisClient.get(`${user._id}`);
    if (token === refreshToken) return resolve(phone);
    reject(createHttpError.Unauthorized("Login failed , Please try again"));
  });
};

module.exports = {
  verifyRefreshToken,
};
