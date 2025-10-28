// src/models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    talla: { type: String, enum: ["XS", "S", "M", "L", "XL"], required: true },
    color: {
      type: String,
      enum: ["negro", "blanco", "rojo", "azul", "verde"],
      required: true,
    },
    categoria: {
      type: String,
      enum: ["camiseta", "sudadera", "pantalon", "zapatillas", "accesorio"],
      default: "camiseta",
    },
    preu: { type: Number, required: true, min: 0, max: 9999 },
    estoc: { type: Number, required: true, min: 0 },
    descripcio: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);