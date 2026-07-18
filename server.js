// DNS override only in development
if (process.env.NODE_ENV !== 'production') {
  const dns = require('node:dns/promises');
  dns.setServers(['1.1.1.1', '8.8.8.8']);
}

const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(express.json());
app.use(cors());

// Custom CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-TypeError, Accept, Z-Key, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Routes
app.use('/', require('./routes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// DB init + server start
mongodb.initDb((err) => {
  if (err) {
    console.log('Database initialization error:', err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on ${port}`);
    });
  }
});
