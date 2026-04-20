// src/routes/comandaRoutes.js
const express = require('express');
const comandaController = require('../controllers/comandaController');

const router = express.Router();

router.post('/', comandaController.createComanda);
router.get('/', comandaController.getComandes);
router.get('/:id', comandaController.getComandaById);
router.put('/:id', comandaController.updateComanda);
router.delete('/:id', comandaController.deleteComanda);

module.exports = router;