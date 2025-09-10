import NavList from "@/components/NavList"

const CategoryIndexPage = () => {

  const categories = [
    { key: "tv", label: "TV Series", icon: "📺" },
    { key: "movie", label: "Movies", icon: "🎬" },
    { key: "ova", label: "OVA", icon: "📀" },
    { key: "ona", label: "ONA", icon: "💻" },
    { key: "special", label: "Specials", icon: "⭐" },
  ];
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Browse by Category</h1>
      <NavList type="category" items={categories}
      />
      <p className="text-gray-600">Please select a category above 👆</p>
    </main>
  )
}

export default CategoryIndexPage