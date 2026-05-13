const Usuari = require('../models/Usuari');

const safeFields = '-contrasenya -refreshToken';

const getUsers = async (req, res) => {
  try {
    const users = await Usuari.find().select(safeFields).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await Usuari.findById(req.user.id).select(safeFields);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat' });
    }

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateMe = async (req, res) => {
  try {
    const allowedUpdates = {};
    const editableFields = ['nom', 'telefon', 'direccio'];

    editableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        allowedUpdates[field] = req.body[field];
      }
    });

    const user = await Usuari.findByIdAndUpdate(
      req.user.id,
      allowedUpdates,
      { new: true, runValidators: true }
    ).select(safeFields);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat' });
    }

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { rol } = req.body;

    if (!['client', 'admin'].includes(rol)) {
      return res.status(400).json({ status: 'error', message: 'Rol no valid' });
    }

    const user = await Usuari.findByIdAndUpdate(
      req.params.id,
      { rol },
      { new: true, runValidators: true }
    ).select(safeFields);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat' });
    }

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ status: 'error', message: 'No et pots eliminar a tu mateix' });
    }

    const user = await Usuari.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getUsers,
  getMe,
  updateMe,
  updateUserRole,
  deleteUser,
};
