import AnimeCard from "@/components/AnimeCard";
import Hero from "@/components/Hero";
import QuickNav from "@/components/QuickNav";
import SpotlightAnime from "@/components/SpotlightAnime";

import Image from "next/image";

export default async function Home() {
  
  return (
    <>
      <Hero />
      <QuickNav />
      <SpotlightAnime />
    </>
  );
}
