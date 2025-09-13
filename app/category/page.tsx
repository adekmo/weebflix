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
    <section className="container py-8">
      <h1 className="text-2xl font-bold text-neon mb-6">Browse by Category</h1>
      <NavList type="category" items={categories}
      />
      <p className="text-gray-600">Please select a category above 👆</p>
    </section>
  )
}

export default CategoryIndexPage