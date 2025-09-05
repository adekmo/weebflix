import { AnimeDetail } from '@/types/detail';

type Props = {
  videos: AnimeDetail["info"]["promotionalVideos"];
};

const DetailAnimePromVideo = ({videos}: Props) => {
    if (!videos || videos.length === 0) return null;

  return (
    <section>
        <h2 className="text-xl font-semibold mb-3">🎬 Promotional Videos</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {videos.map((pv, idx) => (
            <div key={idx} className="border rounded-lg overflow-hidden">
              <iframe
                src={pv.source}
                title={pv.title}
                className="w-full aspect-video"
                allowFullScreen
              />
              <p className="p-2 text-sm">{pv.title}</p>
            </div>
          ))}
        </div>
      </section>
  )
}

export default DetailAnimePromVideo