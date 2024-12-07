"use client";

import { Pokemon } from "pokedex-promise-v2";
import { useState, useEffect } from "react";
import { getPokemon } from "./api/route";
import "./style.css";
import { teams } from "./teams";

import Link from "next/link";
import { TRAINER_IMAGES } from "./images/imports";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Azkenak Pokemon League!</h1>
      <PokemonTrainer />
    </div>
  );
}

interface TrainerPokemon {
  [trainer: string]: Pokemon[];
}

export function PokemonTrainer() {
  const [trainerPokemon, setTrainerPokemon] = useState<TrainerPokemon>({});
  const [trainerImages, setUsedImages] = useState<string[]>([]);

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
    const shuffledImages = TRAINER_IMAGES.sort(() => 0.5 - Math.random());
    setUsedImages(shuffledImages);
    fetchPokemon();
  }, []);

  return (
    <div>
      {Object.keys(trainerPokemon).length > 0
        ? (
          Object.keys(trainerPokemon).map((trainer, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center my-3 p-2 m-2 rounded bg-orange-400">
              <Link href={`/team/${trainer}`}>
                <div className="flex flex-col items-center p-5 w-max hover:rounded hover:bg-orange-600 hover:shadow-lg">
                  <img
                      src={trainerImages[index]}
                      alt={trainer}
                  />
                  <h2>{trainer}</h2>
                </div>
              </Link>
              <PokemonTeam pokemon={trainerPokemon[trainer]} />
            </div>
          ))
        )
        : <p>Loading...</p>}
    </div>
  );
}

interface PokemonListProps {
  pokemon: Pokemon[];
}

export function PokemonTeam({ pokemon }: PokemonListProps) {
  return (
    <div className="grid lg:grid-cols-6 gap-4 m-2 p-2 rounded bg-orange-600 w-full shadow md:grid-cols-3 sm:grid-cols-2">
      {pokemon.map((pokemon, idx) => (
        <div key={idx} className="flex flex-col items-center rounded hover:bg-orange-400 hover:shadow-2xl">
          <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />
          <h3>{pokemon.name.toUpperCase()}</h3>
        </div>
      ))}
    </div>
  );
}