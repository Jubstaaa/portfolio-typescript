import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN as string;

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyArtist {
  id: string;
  name: string;
  uri: string;
}

interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
}

interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  duration_ms: number;
  preview_url: string | null;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
}

interface CurrentlyPlayingResponse {
  is_playing: boolean;
  progress_ms: number;
  item: SpotifyTrack;
}

interface RecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
}

interface RecentlyPlayedResponse {
  items: RecentlyPlayedItem[];
}
async function refreshAccessToken(): Promise<string> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

async function getRecentlyPlayed(
  accessToken: string
): Promise<SpotifyTrack | null> {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recently played track");
  }

  const data: RecentlyPlayedResponse = await response.json();
  return data.items.length > 0 ? data.items[0].track : null;
}

export async function GET(): Promise<NextResponse> {
  try {
    const accessToken = await refreshAccessToken();

    const trackResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      }
    );

    if (trackResponse.status === 204) {
      const recentlyPlayedTrack = await getRecentlyPlayed(accessToken);
      if (recentlyPlayedTrack) {
        return NextResponse.json(recentlyPlayedTrack);
      }
      return NextResponse.json(
        { error: "No recently played track found" },
        { status: 404 }
      );
    }
    if (!trackResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch currently playing track" },
        { status: trackResponse.status }
      );
    }

    const trackData: CurrentlyPlayingResponse = await trackResponse.json();
    console.log(trackData);
    return NextResponse.json({ ...trackData, ...trackData.item });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const revalidate = 0;
