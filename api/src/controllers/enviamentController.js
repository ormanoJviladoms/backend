// src/controllers/enviamentController.js
const enviamentService = require('../services/enviamentService');

// Crear un nou enviament
exports.createEnviament = async (req, res) => {
  try {
    const enviament = await enviamentService.createEnviament(req.body);
    res.status(201).json(enviament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tots els enviaments
exports.getEnviaments = async (req, res) => {
  try {
    const enviaments = await enviamentService.getEnviaments();
    res.status(200).json(enviaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un enviament per ID
exports.getEnviamentById = async (req, res) => {
  try {
    const enviament = await enviamentService.getEnviamentById(req.params.id);
    if (!enviament) {
      return res.status(404).json({ message: 'Enviament no trobat' });
    }
    res.status(200).json(enviament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualitzar un enviament
exports.updateEnviament = async (req, res) => {
  try {
    const enviament = await enviamentService.updateEnviament(req.params.id, req.body);
    if (!enviament) {
      return res.status(404).json({ message: 'Enviament no trobat' });
    }
    res.status(200).json(enviament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un enviament
exports.deleteEnviament = async (req, res) => {
  try {
    const enviament = await enviamentService.deleteEnviament(req.params.id);
    if (!enviament) {
      return res.status(404).json({ message: 'Enviament no trobat' });
    }
    res.status(200).json({ message: 'Enviament eliminat correctament' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};