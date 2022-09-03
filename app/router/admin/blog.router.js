const {
  BlogController,
} = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/string-to-array");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/blog/:
 *    get:
 *      tags: [Blog(Admin Panel)]
 *      summary: get blogs
 *      parameters:
 *        - in: header
 *          name: accesstoken
 *          value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTEwOTA5MDkwIiwiaWF0IjoxNjYyMTUxMTEzLCJleHAiOjE2NjIxNTQ3MTN9.qOjLSHHbAqz2-Q-gW9dnLTB4-5fH21jPqqhTe2SCgTs
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: success
 */

router.get("/", BlogController.getListOfBlogs);

/**
 * @swagger
 *  /admin/blog/add:
 *    post:
 *      tags: [Blog(Admin Panel)]
 *      summary: create blog document
 *      consumer:
 *        -   multipart/form-data
 *      parameters:
 *        - in: header
 *          name: accesstoken
 *          value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTEwOTA5MDkwIiwiaWF0IjoxNjYyMTUxMTEzLCJleHAiOjE2NjIxNTQ3MTN9.qOjLSHHbAqz2-Q-gW9dnLTB4-5fH21jPqqhTe2SCgTs
 *          required: true
 *          type: string
 *        - in: formData
 *          name: title
 *          required: true
 *          type: string
 *        - in: formData
 *          name: text
 *          required: true
 *          type: string
 *        - in: formData
 *          name: short_text
 *          required: true
 *          type: string
 *        - in: formData
 *          name: tags
 *          example: tag1#tag2#tag3    || str || undefined
 *          required: true
 *          type: string
 *        - in: formData
 *          name: category
 *          required: true
 *          type: string
 *        - in: formData
 *          name: image
 *          required: true
 *          type: file
 *      responses:
 *        200:
 *          description: success
 */

router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  BlogController.createBlog
);

module.exports = {
  BlogAdminApiRotes: router,
};
