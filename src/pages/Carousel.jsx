import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "../App.css";
import { useFetch } from "../functions/FetchAPI";

const Carousel = () => {
  //URL to retrieve most popular Crypto Currencies

  const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1&sparkline=false";

  const handleDragStart = (e) => e.preventDefault();

  let items = [];

  const responsive = {
    0: {
      items: 1,
    },
    824: {
      items: 4,
    },
    1540: {
      items: 7,
    },
  };

  function changeColor(price) {
    let color;
    if (price > 0) {
      color = "text-green-500";
    } else if (price < 0) {
      color = "text-red-500";
    } else {
      console.log("Failed to determine color");
    }
    return color;
  }

  const { data: data, error, loading } = useFetch(API_URL);
  if (loading) return console.log(loading);

  if (error) return console.log("Error, unable to display content");

  if (data) {
    data.forEach((element) => {
      let createNewItem = (
        <div className="h-72 flex flex-col justify-evenly m-4 border-2 border-slate-400 rounded-xl backdrop-blur-md">
          <div className="p-2 w-full flex flex-col justify-evenly items-center">
            <img draggable="false" src={element.image} className="w-36 p-2"></img>
            <h1 className="p-2 text-white text-xl">{element.name}</h1>

            <h2 className={changeColor(element.price_change_percentage_24h)}>{element.price_change_percentage_24h}%</h2>
            <h2 className="p-2 text-white text-xl">€{element.current_price}</h2>
          </div>
        </div>
      );
      items.push(createNewItem);
    });
  }
  return (
    <AliceCarousel
      mouseTracking
      items={items}
      duration={400}
      autoPlay={true}
      infinite={true}
      startIndex={1}
      disableButtonsControls={true}
      disableDotsControls={true}
      fadeOutAnimation={true}
      mouseDragEnabled={true}
      playButtonEnabled={true}
      responsive={responsive}
      autoPlayInterval={3000}
      autoPlayDirection="ltr"
      autoPlayActionDisabled={true}
    />
  );
};

export default Carousel;
