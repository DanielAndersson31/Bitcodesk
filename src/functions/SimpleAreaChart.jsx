import { useFetch } from "./FetchAPI";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useEffect, useState } from "react";

function ChartData({ currency }) {
  const chartAPI_URL = `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=eur&days=max`;

  const { data: data, error, loading } = useFetch(chartAPI_URL);
  if (loading) return console.log(loading);

  if (error) return console.log("Error, unable to display content");
  let graphData = [];
  if (data) {
    graphData = data.prices.map((item) => {
      const [timestamp, p] = item;
      const date = new Date(timestamp).toLocaleDateString("en-us");

      return {
        Date: date,
        Price: p,
      };
    });
  }

  return (
    <div>
      <h1 className="text-black text-2xl pb-8 uppercase ">{currency} Chart</h1>
      <AreaChart
        width={500}
        height={400}
        data={graphData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );

  // const graphData = dataCurrencies.data.prices.map((item) => {
  //   const [timestamp, price] = item;
  //   const date = new Date(timestamp).toLocaleDateString("en-us");

  //   return {
  //     Date: date,
  //     Price: price,
  //   };
  // });
}

export default ChartData;
