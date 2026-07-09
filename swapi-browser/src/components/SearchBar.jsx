import React from 'react';
import './SearchBar.css';

export default function SearchBar({ query, onQueryChange }) {
  const handleInputChange = (event) => {
    onQueryChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search characters..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
}
