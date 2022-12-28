import { FaBluetoothB } from "react-icons/fa";
import ChartData from "../functions/SimpleAreaChart";
import Carousel from "./Carousel";
import ListCurrencies from "./ListCurrencies";

// Add new cryptocurrencies and options to the main base

function Main() {
  return (
    <main className="text-white bg-transparent md:col-span-4 text-center relative ">
      <header className=" pt-10">
        <h2 className="text-gradient text-6xl font-semibold uppercase">Bitcodesk</h2>
        <h3 className="text-2xl font-semibold uppercase">Highest ranking cryptocurrencies</h3>
      </header>

      <div className="">
        <div className="py-8 flex">
          {/* card go here */}
          <div className="w-full px-24">
            <Carousel />
          </div>
        </div>

        <div className="w-full">
          <ListCurrencies />
        </div>
      </div>
    </main>
  );
}

export default Main;
