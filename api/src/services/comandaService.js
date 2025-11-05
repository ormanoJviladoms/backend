// src/services/comandaService.js
const Comanda = require('../models/Comanda');

const createComanda = async (comandaData) => {
  const newComanda = new Comanda(comandaData);
  return await newComanda.save();
};

const getComandes = async () => {
  return await Comanda.find().populate('usuari');
};

const getComandaById = async (id) => {
  return await Comanda.findById(id).populate('usuari');
};

const updateComanda = async (id, updates) => {
  return await Comanda.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
};

const deleteComanda = async (id) => {
  return await Comanda.findByIdAndDelete(id);
};

module.exports = {
  createComanda,
  getComandes,
  getComandaById,
  updateComanda,
  deleteComanda,
};