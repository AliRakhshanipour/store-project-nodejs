const {
  CourseController,
} = require("../../http/controllers/admin/course.controller");
const { stringToArray } = require("../../http/middlewares/string-to-array");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/course/list:
 *   get:
 *      tags: [Course(Admin Panel)]
 *      summary: Get all courses
 *      parameters:
 *        - in: query
 *          name: search
 *          description: search in all courses with title , text , short_text
 *          type: string
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: bad request
 *          500:
 *              description: internal server error
 */

router.get("/list", CourseController.getCourses); //get all courses

/**
 * @swagger
 *  components:
 *   schemas:
 *      Course:
 *          type: object
 *          required:
 *            - title
 *            - text
 *            - short_text
 *            - category
 *            - images
 *            - type
 *          properties:
 *            title:
 *               type: string
 *               description: title of the product
 *            text:
 *               type: string
 *               description: description of the product
 *            short_text:
 *               type: string
 *               description: short description of the product
 *            images:
 *               type: array
 *               items:
 *                  type: string
 *                  format: binary
 *               description: images of product
 *            type:
 *               type: string
 *               enum: [free,cash,special]
 *               description: select type of course
 *            category:
 *               type: string
 *               description: category of the product
 *            tags:
 *               type: array
 *               description: tags of the product
 *            price:
 *               type: string
 *               description: price of the product
 *            discount:
 *               type: string
 *               description: discount of the product

 *
 *
 */

/**
 * @swagger
 *  /admin/course/add:
 *   post:
 *          tags: [Course(Admin Panel)]
 *          summary: create and save products
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 *
 */

router.post(
  "/add",
  uploadFile.array("images", 5),
  stringToArray("tags"),
  CourseController.createCourse
);

/**
 * @swagger
 *  /admin/course/{id}:
 *   get:
 *      tags: [Course(Admin Panel)]
 *      summary: Get a course
 *      parameters:
 *        - in: path
 *          name: id
 *          description: get course with id
 *          type: string
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: bad request
 *          500:
 *              description: internal server error
 */

router.get("/:id", CourseController.getCourse); //get a course
// router.post("/"); // create a course
// router.put("/"); // create a episode
// router.put("/"); // create new chapter
// router.patch("/");
// router.delete("/");

module.exports = {
  AdminCourseRouter: router,
};
