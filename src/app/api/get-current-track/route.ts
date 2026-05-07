import { getNowPlaying } from '@/lib/spotify'
import { NextResponse } from 'next/server'
import { TrackSchema } from '@/schemas/track.schema'

export async function GET() {
  const request = await getNowPlaying()
  if (!request.body) {
    return new NextResponse(null, { status: 204 })
  }
  const data = await request.json()
  const track = TrackSchema.parse(data.item)
  return NextResponse.json(track)
}
