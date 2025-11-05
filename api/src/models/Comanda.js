// src/models/Comanda.js
const mongoose = require('mongoose');

const ComandaSchema = new mongoose.Schema({
  usuari: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuari', required: true },
  data: { type: Date, default: Date.now },
  estat: { type: String, enum: ['pendent', 'processant', 'enviat', 'lliurat', 'cancel·lat'], default: 'pendent' },
  import_total: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model('Comanda', ComandaSchema);