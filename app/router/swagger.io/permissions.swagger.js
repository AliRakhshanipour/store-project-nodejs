/**
 * @swagger
 *  components:
 *      schemas:
 *          Permission:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of the permission
 *                  description:
 *                      type: string
 *                      description : description of the permission
 *          Edit-Permission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of the permission
 *                  description:
 *                      type: string
 *                      description : description of the permission
 *
 */

/**
 * @swagger
 *  /admin/permissions/add:
 *      post:
 *          tags: [Role(Admin Panel)]
 *          summary : add new permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Permission'
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
 *  /admin/permission/edit/{id}:
 *      patch:
 *          tags: [Role(Admin Panel)]
 *          summary : edit permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: permission id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Permission'
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
 *  /admin/permission/delete/{id}:
 *      delete:
 *          tags: [Role(Admin Panel)]
 *          summary : delete permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: permission id
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
 *  /admin/permissions/list:
 *      get:
 *          tags: [Role(Admin Panel)]
 *          summary : get permissions
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: bad Request
 *              500:
 *                  description: internal server error
 */
