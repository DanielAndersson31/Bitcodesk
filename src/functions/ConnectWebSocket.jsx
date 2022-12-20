export function createConnection(symbol) {
  let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}eur@trade`);

  ws.onmessage = (event) => {
    let CurrencyData = JSON.parse(event.data);
    console.log(CurrencyData.p);
  };
  ws.onopen = (e) => {
    console.log("[open] Connection is established");
    console.log(ws);
  };
  ws.onclose = (event) => {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      console.log(`[close] Connection to Binance closed unexpectedly`);
    }
  };
  return ws;
}

// console.log(`Websocket State:  ${open}`);

// if (!open) {
//   ws.close();
//   console.log("Connection has been closed by Websocket State.");
// }

// ws.onmessage = (event) => {
//   let CurrencyData = JSON.parse(event.data);
//   console.log(CurrencyData.p);
// };

// ws.onopen = (e) => {
//   console.log("[open] Connection is established");
//   console.log(ws);
// };

// ws.onclose = (event) => {
//   if (event.wasClean) {
//     alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
//   } else {
//     alert(`[close] Connection to Binance closed unexpectedly`);
//   }
// };

// ws.onerror = () => {
//   console.log(`[error]`);
// };

// return console.log("WS has returned");
