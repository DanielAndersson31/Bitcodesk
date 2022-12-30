import { data } from "autoprefixer";
import React, { useState, useEffect } from "react";
import { createConnection } from "../functions/ConnectWebSocket";
import { useFetch } from "../functions/FetchAPI";
import Modal from "../functions/Modal";
import RecentlyViewed from "../functions/RecentlyViewed";
import { useLocalStorage } from "../functions/StoreLocalStorage";

function ListCurrencies() {
  const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false";

  //Modal component for currencies
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState();
  const [currentConnection, setCurrentConnection] = useState(null);

  //Created search function for currencies

  const [query, setQuery] = useState("");
  // Pagniation Load more
  const [paginate, setPaginate] = useState(25);
  const load_more = (event) => {
    setPaginate((prevValue) => prevValue + 25);
  };

  // Create recently viewed Array
  // Local Storage will be implemented for next update.
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  function addNewCurrency(currency) {
    if (recentlyViewed.find((item) => item.id === currency.id)) {
      const filteredRecentlyViewed = recentlyViewed.filter((item) => item.id !== currency.id);
      return setRecentlyViewed([currency, ...filteredRecentlyViewed]);
    } else {
      return setRecentlyViewed([currency, ...recentlyViewed]);
    }
  }
  // Removes recently viewed Array
  function deleteRecentlyViewed() {
    setRecentlyViewed([]);
  }

  //Fetches DATA from API and preform different tasks depending on the response

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
          <div className="">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <input
              type="search"
              id="default-search"
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-white focus:border-black focus:outline-none "
              placeholder="Search Currency.."
              required
            ></input>
          </div>
        </form>

        <div className="grid grid-cols-1 gap-4 justify-center items-center  lg:grid-cols-4 2xl:grid-cols-7 py-8">
          {search(currencyData)
            .slice(0, paginate)
            .map((item) => (
              <div className="flex flex-col justify-center items-center py-4  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 text-black">
                <a className=" pointer-events-none" href="#">
                  <img class="rounded-t-lg w-32 pointer" src={item.image} alt={``} />
                </a>
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h1>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Rank:{item.market_cap_rank}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">€{item.current_price}</p>
                {/* //! Button Creates new instances for Modal and also creates new connection to Websocket. */}
                <button
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    setOpenModal(true);
                    setItem(item);
                    addNewCurrency(item);
                    const newConnection = createConnection(item.symbol);
                    setCurrentConnection(newConnection);
                  }}
                >
                  Read more
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
        </div>
        <button
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={load_more}
        >
          Load More
          <svg
            aria-hidden="true"
            class="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <RecentlyViewed currency={recentlyViewed} />

        <button
          class="inline-flex items-center px-3 mb-4 py-2 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={deleteRecentlyViewed}
        >
          Delete Recently Viewed
        </button>
      </div>
    );
  } else {
    console.log("Failed to load items");
    return null;
  }
}

export default ListCurrencies;
