const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/db-status', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    status: states[dbState] || 'unknown',
    database: mongoose.connection.name,
    host: mongoose.connection.host,
    port: mongoose.connection.port
  });
});

module.exports = router; 