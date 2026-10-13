import { spotify } from '@/lib/spotify'
import { NextResponse } from 'next/server'
import { SpotifyCurrentlyPlayingSchema } from '@/schemas/track.schema'

export async function GET() {
  const request = await spotify.getNowPlaying()
  if (!request.body) {
    return new NextResponse(null, { status: 204 })
  }
  const data = SpotifyCurrentlyPlayingSchema.parse(await request.json())
  return NextResponse.json({ track: data.item, isPlaying: data.is_playing })
}
