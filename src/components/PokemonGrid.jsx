import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonGrid = ({ filteredPokemon }) => {
  return (
    <div className="pokemon-grid">
      {filteredPokemon.length === 0 ? (
        <div className="no-results">No Pokémon found.</div>
      ) : (
        filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))
      )}
    </div>
  );
};

export default PokemonGrid;