import AnimeCard from "@/components/AnimeCard";
import SpotlightAnime from "@/components/SpotlightAnime";

import Image from "next/image";

export default async function Home() {
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Top Airing Anime</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <SpotlightAnime />
      </div>
    </div>
  );
}
