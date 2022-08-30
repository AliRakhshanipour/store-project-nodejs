const router = require("express").Router();
const bcrypt = require("bcrypt");
const { randomNumberGenerator } = require("../utils/random-number-generator");
/**
 * @swagger
 *  tags:
 *    name: Developer-Route
 *    description: a backdoor for developer to do something necessary immediately
 */

/**
 * @swagger
 *  /dev-route/hash-password/{password}:
 *    get:
 *      tags: [Developer-Route]
 *      summary: hash data with bcrypt
 *      parameters:
 *        - in: path
 *          type: string
 *          name: password
 *          required: true
 *      responses:
 *        200:
 *          description: success
 */

router.get("/hash-password/:password", (req, res, next) => {
  const { password } = req.params;
  const salt = bcrypt.genSaltSync(10);
  return res.send(bcrypt.hashSync(password, salt));
});

/**
 * @swagger
 *  tags:
 *    name: Developer-Route
 *    description: a backdoor for developer to do something necessary immediately
 */

/**
 * @swagger
 *  /dev-route/random-number:
 *    get:
 *      tags: [Developer-Route]
 *      summary: generate random number
 *      responses:
 *        200:
 *          description: success
 */

router.get("/random-number", (req, res, next) => {
  return res.send({ number: randomNumberGenerator() });
});

module.exports = {
  DeveloperRoutes: router,
};
