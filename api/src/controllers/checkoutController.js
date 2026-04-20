// src/controllers/checkoutController.js
const checkoutService = require('../services/checkoutService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Comanda = require('../models/Comanda');
const DetallComanda = require('../models/DetallComanda');
const Product = require('../models/Product');
const Pagament = require('../models/Pagament');
const Enviament = require('../models/Enviament');

const processCheckout = async (req, res) => {
  try {
    const { comandaId, pagament, enviament } = req.body;

    if (!comandaId) {
      return res.status(400).json({ status: 'error', message: 'Falta l\'ID de la comanda' });
    }
    if (!pagament || !pagament.metode) {
      return res.status(400).json({ status: 'error', message: 'Falta el mètode de pagament' });
    }

    const result = await checkoutService.processCheckout({
      comandaId,
      pagament,
      enviament: enviament || {},
    });

    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// POST /api/checkout/create-session
const createSession = async (req, res) => {
  try {
    const { comandaId } = req.body;
    const userId = req.user.id;

    if (!comandaId) {
      return res.status(400).json({ status: 'error', message: 'Falta l\'ID de la comanda' });
    }

    // Validate order exists and belongs to user
    const comanda = await Comanda.findById(comandaId);
    if (!comanda) {
      return res.status(404).json({ status: 'error', message: 'Comanda no trobada' });
    }
    if (comanda.usuari.toString() !== userId) {
      return res.status(403).json({ status: 'error', message: 'No tens permisos sobre aquesta comanda' });
    }
    if (comanda.estat !== 'pendent') {
      return res.status(400).json({ status: 'error', message: 'Aquesta comanda ja ha estat processada' });
    }

    // Get order details
    const detalls = await DetallComanda.find({ comanda: comandaId }).populate('producte');
    if (!detalls || detalls.length === 0) {
      return res.status(400).json({ status: 'error', message: 'La comanda no té productes' });
    }

    // Validate stock and build line items
    const line_items = [];
    for (const detall of detalls) {
      const product = detall.producte;
      const nom = detall.nom_producte || (product ? product.nom : 'Producte');
      const preu = detall.preu_unitari || (product ? product.preu : 0);

      if (product && product.estoc < detall.quantitat) {
        return res.status(400).json({
          status: 'error',
          message: `Estoc insuficient per al producte: ${nom}`
        });
      }

      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: { name: nom },
          unit_amount: Math.round(preu * 100),
        },
        quantity: detall.quantitat,
      });
    }
// Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/checkout/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/checkout/cancel',
      metadata: {
        comandaId: comandaId.toString(),
        userId: userId.toString(),
      },
    });

    // AFEGEIX LA URL A LA RESPOSTA:
    res.status(200).json({ 
        status: 'success', 
        data: { 
            sessionId: session.id,
            url: session.url // <-- Aquesta és la dada que necessita el frontend
        } 
    });
  } catch (error) {
    console.error('Error creant sessió Stripe:', error.message);
    res.status(400).json({ status: 'error', message: 'Error en el pagament' });
  }
};

// POST /api/checkout/webhook
const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      // In development without webhook secret, parse the body directly
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ message: 'Webhook Error' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const comandaId = session.metadata.comandaId;

    try {
      const comanda = await Comanda.findById(comandaId);
      if (!comanda || comanda.estat !== 'pendent') {
        return res.status(200).json({ received: true });
      }

      // Deduct stock
      const detalls = await DetallComanda.find({ comanda: comandaId }).populate('producte');
      let importTotal = 0;

      for (const detall of detalls) {
        const preu = detall.preu_unitari || (detall.producte ? detall.producte.preu : 0);
        importTotal += preu * detall.quantitat;

        if (detall.producte) {
          await Product.findByIdAndUpdate(detall.producte._id, {
            $inc: { estoc: -detall.quantitat },
          });
        }
      }

      // Update order
      comanda.estat = 'processant';
      comanda.import_total = importTotal;
      await comanda.save();

      // Create payment record
      await new Pagament({
        comanda: comandaId,
        estat: 'completat',
        import_total: importTotal,
        metode: 'stripe',
        data_pagament: new Date(),
      }).save();

      // Create shipment record
      await new Enviament({
        comanda: comandaId,
        data_sortida: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        empresa_transport: 'TRUE FACTS EXPRESS',
        codi_seguiment: `TF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      }).save();

    } catch (err) {
      console.error('Error processant webhook:', err.message);
    }
  }

  res.status(200).json({ received: true });
};

module.exports = {
  processCheckout,
  createSession,
  webhook,
};
