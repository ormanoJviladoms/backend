const Usuari = require('../models/Usuari');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper per generar Access Token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, rol: user.rol, email: user.correu },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

// Helper per generar Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

// @desc    Registrar nou usuari
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { nom, email, password, rol, direccio, telefon } = req.body;

    // Camps obligatoris mínims
    if (!nom || !email || !password) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Nom, email i contrasenya són obligatoris' 
      });
    }

    // Verificar si l'usuari ja existeix
    const existingUser = await Usuari.findOne({ correu: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Aquest correu ja està registrat' 
      });
    }

    // Hashejar contrasenya
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuari
    const newUser = new Usuari({
      nom,
      correu: email.toLowerCase(),
      contrasenya: hashedPassword,
      rol: rol || 'client',
      direccio,
      telefon
    });

    await newUser.save();
    
    // Generar tokens per login automàtic immediat
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // No retornar la contrasenya
    const userResponse = newUser.toObject();
    delete userResponse.contrasenya;
    delete userResponse.refreshToken;

    res.status(201).json({ 
      status: 'success', 
      data: { 
        accessToken, 
        refreshToken, 
        user: userResponse 
      } 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Iniciar sessió
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Cal proporcionar email i contrasenya' 
      });
    }

    // Buscar usuari
    const user = await Usuari.findOne({ correu: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Credencials invàlides' 
      });
    }

    // Comparar contrasenya
    const isMatch = await bcrypt.compare(password, user.contrasenya);
    if (!isMatch) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Credencials invàlides' 
      });
    }

    // Generar tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Guardar refresh token a la BD
    user.refreshToken = refreshToken;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.contrasenya;
    delete userResponse.refreshToken;

    res.status(200).json({ 
      status: 'success', 
      data: { 
        accessToken, 
        refreshToken, 
        user: userResponse 
      } 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Refrescar Access Token
// @route   POST /api/auth/refresh
exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Refresh token no proporcionat' 
      });
    }

    // Validar token a la BD
    const user = await Usuari.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ 
        status: 'error', 
        message: 'Refresh token no vàlid o revocat' 
      });
    }

    // Verificar token JWT
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ 
          status: 'error', 
          message: 'Refresh token expirat o incorrecte' 
        });
      }

      const newAccessToken = generateAccessToken(user);
      res.status(200).json({ 
        status: 'success', 
        data: { accessToken: newAccessToken } 
      });
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Tancar sessió
// @route   POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Refresh token requerit per tancar sessió' 
      });
    }

    // Eliminar el refresh token de l'usuari
    const user = await Usuari.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    
    res.status(200).json({ 
      status: 'success', 
      message: 'Logout completat correctament' 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

