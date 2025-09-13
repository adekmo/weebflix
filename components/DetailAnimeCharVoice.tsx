import { AnimeDetail } from '@/types/detail';
import Image from 'next/image';
import React from 'react'

type Props = {
  characters: AnimeDetail["info"]["charactersVoiceActors"];
};

const DetailAnimeCharVoice = ({characters}: Props) => {
    if (!characters || characters.length === 0) return null;
  return (
    <section>
        <h2 className="text-xl font-semibold text-neon mb-3">🎭 Characters & Voice Actors</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {characters.map((cva, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start border rounded-lg p-4 bg-card hover:bg-accent/30 transition hover:bg-[hsl(var(--accent))]/30 bg-gradient-to-tr from-[#0D1117] to-[#111827] hover:from-cyan-900/40 hover:to-sky-900/40"
            >
              {/* Character */}
              <div className="flex items-center gap-3">
                <Image
                  src={cva.character.poster}
                  alt={cva.character.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className='flex flex-col gap-1'>
                  <p className="font-semibold text-neon">{cva.character.name}</p>
                  <p className="text-xs text-muted-foreground">{cva.character.cast}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-3 h-[1px] w-full bg-border" />

              {/* Voice Actor */}
              <div className="flex items-center gap-3">
                <Image
                  src={cva.voiceActor.poster}
                  alt={cva.voiceActor.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className='flex flex-col gap-1'>
                  <p className="font-semibold text-neon">{cva.voiceActor.name}</p>
                  <p className="text-xs text-muted-foreground">{cva.voiceActor.cast}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}

export default DetailAnimeCharVoice