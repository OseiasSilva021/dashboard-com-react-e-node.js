const jwt = require('jsonwebtoken');

// Middleware para verificar se o usuário está autenticado
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token Decoded:', decoded); // Log para depuração
    req.user = decoded; // Adiciona as informações do usuário ao req
    next(); // Continua para a próxima função (rota)
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado.', error: err.message });
  }
};

module.exports = authenticateToken;
