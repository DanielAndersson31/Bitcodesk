import { data } from "autoprefixer";
import React, { useState, useEffect } from "react";
import { createConnection } from "../functions/ConnectWebSocket";
import { useFetch } from "../functions/FetchAPI";
import Modal from "../functions/Modal";
import RecentlyViewed from "../functions/RecentlyViewed";
import { useLocalStorage } from "../functions/StoreLocalStorage";

//  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false";

function ListCurrencies() {
  //API URL

  const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false";

  //Modal component for currencies
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState();
  const [currentConnection, setCurrentConnection] = useState(null);

  //Created search function for currencies
  const [items, setItems] = useState();
  const [query, setQuery] = useState("");
  console.log(query);
  // Pagniation Load more
  const [paginate, setPaginate] = useState(25);
  const load_more = (event) => {
    setPaginate((prevValue) => prevValue + 25);
  };

  // Create recently viewed Array

  const [recentlyViewed, setRecentlyViewed] = useState([]);

  function addNewCurrency(currency) {
    if (recentlyViewed.find((item) => item.id === currency.id)) {
      const filteredRecentlyViewed = recentlyViewed.filter((item) => item.id !== currency.id);
      return setRecentlyViewed([currency, ...filteredRecentlyViewed]);
    } else {
      return setRecentlyViewed([currency, ...recentlyViewed]);
    }
  }

  const { data: data, error, loading } = useFetch(API_URL);
  if (loading) return console.log(loading);

  if (error) return console.log("Error, unable to display content");

  if (data) {
    const currencyData = Object.values(data);
    const search_parameters = Object.keys(data[0]).filter((key) => {
      return typeof data[0][key] === "string";
    });
    function search(data) {
      return data.filter((item) =>
        search_parameters.some((parameter) => {
          if (item[parameter]) {
            return item[parameter].toString().toLowerCase().includes(query.toLowerCase());
          }
        })
      );
    }
    return (
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg px-24 my-20">
        <Modal open={openModal} onClose={() => setOpenModal(false)} item={item} currentConnection={currentConnection} />
        <form>
          <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-white focus:border-black focus:outline-none "
              placeholder="Search Currency"
              required
            ></input>
          </div>
        </form>

        <div className="grid grid-cols-5 gap-4">
          {search(currencyData)
            .slice(0, paginate)
            .map((item) => (
              <div className="bg-slate-900 my-2 p-2 flex flex-col items-center rounded-xl text-white">
                <h1 className="">{item.name}</h1>
                <img className="w-12" src={item.image}></img>
                <h2>Rank:{item.market_cap_rank}</h2>
                <h2>${item.current_price}</h2>
                <h2>All time high: </h2>

                <button
                  onClick={() => {
                    setOpenModal(true);
                    setItem(item);
                    addNewCurrency(item);
                    const newConnection = createConnection(item.symbol);
                    setCurrentConnection(newConnection);
                  }}
                  className="w-full bg-white text-black"
                >
                  More Info
                </button>
              </div>
            ))}
          <button className="text-gradient" onClick={load_more}>
            Load more
          </button>
        </div>
        <RecentlyViewed currency={recentlyViewed} />
      </div>
    );
  } else {
    console.log("Failed to load items");
    return null;
  }
}

export default ListCurrencies;

// <table className="w-full text-xl text-left text-gray-500 dark:text-gray-400">
//   <thead className="text-xl text-white uppercase bg-slate-800 dark:bg-gray-700 dark:text-gray-400">
//     <tr>
//       <th scope="col" className="py-3 px-6">
//         Name
//       </th>
//       <th scope="col" className="py-3 px-6">
//         Rank
//       </th>
//       <th scope="col" className="py-3 px-6">
//         Price
//       </th>
//       <th scope="col" className="py-3 px-6">
//         ATH(All time high)
//       </th>
//       <th scope="col" className="py-3 px-6">
//         Action
//       </th>
//     </tr>
//   </thead>
//   <tbody>
// {search(currencyData)
//   .slice(0, paginate)
//   .map((item) => (
//     <tr class="bg-slate-800 border-b dark:bg-gray-900 dark:border-gray-700" key={item.id}>
//       <th
//         scope="row"
//         class="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white flex items-center w-36"
//       >
//         {/* <img className="" src={item.image}></img> */}
//         {item.name}
//       </th>
//       <td className="py-4 px-6 text-white">{item.market_cap_rank}</td>
//       <td className="py-4 px-6 text-white">€ {item.current_price}</td>
//       <td className="py-4 px-6 text-white">€ {item.ath}</td>
//       <td className="py-4 px-6">
//         <button
//           onClick={() => {
//             setOpenModal(true);
//             setItem(item);
//             const newConnection = createConnection(item.symbol);
//             setCurrentConnection(newConnection);
//           }}
//           className="text-white hover:underline"
//         >
//           More Info
//         </button>
//       </td>
//     </tr>
//   ))}
//   </tbody>
// </table>;
