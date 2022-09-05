const {
  UserAthController,
} = require("../../http/controllers/user/auth/auth.controller");
const router = require("express").Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      GetOtp:
 *        type: object
 *        required:
 *          - phone
 *        properties:
 *          phone:
 *            type: string
 *            description: user phone number for sign in , sign up
 *      CheckOtp:
 *        type: object
 *        required:
 *          - phone
 *          - code
 *        properties:
 *            phone:
 *              type: string
 *              description: user phone number for sign in , sign up
 *            code:
 *              type: integer
 *              description: received code from get otp
 *      refreshToken:
 *        type: object
 *        required:
 *          - refreshToken
 *        properties:
 *            refreshToken:
 *              type: string
 *              description: refresh token
 */

/**
 * @swagger
 *  tags:
 *    - name: User-Panel
 *      description: user-auth section
 */

/**
 * @swagger
 *   /user/get-otp:
 *
 *    post:
 *       tags: [User-Panel]
 *       summary: login user in user panel with phone number
 *       description: use one time password(otp) login method
 *       requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/GetOtp'
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetOtp'
 *       responses:
 *           201:
 *               description : success
 *           404:
 *               description: not found
 *           400:
 *               description: Bad Request
 *           500:
 *               description: Internal Server Error
 */

router.post("/get-otp", UserAthController.getOtp);

/**
 * @swagger
 *  /user/check-otp:
 *    post:
 *       tags: [User-Panel]
 *       summary: check otp
 *       description: check one time password(otp)that user entered
 *       requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/CheckOtp'
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CheckOtp'
 *       responses:
 *           201:
 *               description : success
 *           404:
 *               description: not found
 *           400:
 *               description: Bad Request
 *           500:
 *               description: Internal Server Error
 */

router.post("/check-otp", UserAthController.checkOtp);

/**
 * @swagger
 *  /user/refresh-token:
 *    post:
 *      tags: [User-Panel]
 *      summary: send refresh token for get new token and refresh token
 *      description: fresh token
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/refreshToken'
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/refreshToken'
 *      responses:
 *        200:
 *          description: success
 */

router.post("/refresh-token", UserAthController.refreshToken);
module.exports = {
  UserAuthRoutes: router,
};
