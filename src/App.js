import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const taxRate = 0.08; // 8% tax

  const addItem = () => {
    if (description && quantity && rate) {
      setItems([
        ...items,
        {
          description,
          quantity: parseFloat(quantity),
          rate: parseFloat(rate),
        },
      ]);
      setDescription("");
      setQuantity("");
      setRate("");
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>AI Invoice Generator</h1>

      {/* Item Input */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ flex: "2" }}
        />
        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ flex: "1" }}
        />
        <input
          type="number"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{ flex: "1" }}
        />
        <button onClick={addItem} style={{ flex: "0.5" }}>Add</button>
      </div>

      {/* Invoice Table */}
      <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate ($)</th>
            <th>Amount ($)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.rate.toFixed(2)}</td>
              <td>{(item.quantity * item.rate).toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(index)}>❌</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                No items added
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ textAlign: "right" }}>Subtotal:</td>
            <td colSpan="2">${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3" style={{ textAlign: "right" }}>Tax (8%):</td>
            <td colSpan="2">${tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
            <td colSpan="2" style={{ fontWeight: "bold" }}>${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
