// auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
// Middleware to verify JWT token
const signToken = (user) => {
   return jwt.sign({ userId: user.user_id, username: user.username, role: user.role}, process.env.SECRET_KEY, { expiresIn: '1h' });
}

const  verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(403).json({ error: 'Token is missing' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = {
  verifyToken,
  signToken,
};
