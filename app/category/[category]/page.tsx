import AnimeList from "@/components/AnimeList";
import CategoryNav from "@/components/CategoryNav";

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
    
    const { category } = await params;
    
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">Categories Anime</h1>
      <CategoryNav />
      <AnimeList type="category" category={category} />
    </main>
  )
}

export default CategoryPage