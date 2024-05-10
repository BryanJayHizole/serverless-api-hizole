import React, { useState } from 'react';
import axios from 'axios';

const InventoryForm = ({ fetchData }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [reorderPoint, setReorderPoint] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/.netlify/functions/api', { name, quantity, reorderPoint });
      // Assuming fetchData is a function to refetch data after addition
      fetchData();
      setName('');
      setQuantity(0);
      setReorderPoint(0);
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  return (
    <div>
      <h2>Add Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
        <input type="number" value={reorderPoint} onChange={(e) => setReorderPoint(e.target.value)} placeholder="Reorder Point" />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default InventoryForm;
