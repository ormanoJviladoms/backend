// src/models/DetallComanda.js
const mongoose = require('mongoose');

const DetallComandaSchema = mongoose.Schema({
  comanda: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comanda',
    required: true,
  },
  producte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  nom_producte: {
    type: String,
    required: true,
  },
  preu_unitari: {
    type: Number,
    required: true,
  },
  quantitat: {
    type: Number,
    required: true,
    min: 1,
  },
});

const DetallComanda = mongoose.model('DetallComanda', DetallComandaSchema);

module.exports = DetallComanda;