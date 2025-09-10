import AnimeList from '@/components/AnimeList';
import NavList from '@/components/NavList';

const ProducerPage = async ({ params }: { params: Promise<{ producerName: string }>}) => {

    const { producerName } = await params;

    const producer = [
        { key: "toei-animation", label: "Toei Animation", icon: "🐉" },
        { key: "madhouse", label: "Madhouse", icon: "🏠" },
        { key: "mappa", label: "MAPPA", icon: "🔥" },
        { key: "kyoto-animation", label: "Kyoto Animation", icon: "🌸" },
    ]
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">Producer's Anime</h1>
      <NavList type='producer' items={producer} />
      <AnimeList type="producer" producer={producerName} />
    </main>
  )
}

export default ProducerPage