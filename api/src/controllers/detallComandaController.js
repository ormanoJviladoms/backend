// src/controllers/detallComandaController.js
const detallComandaService = require('../services/detallComandaService');
const Comanda = require('../models/Comanda');

const canAccessComanda = (req, comanda) => {
  if (req.user.rol === 'admin') return true;
  const usuariId = comanda.usuari?._id || comanda.usuari;
  return usuariId?.toString() === req.user.id;
};

const createDetallComanda = async (req, res) => {
  try {
    const comanda = await Comanda.findById(req.body.comanda);
    if (!comanda) {
      return res.status(404).json({ status: 'error', message: 'Comanda no trobada' });
    }
    if (!canAccessComanda(req, comanda)) {
      return res.status(403).json({ status: 'error', message: 'No tens permisos sobre aquesta comanda' });
    }

    const detallComanda = await detallComandaService.createDetallComanda(req.body);
    res.status(201).json({ status: 'success', data: detallComanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getDetallsComanda = async (req, res) => {
  try {
    const detallsComanda = await detallComandaService.getDetallsComanda({
      userId: req.user.id,
      role: req.user.rol,
    });
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
    if (!canAccessComanda(req, detallComanda.comanda)) {
      return res.status(403).json({ status: 'error', message: 'No tens permisos sobre aquesta comanda' });
    }
    res.status(200).json({ status: 'success', data: detallComanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateDetallComanda = async (req, res) => {
  try {
    const currentDetallComanda = await detallComandaService.getDetallComandaById(req.params.id);
    if (!currentDetallComanda) {
      return res.status(404).json({ status: 'error', message: 'Detall de Comanda no trobat' });
    }
    if (!canAccessComanda(req, currentDetallComanda.comanda)) {
      return res.status(403).json({ status: 'error', message: 'No tens permisos sobre aquesta comanda' });
    }

    const detallComanda = await detallComandaService.updateDetallComanda(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: detallComanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deleteDetallComanda = async (req, res) => {
  try {
    const currentDetallComanda = await detallComandaService.getDetallComandaById(req.params.id);
    if (!currentDetallComanda) {
      return res.status(404).json({ status: 'error', message: 'Detall de Comanda no trobat' });
    }
    if (!canAccessComanda(req, currentDetallComanda.comanda)) {
      return res.status(403).json({ status: 'error', message: 'No tens permisos sobre aquesta comanda' });
    }

    await detallComandaService.deleteDetallComanda(req.params.id);
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
