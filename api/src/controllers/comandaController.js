// src/controllers/comandaController.js
const comandaService = require('../services/comandaService');

const createComanda = async (req, res) => {
  try {
    const comandaData = {
      ...req.body,
      usuari: req.user.rol === 'admin' && req.body.usuari ? req.body.usuari : req.user.id,
    };
    const comanda = await comandaService.createComanda(comandaData);
    res.status(201).json({ status: 'success', data: comanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getComandes = async (req, res) => {
  try {
    const comandes = await comandaService.getComandes({ userId: req.user.id, role: req.user.rol });
    res.status(200).json({ status: 'success', data: comandes });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getComandaById = async (req, res) => {
  try {
    const comanda = await comandaService.getComandaById(req.params.id);
    if (!comanda) {
      return res.status(404).json({ status: 'error', message: 'Comanda no trobada' });
    }
    if (req.user.rol !== 'admin' && comanda.usuari._id.toString() !== req.user.id) {
      return res.status(403).json({ status: 'error', message: 'No tens permisos sobre aquesta comanda' });
    }
    res.status(200).json({ status: 'success', data: comanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateComanda = async (req, res) => {
  try {
    const currentComanda = await comandaService.getComandaById(req.params.id);
    if (!currentComanda) {
      return res.status(404).json({ status: 'error', message: 'Comanda no trobada' });
    }
    if (req.user.rol !== 'admin' && currentComanda.usuari._id.toString() !== req.user.id) {
      return res.status(403).json({ status: 'error', message: 'No tens permisos sobre aquesta comanda' });
    }
    const updates = req.user.rol === 'admin' ? req.body : {};
    if (req.user.rol !== 'admin' && typeof req.body.import_total === 'number') {
      updates.import_total = req.body.import_total;
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ status: 'error', message: 'No hi ha camps actualitzables' });
    }
    const updatedComanda = await comandaService.updateComanda(req.params.id, updates);
    res.status(200).json({ status: 'success', data: updatedComanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deleteComanda = async (req, res) => {
  try {
    const currentComanda = await comandaService.getComandaById(req.params.id);
    if (!currentComanda) {
      return res.status(404).json({ status: 'error', message: 'Comanda no trobada' });
    }
    if (req.user.rol !== 'admin' && currentComanda.usuari._id.toString() !== req.user.id) {
      return res.status(403).json({ status: 'error', message: 'No tens permisos sobre aquesta comanda' });
    }
    const comanda = await comandaService.deleteComanda(req.params.id);
    if (!comanda) {
      return res.status(404).json({ status: 'error', message: 'Comanda no trobada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createComanda,
  getComandes,
  getComandaById,
  updateComanda,
  deleteComanda,
};
