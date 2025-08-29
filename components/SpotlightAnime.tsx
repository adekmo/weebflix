'use client'

import React, { useEffect, useState } from 'react'

type Spot = {
    id: string;
  rank: number;
  name: string;
  description: string;
  poster: string;
};

const SpotlightAnime = () => {
    const [spot, setSpot] = useState<Spot[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchSpot = async () => {
            try {
                const res = await fetch("/api/home");
                const data = await res.json();
                console.log("API RESULT:", data);
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
        <ul className="space-y-3">
          {spot.map((s) => (
            <li
              key={s.id}
              className="p-4 bg-white rounded-xl shadow flex gap-4 items-center"
            >
              <img
                src={s.poster}
                alt={s.name}
                className="w-20 h-28 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">
                  {s.name} ({s.rank})
                </p>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default SpotlightAnime