// src/controllers/detallComandaController.js
const detallComandaService = require('../services/detallComandaService');

const createDetallComanda = async (req, res) => {
  try {
    const detallComanda = await detallComandaService.createDetallComanda(req.body);
    res.status(201).json({ status: 'success', data: detallComanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getDetallsComanda = async (req, res) => {
  try {
    const detallsComanda = await detallComandaService.getDetallsComanda();
    res.status(200).json({ status: 'success', data: detallsComanda });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getDetallComandaById = async (req, res) => {
  try {
    const detallComanda = await detallComandaService.getDetallComandaById(req.params.id);
    if (!detallComanda) {
      return res.status(404).json({ status: 'error', message: 'Detall de Comanda no trobat' });
    }
    res.status(200).json({ status: 'success', data: detallComanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateDetallComanda = async (req, res) => {
  try {
    const detallComanda = await detallComandaService.updateDetallComanda(req.params.id, req.body);
    if (!detallComanda) {
      return res.status(404).json({ status: 'error', message: 'Detall de Comanda no trobat' });
    }
    res.status(200).json({ status: 'success', data: detallComanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deleteDetallComanda = async (req, res) => {
  try {
    const detallComanda = await detallComandaService.deleteDetallComanda(req.params.id);
    if (!detallComanda) {
      return res.status(404).json({ status: 'error', message: 'Detall de Comanda no trobat' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createDetallComanda,
  getDetallsComanda,
  getDetallComandaById,
  updateDetallComanda,
  deleteDetallComanda,
};