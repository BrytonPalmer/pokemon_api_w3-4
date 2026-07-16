if (process.env.NODE_ENV !== 'production') {
  const dns = require('node:dns/promises');
  dns.setServers(['1.1.1.1', '8.8.8.8']);
}

const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;