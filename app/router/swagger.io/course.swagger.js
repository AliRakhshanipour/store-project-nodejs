/**
 * @swagger
 *  definitions:
 *      courses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                        type: array
 *                        items:
 *                            type: object
 *                            properties:
 *                                _id:
 *                                    type: string
 *                                    example: 63207f7e0c057f6f60cfec03
 *                                title:
 *                                    type: string
 *                                    example: swift
 *                                text:
 *                                    type: string
 *                                    example: introduction of the course
 *                                short_text:
 *                                    type: string
 *                                    example: summary of the course
 *                                images:
 *                                    type: array
 *                                    example: [route_of_image1,route_of_image2]
 *                                status:
 *                                    type: string
 *                                    example: open | finished | updating
 *                                type:
 *                                    type: string
 *                                    example: cash | free | special
 *                                category:
 *                                    type: string
 *                                    example: "63207acd167e0dfe91f8324b"
 *                                tags:
 *                                    type: array
 *                                    example: [swift , programming]
 *                                price:
 *                                    type: integer
 *                                    example: 12000000
 *                                discount:
 *                                    type: string
 *                                    example: 10%
 *                                studentCount:
 *                                    type: integer
 *                                    example: 320
 *                                supplier:
 *                                    type: object
 *                                    example: {_id: 63207acd167e0dfe91f8324b, name: "John Smith"}
 *
 */

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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/courses'
 *          400:
 *              description: bad request
 *          500:
 *              description: internal server error
 */

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
 *            - status
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
 *            status:
 *               type: string
 *               enum: [open,updating,finished]
 *               description: select status of course
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
 *  definitions:
 *      course:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: 63207f7e0c057f6f60cfec03
 *                  title:
 *                      type: string
 *                      example: swift
 *                  text:
 *                      type: string
 *                      example: introduction of the course
 *                  short_text:
 *                      type: string
 *                      example: summary of the course
 *                  images:
 *                      type: array
 *                      example: images of the course
 *                  status:
 *                      type: string
 *                      example: open | finished | updating
 *                  type:
 *                      type: string
 *                      example: cash | free | special
 *                  category:
 *                      type: string
 *                      example: "63207acd167e0dfe91f8324b"
 *                  tags:
 *                      type: string
 *                      example: [swift , programming]
 *                  price:
 *                      type: string
 *                      example: 12000000
 *                  discount:
 *                      type: string
 *                      example: 10%
 *                  studentCount:
 *                      type: integer
 *                      example: 320
 *                  supplier:
 *                      type: string
 *                      example: ali rakhshanipour
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/course'
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 *
 */

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
