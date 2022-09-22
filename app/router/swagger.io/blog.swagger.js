/**
 * @swagger
 *  definitions:
 *      blogs:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      blogs:
 *                        type: array
 *                        items:
 *                            type: object
 *                            properties:
 *                                _id:
 *                                    type: string
 *                                    example: 63207f7e0c057f6f60cfec03
 *                                author:
 *                                    type: object
 *                                    example: {_id: 63207f7e0c057f6f60cfec03 , phone: 09111111111 , otp: {code: 13122, expiresIn: 1662230883889},bills: [bill_1, bill_2, bill_3], discount: 10 ,roles: [role_1, role_2, role_3]}
 *                                title:
 *                                    type: string
 *                                    example: blog title
 *                                short_text:
 *                                    type: string
 *                                    example: summary of the blog
 *                                text:
 *                                    type: string
 *                                    example: text of blog
 *                                image:
 *                                    type: string
 *                                    example: path of the image blog
 *                                tags:
 *                                    type: array
 *                                    example: [swift , programming]
 *                                category:
 *                                    type: string
 *                                    example: "63207acd167e0dfe91f8324b"
 *                                like:
 *                                    type: array
 *                                    example: [user_1 , user_2]
 *                                dislike:
 *                                    type: array
 *                                    example: [user_1, user_2]
 *                                bookmark:
 *                                    type: array
 *                                    example: [user_1 , user_2]
 *                                comments:
 *                                    type: array
 *                                    example: [comment_1, comment_2]
 */

/**
 * @swagger
 *  /admin/blog/:
 *    get:
 *      tags: [Blog(Admin Panel)]
 *      summary: get blogs
 *      responses:
 *        200:
 *          description: success
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/blogs'
 */

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
