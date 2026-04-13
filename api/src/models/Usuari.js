// src/models/Usuari.js
const mongoose = require("mongoose");

const usuariSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: [true, "El nom és obligatori"] 
  },
  correu: {
    type: String,
    required: [true, "El correu és obligatori"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "El correu no té un format vàlid"],
  },
  contrasenya: { 
    type: String, 
    required: [true, "La contrasenya és obligatòria"], 
    minlength: [6, "La contrasenya ha de tenir almenys 6 caràcters"] 
  },
  rol: { 
    type: String, 
    enum: ["client", "admin"], 
    default: "client" 
  },
  direccio: { 
    type: String 
  },
  telefon: {
    type: String,
    match: [/^\+?\d{9,15}$/, "El telèfon no té un format vàlid"],
  },
  refreshToken: { 
    type: String 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Usuari", usuariSchema);

