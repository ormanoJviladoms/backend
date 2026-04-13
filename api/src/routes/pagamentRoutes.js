// src/routes/pagamentRoutes.js
const express = require('express');
const pagamentController = require('../controllers/pagamentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pagaments
 *   description: Gestió de transaccions i mètodes de pagament
 */

/**
 * @swagger
 * /api/pagaments:
 *   post:
 *     summary: Registra un nou pagament
 *     tags: [Pagaments]
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
 *               - import
 *               - metode_pagament
 *             properties:
 *               comanda:
 *                 type: string
 *               import:
 *                 type: number
 *               metode_pagament:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pagament registrat
 */
router.post('/', authMiddleware, pagamentController.createPagament);

/**
 * @swagger
 * /api/pagaments:
 *   get:
 *     summary: Llista els pagaments (ADMIN)
 *     tags: [Pagaments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de pagaments
 */
router.get('/', authMiddleware, pagamentController.getPagaments);

/**
 * @swagger
 * /api/pagaments/{id}:
 *   get:
 *     summary: Obté detalls d'un pagament per ID
 *     tags: [Pagaments]
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
 *         description: Detalls del pagament
 */
router.get('/:id', authMiddleware, pagamentController.getPagamentById);

/**
 * @swagger
 * /api/pagaments/{id}:
 *   put:
 *     summary: Actualitza un pagament
 *     tags: [Pagaments]
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
 *     responses:
 *       200:
 *         description: Pagament actualitzat
 */
router.put('/:id', authMiddleware, pagamentController.updatePagament);

/**
 * @swagger
 * /api/pagaments/{id}:
 *   delete:
 *     summary: Elimina un registre de pagament
 *     tags: [Pagaments]
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
 *         description: Pagament eliminat
 */
router.delete('/:id', authMiddleware, pagamentController.deletePagament);

module.exports = router;