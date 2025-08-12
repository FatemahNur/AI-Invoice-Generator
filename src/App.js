import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const addItem = () => {
    if (description && amount) {
      setItems([...items, { description, amount: parseFloat(amount) }]);
      setDescription("");
      setAmount("");
    }
  };

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>AI Invoice Generator</h1>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>{total.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
