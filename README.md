# MetaFix

MetaFix is a privacy-first web app to inspect and remove metadata from files directly in the browser.

All extraction and cleanup logic runs client-side in this project flow (no file upload required).

## Why MetaFix

- Drag and drop a supported file.
- Inspect metadata (EXIF for images, document info for PDFs).
- Remove metadata and download a cleaned file.
- Keep legal pages and consent flow ready for optional tracking/ads scenarios.

## Features

- Local-first UX with drag and drop.
- Metadata extraction:
  - Images: EXIF parsing.
  - PDFs: title, author, subject inspection.
- Metadata cleaning:
  - JPEG and PNG: re-encode through canvas to remove embedded metadata.
  - PDF: reset title/author/subject fields.
- Legal pages rendered from MDX.
- Optional GTM + AdSense integration behind Consent Mode v2.
- Optional Cookiebot bridge for certified CMP workflows.

## Supported File Types

| Type | Inspect Metadata | Clean Metadata |
| --- | --- | --- |
| PDF (`application/pdf`) | Yes | Yes |
| JPEG (`image/jpeg`) | Yes | Yes |
| PNG (`image/png`) | Yes | Yes |
| GIF (`image/gif`) | Yes | Not yet |
| WEBP (`image/webp`) | Yes | Not yet |

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- MDX for legal content
- `exifr` for EXIF parsing
- `pdf-lib` for PDF metadata read/write

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Configure

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values.

### Run

```bash
npm run dev
```

Open http://localhost:3000.

### Production

```bash
npm run build
npm run start
```

## Environment

All runtime variables are documented in `.env.example`.

Main toggles:

- `NEXT_PUBLIC_ENABLE_TRACKING`: enables GTM/consent/ads logic when `"true"`.
- `NEXT_PUBLIC_CMP_PROVIDER`: `custom` or `cookiebot`.

## Consent, GTM, and Ads


### AdSense: environment variables

- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: **Required for Google AdSense to work**. This must be set as the client ID in the script and in components that display ads. It is the variable required by Google for loading ads.
- `NEXT_PUBLIC_ADSENSE_ACCOUNT`: **Optional, informational only**. Used to add a custom `google-adsense-account` attribute in the page metadata, useful for diagnostics or tracking, but not required for ads to function.

When tracking is enabled:

- Default consent is denied before GTM initialization.
- User choices update Consent Mode v2 signals (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`).
- AdSense is loaded only after consent is accepted.

Cookiebot mode (certified CMP) is available by setting:

- `NEXT_PUBLIC_CMP_PROVIDER="cookiebot"`
- `NEXT_PUBLIC_COOKIEBOT_ID="..."`

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server. |
| `npm run build` | Build production output (static export enabled). |
| `npm run build:static` | Build and move `out` to `dist`. |
| `npm run start` | Run production server. |
| `npm run lint` | Run ESLint checks. |

## Deployment

### Vercel

Deploy normally and set environment variables in project settings.

### GitHub Pages (Static)

The app uses static export (`output: "export"`).

```bash
npm run build:static
```

For project pages, set in CI:

```bash
GITHUB_PAGES="true"
NEXT_BASE_PATH="/<repo-name>"
```

Then publish with GitHub Actions.

## Project Structure

```text
app/                 Routes, layout, and pages
components/          UI and integration components
content/             Legal MDX files (privacy, terms, cookies)
hooks/               UI/business hooks (file metadata flow)
lib/                 Core logic (supported files, metadata extract/clean)
types/               TypeScript type definitions
utils/               Shared utilities (download helper)
```

## Limitations

- GIF and WEBP metadata cleaning is not implemented yet.
- Ad rendering depends on configured slot IDs and granted consent.
- Legal routes are statically generated for known slugs (`privacy`, `terms`, `cookies`).

## Contributing

1. Create a branch from `main`.
2. Use Conventional Commits.
3. Run lint and local checks before opening a PR.

## License

Add your preferred license (for example MIT) and include a `LICENSE` file.
