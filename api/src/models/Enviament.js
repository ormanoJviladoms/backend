// src/models/Enviament.js
const mongoose = require('mongoose');

const EnviamentSchema = new mongoose.Schema({
  comanda: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comanda',
    required: true,
  },
  data_sortida: {
    type: Date,
    required: true,
  },
  data_arribada: {
    type: Date,
    required: false,
  },
  empresa_transport: {
    type: String,
    required: true,
  },
  codi_seguiment: {
    type: String,
    required: false,
    unique: true,
  },
});

module.exports = mongoose.model('Enviament', EnviamentSchema);