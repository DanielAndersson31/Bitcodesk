import React from "react";
import { json } from "react-router-dom";

function RecentlyViewed({ currency }) {
  return (
    <div className="my-24">
      <h1>Recently Viewed</h1>
      <div className="grid grid-cols-5 gap-4">
        {currency.map((currency) => (
          <div className="bg-slate-900 my-2 p-2 flex flex-col items-center border rounded-xl text-white">
            <h1 className="">{currency.name}</h1>
            <img className="w-12" src={currency.image}></img>
            <h2>Rank:{currency.market_cap_rank}</h2>
            <h2>${currency.current_price}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;
