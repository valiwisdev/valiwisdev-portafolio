import { bindings, defineConfig, defineWorker } from 'cf/config'

export default defineConfig({
  worker: defineWorker({
    name: 'valiwisdev-portafolio',
    entrypoint: 'vinext/server/fetch-handler',
    compatibilityDate: '2026-10-07',
    compatibilityFlags: ['nodejs_compat'],
    assets: { notFoundHandling: 'none' },
    domains: ['valiwis.dev'],
    workersDev: true,
    previewUrls: true,
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      SPOTIFY_CLIENT_ID: bindings.secret(),
      SPOTIFY_CLIENT_SECRET: bindings.secret(),
      SPOTIFY_REFRESH_TOKEN: bindings.secret(),
    },
  }),
})
