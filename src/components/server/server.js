/* eslint-disable */
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const fetchCoins = async (page) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=false`);
  const data = await response.json();
  return data;
};

const getAllCoins = async () => {
  let allCoins = [];
  const totalPages = 2; 

  for (let page = 1; page <= totalPages; page++) {
    const coins = await fetchCoins(page);
    allCoins = allCoins.concat(coins);
  }

  return allCoins;
};

app.get('/coins', async (req, res) => {
  try {
    const allCoins = await getAllCoins();
    res.json(allCoins);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
