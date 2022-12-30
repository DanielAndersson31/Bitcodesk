import { useState, useEffect } from "react";

//TODO Implement Local Storage to application for recently viewed cryptocurrencies

export const useLocalStorage = (defaultVal, key) => {
  const [value, setValue] = useState(() => {
    const tempValue = window.localStorage.getItem(key);
    console.log(tempValue);
    return tempValue !== null ? JSON.stringify(tempValue) : defaultVal;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};
