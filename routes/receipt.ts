import express, { Router } from 'express';
import { CreateReceiptControl } from '../controllers/receipt/create-receipt.controller';
import multer from 'multer';
import authenticateToken from '../utilities/auth';
import { FindAllReceiptControl } from '../controllers/receipt/find-all-receipt.controller';
const router: Router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



/**
 * @swagger
 * /receipt:
 *   post:
 *     summary: Upload a receipt file
 *     tags: [Receipts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Receipt uploaded and created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                   example: Receipt created
 *       400:
 *         description: Bad request or missing file
 *       401:
 *         description: Unauthorized – JWT token missing or invalid
 *       500:
 *         description: Server error
 */

router.post('/', authenticateToken,  upload.single("file"), CreateReceiptControl);

/**
 * @swagger
 * /receipt/all:
 *   get:
 *     summary: Get all receipts for the authenticated user
 *     tags: [Receipts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of receipts per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by vendor, date, or total
 *     responses:
 *       200:
 *         description: List of user receipts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Receipt'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                 message:
 *                   type: string
 *                   example: null
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       500:
 *         description: Server error
 */

router.get('/all', authenticateToken, FindAllReceiptControl);

module.exports = router;
