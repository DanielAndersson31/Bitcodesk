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

        <h4 className="font-bold mt-12 pb-2 text-4xl">Most Popular</h4>
        <section className="p-20 m-24 bg-white rounded-lg">
          <div className=" p-4  flex justify-center items-center">
            <ChartData />
          </div>
          <div className="p-4  flex justify-center">
            <article className="flex justify-center items-center max-w-[50%] bg-blue-700">
              <div className="">Content</div>
              <img
                className="w-[50%]"
                src="/src/assets/images/blockchain-technology-background-gradient-blue.jpg"
              ></img>
            </article>
          </div>
        </section>

        <div className="w-full">
          <ListCurrencies />
        </div>
      </div>
    </main>
  );
}

export default Main;
