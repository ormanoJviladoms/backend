const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'No hi ha token o format incorrecte, accés denegat' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_clau_super_segura');
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: 'error', message: 'Token expirat', code: 'TOKEN_EXPIRED' });
    }
    res.status(401).json({ status: 'error', message: 'Token no vàlid' });
  }
};

