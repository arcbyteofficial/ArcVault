require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDB } = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database structure if not existing
initializeDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vault', require('./routes/vault'));

// Health check endpoint for Railway
app.get('/health', (req, res) => res.status(200).send('OK'));

// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
