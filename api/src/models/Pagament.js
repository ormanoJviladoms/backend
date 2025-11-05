// src/models/Pagament.js
const mongoose = require('mongoose');

const PagamentSchema = mongoose.Schema({
  comanda: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comanda',
    required: true,
  },
  estat: {
    type: String,
    required: true,
  },
  data_pagament: {
    type: Date,
    default: Date.now,
  },
  import_total: {
    type: Number,
    required: true,
  },
  metode: {
    type: String,
    required: true,
  },
});

const Pagament = mongoose.model('Pagament', PagamentSchema);

module.exports = Pagament;