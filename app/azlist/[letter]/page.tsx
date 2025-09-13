import AnimeList from "@/components/AnimeList";
import NavList from "@/components/NavList";


const AZListPage = async ( {params}: { params: Promise<{letter: string}>}) => {
  const { letter } = await params;

  const letters = ["all", ..."abcdefghijklmnopqrstuvwxyz"].map((l) => ({
    key: l,
    label: l.toUpperCase(),
  }));
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-neon capitalize">Anime A-Z</h1>
      <NavList type="azlist" items={letters} />
      <AnimeList type="azlist" letter={letter} />
    </main>
  )
}

export default AZListPage