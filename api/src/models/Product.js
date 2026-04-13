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
    imatge: { type: String, default: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80" },
    descripcio: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);