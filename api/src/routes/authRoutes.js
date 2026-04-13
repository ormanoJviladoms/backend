const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticació d'usuaris
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nou usuari
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *               - password
 *             properties:
 *               nom:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               direccio:
 *                 type: string
 *               telefon:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuari registrat amb èxit
 *       400:
 *         description: Error en les dades enviades
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sessió
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login correcte
 *       401:
 *         description: Credencials incorrectes
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresca el token d'accés
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nou access token generat
 *       401:
 *         description: Refresh token invàlid
 */
router.post('/refresh', authController.refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Tanca la sessió
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sessió tancada correctament
 */
router.post('/logout', authController.logout);

module.exports = router;
