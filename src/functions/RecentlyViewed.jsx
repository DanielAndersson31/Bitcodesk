import React from "react";

function RecentlyViewed(currency) {
  console.log(currency);
  return (
    <div>
      <h1>Recently Viewed</h1>

      {currency.currency.map((item) => {
        console.log(item.name);
      })}
    </div>
  );
}

export default RecentlyViewed;
