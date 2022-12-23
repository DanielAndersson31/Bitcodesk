import React, { useState } from "react";
import { useFetch } from "./FetchAPI";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const chartDataURL = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=30";

const data = [
  {
    name: "Page A",
    uv: 2,
  },
];

export default function ChartData() {
  const fetchDataHistory = useFetch(chartDataURL);

  const graphData = fetchDataHistory.data.prices.map((item) => {
    const [timestamp, p] = item;
    const date = new Date(timestamp).toLocaleDateString("en-us");

    return {
      Date: date,
      Price: p,
    };
  });
  console.log(graphData);

  return (
    <div>
      <h1 className="text-black text-2xl pb-8">Bitcoin 30 Days Chart </h1>
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
}
