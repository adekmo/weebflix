"use client";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

type StreamData = {
  sources: { url: string; type: string }[];
  tracks?: { url: string; lang: string }[];
};

export default function EpisodePlayer({ animeId, epNumber }: { animeId: string; epNumber: string }) {
   const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function fetchStream() {
      const res = await fetch(`/api/home/${animeId}/episodes/${epNumber}/stream`);
      if (!res.ok) {
        console.error('Failed to fetch stream data');
        return;
      }
      const json = await res.json();
      const data: StreamData = json.data;


      if (videoRef.current && data?.sources?.[0]) {
        const video = videoRef.current;
        // const source = data.sources[0].url;
        const sourceUrl = `/api/proxy/hls?url=${encodeURIComponent(data.sources[0].url)}`;

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(sourceUrl);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Safari
          video.src = sourceUrl;
        }

        // Tambahkan subtitle tracks
        if (data.tracks) {
          data.tracks.forEach((track, i) => {
            const t = document.createElement("track");
            t.kind = "subtitles";
            t.label = track.lang;
            t.srclang = track.lang.split(" ")[0].toLowerCase();
            t.src = `/api/proxy/hls?url=${encodeURIComponent(track.url)}`;
            if (i === 0) t.default = true;
            video.appendChild(t);
          });
        }
      }
    }

    fetchStream();
  }, [animeId, epNumber]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Watching Episode {epNumber} of {animeId}
      </h1>

      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full rounded-lg bg-black"
        style={{ maxHeight: "70vh" }}
      />
    </div>
  );
}
