// src/components/EpisodePlayer.tsx
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
        
        // Perbaikan: Gunakan proxy URL untuk sumber HLS utama
        const sourceUrl = `/api/proxy/hls?url=${encodeURIComponent(data.sources[0].url)}`;

        if (Hls.isSupported()) {
          const hls = new Hls();
          
          // Mengatasi masalah 404
          hls.loadSource(sourceUrl);
          hls.attachMedia(video);
          
          // Logika untuk mengelola URL segmen di dalam playlist
          // Kode ini sudah ada di proxy, jadi seharusnya tidak perlu di sini
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            // HLS.js akan mengambil URL segmen dari playlist
            // dan akan mem-proxy secara otomatis karena URL-nya sudah dimodifikasi di server.
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Safari
          video.src = sourceUrl;
        }

        // Perbaikan: Gunakan proxy URL untuk subtitle
        if (data.tracks) {
          data.tracks.forEach((track, i) => {
            const t = document.createElement("track");
            t.kind = "subtitles";
            t.label = track.lang;
            t.srclang = track.lang.split(" ")[0].toLowerCase();
            // Pastikan src URL-nya juga di-proxy
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
      <p className="">Stream <span className="text-red-500">failed</span> to play. Since this uses a <span className="text-red-500">free API</span>, the stream may sometimes be unstable.</p>
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