import { getCurrentUserPlaylists, getPlaylistTracks } from '@/lib/spotify'
import { NextResponse } from 'next/server'
import {
  PlaylistsSchema,
  PlaylistTracksSchema,
  SpotifyPlaylistsResponseSchema,
} from '@/schemas/playlist.schema'
import { SpotifyPlaylistTracksSchema, TracksSchema } from '@/schemas/track.schema'

export async function GET() {
  const request = await getCurrentUserPlaylists()
  if (!request.body) {
    return new NextResponse(null, { status: 204 })
  }
  const data = SpotifyPlaylistsResponseSchema.parse(await request.json())
  const owner = data.items[0]?.owner.display_name
  const filteredItems = data.items.filter((item) => item.owner.display_name === owner)
  const playlists = PlaylistsSchema.parse(filteredItems)
  const playlistsTracks = await Promise.all(
    playlists.map(async (playlist) => {
      const tracksRequest = await getPlaylistTracks(playlist.id, 5)
      const tracksData = SpotifyPlaylistTracksSchema.parse(await tracksRequest.json())
      const tracks = TracksSchema.parse(tracksData.items.map((item) => item.track))
      const playlistTracks = PlaylistTracksSchema.parse({
        playlist,
        tracks,
      })
      return playlistTracks
    }),
  )

  return NextResponse.json(playlistsTracks)
}
