// inventoryController.js
const Inventory = require('../schema/Inventory');

exports.addItem = async (req, res) => {
  try {
    const { name, quantity, reorderPoint } = req.body;
    const newItem = new Inventory({ name, quantity, reorderPoint });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, quantity, reorderPoint } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, { name, quantity, reorderPoint }, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
