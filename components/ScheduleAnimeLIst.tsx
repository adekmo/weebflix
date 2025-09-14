import Link from "next/link";

type ScheduledAnime = {
  id: string;
  time: string;
  name: string;
  jname: string;
  episode: number;
  airingTimestamp?: number;
};

interface Props {
  animes: ScheduledAnime[];
}

const ScheduleAnimeLIst = ({ animes }: Props) => {
  return (
    <ul className="space-y-3">
      {animes.map((anime) => (
        <li
          key={`${anime.id}-${anime.episode}`}
          className="group relative p-4 rounded-lg border border-[hsl(var(--border))] bg-gradient-to-tr from-[#0D1117] to-[#111827] hover:from-cyan-900/30 hover:to-sky-900/30 transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-white group-hover:text-[hsl(var(--neon))] transition-colors">
                {anime.name}
              </h2>
              <p className="text-xs text-gray-400">{anime.jname}</p>
              <p className="mt-1 text-sm font-mono text-gray-300">
                Episode {anime.episode}
              </p>
            </div>

            <span className="text-xs px-2 py-1 rounded-md bg-[hsl(var(--accent))]/30 text-[hsl(var(--neon))] font-mono">
              {anime.time ||
                (anime.airingTimestamp
                  ? new Date(anime.airingTimestamp).toLocaleTimeString()
                  : "-")}
            </span>
          </div>

          <Link
            href={`/anime/${anime.id}`}
            className="absolute bottom-2 right-3 text-xs text-[hsl(var(--neon))] hover:underline"
          >
            View Details →
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ScheduleAnimeLIst