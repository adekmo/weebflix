import CategoryNav from "@/components/CategoryNav"

const CategoryIndexPage = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Browse by Category</h1>
      <CategoryNav />
      <p className="text-gray-600">Please select a category above 👆</p>
    </main>
  )
}

export default CategoryIndexPage