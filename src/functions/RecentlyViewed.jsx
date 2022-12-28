import React from "react";
import { json } from "react-router-dom";

function RecentlyViewed({ currency }) {
  return (
    <div className="mt-24">
      <h1 className="text-3xl">Recently Viewed</h1>
      <div className="grid grid-cols-1 gap-4 justify-center items-center  lg:grid-cols-4 2xl:grid-cols-7 py-8">
        {currency.map((currency) => (
          <div className="flex flex-col justify-center items-center py-4  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 text-black">
            <img className="rounded-t-lg w-32 " src={currency.image}></img>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{currency.name}</h1>

            <h2 className="mb-3 font-normal text-gray-700 dark:text-gray-400">Rank:{currency.market_cap_rank}</h2>
            <h2 className="mb-3 font-normal text-gray-700 dark:text-gray-400">€{currency.current_price}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;
