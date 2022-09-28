/**
 * @swagger
 *  components:
 *   schemas:
 *      add-episode:
 *          type: object
 *          required:
 *              -   title
 *              -   text
 *              -   type
 *              -   video
 *              -   courseId
 *              -   chapterId
 *          properties:
 *              title:
 *                  type: string
 *                  example: title of episode
 *              text:
 *                  type: string
 *                  example: text of episode
 *              type:
 *                  type: string
 *                  example: type of episode (lock | unlock)
 *                  enum: [lock,unlock]
 *              video:
 *                  type: string
 *                  example: episode time (00:00:00)
 *                  format: binary
 *              courseId:
 *                  type: string
 *                  example: ID of course
 *              chapterId:
 *                  type: string
 *                  example: ID of chapter
 */

/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode(Admin Panel)]
 *          summary: add new Episode
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/add-episode'
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
 *  /admin/episode/remove/{episodeId}:
 *      delete:
 *          tags:[Episode(Admin Panel)]
 *          summary: remove episode
 *          parameters:
 *              -   in: path
 *                  name: episodeId
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */
