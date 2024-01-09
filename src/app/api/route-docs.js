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
 *         country:
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
 *         language:
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
 *         language:
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
 *             - Finished
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
 *           type: string
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
 *             type: string
 *         rating:
 *           type: number
 *         audio_duration:
 *           type: number
 *         short_desc:
 *           type: string
 *         progress:
 *           type: number
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
 *     UserStatResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         streak:
 *           type: number
 *         books_read:
 *           type: number
 *         authors_read:
 *           type: number
 *         top_genres:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               count:
 *                 type: number
 *         top_authors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               count:
 *                 type: number
 *         recent_reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BookBriefInfoResponse'
 *
 *     HighlightResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         content:
 *           type: string
 *         timestamp:
 *           type: string
 *         book_name:
 *           type: string
 *         author_name:
 *           type: string
 *         bookid:
 *           type: string
 *         chapterid:
 *           type: string
 *         byteid:
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
 *       - name: tag
 *         in: query
 *         description: Filter book list by tag
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
 *         description: Conflict
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
 *         description: Not found
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
 *         description: Not found
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
 *         description: Not found
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
 *     parameters:
 *       - name: role
 *         in: query
 *         description: Filter user list by role
 *       - name: country
 *         in: query
 *         description: Filter user list by country
 *       - name: sort
 *         in: query
 *         description: Filter user list by activity, or other options
 *       - name: search
 *         in: query
 *         description: Filter user list by search term
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal Server Error
 *
 * /users/{userid}:
 *   get:
 *     summary: Get details of an user
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   put:
 *     summary: Edit user details
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   delete:
 *     summary: Delete an user
 *     tags:
 *       - User
 *     responses:
 *       '204':
 *         description: Success and No Content
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 * /users/{userid}/change-password:
 *   post:
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             properties:
 *               old_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *     responses:
 *       '204':
 *         description: Success
 *       '400':
 *         description: Invalid input
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 * /users/{userid}/stat:
 *   get:
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserStatResponse'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
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
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   post:
 *     tags:
 *       - User Notifications
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict with notification id
 *       '500':
 *         description: Internal Server Error
 *
 * /users/{userid}/notifications/{notificationid}:
 *   get:
 *     tags:
 *       - User Notifications
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   put:
 *     tags:
 *       - User Notifications
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   delete:
 *     tags:
 *       - User Notifications
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
 *
 */

// ! Highlight
/**
 * @swagger
 * /highlights:
 *   post:
 *     tags:
 *       - Highlights
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Highlight'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Highlight'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal Server Error
 *
 *
 * /highlights/{highlightid}:
 *   get:
 *     tags:
 *       - Highlights
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Highlight'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   put:
 *     tags:
 *       - Highlights
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Highlight'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Highlight'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   delete:
 *     tags:
 *       - Highlights
 *     responses:
 *       '204':
 *         description: Success and No Content
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
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
 *       - name: sort
 *         in: query
 *         description: Sort an user's highlights
 *       - name: genre
 *         in: query
 *         description: Filter by genre
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HighlightResponse'
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
 */

// ! Shelf
/**
 * @swagger
 * /shelf:
 *   get:
 *     tags:
 *       - Shelf
 *     parameters:
 *       - name: userid
 *         in: query
 *         description: Filter by user id
 *       - name: bookid
 *         in: query
 *         description: Filter by book id
 *       - name: status
 *         in: query
 *         description: Filter by status
 *       - name: genre
 *         in: query
 *         description: Filter by genre
 *       - name: sort
 *         in: query
 *         description: Sort
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shelf'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal Server Error
 *
 *   post:
 *     tags:
 *       - Shelf
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Shelf'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shelf'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal Server Error
 *
 * /shelf/{shelfid}:
 *   get:
 *     tags:
 *       - Shelf
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shelf'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   put:
 *     tags:
 *       - Shelf
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Shelf'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shelf'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   delete:
 *     tags:
 *       - Shelf
 *     responses:
 *       '204':
 *         description: Success and No Content
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *
 *
 */

// ! Progress
/**
 * @swagger
 * /progress:
 *   post:
 *     tags:
 *       - Progress
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Progress'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Progress'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal Server Error
 *
 * /progress/user/{userid}/book/{bookid}:
 *   get:
 *     tags:
 *       - Progress
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Progress'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   put:
 *     tags:
 *       - Progress
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Progress'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Progress'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *
 *   delete:
 *     tags:
 *       - Progress
 *     responses:
 *       '204':
 *         description: Success and No Content
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *
 */

// ! Collection

// ! Genre
/**
 * @swagger
 * /genres:
 *   get:
 *     tags:
 *       - Genre
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Filter by search term
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal Server Error
 *
 *   post:
 *     tags:
 *       - Genre
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal Server Error
 *
 *
 * /genres/{genreid}:
 *   get:
 *     tags:
 *       - Genre
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   put:
 *     tags:
 *       - Genre
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   delete:
 *     tags:
 *       - Genre
 *     responses:
 *       '204':
 *         description: Success and No Content
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
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
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Filter by search term
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal Server Error
 *
 *   post:
 *     tags:
 *       - Author
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal Server Error
 *
 *
 * /authors/{authorid}:
 *   get:
 *     tags:
 *       - Author
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   put:
 *     tags:
 *       - Author
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   delete:
 *     tags:
 *       - Author
 *     responses:
 *       '204':
 *         description: Success and No Content
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *
 */

// ! Tag
/**
 * @swagger
 * /tags:
 *   get:
 *     tags:
 *       - Tag
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Filter by search term
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal Server Error
 *
 *   post:
 *     tags:
 *       - Tag
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal Server Error
 *
 *
 * /tags/{tagid}:
 *   get:
 *     tags:
 *       - Tag
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   put:
 *     tags:
 *       - Tag
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *   delete:
 *     tags:
 *       - Tag
 *     responses:
 *       '204':
 *         description: Success and No Content
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 *
 *
 */
