export type EpisodeResponse = {
  totalEpisodes: number;
  episodes: Episode[];
};

export type Episode = {
  title: string;
  episodeId: string;
  number: number;
  isFiller: boolean;
};