import { Pokemon } from "@/app/models";

interface PokemonListProps {
  pokemon: Pokemon[];
}

export default function PokemonTeam({ pokemon }: PokemonListProps) {
  return (
    <div className="grid grid-cols-6 gap-4 m-2 p-2 rounded bg-orange-600 w-full shadow">
      {pokemon.map((pokemon, idx) => (
        <div key={idx} className="flex flex-col items-center rounded hover:bg-orange-400 hover:shadow-2xl">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>{pokemon.name.toUpperCase()}</h3>
        </div>
      ))}
    </div>
  );
}
