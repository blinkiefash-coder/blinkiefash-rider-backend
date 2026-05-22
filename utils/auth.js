const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const raw = req.headers['authorization'];
  if (!raw) return res.status(401).json({ message: 'No token provided' });
  // Accept both raw token and "Bearer <token>" format
  const token = raw.startsWith('Bearer ') ? raw.slice(7) : raw;
  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
