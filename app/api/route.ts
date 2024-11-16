import { get } from "http";
import { Pokemon, Trainer } from "../models";
import { teams } from "../teams";

export async function GET() {
    return Response.json("Ongi etorri Azkenak Pokemon League-ra!");
  }

export async function getPokemon(pokemon: string) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	const pkmn = await res.json();
	return pkmn;
}
  