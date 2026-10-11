import { getCurrentUserPlaylists } from '@/lib/spotify'
import { NextResponse } from 'next/server'
import { PlaylistsSchema, SpotifyPlaylistsResponseSchema } from '@/schemas/playlist.schema'
import type { TPlaylist } from '@/schemas/playlist.schema'

const PLAYLIST_CACHE_TTL_MS = 60 * 60 * 1000
const PLAYLIST_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=300, s-maxage=3600',
}

let cachedPlaylists: { data: TPlaylist[]; expiresAt: number } | null = null
let pendingRequest: Promise<TPlaylist[] | null> | null = null

async function fetchPlaylists(): Promise<TPlaylist[] | null> {
  const request = await getCurrentUserPlaylists()
  if (!request.body) return null

  const data = SpotifyPlaylistsResponseSchema.parse(await request.json())
  const owner = data.items[0]?.owner.display_name
  const filteredItems = data.items.filter((item) => item.owner.display_name === owner)
  return PlaylistsSchema.parse(
    filteredItems.map(({ items, tracks, ...playlist }) => ({
      ...playlist,
      tracks: items ?? tracks,
    })),
  )
}

export async function GET() {
  if (cachedPlaylists && cachedPlaylists.expiresAt > Date.now()) {
    return NextResponse.json(cachedPlaylists.data, { headers: PLAYLIST_CACHE_HEADERS })
  }

  pendingRequest ??= fetchPlaylists()

  try {
    const playlists = await pendingRequest
    if (!playlists) return new NextResponse(null, { status: 204 })

    cachedPlaylists = { data: playlists, expiresAt: Date.now() + PLAYLIST_CACHE_TTL_MS }
    return NextResponse.json(playlists, { headers: PLAYLIST_CACHE_HEADERS })
  } finally {
    pendingRequest = null
  }
}
