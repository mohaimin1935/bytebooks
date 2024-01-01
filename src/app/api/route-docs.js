/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         image:
 *           type: string
 *         role:
 *           type: string
 *
 *
 *
 *
 *
 *
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 *
 *
 *     SignInResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             expires:
 *               type: string
 *             user:
 *               $ref: '#/components/schemas/User'
 *         status:
 *           type: string
 *
 *
 *
 *
 *
 *
 */

//! Authentication
/**
 * @swagger
 * /signin:
 *   post:
 *     tags:
 *       - Authetication
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
 *       '400':
 *         description: Invalid input
 *       '401':
 *         description: Wrong credential
 *
 *
 *
 * /register:
 *   post:
 *     tags:
 *       - Authetication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       '201':
 *         description: Success
 *       '400':
 *          description: Invalid input
 *       '409':
 *          description: Email already exists
 *
 *
 * /reset:
 *   post:
 *     tags:
 *       - Authetication
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Invalid input
 *
 *
 */

// ! Book
/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Book Info
 *     summary: Add a book
 *
 *
 * /books/{bookid}:
 *   get:
 *     tags:
 *       - Book Info
 *     summary: Get book info
 *
 *
 *   put:
 *     tags:
 *       - Book Info
 *     summary: Edit a book
 *
 *
 *   delete:
 *     tags:
 *       - Book Info
 *     summary: Delete a book
 *
 *
 * /books/{bookid}/chapters:
 *   get:
 *     tags:
 *       - Book Chapter
 *     summary: Get all chapters of a book
 *
 *
 *   post:
 *     tags:
 *       - Book Chapter
 *     summary: Add a chapter to a book
 *
 *
 * /books/{bookid}/chapters/{chapterid}:
 *   get:
 *     tags:
 *       - Book Chapter
 *     summary: Get a specific chapter to a book
 *
 *
 *   put:
 *     tags:
 *       - Book Chapter
 *     summary: Edit a specific chapter of a book
 *
 *
 *   delete:
 *     tags:
 *       - Book Chapter
 *     summary: Delete a specific chapter of a book
 *

 * /books/{bookid}/bytes:
 *   get:
 *     tags:
 *       - Book Byte
 *
 *
 *   post:
 *     tags:
 *       - Book Byte
 *
 *
 * /books/{bookid}/bytes/{byteid}:
 *   get:
 *     tags:
 *       - Book Byte
 *
 *
 *   put:
 *     tags:
 *       - Book Byte
 *
 *
 *   delete:
 *     tags:
 *       - Book Byte
 *
 *
 *
 *
 *
 */

// !User
/**
 * @swagger
 * /users/{userid}:
 *   get:
 *     summary: Get details of an user
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Success
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not found
 *
 *   put:
 *     summary: Edit user details
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *       '401':
 *       '403':
 *       '404':
 *
 *   delete:
 *     summary: Delete an user
 *     tags:
 *       - User
 *     responses:
 *       '204':
 *       '401':
 *       '403':
 *       '404':
 *
 * /users/{userid}/change-password:
 *   post:
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *       '400':
 *       '401':
 *       '403':
 *
 * /users/{userid}/stat:
 *   get:
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *       '401':
 *       '404':
 *
 *
 *
 */

// ! Notification
/**
 * @swagger
 *
 * /users/{userid}/notifications:
 *   get:
 *     tags:
 *       - User Notifications
 *     responses:
 *       '200':
 *       '401':
 *       '403':
 *       '404':
 *
 *   post:
 *     tags:
 *       - User Notifications
 *     responses:
 *       '201':
 *       '401':
 *       '403':
 *       '404':
 *
 * /users/{userid}/notifications/{notificationid}:
 *   get:
 *     tags:
 *       - User Notifications
 *     responses:
 *       '200':
 *       '401':
 *       '403':
 *       '404':
 *
 *   put:
 *     tags:
 *       - User Notifications
 *     responses:
 *       '200':
 *       '401':
 *       '403':
 *       '404':
 *
 *   delete:
 *     tags:
 *       - User Notifications
 *     responses:
 *       '200':
 *       '401':
 *       '403':
 *       '404':
 *
 *
 *
 *
 *
 *
 */

// ! Highlight
/**
 * @swagger
 * /highlights:
 *   get:
 *     tags:
 *       - Highlights
 *
 *
 */

// ! Save
/**
 * @swagger
 * /save:
 *   get:
 *     tags:
 *       - Save
 *
 *
 */

// ! Reading Info
/**
 * @swagger
 * /reading-info:
 *   get:
 *     tags:
 *       - Reading Info
 *
 *
 */

// ! Collection
/**
 * @swagger
 * /collections:
 *   get:
 *     tags:
 *       - Collection
 *
 *
 */

// ! Genre
/**
 * @swagger
 * /genres:
 *   get:
 *     tags:
 *       - Genre
 *
 *
 */

// ! Author
/**
 * @swagger
 * /authors:
 *   get:
 *     tags:
 *       - Author
 *
 *
 */
