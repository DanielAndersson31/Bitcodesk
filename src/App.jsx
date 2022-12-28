import React, { useState, Fragment } from "react";
import "./App.css";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Modal from "./functions/Modal";
import Carousel from "./pages/Carousel";
import Footer from "./pages/Footer";
import ListStockPrice from "./pages/TrendingCoins";
import backgroundImage from "../src/assets/images/light-trails-buildings.jpg";

function App() {
  return (
    <>
      <img className="absolute top-0" src={backgroundImage}></img>
      <Header />
      <Main />
    </>
  );
}

export default App;
