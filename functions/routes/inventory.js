// inventory.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Define routes
router.post('/inventory', inventoryController.addItem);
router.get('/inventory', inventoryController.getAllItems);
router.put('/inventory/:id', inventoryController.updateItem);
router.delete('/inventory/:id', inventoryController.deleteItem);

module.exports = router;
