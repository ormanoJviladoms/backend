// src/services/checkoutService.js
const Comanda = require('../models/Comanda');
const DetallComanda = require('../models/DetallComanda');
const Pagament = require('../models/Pagament');
const Enviament = require('../models/Enviament');
const Product = require('../models/Product');

const processCheckout = async ({ comandaId, pagament, enviament }) => {
  // 1. Validar la comanda
  const comanda = await Comanda.findById(comandaId).populate('usuari');
  if (!comanda) {
    throw new Error('Comanda no trobada');
  }
  if (comanda.estat !== 'pendent') {
    throw new Error('Aquesta comanda ja ha estat processada');
  }

  // 2. Obtenir els detalls de la comanda i calcular l'import total
  const detalls = await DetallComanda.find({ comanda: comandaId }).populate('producte');
  if (!detalls || detalls.length === 0) {
    throw new Error('La comanda no té productes');
  }

  let importTotal = 0;
  for (const detall of detalls) {
    const preu = detall.preu_unitari || (detall.producte ? detall.producte.preu : 0);
    const nom = detall.nom_producte || (detall.producte ? detall.producte.nom : 'Producte desconegut');

    if (detall.producte) {
      // Verificar estoc
      if (detall.producte.estoc < detall.quantitat) {
        throw new Error(`Estoc insuficient per al producte: ${nom}`);
      }
    } else if (!detall.preu_unitari) {
      // Si el producte no existeix i tampoc tenim preu guardat a foc (legacy), error
      throw new Error('Producte no trobat en un detall de la comanda');
    }
    
    importTotal += preu * detall.quantitat;
  }

  // 3. Actualitzar l'estoc dels productes
  for (const detall of detalls) {
    if (detall.producte) {
      await Product.findByIdAndUpdate(detall.producte._id, {
        $inc: { estoc: -detall.quantitat },
      });
    }
  }

  // 4. Actualitzar la comanda
  comanda.estat = 'processant';
  comanda.import_total = importTotal;
  await comanda.save();

  // 5. Crear el pagament
  const newPagament = new Pagament({
    comanda: comandaId,
    estat: 'completat',
    import_total: importTotal,
    metode: pagament.metode, // 'targeta', 'paypal', 'transferencia'
    data_pagament: new Date(),
  });
  await newPagament.save();

  // 6. Crear l'enviament
  const newEnviament = new Enviament({
    comanda: comandaId,
    data_sortida: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // +2 dies
    empresa_transport: enviament.empresa_transport || 'SEUR',
    codi_seguiment: `TF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  });
  await newEnviament.save();

  return {
    comanda: {
      _id: comanda._id,
      estat: comanda.estat,
      import_total: comanda.import_total,
    },
    pagament: newPagament,
    enviament: newEnviament,
    detalls: detalls.map((d) => {
      const preu = d.preu_unitari || (d.producte ? d.producte.preu : 0);
      const nom = d.nom_producte || (d.producte ? d.producte.nom : 'Producte desconegut');
      return {
        producte: nom,
        quantitat: d.quantitat,
        preu_unitari: preu,
        subtotal: preu * d.quantitat,
      };
    }),
  };
};

module.exports = {
  processCheckout,
};
