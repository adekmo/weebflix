"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GenreNav = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const active = pathname.split("/")[2];

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch("/api/genre");
        const json = await res.json();
        setGenres(json.genres || []);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  if (loading) return <p>Loading genres...</p>;

  return (
    <div className="flex overflow-x-auto gap-3 mb-6 pb-2 scrollbar-thin">
      {genres.map((genre) => {
        const key = genre.toLowerCase().replace(/\s+/g, "-");
        return (
          <Link
            key={key}
            href={`/genre/${key}`}
            className={`whitespace-nowrap px-4 py-2 rounded-lg border shadow-sm transition ${
              active === key
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {genre}
          </Link>
        );
      })}
    </div>
  );
};

export default GenreNav;
