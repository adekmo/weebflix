import AnimeList from "@/components/AnimeList";
import NavList from "@/components/NavList";

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
    
    const { category } = await params;
    
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">Categories Anime</h1>
      <NavList type="category" items={[
          { key: "tv", label: "TV Series", icon: "📺" },
          { key: "movie", label: "Movies", icon: "🎬" },
          { key: "ova", label: "OVA", icon: "📀" },
          { key: "ona", label: "ONA", icon: "💻" },
          { key: "special", label: "Specials", icon: "⭐" },
        ]}
      />
      <AnimeList type="category" category={category} />
    </main>
  )
}

export default CategoryPage