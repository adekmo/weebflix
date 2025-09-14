"use client";

import { EpisodeResponse } from "@/types/episode";
import Link from "next/link";
import { useEffect, useState } from "react";

const EpsiodesLists = ({ animeId }: { animeId: string }) => {
    const [episodes, setEpisodes] = useState<EpisodeResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; 

    useEffect(() => {
        async function fetchEpisodes() {
        try {
            const res = await fetch(`/api/home/${animeId}/episodes`);
            const data = await res.json();
            // console.log('data', animeId);
            
            setEpisodes(data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        }
        fetchEpisodes();
    }, [animeId]);

    const totalEpisodes = episodes?.totalEpisodes || 0;
    const totalPages = Math.ceil(totalEpisodes / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    // const paginatedEpisodes = episodes?.episodes.slice(startIndex, endIndex);
    const paginatedEpisodes = (episodes?.episodes || []).slice(startIndex, endIndex);

    if (loading) return <p>Loading episodes...</p>;
    
    if (!episodes || episodes.episodes.length === 0) {
        return <p>No episodes available.</p>;
    }
  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold text-neon mb-3">
        📺 Episodes ({episodes.totalEpisodes})
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {paginatedEpisodes.map((ep) => (
          <Link 
            key={ep.episodeId} 
            href={`/anime/${animeId}/episodes/${ep.number}`}
          >
            <div
              className="group relative overflow-hidden rounded-lg border bg-gradient-to-tr from-[#0D1117] to-[#111827] hover:from-cyan-900/40 hover:to-sky-900/40 transition-all duration-300 p-4 cursor-pointer aspect-[5/2]"
            >
              {/* Episode Info */}
              <h3 className="text-lg font-bold text-white group-hover:text-[hsl(var(--neon))] transition-colors">
                Episode {ep.number}
              </h3>
              <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                {ep.title}
              </p>

              {/* Filler Badge */}
              {ep.isFiller && (
                <div className="absolute top-2 right-2 rounded-full bg-[hsl(var(--neon))] text-xs text-white px-3 py-1 shadow-lg">
                Filler
              </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 rounded bg-[hsl(var(--neon))] text-[hsl(var(--neon-foreground))] disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span className="text-neon">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-[hsl(var(--neon))] text-[hsl(var(--neon-foreground))] disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default EpsiodesLists