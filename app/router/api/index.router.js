const {
  HomeController,
} = require("../../http/controllers/api/home.controller");
const {
  verifyAccessToken,
} = require("../../http/middlewares/verify_access_token");
const router = require("express").Router();
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: Index Page Route And Data
 */
/**
 * @swagger
 * /:
 *  tag: IndexPage
 *  get:
 *    tags: [IndexPage]
 *    summary: index of route
 *    description: get all need data for index page
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        example: Bearer token....
 *    responses:
 *      200:
 *        description: success
 *      404:
 *        description: not found
 */

router.get("/", verifyAccessToken, HomeController.indexPage);
module.exports = {
  IndexRoutes: router,
};
