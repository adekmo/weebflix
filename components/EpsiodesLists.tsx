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
      <h2 className="text-xl font-semibold mb-3">
        📺 Episodes ({episodes.totalEpisodes})
      </h2>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {paginatedEpisodes.map((ep) => (
            <Link 
                key={ep.episodeId} 
                href={`/anime/${animeId}/episodes/${ep.number}`} 
            >
          <div
            className="border rounded-md p-3 bg-card hover:bg-accent/30 transition cursor-pointer"
          >
            <p className="font-semibold">Episode {ep.number}</p>
            <p className="text-sm text-muted-foreground">{ep.title}</p>
            {ep.isFiller && (
              <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded bg-yellow-200 text-yellow-900">
                Filler
              </span>
            )}
          </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 rounded bg-primary text-black disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-primary text-black disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default EpsiodesLists