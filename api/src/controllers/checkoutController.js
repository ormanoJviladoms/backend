// src/controllers/checkoutController.js
const checkoutService = require('../services/checkoutService');

const processCheckout = async (req, res) => {
  try {
    const { comandaId, pagament, enviament } = req.body;

    if (!comandaId) {
      return res.status(400).json({ status: 'error', message: 'Falta l\'ID de la comanda' });
    }
    if (!pagament || !pagament.metode) {
      return res.status(400).json({ status: 'error', message: 'Falta el mètode de pagament' });
    }

    const result = await checkoutService.processCheckout({
      comandaId,
      pagament,
      enviament: enviament || {},
    });

    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  processCheckout,
};
