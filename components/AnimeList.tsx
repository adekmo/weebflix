"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SchedulePagination from "@/components/SchedulePagination";
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardTrigger } from "@radix-ui/react-hover-card";
import * as HoverCard from "@radix-ui/react-hover-card";
import AnimeQtip from "./AnimeQtip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "./ui/badge";

type Anime = {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: string | null;
  episodes: { sub: number | null; dub: number | null };
};

type Props = {
  category?: string;
  genre?: string;
  producer?: string;
  letter?: string;
  query?: string;
  type: "category" | "genre" | "producer" | "azlist" | "search";
};


const AnimeList = ({ category, genre, producer, letter, query, type }: Props) => {
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const decodedQuery = query ? decodeURIComponent(query) : "";


    useEffect(() => {
        async function fetchData() {
        setLoading(true);
        setError(null);
        try {
            const endpoint =
              type === "category"
                ? `/api/category/${category}?page=${page}`
                : type === "genre"
                ? `/api/genre/${genre}?page=${page}`
                : type === "producer"
                ? `/api/producer/${producer}?page=${page}`
                : type === "azlist"
                ? `/api/azlist/${letter}?page=${page}`
                : `/api/search?q=${query}&page=${page}`;

            const res = await fetch(endpoint);
            if (!res.ok) throw new Error("Failed to fetch category");

            // "genres": [...],
            // "top10Animes": {...},
            // "category": "TV Series Anime",
            // "totalPages": 122,
            // "hasNextPage": true,
            // "currentPage": 1
            

            const data = await res.json();
            const innerData = data.data?.data;
            setAnimes(innerData?.animes || []);
            setTotalPages(innerData?.totalPages || 1);
        } catch (err) {
            console.error(err);
            setError("Failed to load category data");
        } finally {
            setLoading(false);
        }
        }
        fetchData();
    }, [category, genre, producer, letter, query, page, type]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        {type === "category" ? (
          <>
            <span className="text-neon">{category}</span>
            {" "} Anime
          </>
        ) : type === "genre" ? (
         <>
            <span className="text-neon">{genre}</span>
            {" "} Anime
          </>
        ) : type === "producer" ? (
          <>
            Anime productions by:{" "}
            <span className="text-neon">{producer}</span>
          </>
        ) : type === "azlist" ? (
          <>
            Anime list by letter:{" "}
            <span className="text-neon">{letter}</span>
          </>
        ) : (
          <>
            Search Results for:{" "}
            <span className="text-neon">{decodedQuery}</span>
          </>
        )}
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : animes.length === 0 ? (
        <p>No anime found.</p>
      ) : (
        <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {animes.map((anime) => (
                <HoverCard.Root key={anime.id} openDelay={200} closeDelay={100}>
                  <HoverCard.Trigger asChild>
                    <Link
                      href={`/anime/${anime.id}`}
                      className={cn(
                                  "group relative overflow-hidden rounded-xl border bg-card transition-transform",
                                  "hover:-translate-y-1 hover:shadow-2xl",
                                )}
                    >
                      <Image
                        src={anime.poster}
                        alt={anime.name}
                        width={200}
                        height={200}
                        className='aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="px-3 py-5 backdrop-blur-sm bg-black/30 flex flex-col gap-1">
                        <h3 className="line-clamp-1 text-sm font-semibold text-white drop-shadow-lg">{anime.name}</h3>
                        <p className="mt-1 text-xs text-gray-200/90 line-clamp-2 drop-shadow">
                          {anime.jname}
                        </p>
                        <p className="text-xs text-gray-600">
                          Duratioan <span className="text-neon">{anime.duration}</span> • Type <span className="text-neon">{anime.type}</span>
                        </p>
                        <Badge variant="destructive" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white backdrop-blur hover:bg-white/20">
                          Episodes: Sub {anime.episodes.sub || 0} | Dub {anime.episodes.dub || 0}
                        </Badge>
                      </div>
                    </Link>
                  </HoverCard.Trigger>
                  <HoverCard.Portal>
                    <HoverCard.Content
                      side="right"
                      sideOffset={10}
                      className="z-50 bg-white rounded-lg shadow-xl border p-3 animate-in fade-in slide-in-from-left-1"
                    >
                      <AnimeQtip id={anime.id} />
                      <HoverCardArrow className="fill-white" />
                    </HoverCard.Content>
                  </HoverCard.Portal>
                </HoverCard.Root>
                ))}
              </div>

          {totalPages > 1 && (
            <SchedulePagination
              page={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </>
      )}
    </div>
  )
}

export default AnimeList