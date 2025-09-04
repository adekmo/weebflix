import AnimeCard from "@/components/AnimeCard";
import SpotlightAnime from "@/components/SpotlightAnime";

import Image from "next/image";

export default async function Home() {
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Top Airing Anime</h1>
      <div className="flex justify-between items-center flex-row">
        <SpotlightAnime />
      </div>
    </div>
  );
}
