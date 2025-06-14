import express, { Router } from 'express';
import { CreateReceiptControl } from '../controllers/receipt/create-receipt.controller';
import multer from 'multer';
import authenticateToken from '../utilities/auth';
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


module.exports = router;
