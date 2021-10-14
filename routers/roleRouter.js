const { Router } = require('express');

const router = new Router();

const RoleController = require('../controller/RoleController');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  responses:
 *    UnauthorizedError:
 *      description: Access token is missing or invalid
 *  schemas:
 *    Role:
 *      type: object
 *      required:
 *        - role
 *      properties:
 *        role:
 *          type: string
 *          description: The role name
 *          example: USER
 *        users:
 *          type: array
 *          description: Array users with this role
 *          items:
 *            type: object
 *            description: User object
 *            properties:
 *              id:
 *                type: integer
 *                format: int64
 *                example: 1
 *              name:
 *                type: string
 *                example: User1
 * security:
 *  - bearerAuth: [Role]
 */

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: The roles managing API
 */

/**
 * @swagger
 * /api/role:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns a list of users
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *            application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 */
router.get('/', RoleController.getAll);

/**
 * @swagger
 * /api/role:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: ADMIN
 *     responses:
 *       200:
 *         description: The role was successfully created
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: role successfully created
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Role already exists OR Empty input
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: role with name EXAMPLE already exists OR Invalid input
 *
 */
router.post('/', RoleController.creat);

module.exports = router;
