// routes/inventory.js
const express = require('express');
const InventoryModel = require('../models/inventory');

const router = express.Router();

// GET all inventory items
router.get('/collect', async (req, res) => {
    try {
        const items = await InventoryModel.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Generate inventory reports
router.get('/reports', async (req, res) => {
    try {
        // Retrieve all inventory items
        const items = await InventoryModel.find();

        // Calculate total quantity and reorder point statistics
        const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
        const totalReorderPoint = items.reduce((total, item) => total + item.reorderPoint, 0);

        // Other report generation logic as needed...

        // Prepare the report data
        const reportData = {
            totalQuantity,
            totalReorderPoint,
            // Add other report data as needed...
        };

        // Return the report data
        res.json(reportData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// GET a single inventory item by ID
router.get('/:id', getItem, (req, res) => {
    res.json(res.item);
});

// CREATE a new inventory item
router.post('/', async (req, res) => {
    const { name, quantity, reorderPoint } = req.body;

    if (!name || !quantity || !reorderPoint) {
        return res.status(400).json({ message: 'Name, quantity, and reorder point are required' });
    }

    const item = new InventoryModel({ name, quantity, reorderPoint });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE an inventory item
router.put('/:id', getItem, async (req, res) => {
    const { name, quantity, reorderPoint } = req.body;

    if (name != null) res.item.name = name;
    if (quantity != null) res.item.quantity = quantity;
    if (reorderPoint != null) res.item.reorderPoint = reorderPoint;

    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an inventory item
router.delete('/delete/:id', async (req, res) => {
    try {
        const item = await InventoryModel.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Deleted Inventory Item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); 

// Middleware to get an item by ID
async function getItem(req, res, next) {
    let item;
    try {
        item = await InventoryModel.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.item = item;
    next();
}

module.exports = router;
