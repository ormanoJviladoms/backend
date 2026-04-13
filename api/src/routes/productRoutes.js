// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestió de productes
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Llista tots els productes
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Llista de productes obtinguda (pot estar buida)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nou producte (Només ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producte creat amb èxit
 *       403:
 *         description: Accés denegat (falten permisos d'admin)
 */
router.post('/', authMiddleware, roleMiddleware('admin'), productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obté un producte per ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producte
 *     responses:
 *       200:
 *         description: Producte trobat
 *       404:
 *         description: Producte no trobat
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualitza un producte (Només ADMIN)
 *     tags: [Products]
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
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producte actualitzat
 */
router.put('/:id', authMiddleware, roleMiddleware('admin'), productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producte (Només ADMIN)
 *     tags: [Products]
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
 *         description: Producte eliminat
 */
router.delete('/:id', authMiddleware, roleMiddleware('admin'), productController.deleteProduct);

module.exports = router;