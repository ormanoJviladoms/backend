module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: "Usuari no autenticat" });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ 
        status: 'error', 
        message: "Accés prohibit: no tens permisos suficients" 
      });
    }

    next();
  };
};

