import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");

  const companyInfo = {
    fromName: "Your Company Name",
    fromAddress: "123 Your Street, Your City, State 12345",
    fromEmail: "contact@yourcompany.com",
    billToName: "Acme Corporation",
    billToAddress: "123 Business St, Suite 100, New York, NY 10001",
    billToEmail: "billing@acme.com",
    invoiceDate: "2025-08-11",
    dueDate: "2025-09-10",
  };

  const taxRate = 0.08; // 8%

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
    <div style={{ display: "flex", gap: "30px", fontFamily: "Arial, sans-serif", padding: "30px", background: "#f5f7fa" }}>
      
      {/* Left Side: Input + Templates */}
      <div style={{ flex: 1 }}>
        <h1 style={{ color: "#0A2342" }}>AI Invoice Generator</h1>

        <div style={{ marginBottom: "20px" }}>
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

        <h3 style={{ color: "#0A2342" }}>Quick Templates</h3>
        <div style={templateStyle}>Consulting Services</div>
        <div style={templateStyle}>Product Sales</div>
        <div style={templateStyle}>Subscription</div>
      </div>

      {/* Right Side: Invoice Preview */}
      <div style={{
        flex: 1,
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{
          background: "#0A2342",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          textAlign: "center"
        }}>INVOICE</h2>

        {/* From / To Info */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
          <div>
            <strong>From:</strong>
            <p>{companyInfo.fromName}</p>
            <p>{companyInfo.fromAddress}</p>
            <p>{companyInfo.fromEmail}</p>
          </div>
          <div>
            <strong>Bill To:</strong>
            <p>{companyInfo.billToName}</p>
            <p>{companyInfo.billToAddress}</p>
            <p>{companyInfo.billToEmail}</p>
          </div>
        </div>

        {/* Dates */}
        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
          <p><strong>Invoice Date:</strong> {companyInfo.invoiceDate}</p>
          <p><strong>Due Date:</strong> {companyInfo.dueDate}</p>
        </div>

        {/* Table */}
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: "#0A2342", color: "#fff" }}>
              <th style={thTdStyle}>Description</th>
              <th style={thTdStyle}>Qty</th>
              <th style={thTdStyle}>Rate</th>
              <th style={thTdStyle}>Amount</th>
              <th style={thTdStyle}></th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{item.description}</td>
                <td style={thTdStyle}>{item.quantity}</td>
                <td style={thTdStyle}>${item.rate.toFixed(2)}</td>
                <td style={thTdStyle}>${(item.quantity * item.rate).toFixed(2)}</td>
                <td style={thTdStyle}>
                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#d9534f",
                      cursor: "pointer",
                    }}
                  >❌</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "10px", color: "#888" }}>
                  No items yet
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
    </div>
  );
}

// Reusable styles
const inputStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginRight: "5px",
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
  marginTop: "15px",
};

const thTdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

const tfootLabelStyle = {
  padding: "8px",
  textAlign: "right",
  fontWeight: "bold",
  border: "1px solid #ddd",
};

const tfootValueStyle = {
  padding: "8px",
  border: "1px solid #ddd",
};

const templateStyle = {
  background: "#e6ecf5",
  padding: "10px",
  margin: "5px 0",
  borderRadius: "5px",
  cursor: "pointer",
};
