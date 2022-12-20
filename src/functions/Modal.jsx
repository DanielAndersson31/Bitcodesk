import React, { useState, useEffect } from "react";
// import ConnectWebSocket from "./ConnectWebSocket";
import { createConnection } from "./ConnectWebSocket";

function Modal({ open, onClose, item, currentConnection }) {
  if (!open) return null;
  const [currencyData, setCurrencyData] = useState(null);
  currentConnection.onmessage = (event) => {
    let data = JSON.parse(event.data);
    setCurrencyData(data.p);
  };
  return (
    <div className="modal">
      <div onClick={onClose} className="overlay">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modal-content"
        >
          <h1>Currency: {item.name}</h1>
          <img src={item.image}></img>
          <p>Price: {currencyData || item.current_price}</p>
          <button
            className="close-modal"
            onClick={() => {
              currentConnection.close();
              onClose();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
