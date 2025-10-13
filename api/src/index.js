require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
// Modelos
const Producto = require("./models/Roba");
const Usuari = require("./models/Usuari");
const app = express();
app.use(express.json());
connectDB();
app.get("/", (req, res) => res.send("API Ecommerce en marxa 🚀"));

// Endpoints básicos Productos
app.get("/productos", async (req, res) => {
  try {
    const items = await Producto.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Error obtenint productes" });
  }
});

app.post("/productos", async (req, res) => {
  try {
    const created = await Producto.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Dades de producte invàlides", details: err.message });
  }
});

// Endpoints básicos Usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const users = await Usuari.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error obtenint usuaris" });
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const created = await Usuari.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Dades d'usuari invàlides", details: err.message });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
