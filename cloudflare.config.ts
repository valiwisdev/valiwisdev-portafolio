import { bindings, defineConfig, defineWorker } from 'cf/config'

export default defineConfig({
  worker: defineWorker({
    name: 'valiwisdev-portafolio',
    entrypoint: 'vinext/server/fetch-handler',
    compatibilityDate: '2026-10-07',
    compatibilityFlags: ['nodejs_compat'],
    domains: ['valiwis.dev'],
    workersDev: true,
    previewUrls: true,
    assets: { notFoundHandling: 'none' },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      SPOTIFY_CLIENT_ID: bindings.secret(),
      SPOTIFY_CLIENT_SECRET: bindings.secret(),
      SPOTIFY_REFRESH_TOKEN: bindings.secret(),
    },
  }),
})
