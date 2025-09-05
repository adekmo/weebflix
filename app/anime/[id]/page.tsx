"use client"

import DetailAnimeCharVoice from '@/components/DetailAnimeCharVoice';
import DetailAnimeHeader from '@/components/DetailAnimeHeader';
import DetailAnimeMoreInfo from '@/components/DetailAnimeMoreInfo';
import DetailAnimePromVideo from '@/components/DetailAnimePromVideo';
import EpsiodesLists from '@/components/EpsiodesLists';
import { AnimeDetail } from '@/types/detail';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DetailAnimePage = () => {
    const params = useParams();
    const id = params?.id as string;

    const [anime, setAnime] = useState<AnimeDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetail() {
        try {
            const res = await fetch(`/api/home/${id}`);
            const data = await res.json();
            setAnime(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        }
        if (id) fetchDetail();
    }, [id]);

    if (loading) return <p className="p-4">Loading...</p>;
    if (!anime) return <p className="p-4">Anime not found.</p>;
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* HEADER */}
      <DetailAnimeHeader anime={anime} />
      <EpsiodesLists animeId={id} />

      {/* PROMOTIONAL VIDEOS */}
      <DetailAnimePromVideo videos={anime.info.promotionalVideos} />

      {/* CHARACTERS & VOICE ACTORS */}
      <DetailAnimeCharVoice characters={anime.info.charactersVoiceActors} />

      {/* EXTRA INFO */}
      <DetailAnimeMoreInfo anime={anime} />
    </div>
  )
}

export default DetailAnimePage