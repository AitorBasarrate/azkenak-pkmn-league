"use client";

import "./style.css";
import PokemonTrainer from "@/app/components/PokemonTrainer/PokemonTrainer";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Azkenak Pokemon League!</h1>
      <PokemonTrainer />
    </div>
  );
}
