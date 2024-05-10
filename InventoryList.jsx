// InventoryList.jsx
import React from 'react';
import axios from 'axios';

const InventoryList = ({ inventory, fetchData }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`your-api-url/inventory/${id}`);
      // Assuming fetchData is a function to refetch data after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {inventory.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} in stock
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
