require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require('./routes/productRoutes');
const comandaRoutes = require('./routes/comandaRoutes');
const detallComandaRoutes = require('./routes/detallComandaRoutes');
const enviamentRoutes = require('./routes/enviamentRoutes');
const pagamentRoutes = require('./routes/pagamentRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const authRoutes = require('./routes/authRoutes');
const checkoutController = require('./controllers/checkoutController');
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const app = express();
app.use(cors());

// Webhook de Stripe necessita el body raw (abans de express.json)
app.post('/api/checkout/webhook', express.raw({ type: 'application/json' }), checkoutController.webhook);

app.use(express.json());

// Documentació Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connexió a la BD
connectDB();
require("./models/Usuari"); // Assegura que l'esquema Usuari estigui registrat


// Rutes bàsiques
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

// Sistema de rutes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use('/api/comandes', comandaRoutes);
app.use('/api/detallscomanda', detallComandaRoutes);
app.use('/api/enviaments', enviamentRoutes);
app.use('/api/pagaments', pagamentRoutes);
app.use('/api/checkout', checkoutRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
