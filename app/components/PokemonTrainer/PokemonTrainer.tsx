import {teams} from "@/app/teams";
import {getPokemon} from "@/app/api/route";
import {useEffect, useState} from "react";
import PokemonTeam from "@/app/components/PokemonTeam/PokemonTeam";
import ash_img from "../../images/ash.png";
import ballguy_img from "../../images/ballguy.png";
import blaine_img from "../../images/blaine.png";
import brock_img from "../../images/brock.png";
import cynthia_img from "../../images/cynthia.png";
import ethan_img from "../../images/ethan.png";
import flint_img from "../../images/flint.png";
import giovanni_img from "../../images/giovanni-lgpe.png";
import hilbert_img from "../../images/hilbert.png";
import jasmine_img from "../../images/jasmine.png";
import kukui_img from "../../images/kukui.png";
import lance_img from "../../images/lance.png";
import oak_img from "../../images/oak.png";
import red_img from "../../images/red.png";
import steven_img from "../../images/steven.png";
import volkner_img from "../../images/volkner.png";
import {Pokemon} from "@/app/models";

const IMAGES = [
    ash_img['src'],
    ballguy_img['src'],
    blaine_img['src'],
    brock_img['src'],
    cynthia_img['src'],
    ethan_img['src'],
    flint_img['src'],
    giovanni_img['src'],
    hilbert_img['src'],
    jasmine_img['src'],
    kukui_img['src'],
    lance_img['src'],
    oak_img['src'],
    red_img['src'],
    steven_img['src'],
    volkner_img['src'],
]

interface TrainerPokemon {
    [trainer: string]: Pokemon[];
}

export default function PokemonTrainer() {
    const [trainerPokemon, setTrainerPokemon] = useState<TrainerPokemon>({});
    const [usedImages, setUsedImages] = useState<string[]>([]);

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
        const shuffledImages = IMAGES.sort(() => 0.5 - Math.random());
        setUsedImages(shuffledImages);
        fetchPokemon();
    }, []);

    return (
        <div>
            {Object.keys(trainerPokemon).length > 0
                ? (
                    Object.keys(trainerPokemon).map((trainer, index) => (
                        <div key={index}>
                            <div className="flex items-center my-8 p-2 m-2 rounded bg-orange-300">
                                <img src={usedImages[index]} alt={trainer} className="w-16 h-16 rounded-full" />
                                <h2 className="m-2 p-2 bg-orange-500 rounded">{trainer}</h2>
                                <PokemonTeam pokemon={trainerPokemon[trainer]} />
                            </div>
                        </div>
                    ))
                )
                : <p>Loading...</p>}
        </div>
    );
}