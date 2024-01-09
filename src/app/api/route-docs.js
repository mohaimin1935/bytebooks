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
 *     Author:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         desc:
 *           type: string
 *         primary_language:
 *           type: string
 *         country:
 *           type: string
 *         description:
 *           type: string
 *
 *     Tag:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         tag:
 *           type: string
 *
 *     Genre:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         image:
 *           type: string
 *
 *     BookInfo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         isbn:
 *           type: string
 *         publishing_year:
 *           type: integer
 *         title:
 *           type: string
 *         image:
 *           type: string
 *         authors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Author'
 *         creatorids:
 *           type: array
 *           items:
 *             type: string
 *         brief_desc:
 *           type: string
 *         desc:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *         genres:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genre'
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *         first_byte:
 *           type: string
 *         first_chapter:
 *           type: string
 *
 *     Chapter:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         bookid:
 *           type: string
 *         serial:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         audio:
 *           type: string
 *
 *     Byte:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         bookid:
 *           type: string
 *         serial:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         audio:
 *           type: string
 *
 *     Collection:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         image:
 *           type: string
 *         book_ids:
 *           type: array
 *           items:
 *             type: string
 *
 *     Shelf:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         status:
 *           type: string
 *           enum:
 *             - To Read
 *             - Currently Reading
 *             - Read
 *             - Left
 *         userid:
 *           type: string
 *         bookid:
 *           type: string
 *
 *
 *     Highlight:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userid:
 *           type: string
 *         bookid:
 *           type: string
 *         chapterid:
 *           type: string
 *         byteid:
 *           type: string
 *         start_location:
 *           type: integer
 *         end_location:
 *           type: integer
 *
 *     Progress:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         bookid:
 *           type: string
 *         userid:
 *           type: string
 *         chapterid:
 *           type: string
 *         byteid:
 *           type: string
 *         audio_location:
 *           type: time
 *
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userid:
 *           type: string
 *         desc:
 *           type: string
 *         remainder:
 *           type: date-time
 *         bookid:
 *           type: string
 *
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userid:
 *           type: string
 *         bookid:
 *           type: string
 *         rating:
 *           type: integer
 *         comment:
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
 *     BookBriefInfoResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         image:
 *           type: string
 *         authors:
 *           type: array
 *           items:
 *             type: string
 *         genres:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genre'
 *         Rating:
 *           type: float
 *
 *     ChapterListResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         serial:
 *           type: integer
 *         title:
 *           type: string
 *
 *     ByteListResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         serial:
 *           type: integer
 *         title:
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
 *   get:
 *     tags:
 *       - Book Info
 *     summary: Get list of books
 *     parameters:
 *       - name: genreid
 *         in: query
 *         description: Filter book list by genre
 *       - name: sort
 *         in: query
 *         description: Sort book by time or other options
 *       - name: authorid
 *         in: query
 *         description: Filter book list by author
 *       - name: publish-year
 *         in: query
 *         description: Filter book list by year
 *       - name: language
 *         in: query
 *         description: Filter book list by language
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookBriefInfoResponse'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   post:
 *     tags:
 *       - Book Info
 *     summary: Add a book
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/BookInfo'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookInfo'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict with ISBN
 *       '500':
 *         description: Internal Server Error
 *
 *
 * /books/{bookid}:
 *   get:
 *     tags:
 *       - Book Info
 *     summary: Get book info
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookInfo'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   put:
 *     tags:
 *       - Book Info
 *     summary: Edit a book
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/BookInfo'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookInfo'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: No book found with bookid
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   delete:
 *     tags:
 *       - Book Info
 *     summary: Delete a book
 *     responses:
 *       '204':
 *         description: Success and No Content
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: No book found with bookid
 *       '500':
 *         description: Internal Server Error
 */

// ! Book Chapter & Byte
/**
 * @swagger
 * /books/{bookid}/chapters:
 *   get:
 *     tags:
 *       - Book Chapter
 *     summary: Get all chapters of a book
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChapterListResponse'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: No book found (bookid)
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   post:
 *     tags:
 *       - Book Chapter
 *     summary: Add a chapter to a book
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Chapter'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chapter'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict with chapterid
 *       '500':
 *         description: Internal Server Error
 *
 *
 * /books/{bookid}/chapters/{chapterid}:
 *   get:
 *     tags:
 *       - Book Chapter
 *     summary: Get a specific chapter of a book
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chapter'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: No chapter/book found
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   put:
 *     tags:
 *       - Book Chapter
 *     summary: Edit a specific chapter of a book
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Chapter'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chapter'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: No chapter/book found
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   delete:
 *     tags:
 *       - Book Chapter
 *     summary: Delete a specific chapter of a book
 *     responses:
 *       '204':
 *         description: Success and No Content
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: No chapter found with chapterid
 *       '500':
 *         description: Internal Server Error
 *

 * /books/{bookid}/bytes:
 *   get:
 *     tags:
 *       - Book Byte
 *     summary: Get all bytes of a book
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ByteListResponse'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found (bookid)
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   post:
 *     tags:
 *       - Book Byte
 *     summary: Add a byte to a book
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Byte'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Byte'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict with chapterid
 *       '500':
 *         description: Internal Server Error
 *
 *
 * /books/{bookid}/bytes/{byteid}:
 *   get:
 *     tags:
 *       - Book Byte
 *     summary: Get a specific byte of a book
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Byte'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: No byte/book found
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   put:
 *     tags:
 *       - Book Byte
 *     summary: Edit a specific byte of a book
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Byte'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Byte'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: No byte/book found
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   delete:
 *     tags:
 *       - Book Byte
 *     summary: Delete a specific byte of a book
 *     responses:
 *       '204':
 *         description: Success and No Content
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: No byte found with chapterid
 *       '500':
 *         description: Internal Server Error
 *
 *
 *
 *
 *
 */

// !User
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user list with filtering option for admin
 *     tags:
 *       - User
 *
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
 *   post:
 *     tags:
 *       - Highlights
 *
 *
 * /highlights/{highlightid}:
 *   get:
 *     tags:
 *       - Highlights
 *
 *
 *   put:
 *     tags:
 *       - Highlights
 *
 *
 *   delete:
 *     tags:
 *       - Highlights
 *
 *
 * /highlights/user/{userid}:
 *   get:
 *     tags:
 *       - Highlights
 *     summary: Get highlights of an user
 *     parameters:
 *       - name: bookid
 *         in: query
 *         description: Filter an user's highlights of a book
 *       - name: year
 *         in: query
 *         description: Filter an user's highlights of a year
 *       - name: start-date
 *         in: query
 *         description: Filter an user's highlights of a time-limit
 *       - name: end-date
 *         in: query
 *         description: Filter an user's highlights of a time-limit
 *
 *
 *
 *
 *
 *
 *
 */

// ! Shelf
/**
 * @swagger
 * /shelf:
 *   get:
 *     tags:
 *       - Shelf
 *
 *   post:
 *     tags:
 *       - Shelf
 *
 *
 *
 */

// ! Progress
/**
 * @swagger
 * /progress:
 *   get:
 *     tags:
 *       - Progress
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
