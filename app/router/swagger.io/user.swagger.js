/**
 * @swagger
 *  /admin/user/list:
 *   get:
 *          tags: [Users(Admin Panel)]
 *          summary: get All Users
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 *
 *
 */

/**
 * @swagger
 *  /admin/user/get-user/{userId}:
 *      get:
 *          tags: [Users(Admin Panel)]
 *          summary: get User With Id
 *          parameters:
 *              -   in: path
 *                  name: userId
 *                  description: get user with id
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 *
 *
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Update:
 *              type: object
 *              required:
 *                  -   username
 *                  -   phone
 *                  -   email
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: first name of user
 *                  last_name:
 *                      type: string
 *                      description: last_name of user
 *                  username:
 *                      type: string
 *                      description: username
 *                  phone:
 *                      type: string
 *                      description: phone number of user
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  birthday:
 *                      type: string
 *                      description: birthday of user
 */

/**
 * @swagger
 *  /admin/user/update/{userId}:
 *      patch:
 *          tags: [Users(Admin Panel)]
 *          summary: Update a user
 *          parameters:
 *              -   in: path
 *                  name: userId
 *                  description: User ID
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Update'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Update'
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 *
 *
 *
 *
 */
