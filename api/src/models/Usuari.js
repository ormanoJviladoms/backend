// src/models/Usuari.js
const mongoose = require("mongoose");

const usuariSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  correu: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "El correu no té un format vàlid"],
  },
  contrasenya: { type: String, required: true, minlength: 6 },
  rol: { type: String, enum: ["client", "admin"], default: "client" },
});

// Campos básicos adicionales para una tienda de ropa urbana
usuariSchema.add({
  direccio: { type: String },
  telefon: {
    type: String,
    match: [/^\+?\d{9,15}$/, "El telèfon no té un format vàlid"],
  },
});

module.exports = mongoose.model("Usuari", usuariSchema);
