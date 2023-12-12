// Define a sample API route
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: create account
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { status: 'Success', message: 'User created successfully' }
 */

// Define a sample API route
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: username
 *         type: string
 *         description: The username for login
 *         required: true
 *       - in: formData
 *         name: password
 *         type: string
 *         description: The password for login
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { token:"Token", username: "username" }
 */
