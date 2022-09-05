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
 *      consumes:
 *        -   multipart/form-data
 *      parameters:
 *        - in: header
 *          name: accesstoken
 *          value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTEwOTA5MDkwIiwiaWF0IjoxNjYyMjMwNzc0LCJleHAiOjE2NjIyMzQzNzR9.VdcAx1UkJxmlP7ZtxQMlvqOEfG6B6676OMb3AKTi9NA
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

/**
 * @swagger
 *  /admin/blog/get-blog/{id}:
 *    get:
 *      tags: [Blog(Admin Panel)]
 *      summary: get blog by id
 *      parameters:
 *        - in: header
 *          name: accesstoken
 *          value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTEwOTA5MDkwIiwiaWF0IjoxNjYyMTUxMTEzLCJleHAiOjE2NjIxNTQ3MTN9.qOjLSHHbAqz2-Q-gW9dnLTB4-5fH21jPqqhTe2SCgTs
 *          required: true
 *          type: string
 *        - in: path
 *          name: id
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: success
 */

router.get("/get-blog/:id", BlogController.getBlogById);

/**
 * @swagger
 *  /admin/blog/delete-blog/{id}:
 *    delete:
 *      tags: [Blog(Admin Panel)]
 *      summary: delete blog by id
 *      parameters:
 *        - in: header
 *          name: accesstoken
 *          value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTEwOTA5MDkwIiwiaWF0IjoxNjYyMTUxMTEzLCJleHAiOjE2NjIxNTQ3MTN9.qOjLSHHbAqz2-Q-gW9dnLTB4-5fH21jPqqhTe2SCgTs
 *          required: true
 *          type: string
 *        - in: path
 *          name: id
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: success
 */

router.delete("/delete-blog/:id", BlogController.deleteBlogById);

/**
 * @swagger
 *  /admin/blog/update/{blogId}:
 *    patch:
 *      tags: [Blog(Admin Panel)]
 *      summary: update blog document
 *      consumes:
 *        -   multipart/form-data
 *      parameters:
 *        - in: header
 *          name: accesstoken
 *          value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTEwOTA5MDkwIiwiaWF0IjoxNjYyMTUxMTEzLCJleHAiOjE2NjIxNTQ3MTN9.qOjLSHHbAqz2-Q-gW9dnLTB4-5fH21jPqqhTe2SCgTs
 *          required: true
 *          type: string
 *        - in: path
 *          name: blogId
 *          required: true
 *          type: string
 *        - in: formData
 *          name: title
 *          type: string
 *        - in: formData
 *          name: text
 *          type: string
 *        - in: formData
 *          name: short_text
 *          type: string
 *        - in: formData
 *          name: tags
 *          example: tag1#tag2#tag3    || str || undefined
 *          type: string
 *        - in: formData
 *          name: category
 *          type: string
 *        - in: formData
 *          name: image
 *          type: file
 *      responses:
 *        200:
 *          description: success
 *        400:
 *          description: bad request
 */

router.patch(
  "/update/:blogId",
  uploadFile.single("image"),
  stringToArray("tags"),
  BlogController.updateBlogById
);
module.exports = {
  AdminBlogRouter: router,
};
