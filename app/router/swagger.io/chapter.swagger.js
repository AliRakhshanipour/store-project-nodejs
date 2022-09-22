/**
 * @swagger
 *  components:
 *   schemas:
 *      Add-Chapter:
 *          type: object
 *          required:
 *              -   id
 *              -   title
 *          properties:
 *              id:
 *                  type: string
 *                  example: 63207f7e0c057f6f60cfec03
 *              title:
 *                  type: string
 *                  example: chapter 1 zero - hero JS
 *              text:
 *                  type: string
 *                  example: description of chapter
 */

/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [Chapter(Admin Panel)]
 *          summary: create new Chapter for courses
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Add-Chapter'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Add-Chapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinitions'
 */

/**
 * @swagger
 *  /admin/chapter/list/{courseId}:
 *      get:
 *          tags: [Chapter(Admin Panel)]
 *          summary: get Chapters of a given course
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: courseId
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinitions'
 */

/**
 * @swagger
 *  /admin/chapter/{chapterId}:
 *      get:
 *          tags: [Chapter(Admin Panel)]
 *          summary: get one chapter
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: chapterId
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinitions'
 */

/**
 * @swagger
 *  /admin/chapter/remove/{chapterId}:
 *      patch:
 *          tags: [Chapter(Admin Panel)]
 *          summary: get one chapter
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: chapterId
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinitions'
 */
