import { AnimeDetail } from "@/types/detail";


type Props = {
  anime: AnimeDetail;
};

const DetailAnimeMoreInfo = ({anime}: Props) => {
  return (
    <section>
        <h2 className="text-xl font-semibold text-neon mb-4 flex items-center gap-2">
          <span>ℹ️</span> More Info
        </h2>
        <ul className="divide-y divide-[hsl(var(--border))] rounded-lg border border-[hsl(var(--border))] bg-card/40 backdrop-blur-sm overflow-hidden">
          <li className="p-3 hover:bg-[hsl(var(--accent))]/30 transition">
            <span className="font-semibold text-neon">Japanese:</span>{" "}
            <span className="text-gray-300">{anime.moreInfo?.japanese}</span>
          </li>
          <li className="p-3 hover:bg-[hsl(var(--accent))]/30 transition">
            <span className="font-semibold text-neon">Synonyms:</span>{" "}
            <span className="text-gray-300">{anime.moreInfo?.synonyms}</span>
          </li>
          <li className="p-3 hover:bg-[hsl(var(--accent))]/30 transition">
            <span className="font-semibold text-neon">Aired:</span>{" "}
            <span className="text-gray-300">{anime.moreInfo?.aired}</span>
          </li>
          <li className="p-3 hover:bg-[hsl(var(--accent))]/30 transition">
            <span className="font-semibold text-neon">Premiered:</span>{" "}
            <span className="text-gray-300">{anime.moreInfo?.premiered}</span>
          </li>
        </ul>
      </section>
  )
}

export default DetailAnimeMoreInfo