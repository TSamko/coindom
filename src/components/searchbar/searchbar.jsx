/* eslint-disable */
import { useState } from 'react';
import './searchbar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const InputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <form>
      <input 
        placeholder='Search' 
        type="text" 
        value={query}
        onChange={InputChange} 
      />
    </form>
  );
}

export default SearchBar;