/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Invalid request data
 */
/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/delete-users:
 *   delete:
 *     summary: Delete all users
 *     responses:
 *       200:
 *         description: Successful deletion
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/protected-route:
 *   get:
 *     summary: Protected route
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful request
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/logout:
 *   get:
 *     summary: Log out user
 *     responses:
 *       200:
 *         description: Successful logout
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: Successful request
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/create-post:
 *   post:
 *     summary: Create a new post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: post
 *         description: The post object
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Successful post creation
 *       401:
 *         description: Unauthorized
 */

