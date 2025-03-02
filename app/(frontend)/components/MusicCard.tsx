"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./ui/Button";
import Image from "next/image";
import Card from "./ui/Card";

interface ExternalUrls {
  spotify: string;
}

interface Artist {
  name: string;
  external_urls: ExternalUrls;
}

interface Album {
  name: string;
  images: { url: string }[];
  external_urls: ExternalUrls;
}

interface SpotifyData {
  album: Album;
  artists: Artist[];
  name: string;
  duration_ms: number;
  preview_url: string | null;
  is_playing: boolean;
  progress_ms: number;
  external_urls: ExternalUrls;
}

export default function MusicCard() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<SpotifyData | null>(
    null
  );
  const [progress, setProgress] = useState<number>(0);
  async function getCurrentlyPlaying(): Promise<void> {
    try {
      const res = await fetch("/api/spotify", {
        cache: "no-store",
      });
      const data: SpotifyData = await res.json();
      setCurrentlyPlaying(data);
      setProgress(data.progress_ms);
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    }
  }

  useEffect(() => {
    getCurrentlyPlaying();

    const interval = setInterval(() => {
      getCurrentlyPlaying();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentlyPlaying?.is_playing) {
        setProgress((prevProgress) => prevProgress + 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentlyPlaying?.is_playing]);
  const {
    album = {
      name: "Unknown Album",
      images: [{ url: null }],
      external_urls: { spotify: "#" },
    },
    artists = [{ name: "Unknown Artist", external_urls: { spotify: "#" } }],
    name: trackName = "Unknown Track",
    duration_ms = 0,
    external_urls: { spotify: trackUrl } = { spotify: "#" },
  } = currentlyPlaying || {};

  const artistName = artists[0]?.name || "Unknown Artist";
  const albumName = album.name || "Unknown Album";
  const albumImageUrl = album.images[0]?.url;

  const formatTime = (ms: number): string => {
    if (isNaN(ms)) return "0:00";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Card
      loading={!currentlyPlaying}
      classNames={{ body: "p-4 justify-start gap-3 bg-[#bff6b6]" }}
    >
      {currentlyPlaying && (
        <>
          <Link
            href={album.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-md overflow-hidden border border-divider !font-primary"
          >
            {albumImageUrl && (
              <Image
                src={albumImageUrl}
                alt={`${albumName} Cover`}
                width={200}
                height={200}
                className="w-full h-full object-cover object-center"
              />
            )}
          </Link>
          <div className="w-full flex items-center gap-1 justify-between">
            <div className="flex flex-col">
              <Link
                href={trackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sm line-clamp-1 !font-primary"
              >
                {trackName}
              </Link>
              <Link
                href={artists[0].external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#647586] line-clamp-1 !font-primary"
              >
                {artistName}
              </Link>
            </div>
            <Button
              disabled
              size="sm"
              icon={currentlyPlaying?.is_playing ? "mdi:pause" : "mdi:play"}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-xs">{formatTime(progress)}</p>
              <p className="text-xs">{formatTime(duration_ms)}</p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1">
              <div
                className="bg-primary h-full rounded-full"
                style={{
                  width: `${(progress / duration_ms) * 100}%`,
                }}
              />
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
