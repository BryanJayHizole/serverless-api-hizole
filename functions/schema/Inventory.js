// Inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  reorderPoint: {
    type: Number,
    required: true,
    default: 0
  },
  // Add more fields as needed
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
