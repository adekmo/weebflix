import NavList from '@/components/NavList'

const GenreIndex = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-neon mb-6">Browse by Genre</h1>
      <NavList type='genre' fetchUrl="/api/genre" />
      <p className="text-gray-600">Please select a genre above 👆</p>
    </main>
  )
}

export default GenreIndex