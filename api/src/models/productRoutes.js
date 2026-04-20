// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Exemple d'ús per a rutes restringides a admins
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Benvingut al panell d\'administració de productes!' });
});

// CRUD de productes
router.get('/', productController.getProducts);
router.post('/', authMiddleware, roleMiddleware('admin'), productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', authMiddleware, roleMiddleware('admin'), productController.updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), productController.deleteProduct);

module.exports = router;