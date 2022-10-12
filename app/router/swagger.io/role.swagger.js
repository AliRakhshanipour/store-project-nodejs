/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of the role
 *                  permissions:
 *                      type: array
 *                      description : permissions of the role
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of the role
 *                  permissions:
 *                      type: array
 *                      description : permissions of the role
 *
 */

/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [Role(Admin Panel)]
 *          summary : add new role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: bad Request
 *              500:
 *                  description: internal server error
 */

/**
 * @swagger
 *  /admin/role/edit/{id}:
 *      patch:
 *          tags: [Role(Admin Panel)]
 *          summary : edit role
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: role id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Role'
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: bad Request
 *              500:
 *                  description: internal server error
 */

/**
 * @swagger
 *  /admin/role/delete/{id}:
 *      delete:
 *          tags: [Role(Admin Panel)]
 *          summary : delete role
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: role id
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: bad Request
 *              500:
 *                  description: internal server error
 */

/**
 * @swagger
 *  /admin/role/list:
 *      get:
 *          tags: [Role(Admin Panel)]
 *          summary : get roles
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: bad Request
 *              500:
 *                  description: internal server error
 */
