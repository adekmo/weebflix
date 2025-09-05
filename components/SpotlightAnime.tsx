'use client'

import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge';
import Link from 'next/link';

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
    <section>
      <h2 className="text-xl font-semibold mb-3">🔥 Spotlight Animes</h2>
      {spot.length === 0 ? (
        <p>Tidak ada data saat ini</p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {spot.map((s) => (
            <Link href={`/anime/${s.id}`} key={s.id} className='group relative overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow'>
              <div className="aspect-[2/3] w-full overflow-hidden">
                <img
                  src={s.poster}
                  alt={s.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="line-clamp-1 text-sm font-semibold">{s.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {s.description}
                </p>
              </div>
              <div className="absolute left-2 top-2 rounded-md">
                <Badge className={`bg-gradient-to-r from-blue-500 to-cyan-500 text-white`}>
                  {s.episodes.sub} Sub | {s.episodes.dub} Dub
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                {s.otherInfo.map((info, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800"
                  >
                    {info}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default SpotlightAnime