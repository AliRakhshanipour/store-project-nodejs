const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constants");
const { redisClient } = require("./redis-init");

const signAccessToken = (userId) => {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById({ _id: userId });
    const payLoad = {
      phone: user.phone,
    };
    const secretKey = ACCESS_TOKEN_SECRET_KEY;
    const option = {
      expiresIn: "1h",
    };
    JWT.sign(payLoad, secretKey, option, (error, token) => {
      if (error) reject(createHttpError.InternalServerError("Server Error"));
      resolve(token);
    });
  });
};

const signRefreshToken = (userId) => {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById({ _id: userId });
    const payLoad = {
      phone: user.phone,
    };
    const secretKey = REFRESH_TOKEN_SECRET_KEY;
    const option = {
      expiresIn: "1y",
    };
    JWT.sign(payLoad, secretKey, option, async (error, token) => {
      if (error) reject(createHttpError.InternalServerError("Server Error"));
      await redisClient.SETEX(`${userId}`, 365 * 24 * 60 * 60, token);
      resolve(token);
    });
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
};
