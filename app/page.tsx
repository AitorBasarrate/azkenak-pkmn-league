"use client";

import { getPokemon } from "./api/route";
import { useEffect, useState } from "react";
import { teams } from "./teams";
import { Pokemon } from "./models";
import "./style.css";

interface TrainerPokemon {
  [trainer: string]: Pokemon[];
}

export default function Home() {
  const [trainerPokemon, setTrainerPokemon] = useState<TrainerPokemon>({});

  useEffect(() => {
    const fetchPokemon = async () => {
      const allTrainerPokemon: TrainerPokemon = {};
      for (let team in teams) {
        const team_list = teams[team].pokemon;
        const trainerName = teams[team].trainer;
        allTrainerPokemon[trainerName] = [];
        for (let pkmn of team_list) {
          const pkmn_data: Pokemon = await getPokemon(pkmn.toLowerCase());
          allTrainerPokemon[trainerName].push(pkmn_data);
        }
      }
      setTrainerPokemon(allTrainerPokemon);
    };

    fetchPokemon();
  }, []);

  return (
    <div>
      {Object.keys(trainerPokemon).length > 0
        ? (
          Object.keys(trainerPokemon).map((trainer, index) => (
            <div key={index}>
              <div className="trainer">
                <h2>{trainer}</h2>
              </div>
              {trainerPokemon[trainer].map((pokemon, idx) => (
                <div key={idx}>
                  <h3>{pokemon.name}</h3>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
              ))}
            </div>
          ))
        )
        : <p>Loading...</p>}
    </div>
  );
}
