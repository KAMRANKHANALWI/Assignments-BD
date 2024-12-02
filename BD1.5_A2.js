const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3000;

// Welcome Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Stock portfolio analysis API!");
});

// Endpoint 1: Calculate the Returns of the Stocks added
app.get("/calculate-returns", (req, res) => {
  const boughtAt = parseFloat(req.query.boughtAt);
  const marketPrice = parseFloat(req.query.marketPrice);
  const quantity = parseInt(req.query.quantity);

  const returns = (marketPrice - boughtAt) * quantity;
  res.send(returns.toString());
});

// Endpoint 2: Calculate the Total Returns
app.get("/total-returns", (req, res) => {
  const stock1 = parseFloat(req.query.stock1);
  const stock2 = parseFloat(req.query.stock2);
  const stock3 = parseFloat(req.query.stock3);
  const stock4 = parseFloat(req.query.stock4);

  const totalReturns = stock1 + stock2 + stock3 + stock4;
  res.send(totalReturns.toString());
});

// Endpoint 3: Calculate the Return Percentage
app.get("/calculate-return-percentage", (req, res) => {
  const boughtAt = parseFloat(req.query.boughtAt);
  const returns = parseFloat(req.query.returns);

  const returnPercentage = (returns / boughtAt) * 100;
  res.send(returnPercentage.toString());
});

// Endpoint 4: Calculate the Total Return Percentage
app.get("/total-return-percentage", (req, res) => {
  const stock1 = parseFloat(req.query.stock1);
  const stock2 = parseFloat(req.query.stock2);
  const stock3 = parseFloat(req.query.stock3);
  const stock4 = parseFloat(req.query.stock4);

  const totalReturnPercentage = stock1 + stock2 + stock3 + stock4;
  res.send(totalReturnPercentage.toString());
});

// Endpoint 5: Identify the Status of Stocks based on their Return Value
app.get("/status", (req, res) => {
  const returnPercentage = parseFloat(req.query.returnPercentage);

  const status = returnPercentage > 0 ? "profit" : "loss";
  res.send(status);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
