// src/services/enviamentService.js
const Enviament = require('../models/Enviament');

// Crear un nou enviament
exports.createEnviament = async (enviamentData) => {
  const enviament = new Enviament(enviamentData);
  return await enviament.save();
};

// Obtenir tots els enviaments
exports.getEnviaments = async () => {
  return await Enviament.find().populate('comanda');
};

// Obtenir un enviament per ID
exports.getEnviamentById = async (id) => {
  return await Enviament.findById(id).populate('comanda');
};

// Actualitzar un enviament
exports.updateEnviament = async (id, enviamentData) => {
  return await Enviament.findByIdAndUpdate(id, enviamentData, { new: true });
};

// Eliminar un enviament
exports.deleteEnviament = async (id) => {
  return await Enviament.findByIdAndDelete(id);
};