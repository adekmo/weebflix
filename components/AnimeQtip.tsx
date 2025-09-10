"use client";
import { useEffect, useState } from "react";

type QtipAnime = {
  id: string;
  name: string;
  jname: string;
  malscore: string;
  quality: string;
  episodes: { sub: number; dub: number };
  type: string;
  description: string;
  aired: string;
  status: string;
  genres: string[];
};

const AnimeQtip = ({ id }: { id: string }) => {
  
  const [anime, setAnime] = useState<QtipAnime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQtip() {
      try {
        const res = await fetch(`/api/qtip/${id}`);
        const data = await res.json();
        const innerData = data.data?.data;
        setAnime(innerData.anime || null);
      } catch (err) {
        console.error("Failed to fetch qtip", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQtip();
  }, [id]);

  if (loading) {
    // Skeleton shimmer
    return (
      <div className="space-y-2 animate-pulse">
        <div className="h-4 w-40 bg-gray-300 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-28 bg-gray-200 rounded" />
        <div className="h-12 w-full bg-gray-200 rounded" />
      </div>
    );
  }
  if (!anime) return <p className="text-xs text-red-500">No info available</p>;
  return (
    <div className="text-sm space-y-2 max-w-xs">
      <h3 className="font-bold text-lg">{anime.name}</h3>
      <p className="text-xs text-gray-500">{anime.jname}</p>
      <p className="text-gray-600 line-clamp-3">{anime.description}</p>

      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>Score:</strong> {anime.malscore}</p>
        <p><strong>Episodes:</strong> Sub {anime.episodes.sub} | Dub {anime.episodes.dub}</p>
        <p><strong>Type:</strong> {anime.type}</p>
        <p><strong>Status:</strong> {anime.status}</p>
        <p><strong>Aired:</strong> {anime.aired}</p>
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {anime.genres.map((g) => (
          <span
            key={g}
            className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
          >
            {g}
          </span>
        ))}
      </div>
    </div>
  )
}

export default AnimeQtip