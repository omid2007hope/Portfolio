# Portfolio Prime Frontend

Next.js 16 frontend for Portfolio Prime. The app renders portfolio content from the Express API and keeps page metadata on the server through the App Router.

## Requirements

- Node.js 18+
- npm
- Backend API running locally for full development

## Environment

Copy `.env.example` to `.env.local` and set the values you need.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:4000/api
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
YANDEX_SITE_VERIFICATION=
```

`NEXT_PUBLIC_API_BASE_URL` is the main frontend API setting. If it is missing, the app falls back to local development defaults.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Structure

- `src/app`: routes, metadata, and server-first entrypoints
- `src/components/features`: page-level feature components
- `src/components/layout`: shared layout primitives
- `src/components/seo`: JSON-LD helpers
- `src/lib`: API client, SEO helpers, and shared content normalizers

## Notes

- Prefer server components unless interactivity is required.
- Dynamic backend image URLs may still use plain `<img>` where runtime sources are not known at build time.
- Tests cover shared content helpers and key interactive UI flows.
