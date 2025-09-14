"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type Episodes = {
  sub: number;
  dub: number;
};

type Spot = {
  id: string;
  rank: number;
  name: string;
  description: string;
  poster: string;
  episodes: Episodes;
  otherInfo: string[];
};

const Hero = () => {
  const [featured, setFeatured] = useState<Spot | null>(null);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/home");
        const data: Spot[] = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const random = data[Math.floor(Math.random() * data.length)];
          setFeatured(random);
        }
      } catch (err) {
        console.error("Failed to load featured anime:", err);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <section className="relative p-2">
      <div className="absolute inset-0 -z-10">
        <img
          src={
            featured?.poster ||
            "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1600&auto=format&fit=crop"
          }
          alt={featured?.name || "Popular anime banner"}
          className="h-[46vh] w-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container flex h-[46vh] flex-col justify-end pb-8">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs uppercase tracking-widest text-white/70">
            Featured
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            {featured ? (
              featured.name
            ) : (
              <>
                Explore the World of{" "}
                <span className="text-gradient">Weebflix</span>
              </>
            )}
          </h1>

          <p className="mt-3 text-white/80 line-clamp-2">
            {featured?.description ||
              "Stream and discover anime by category, genre, producer, or A-Z. Clean, fast, and built for exploration."}
          </p>
          {featured && (
            <Button asChild variant="neon" className="mt-3">
              <Link href={`/anime/${featured.id}`}>View Anime</Link>
            </Button>
          )}

          {/* <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild variant="neon">
              <Link href="/genre">Browse Genres</Link>
            </Button>
            <Button asChild variant="neon">
              <Link href="/category">Explore Categories</Link>
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
