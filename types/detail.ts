export type AnimeDetail = {
  info: {
    id: string;
    anilistId: number;
    malId: number;
    name: string;
    poster: string;
    description: string;
    stats: {
        rating: string;
        quality: string;
    };
  };
  
  episodes: {
    sub: number;
    dub: number;
    type: string;
    duration: string;
  };
  promotionalVideos: {
    title: string;
    source: string;
    thumbnail: string;
  }[];
  charactersVoiceActors: {
    character: {
      id: string;
      poster: string;
      name: string;
      cast: string;
    };
    voiceActor: {
      id: string;
      poster: string;
      name: string;
      cast: string;
    };
  }[];
  moreInfo: {
    japanese: string;
    synonyms: string;
    aired: string;
    premiered: string;
    duration: string;
    status: string;
    malscore: string;
    genres: string[];
    studios: string;
    producers: string[];
  };
};
