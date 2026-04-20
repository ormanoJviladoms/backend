// src/routes/checkoutRoutes.js
const express = require('express');
const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

router.post('/', checkoutController.processCheckout);

module.exports = router;
