// src/services/pagamentService.js
const Pagament = require('../models/Pagament');

const createPagament = async (pagamentData) => {
  const pagament = new Pagament(pagamentData);
  return await pagament.save();
};

const getPagaments = async () => {
  return await Pagament.find().populate('comanda');
};

const getPagamentById = async (id) => {
  return await Pagament.findById(id).populate('comanda');
};

const updatePagament = async (id, pagamentData) => {
  return await Pagament.findByIdAndUpdate(id, pagamentData, { new: true }).populate('comanda');
};

const deletePagament = async (id) => {
  return await Pagament.findByIdAndDelete(id);
};

module.exports = {
  createPagament,
  getPagaments,
  getPagamentById,
  updatePagament,
  deletePagament,
};