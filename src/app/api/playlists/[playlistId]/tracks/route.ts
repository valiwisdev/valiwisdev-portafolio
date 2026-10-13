import { NextResponse } from 'next/server'
import { z } from 'zod'

import { spotify } from '@/lib/spotify'
import { SpotifyPlaylistItemsSchema, TrackSchema, TracksSchema } from '@/schemas/track.schema'
import type { TTrack } from '@/schemas/track.schema'

const PLAYLIST_TRACKS_CACHE_TTL_MS = 60 * 60 * 1000
const PLAYLIST_TRACKS_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=300, s-maxage=3600',
}
const SpotifyPlaylistIdSchema = z.string().regex(/^[A-Za-z0-9]{22}$/)

const cachedTracks = new Map<string, { data: TTrack[]; expiresAt: number }>()
const pendingRequests = new Map<string, Promise<TTrack[]>>()

async function fetchPlaylistTracks(playlistId: string): Promise<TTrack[]> {
  let response = await spotify.getPlaylistItems(playlistId, 5)
  if (response.status === 404) response = await spotify.getLegacyPlaylistTracks(playlistId, 5)
  if (!response.ok)
    throw new Error(`Spotify playlist request failed with status ${response.status}`)

  const data = SpotifyPlaylistItemsSchema.parse(await response.json())
  return TracksSchema.parse(
    data.items.flatMap(({ item, track }) => {
      const result = TrackSchema.safeParse(item ?? track)
      return result.success ? [result.data] : []
    }),
  )
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ playlistId: string }> },
) {
  const { playlistId } = await params
  if (!SpotifyPlaylistIdSchema.safeParse(playlistId).success) {
    return NextResponse.json({ error: 'Invalid playlist ID' }, { status: 400 })
  }

  const cached = cachedTracks.get(playlistId)
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.data, { headers: PLAYLIST_TRACKS_CACHE_HEADERS })
  }

  let request = pendingRequests.get(playlistId)
  if (!request) {
    request = fetchPlaylistTracks(playlistId)
    pendingRequests.set(playlistId, request)
  }

  try {
    const tracks = await request
    if (cachedTracks.size >= 50) {
      const oldestPlaylistId = cachedTracks.keys().next().value
      if (oldestPlaylistId) cachedTracks.delete(oldestPlaylistId)
    }
    cachedTracks.set(playlistId, {
      data: tracks,
      expiresAt: Date.now() + PLAYLIST_TRACKS_CACHE_TTL_MS,
    })
    return NextResponse.json(tracks, { headers: PLAYLIST_TRACKS_CACHE_HEADERS })
  } catch {
    return NextResponse.json({ error: 'Unable to load playlist tracks' }, { status: 502 })
  } finally {
    if (pendingRequests.get(playlistId) === request) pendingRequests.delete(playlistId)
  }
}
