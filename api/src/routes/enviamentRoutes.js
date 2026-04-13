// src/routes/enviamentRoutes.js
const express = require('express');
const enviamentController = require('../controllers/enviamentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Enviaments
 *   description: Gestió de la logística i seguiment d'enviaments
 */

/**
 * @swagger
 * /api/enviaments:
 *   post:
 *     summary: Registra un nou enviament
 *     tags: [Enviaments]
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
 *               - empresa_transport
 *             properties:
 *               comanda:
 *                 type: string
 *               empresa_transport:
 *                 type: string
 *               codi_seguiment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enviament registrat
 */
router.post('/', authMiddleware, enviamentController.createEnviament);

/**
 * @swagger
 * /api/enviaments:
 *   get:
 *     summary: Llista els enviaments (ADMIN)
 *     tags: [Enviaments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista d'enviaments
 */
router.get('/', authMiddleware, enviamentController.getEnviaments);

/**
 * @swagger
 * /api/enviaments/{id}:
 *   get:
 *     summary: Obté detalls d'un enviament per ID
 *     tags: [Enviaments]
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
 *         description: Detalls de l'enviament
 */
router.get('/:id', authMiddleware, enviamentController.getEnviamentById);

/**
 * @swagger
 * /api/enviaments/{id}:
 *   put:
 *     summary: Actualitza un enviament
 *     tags: [Enviaments]
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
 *               codi_seguiment:
 *                 type: string
 *               estat:
 *                 type: string
 *     responses:
 *       200:
 *         description: Enviament actualitzat
 */
router.put('/:id', authMiddleware, enviamentController.updateEnviament);

/**
 * @swagger
 * /api/enviaments/{id}:
 *   delete:
 *     summary: Elimina un registre d'enviament
 *     tags: [Enviaments]
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
 *         description: Enviament eliminat
 */
router.delete('/:id', authMiddleware, enviamentController.deleteEnviament);

module.exports = router;