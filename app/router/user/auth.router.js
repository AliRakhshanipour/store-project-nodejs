const {
  UserAthController,
} = require("../../http/controllers/user/auth/auth.controller");
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *    name: User-Authentication
 *    description: user-auth section
 */

/**
 * @swagger
 *   /user/get-otp:
 *
 *    post:
 *       tags: [User-Authentication]
 *       summary: login user in user panel with phone number
 *       description: use one time password(otp) login method
 *       parameters:
 *       -   name: phone
 *           description: fa-IRI phone number
 *           in: formData
 *           required: true
 *           type: string
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
 *  tags:
 *    name: check-otp
 *    description: check the validation of user otp
 */

/**
 * @swagger
 *  /user/check-otp:
 *    post:
 *       tags: [check-otp]
 *       summary: check otp
 *       description: check one time password(otp)that user entered
 *       parameters:
 *       -   name: phone
 *           description: fa-IRI phone number
 *           in: formData
 *           required: true
 *           type: string
 *       -   name: code
 *           description: otp code that user entered
 *           in: formData
 *           required: true
 *           type: string
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
module.exports = {
  UserAuthRoutes: router,
};
