import { AnimeDetail } from '@/types/detail';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';

type Props = {
  anime: AnimeDetail;
};

const DetailAnimeHeader = ({anime}: Props) => {
  return (
    <section className="grid gap-6 md:grid-cols-[280px_1fr]">
        <div className="overflow-hidden rounded-xl border border-border">
          <Image src={anime.info.poster} alt={anime.info.name} width={200} height={200} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">{anime.info.name}</h1>
          <p className="mt-3 text-[#657385] max-w-3xl">{anime.info.description}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Status:</span> {anime.moreInfo?.status || "-"}</div>
            <div><span className="text-muted-foreground">Score:</span> {anime.moreInfo?.malscore ? `⭐ ${anime.moreInfo?.malscore}` : "-"}</div>
            {/* <div><span className="text-muted-foreground">Type:</span> {anime.type || "-"}</div> */}
            <div><span className="text-muted-foreground">Episodes:</span> {anime.episodes?.sub} Sub |{" "}
              {anime.episodes?.dub} Dub</div>
            <div>
              <span className="text-muted-foreground">Studio:</span> {" "}
              <span className='text-neon'>{anime.moreInfo.studios}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Producer:</span> {" "}
              {anime.moreInfo?.producers?.length ? (
                anime.moreInfo.producers.map((producer: string) => (
                  <Link
                    key={producer}
                    href={`/producer/${encodeURIComponent(
                      producer.toLowerCase().replace(/\s+/g, "-")
                    )}`}
                    className="text-neon underline-offset-4 hover:underline"
                  >
                    {producer}
                  </Link>
                ))
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            {anime.moreInfo?.genres?.map((g) => (
              <Badge key={g} variant="neon" className="rounded-full px-3 py-1">
                  {g}
              </Badge>
            ))}
          </div>
        </div>
    </section>
  )
}

export default DetailAnimeHeader