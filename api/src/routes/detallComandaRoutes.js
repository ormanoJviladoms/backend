// src/routes/detallComandaRoutes.js
const express = require('express');
const detallComandaController = require('../controllers/detallComandaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Detalls Comanda
 *   description: Gestió dels ítems dins d'una comanda (carret)
 */

/**
 * @swagger
 * /api/detallscomanda:
 *   post:
 *     summary: Afegeix un producte a la comanda (carret)
 *     tags: [Detalls Comanda]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comanda
 *               - producte
 *               - quantitat
 *             properties:
 *               comanda:
 *                 type: string
 *               producte:
 *                 type: string
 *               quantitat:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producte afegit
 *       401:
 *         description: No autoritzat
 */
router.post('/', authMiddleware, detallComandaController.createDetallComanda);

/**
 * @swagger
 * /api/detallscomanda:
 *   get:
 *     summary: Llista els detalls de totes les comandes
 *     tags: [Detalls Comanda]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de detalls
 */
router.get('/', authMiddleware, detallComandaController.getDetallsComanda);

/**
 * @swagger
 * /api/detallscomanda/{id}:
 *   get:
 *     summary: Obté un detall per ID
 *     tags: [Detalls Comanda]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalls de l'ítem
 */
router.get('/:id', authMiddleware, detallComandaController.getDetallComandaById);

/**
 * @swagger
 * /api/detallscomanda/{id}:
 *   put:
 *     summary: Actualitza la quantitat d'un producte al carret
 *     tags: [Detalls Comanda]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantitat:
 *                 type: number
 *     responses:
 *       200:
 *         description: Quantitat actualitzada
 */
router.put('/:id', authMiddleware, detallComandaController.updateDetallComanda);

/**
 * @swagger
 * /api/detallscomanda/{id}:
 *   delete:
 *     summary: Elimina un producte del carret
 *     tags: [Detalls Comanda]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ítem eliminat
 */
router.delete('/:id', authMiddleware, detallComandaController.deleteDetallComanda);

module.exports = router;