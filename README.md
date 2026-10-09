# Valiwis portfolio

Portfolio built with Next.js 16.4 and React 19.3. Production deployment targets Cloudflare Workers through [vinext](https://vinext.dev/).

## Getting Started

Install dependencies and run the standard Next.js development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To test the Cloudflare-compatible vinext development path instead, run:

```bash
pnpm dev:vinext
```

The vinext server runs at [http://localhost:3001](http://localhost:3001).

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm build:vinext
```

## Deploy to Cloudflare Workers

Authenticate with Cloudflare and deploy:

```bash
pnpm exec cf auth login
pnpm deploy
```

Configure these variables in Cloudflare before deploying:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`
- `NEXT_PUBLIC_EMAIL_JS_SERVICE_ID`
- `NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

`cloudflare.config.ts` defines the Worker, static-assets binding, Node.js compatibility, and Cloudflare Images binding. `vite.config.ts` keeps the application source compatible with Next.js while producing the Cloudflare Worker build.

See the [Cloudflare Next.js guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) and [vinext Cloudflare deployment guide](https://vinext.dev/docs/deploying/cloudflare) for account and custom-domain setup.
