"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Suggestion = {
  id: string;
  name: string;
  poster: string;
};

const SearchBar = () => {

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search/suggest?q=${query}`);
        const data = await res.json();
        const innerData = data.data?.data;
        setSuggestions(innerData.suggestions || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search/${encodeURIComponent(query.trim())}`);
    setSuggestions([]);
    setShowSuggestions(false);
    setQuery("");
  };
  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anime..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {showSuggestions && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="p-3 text-sm text-gray-500">Loading...</p>
          ) : suggestions.length === 0 ? (
            <p className="p-3 text-sm text-gray-500">No results</p>
          ) : (
            suggestions.map((anime) => (
              <Link
                key={anime.id}
                href={`/anime/${anime.id}`}
                onClick={() => {
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
              >
                <img
                  src={anime.poster}
                  alt={anime.name}
                  className="w-10 h-14 object-cover rounded"
                />
                <span className="text-sm font-medium">{anime.name}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar