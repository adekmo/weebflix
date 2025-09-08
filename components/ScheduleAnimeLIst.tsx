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
          className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{anime.name}</h2>
              <p className="text-sm text-gray-500">{anime.jname}</p>
              <p className="text-xs text-gray-600">
                Episode {anime.episode}
              </p>
            </div>
            <span className="text-sm font-mono">
              {anime.time ||
                (anime.airingTimestamp
                  ? new Date(anime.airingTimestamp).toLocaleTimeString()
                  : "-")}
            </span>
          </div>
          <Link
            href={`/anime/${anime.id}`}
            className="text-blue-500 text-sm hover:underline"
          >
            View Details
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ScheduleAnimeLIst