import { bindings, defineConfig, defineWorker } from 'cf/config'

export default defineConfig({
  worker: defineWorker({
    name: 'valiwisdev',
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
    },
  }),
})
