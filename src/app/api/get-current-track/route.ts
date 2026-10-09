import { getNowPlaying } from '@/lib/spotify'
import { NextResponse } from 'next/server'
import { SpotifyCurrentlyPlayingSchema } from '@/schemas/track.schema'

export async function GET() {
  const request = await getNowPlaying()
  if (!request.body) {
    return new NextResponse(null, { status: 204 })
  }
  const data = SpotifyCurrentlyPlayingSchema.parse(await request.json())
  return NextResponse.json(data.item)
}
