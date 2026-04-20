// src/routes/detallComandaRoutes.js
const express = require('express');
const detallComandaController = require('../controllers/detallComandaController');

const router = express.Router();

router.post('/', detallComandaController.createDetallComanda);
router.get('/', detallComandaController.getDetallsComanda);
router.get('/:id', detallComandaController.getDetallComandaById);
router.put('/:id', detallComandaController.updateDetallComanda);
router.delete('/:id', detallComandaController.deleteDetallComanda);

module.exports = router;