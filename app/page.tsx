"use client";

import { getPokemon } from "./api/route";
import { useEffect, useState } from "react";
import { teams } from "./teams";
import { Pokemon, Trainer } from "./models";

export default function Home() {
  const [pokemon, setPokemon]: any = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      for (let team in teams) {
        const team_list = teams[team].pokemon
        for (let pkmn in team_list) {
          const pkmn_data: Pokemon = await getPokemon(team_list[pkmn].toLowerCase());
          setPokemon(pkmn_data);
        }
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div>
      {pokemon ? (
        <div>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
