import { AnimeDetail } from "@/types/detail";


type Props = {
  anime: AnimeDetail;
};

const DetailAnimeMoreInfo = ({anime}: Props) => {
  return (
    <section>
        <h2 className="text-xl font-semibold mb-3">ℹ️ More Info</h2>
        <ul className="space-y-1 text-sm">
          <li>
            <strong>Japanese:</strong> {anime.moreInfo?.japanese}
          </li>
          <li>
            <strong>Synonyms:</strong> {anime.moreInfo?.synonyms}
          </li>
          <li>
            <strong>Aired:</strong> {anime.moreInfo?.aired}
          </li>
          <li>
            <strong>Premiered:</strong> {anime.moreInfo?.premiered}
          </li>
          <li>
            <strong>Producers:</strong> {anime.moreInfo?.producers?.join(", ")}
          </li>
        </ul>
      </section>
  )
}

export default DetailAnimeMoreInfo