/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './coins.css';
import SearchBar from '../searchbar/searchbar.jsx';

function Coins() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/coins');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCoins(data);
        setFilteredCoins(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const handleSearch = (query) => {
    const filtered = coins.filter(coin =>
      coin.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCoins(filtered);
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      <div className="coins-container">
        {filteredCoins.map((coin) => (
          <div key={coin.id} className="coin">
            <div className="coin-logo">
              <img src={coin.image} alt={coin.name} />
            </div>
            <div className="symbol">{coin.symbol.toUpperCase()}</div>
            <div className="price">${coin.current_price.toLocaleString()}</div>
            <div className="market-cap">${coin.market_cap.toLocaleString()}</div>
            <div 
              className="percent-dayChange" 
              style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}
            >
              {coin.price_change_percentage_24h !== undefined 
                ? coin.price_change_percentage_24h.toFixed(2) 
                : 'N/A'}%
            </div>
            <div 
              className="percent-monthChange" 
              style={{ color: coin.price_change_percentage_30d >= 0 ? 'green' : 'red' }}
            >
              {coin.price_change_percentage_30d !== undefined 
                ? coin.price_change_percentage_30d.toFixed(2) 
                : 'N/A'}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Coins;
