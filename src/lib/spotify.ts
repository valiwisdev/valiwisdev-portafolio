import { z } from 'zod'

const SpotifyAccessTokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number().positive(),
})

type SpotifyAccessToken = z.infer<typeof SpotifyAccessTokenSchema>

export class SpotifyClient {
  private static readonly NOW_PLAYING_ENDPOINT =
    'https://api.spotify.com/v1/me/player/currently-playing'
  private static readonly CURRENT_USER_PLAYLISTS_ENDPOINT =
    'https://api.spotify.com/v1/me/playlists'
  private static readonly TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

  private readonly basicAuthorization: string
  private cachedAccessToken: { token: SpotifyAccessToken; expiresAt: number } | null = null
  private pendingAccessToken: Promise<SpotifyAccessToken> | null = null

  constructor(
    clientId = process.env.SPOTIFY_CLIENT_ID,
    clientSecret = process.env.SPOTIFY_CLIENT_SECRET,
    private readonly refreshToken = process.env.SPOTIFY_REFRESH_TOKEN,
  ) {
    this.basicAuthorization = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  }

  async getNowPlaying() {
    return this.fetchWithAccessToken(SpotifyClient.NOW_PLAYING_ENDPOINT)
  }

  async getCurrentUserPlaylists() {
    return this.fetchWithAccessToken(SpotifyClient.CURRENT_USER_PLAYLISTS_ENDPOINT)
  }

  async getPlaylistItems(playlistId: string, limit = 5) {
    return this.fetchWithAccessToken(this.getPlaylistEndpoint(playlistId, 'items', limit))
  }

  async getLegacyPlaylistTracks(playlistId: string, limit = 5) {
    return this.fetchWithAccessToken(this.getPlaylistEndpoint(playlistId, 'tracks', limit))
  }

  private getPlaylistEndpoint(playlistId: string, resource: 'items' | 'tracks', limit: number) {
    return `https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}/${resource}?limit=${limit}`
  }

  private async fetchWithAccessToken(endpoint: string) {
    const { access_token } = await this.getAccessToken()

    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  }

  private async requestAccessToken(): Promise<SpotifyAccessToken> {
    const response = await fetch(SpotifyClient.TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.basicAuthorization}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken ?? '',
      }),
    })

    if (!response.ok) {
      throw new Error(`Spotify token request failed with status ${response.status}`)
    }

    return SpotifyAccessTokenSchema.parse(await response.json())
  }

  private async getAccessToken(): Promise<SpotifyAccessToken> {
    if (this.cachedAccessToken && this.cachedAccessToken.expiresAt > Date.now()) {
      return this.cachedAccessToken.token
    }

    this.pendingAccessToken ??= this.requestAccessToken()

    try {
      const token = await this.pendingAccessToken
      this.cachedAccessToken = {
        token,
        expiresAt: Date.now() + Math.max(0, token.expires_in - 60) * 1000,
      }
      return token
    } finally {
      this.pendingAccessToken = null
    }
  }
}

export const spotify = new SpotifyClient()
