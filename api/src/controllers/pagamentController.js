// src/controllers/pagamentController.js
const pagamentService = require('../services/pagamentService');

const createPagament = async (req, res) => {
  try {
    const pagament = await pagamentService.createPagament(req.body);
    res.status(201).json({ status: 'success', data: pagament });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getPagaments = async (req, res) => {
  try {
    const pagaments = await pagamentService.getPagaments();
    res.status(200).json({ status: 'success', data: pagaments });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getPagamentById = async (req, res) => {
  try {
    const pagament = await pagamentService.getPagamentById(req.params.id);
    if (!pagament) {
      return res.status(404).json({ status: 'error', message: 'Pagament no trobat' });
    }
    res.status(200).json({ status: 'success', data: pagament });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updatePagament = async (req, res) => {
  try {
    const pagament = await pagamentService.updatePagament(req.params.id, req.body);
    if (!pagament) {
      return res.status(404).json({ status: 'error', message: 'Pagament no trobat' });
    }
    res.status(200).json({ status: 'success', data: pagament });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deletePagament = async (req, res) => {
  try {
    const pagament = await pagamentService.deletePagament(req.params.id);
    if (!pagament) {
      return res.status(404).json({ status: 'error', message: 'Pagament no trobat' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createPagament,
  getPagaments,
  getPagamentById,
  updatePagament,
  deletePagament,
};