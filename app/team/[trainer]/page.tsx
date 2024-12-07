"use client";

import { getPokemon } from "@/app/api/route";
import { Pokemon, Trainer } from "@/app/models";
import { teams } from "@/app/teams";
import { use, useEffect, useState } from "react";

export default function PokemonTeam() {
    const [trainer, setTrainer] = useState<Trainer | null>(null);
    const [team, setTeam] = useState<Pokemon[] | null>(null);
    const [trainerName, setTrainerName] = useState<string>("");

    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const trainer = pathSegments[pathSegments.length - 1];
        setTrainerName(trainer);

        const fetchTrainer = async () => {
            const team = Object.values(teams).find(team => team.trainer === trainerName);
            if (!team) return;

            const pokemonList: Pokemon[] = [];
            for (let pokemon of team.pokemon) {
                pokemonList.push(await getPokemon(pokemon.toLowerCase()));
            }
            setTeam(pokemonList);
        };
        fetchTrainer();
    }, [trainerName]);
    console.log(team);
    return (
        <div>
            <h2>{trainerName}</h2>
            <div>
                {team?.map((pokemon, idx) => (
                    <div key={idx} className="flex flex-col items-center rounded hover:bg-orange-400 hover:shadow-2xl">
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <h3>{pokemon.name.toUpperCase()}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}