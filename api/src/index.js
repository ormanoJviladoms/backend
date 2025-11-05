require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require('./routes/productRoutes');
const comandaRoutes = require('./routes/comandaRoutes');
const detallComandaRoutes = require('./routes/detallComandaRoutes');
const enviamentRoutes = require('./routes/enviamentRoutes');
const app = express();
app.use(express.json());

// Connexió a la BD
connectDB();

// Rutes bàsiques
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

// Sistema de rutes: Productes
app.use("/api/products", productRoutes);
app.use('/api/comandes', comandaRoutes);
app.use('/api/detallscomanda', detallComandaRoutes);
app.use('/api/enviaments', enviamentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
