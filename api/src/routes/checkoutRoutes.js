// src/routes/checkoutRoutes.js
const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: Procés de finalització de compra
 */

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Finalitza la compra de la comanda pendent
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comandaId
 *               - pagament
 *               - enviament
 *             properties:
 *               comandaId:
 *                 type: string
 *               pagament:
 *                 type: object
 *                 properties:
 *                   metode:
 *                     type: string
 *               enviament:
 *                 type: object
 *                 properties:
 *                   empresa_transport:
 *                     type: string
 *     responses:
 *       200:
 *         description: Compra completada amb èxit
 *       400:
 *         description: Error en el procés de checkout
 */
router.post('/', authMiddleware, checkoutController.processCheckout);

module.exports = router;
