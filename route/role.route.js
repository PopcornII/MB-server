// role.route.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

const userRole = (app) => {
  router.get('/admin', verifyToken, (req, res) => {
    const { role } = req.user;
  
    if (role === 'admin') {
      console.log('admin is login!')
      res.json({ message: 'Welcome, admin!' });
    } else {
      res.status(403).json({ error: 'Access forbidden' });
    }
  });
  
  // Example route accessible only by users with the 'client' role
  router.get('/client', verifyToken, (req, res) => {
    const { role } = req.user;
  
    if (role === 'client') {
      console.log("client is login");
      res.json({ message: 'Welcome, client!' });
    } else {
      res.status(403).json({ error: 'Access forbidden' });
    }
  });

}


module.exports = userRole;
