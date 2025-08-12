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
    <div style={{ fontFamily: "Arial, sans-serif", padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#0A2342" }}>AI Invoice Generator</h1>

      {/* Input Row */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addItem} style={buttonStyle}>Add</button>
      </div>

      {/* Invoice Table */}
      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: "#0A2342", color: "#fff" }}>
            <th style={thTdStyle}>Description</th>
            <th style={thTdStyle}>Qty</th>
            <th style={thTdStyle}>Rate ($)</th>
            <th style={thTdStyle}>Amount ($)</th>
            <th style={thTdStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
              <td style={thTdStyle}>{item.description}</td>
              <td style={thTdStyle}>{item.quantity}</td>
              <td style={thTdStyle}>{item.rate.toFixed(2)}</td>
              <td style={thTdStyle}>{(item.quantity * item.rate).toFixed(2)}</td>
              <td style={thTdStyle}>
                <button
                  onClick={() => removeItem(index)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#d9534f",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#888", padding: "15px" }}>
                No items added yet
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={tfootLabelStyle}>Subtotal:</td>
            <td colSpan="2" style={tfootValueStyle}>${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3" style={tfootLabelStyle}>Tax (8%):</td>
            <td colSpan="2" style={tfootValueStyle}>${tax.toFixed(2)}</td>
          </tr>
          <tr style={{ backgroundColor: "#0A2342", color: "#fff" }}>
            <td colSpan="3" style={{ padding: "10px", textAlign: "right", fontWeight: "bold" }}>Total:</td>
            <td colSpan="2" style={{ padding: "10px", fontWeight: "bold" }}>${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// Styles
const inputStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  flex: "1",
};

const buttonStyle = {
  backgroundColor: "#0A2342",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "8px 12px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const thTdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
};

const tfootLabelStyle = {
  padding: "10px",
  textAlign: "right",
  fontWeight: "bold",
  border: "1px solid #ddd",
};

const tfootValueStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};
