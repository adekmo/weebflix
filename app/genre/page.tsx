import GenreNav from '@/components/GenreNav'
import React from 'react'

const GenreIndex = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Browse by Genre</h1>
      <GenreNav />
      <p className="text-gray-600">Please select a genre above 👆</p>
    </main>
  )
}

export default GenreIndex