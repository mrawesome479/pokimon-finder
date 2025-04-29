import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PokemonGrid from "./components/PokemonGrid";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );

        setPokemonList(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
        extractTypes(detailedPokemon);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Pokémon data.");
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const extractTypes = (pokemonData) => {
    const allTypes = pokemonData.flatMap((p) => p.types.map((t) => t.type.name));
    const uniqueTypes = [...new Set(allTypes)];
    setTypes(uniqueTypes);
  };

  useEffect(() => {
    let filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((t) => t.type.name === selectedType)
      );
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  if (loading) return <div className="loader">Loading Pokémon...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        types={types}
      />
      <PokemonGrid filteredPokemon={filteredPokemon} />
    </div>
  );
};

export default App;