'use client'

import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { HoverCardArrow } from "@radix-ui/react-hover-card";
import * as HoverCard from "@radix-ui/react-hover-card";
import AnimeQtip from './AnimeQtip';

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

const SpotlightAnime = () => {
    const [spot, setSpot] = useState<Spot[]>([]);
    const [loading, setLoading] = useState(true);

    const categories = [
      { key: "tv", label: "TV", icon: "📺" },
      { key: "movie", label: "Movie", icon: "🎬" },
      { key: "ova", label: "OVA", icon: "💿" },
      { key: "ona", label: "ONA", icon: "🧭" },
      { key: "special", label: "Special", icon: "✨" },
    ];

    useEffect(() => {
            const fetchSpot = async () => {
            try {
                const res = await fetch("/api/home");
                const data = await res.json();
                // console.log("API RESULT:", data);
                if (Array.isArray(data)) {
                setSpot(data || []);
                } else {
                setSpot([]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            };
            fetchSpot();
        }, []);
    
         if (loading) return <p className="text-center p-4">Loading...</p>;
  return (
    <section className='container py-8'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className="text-xl font-bold">Popular Anime</h2>
        <div className="hidden gap-2 md:flex">
            {categories.slice(0, 5).map((c) => (
              <Button key={c.key} variant="neon" size="sm" className="rounded-full px-3 cursor-pointer">
                <span className="mr-1">{c.icon}</span>
                {c.label}
              </Button>
            ))}
          </div>
      </div>
      {spot.length === 0 ? (
        <p>Tidak ada data saat ini</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {spot.map((s) => (
            <HoverCard.Root key={s.id} openDelay={200} closeDelay={100}>
                <HoverCard.Trigger asChild>
                    <Link href={`/anime/${s.id}`} key={s.id} className={cn(
                      "group relative overflow-hidden rounded-xl border bg-card transition-transform",
                      "hover:-translate-y-1 hover:shadow-2xl",
                    )}>
                        <Image src={s.poster} alt={s.name} width={200} height={200} className='aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105' />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="p-3 backdrop-blur-sm bg-black/30">
                          <h3 className="line-clamp-1 text-sm font-semibold text-white drop-shadow-lg">{s.name}</h3>
                          <p className="mt-1 text-xs text-gray-200/90 line-clamp-2 drop-shadow">
                            {s.description}
                          </p>
                          {s.otherInfo.map((info, idx) => (
                            <Badge key={idx} variant="destructive" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white backdrop-blur hover:bg-white/20 mr-1">
                              {info}
                            </Badge>
                          ))}
                        </div>
                        <div className="absolute left-2 top-2 rounded-md ">
                          <Badge className={`bg-gradient-to-r from-blue-500 to-cyan-500 text-white`}>
                            {s.episodes.sub} Sub | {s.episodes.dub} Dub
                          </Badge>
                        </div>
                      </Link>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content
                      side="right"
                      sideOffset={10}
                      className="z-50 bg-gradient-to-tr from-[#0D1117] to-[#111827] rounded-lg shadow-xl p-3 animate-in fade-in slide-in-from-left-1"
                    >
                      <AnimeQtip id={s.id} />
                      <HoverCardArrow className="fill-white" />
                    </HoverCard.Content>
                  </HoverCard.Portal>
                </HoverCard.Root>
            
          ))}
        </div>
      )}
    </section>
  )
}

export default SpotlightAnime