import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryEdit = ({ itemToEdit, fetchData }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [reorderPoint, setReorderPoint] = useState(0);

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setQuantity(itemToEdit.quantity);
      setReorderPoint(itemToEdit.reorderPoint);
    }
  }, [itemToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/.netlify/functions/api/inventory/${itemToEdit.id}`, { name, quantity, reorderPoint });
      fetchData();
    } catch (error) {
      console.error('Error editing inventory item:', error);
    }
  };

  return (
    <div>
      <h2>Edit Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
        <input type="number" value={reorderPoint} onChange={(e) => setReorderPoint(e.target.value)} placeholder="Reorder Point" />
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default InventoryEdit;
