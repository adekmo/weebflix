import { AnimeDetail } from '@/types/detail';
import React from 'react'

type Props = {
  characters: AnimeDetail["info"]["charactersVoiceActors"];
};

const DetailAnimeCharVoice = ({characters}: Props) => {
    if (!characters || characters.length === 0) return null;
  return (
    <section>
        <h2 className="text-xl font-semibold mb-3">🎭 Characters & Voice Actors</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {characters.map((cva, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 border rounded-lg p-2"
            >
              <img
                src={cva.character.poster}
                alt={cva.character.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">{cva.character.name}</p>
                <p className="text-xs text-muted-foreground">
                  {cva.character.cast}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={cva.voiceActor.poster}
                  alt={cva.voiceActor.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm">{cva.voiceActor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {cva.voiceActor.cast}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}

export default DetailAnimeCharVoice