// src/routes/comandaRoutes.js
const express = require('express');
const comandaController = require('../controllers/comandaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comandes
 *   description: Gestió de comandes (orders)
 */

/**
 * @swagger
 * /api/comandes:
 *   post:
 *     summary: Crea una nova comanda
 *     tags: [Comandes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuari
 *               - import_total
 *             properties:
 *               usuari:
 *                 type: string
 *               import_total:
 *                 type: number
 *               estat:
 *                 type: string
 *                 enum: [pendent, processant, enviat, lliurat, cancel·lat]
 *     responses:
 *       201:
 *         description: Comanda creada
 *       401:
 *         description: No autoritzat
 */
router.post('/', authMiddleware, comandaController.createComanda);

/**
 * @swagger
 * /api/comandes:
 *   get:
 *     summary: Obté totes les comandes de l'usuari actual
 *     tags: [Comandes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de comandes
 */
router.get('/', authMiddleware, comandaController.getComandes);

/**
 * @swagger
 * /api/comandes/{id}:
 *   get:
 *     summary: Obté una comanda per ID
 *     tags: [Comandes]
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
 *         description: Detalls de la comanda
 */
router.get('/:id', authMiddleware, comandaController.getComandaById);

/**
 * @swagger
 * /api/comandes/{id}:
 *   put:
 *     summary: Actualitza l'estat d'una comanda
 *     tags: [Comandes]
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
 *               estat:
 *                 type: string
 *                 enum: [pendent, processant, enviat, lliurat, cancel·lat]
 *               import_total:
 *                 type: number
 *     responses:
 *       200:
 *         description: Comanda actualitzada
 */
router.put('/:id', authMiddleware, comandaController.updateComanda);

/**
 * @swagger
 * /api/comandes/{id}:
 *   delete:
 *     summary: Elimina una comanda
 *     tags: [Comandes]
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
 *         description: Comanda eliminada
 */
router.delete('/:id', authMiddleware, comandaController.deleteComanda);

module.exports = router;