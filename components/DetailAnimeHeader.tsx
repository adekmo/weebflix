import { AnimeDetail } from '@/types/detail';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  anime: AnimeDetail;
};

const DetailAnimeHeader = ({anime}: Props) => {
  return (
    <section className="grid gap-6 md:grid-cols-[280px_1fr]">
        <div className="overflow-hidden rounded-xl border border-border">
          <Image src={anime.info.poster} alt={anime.info.name} width={50} height={80} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">{anime.info.name}</h1>
          <p className="mt-3 text-[#657385] max-w-3xl">{anime.info.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            {anime.moreInfo?.genres?.map((g) => (
              <span key={g} className="rounded-md bg-accent px-2 py-1">{g}</span>
            ))}
          </div>
          <div className="mt-4 text-sm space-y-1">
            <p>
              <strong>Status:</strong> {anime.moreInfo?.status}
            </p>
            <p>
              <strong>Episodes:</strong> {anime.episodes?.sub} Sub |{" "}
              {anime.episodes?.dub} Dub
            </p>
            <p>
              <strong>Score:</strong> {anime.moreInfo?.malscore}
            </p>
            <p>
              <strong>Studio:</strong>{" "} {anime.moreInfo.studios}

              {" | "}
              <strong>Producers:</strong>{" "}
              {anime.moreInfo?.producers?.length ? (
                anime.moreInfo.producers.map((producer: string) => (
                  <Link
                    key={producer}
                    href={`/producer/${encodeURIComponent(
                      producer.toLowerCase().replace(/\s+/g, "-")
                    )}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    {producer}
                  </Link>
                ))
              ) : (
                <span>-</span>
              )}
            </p>
          </div>
        </div>
    </section>
  )
}

export default DetailAnimeHeader