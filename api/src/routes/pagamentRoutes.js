// src/routes/pagamentRoutes.js
const express = require('express');
const pagamentController = require('../controllers/pagamentController');

const router = express.Router();

router.post('/', pagamentController.createPagament);
router.get('/', pagamentController.getPagaments);
router.get('/:id', pagamentController.getPagamentById);
router.put('/:id', pagamentController.updatePagament);
router.delete('/:id', pagamentController.deletePagament);

module.exports = router;