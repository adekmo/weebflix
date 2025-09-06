import EpisodePlayer from "@/components/EpisodePlayer";


export default async function Page({ params }: { params: Promise<{ id: string; epNumber: string }> }) {
  const { id, epNumber } = await params; // unwrap di server

  return <EpisodePlayer animeId={id} epNumber={epNumber} />;
}
