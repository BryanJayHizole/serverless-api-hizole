// api.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventory');

const app = express();
const router = express.Router();
//your mongoDB Cloud URL
const dbCloudUrl = 'mongodb+srv://bryanhizole:bryan142001@cluster0.ogfgkgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbLocalUrl = '';

// MongoDB connection setup

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbCloudUrl || dbLocalUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

// Mount inventory routes
app.use('/api', inventoryRoutes);

module.exports.handler = serverless(app);