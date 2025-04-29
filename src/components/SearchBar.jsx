import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, selectedType, setSelectedType, types }) => {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;