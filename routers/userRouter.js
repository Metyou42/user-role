const { Router } = require('express');

const router = new Router();

const UserController = require('../controller/UserController');

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: The user name
 *          example: User1
 *        roles:
 *          type: array
 *          description: Array users role
 *          items:
 *            type: string
 *            example: USER
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns a list of users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *            application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 */
router.get('/', UserController.getAll);

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Return a user self
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The user self
 *         content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 */
router.get('/me', UserController.getSelf);

/**
 * @swagger
 * /api/user/registration:
 *   post:
 *     summary: Create new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: User2
 *     responses:
 *       200:
 *         description: User Token
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: User with name EXAMPLE already exists OR empty input
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User with name User2 already exists
 *
 */
router.post('/registration', UserController.registration);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: User2
 *     responses:
 *       200:
 *         description: User Token
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: User with name EXAMPLE does not exist OR empty input
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User with name User3 does not exist
 *
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /api/user:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Change user info, after change need use new token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User Token
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Username already occupied OR Ivalidn role OR empty input
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username already occupied
 *
 */
router.put('/', UserController.changeInfo);

/**
 * @swagger
 * /api/user:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully deleted
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: Successfully deleted
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete('/', UserController.delete);

module.exports = router;
