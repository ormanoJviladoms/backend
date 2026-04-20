// src/routes/enviamentRoutes.js
const express = require('express');
const enviamentController = require('../controllers/enviamentController');

const router = express.Router();

router.post('/', enviamentController.createEnviament);
router.get('/', enviamentController.getEnviaments);
router.get('/:id', enviamentController.getEnviamentById);
router.put('/:id', enviamentController.updateEnviament);
router.delete('/:id', enviamentController.deleteEnviament);

module.exports = router;