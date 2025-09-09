import AnimeList from '@/components/AnimeList';
import GenreNav from '@/components/GenreNav';
import React from 'react'

const GenrePage = async ({params} : {params: Promise<{ genre: string }>}) => {

    const { genre } = await params;
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">Genre Anime</h1>
      <GenreNav />
      <AnimeList type="genre" genre={genre} />
    </main>
  )
}

export default GenrePage