require("dotenv").config();
const moment = require("moment");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca();

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  
  alpaca.getAccount()
    .then((account) => {
        // Check if our account is restricted from trading.
        if (account.trading_blocked) {
            console.log('Account is currently restricted from trading.')
        }

        //Check how much money we can use to open new positions.
        console.log('Current Account Balance:', account.equity)
    })
  
  res.send("I'm Jasper Trade BOT");



});

app.post("/alert", function (req, res) {
  console.log(`Order: ${req.body}`);

  const hookDate = req.body;

  if (!hookDate) return res.json(req.body);

  try {
    if (hookDate.order == "buy") {
      alpaca.createOrder({
        symbol: hookDate.ticker, // any valid ticker symbol
        qty: 1,
        side: "buy",
        type: "market",
        time_in_force: "day",
      });
    }

    if (hookDate.order == "sell") {
      alpaca.createOrder({
        symbol: hookDate.ticker, // any valid ticker symbol
        qty: 1,
        side: "sell",
        limit_price: hookDate.price, // optional,
        type: "limit",
        time_in_force: "day",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  process.env.PORT ? (port = process.env.PORT) : (port = 3000);
  console.log(`App listening at http://localhost:${port}`);
});
