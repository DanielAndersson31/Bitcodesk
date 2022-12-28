import React, { useState, useEffect } from "react";
import ChartData from "./SimpleAreaChart";

//

function Modal({ open, onClose, item, currentConnection }) {
  if (!open) return null;
  const [currencyData, setCurrencyData] = useState(null);
  currentConnection.onmessage = (event) => {
    let data = JSON.parse(event.data);
    setCurrencyData(data.p);
  };
  return (
    <div className="modal">
      <div
        onClick={() => {
          currentConnection.close();
          onClose();
        }}
        className="overlay"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modal-content my-20"
        >
          <div className=" flex px-10 pt-10 justify-center items-center text-black">
            <img className="w-50 h-40" src={item.image}></img>
            <div className="px-4 items-start text-left">
              <h1 className="">Currency: {item.name}</h1>
              <h2>Currency Symbol: {item.symbol}</h2>
              <h2>Market Cap Rank: {item.market_cap_rank}</h2>
              <h2>Market Cap: {item.market_cap}</h2>
              <h2>Circulating Supply: {item.circulating_supply}</h2>
            </div>
          </div>
          <div className="text-black flex flex-col justify-center text-left items-center">
            <h2> ATH (All time high): {item.ath}</h2>
            <h2> ATH Percentage Change: {item.ath_change_percentage}</h2>
            <h2> ATH Date: {item.ath_date}</h2>
            <h2> Total Supply: {item.total_supply}</h2>
            <h2>Total Volume: {item.total_volume}</h2>
          </div>
          <button
            className="close-modal text-black"
            onClick={() => {
              currentConnection.close();
              onClose();
            }}
          >
            Close
          </button>
          <p className="text-black pt-10">
            Live {item.name} Price: {currencyData || item.current_price}
          </p>
          <ChartData currency={item.id} />
        </div>
      </div>
    </div>
  );
}

export default Modal;
