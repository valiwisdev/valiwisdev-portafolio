import { z } from 'zod'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const CURRENT_USER_PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/me/playlists`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const SpotifyAccessTokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number().positive(),
})

const PLAYLIST_ITEMS_ENDPOINT = (playlistId: string, limit = 5) =>
  `https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}/items?limit=${limit}`
const PLAYLIST_TRACKS_ENDPOINT = (playlistId: string, limit = 5) =>
  `https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}/tracks?limit=${limit}`

type SpotifyAccessToken = z.infer<typeof SpotifyAccessTokenSchema>

let cachedAccessToken: { token: SpotifyAccessToken; expiresAt: number } | null = null
let pendingAccessToken: Promise<SpotifyAccessToken> | null = null

const requestAccessToken = async (): Promise<SpotifyAccessToken> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token ?? '',
    }),
  })

  if (!response.ok) {
    throw new Error(`Spotify token request failed with status ${response.status}`)
  }

  return SpotifyAccessTokenSchema.parse(await response.json())
}

const getAccessToken = async (): Promise<SpotifyAccessToken> => {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
    return cachedAccessToken.token
  }

  pendingAccessToken ??= requestAccessToken()

  try {
    const token = await pendingAccessToken
    cachedAccessToken = {
      token,
      expiresAt: Date.now() + Math.max(0, token.expires_in - 60) * 1000,
    }
    return token
  } finally {
    pendingAccessToken = null
  }
}

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken()

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getCurrentUserPlaylists = async () => {
  const { access_token } = await getAccessToken()

  return fetch(CURRENT_USER_PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getPlaylistItems = async (playlistId: string, limit = 5) => {
  const { access_token } = await getAccessToken()

  return fetch(PLAYLIST_ITEMS_ENDPOINT(playlistId, limit), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getLegacyPlaylistTracks = async (playlistId: string, limit = 5) => {
  const { access_token } = await getAccessToken()

  return fetch(PLAYLIST_TRACKS_ENDPOINT(playlistId, limit), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
