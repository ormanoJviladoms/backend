// src/services/detallComandaService.js
const DetallComanda = require('../models/DetallComanda');
const Product = require('../models/Product');
const Comanda = require('../models/Comanda');

const createDetallComanda = async (detallComandaData) => {
  const producte = await Product.findById(detallComandaData.producte);
  if (!producte) throw new Error('Producte no trobat');
  detallComandaData.nom_producte = producte.nom;
  detallComandaData.preu_unitari = producte.preu;

  const detallComanda = new DetallComanda(detallComandaData);
  return await detallComanda.save();
};

const getDetallsComanda = async ({ userId, role }) => {
  const filter = {};

  if (role !== 'admin') {
    const comandes = await Comanda.find({ usuari: userId }).select('_id');
    filter.comanda = { $in: comandes.map((comanda) => comanda._id) };
  }

  return await DetallComanda.find(filter).populate('comanda').populate('producte');
};

const getDetallComandaById = async (id) => {
  return await DetallComanda.findById(id).populate('comanda').populate('producte');
};

const updateDetallComanda = async (id, detallComandaData) => {
  return await DetallComanda.findByIdAndUpdate(id, detallComandaData, { new: true }).populate('comanda').populate('producte');
};

const deleteDetallComanda = async (id) => {
  return await DetallComanda.findByIdAndDelete(id);
};

module.exports = {
  createDetallComanda,
  getDetallsComanda,
  getDetallComandaById,
  updateDetallComanda,
  deleteDetallComanda,
};
