import React from 'react';

const InventoryReport = ({ inventory }) => {
  // You can include API calls here if needed
  return (
    <div>
      <h2>Inventory Report</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryReport;
