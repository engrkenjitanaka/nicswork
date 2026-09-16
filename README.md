# nicswork

Portfolio for **Jonji Jose Coronel**, multimedia designer — a Next.js rebuild of
the Canva-published site at [nicswork.online](https://nicswork.online).

Same person, same work, same words. Rebuilt so the work is not held back by the
export.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Fonts | `next/font` — Poppins + Sacramento, self-hosted |
| Images | `next/image` → AVIF/WebP at request time |
| Hosting | Vercel |

No animation library, no UI kit, no CMS. Motion is CSS plus three small hooks;
the gallery is a native `<dialog>`.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

## Where things live

```
src/
  content.ts              ← every word, video ID and collection. Start here.
  app/
    layout.tsx            ← fonts + metadata (title, OG, robots)
    globals.css           ← design tokens, motion, browser surfaces
    page.tsx              ← section order
  components/
    Hero.tsx              ← first viewport; the one authored load sequence
    Nav.tsx               ← floating pill, scroll-spy active marker
    WorkVideos.tsx        ← the two video sections
    VideoGrid.tsx         ← poster grid + centred modal player
    LiteYouTube.tsx       ← poster only; never mounts an iframe
    Lightbox.tsx          ← the shared modal shell (native <dialog>)
    DesignWork.tsx        ← collection stacks + full-screen gallery
    Capabilities.tsx      ← the scrolling rail
    About.tsx / Contact.tsx
    Reveal.tsx            ← IntersectionObserver stagger
    icons.tsx             ← the icon family
public/media/             ← 47 images pulled from the incumbent site
```

### Editing content

`src/content.ts` is the single source of truth. Nothing else needs touching to
change copy, swap a video, or add a collection.

Adding a collection: drop `myslug-1.png … myslug-N.png` into `public/media/`,
then add an entry to `collections` with `slug`, `title`, `driveUrl`, `count`
and `ext`. The stacks and gallery pick it up automatically.

### A note on video posters

YouTube only serves a true 9:16 still (`/oardefault.jpg`) for videos published
as **Shorts**. One of the six vertical pieces is not a Short, so it carries
`wideposterOnly: true` and uses the 16:9 frame centre-cropped back to vertical.
There is also an `onError` fallback, so a video that loses Short status
degrades to a correct frame instead of a broken image.

## Security

Every response carries:

| Header | Value |
|---|---|
| `Content-Security-Policy` | see below |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation all denied |
| `Cross-Origin-Opener-Policy` | `same-origin` |

`X-Powered-By` is disabled.

**Attack surface is deliberately near-zero:** no API routes, no server actions,
no middleware, no forms, no database, no user input, no cookies, no analytics,
no third-party scripts. The contact section is `mailto:` and `wa.me` links, so
there is no endpoint to abuse, rate-limit or spam. The only third parties are
YouTube (via `youtube-nocookie.com`, and only after a click) and its thumbnail
CDN — both named explicitly in the CSP. Every external link carries
`rel="noopener noreferrer"`.

### Content Security Policy

The policy is strict except for one directive:

```
script-src 'self' 'unsafe-inline'
```

Next.js inlines the RSC payload as inline `<script>` tags. Blocking those stops
hydration dead — the page renders but nothing responds.

The strict alternative is a **per-request nonce**, which Next supports via
`proxy.ts`. It is deliberately not used here, because a nonce must be unique
per request, which forces **every page to render dynamically** and gives up
static generation and CDN caching. For a read-only portfolio that is a bad
trade: it makes the site slower and more expensive to serve in exchange for
mitigating an XSS class that cannot occur, since no user input is ever
rendered.

If that trade ever becomes worth it — say a comment form gets added — create
`proxy.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; ...`;
  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", csp);
  const res = NextResponse.next({ request: { headers } });
  res.headers.set("Content-Security-Policy", csp);
  return res;
}
```

…and drop `script-src` from `next.config.ts` so the two do not conflict.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is
   detected, no build settings to change.
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL (e.g.
   `https://nicswork.online`) so canonical and Open Graph URLs are absolute.
4. Point the domain at Vercel.

Both routes are statically prerendered, so the whole site serves from the CDN.

## What changed from the Canva site

- **The meta description was another person's.** The export shipped leftover
  template text about "Aaliyah Igwe's portfolio … SEO and branding services" —
  that is what Google and every link preview showed. Replaced.
- **A nav link pointed at `https://home/`.** Removed.
- **No image had alt text.** All 47 do now.
- **All 10 YouTube iframes loaded on arrival.** Now none load until clicked,
  and clicking opens a centred full-screen player instead of running the video
  in a small tile. Closing it unmounts the iframe, so the video actually stops.
- **Work was only reachable through Google Drive.** It now opens in a
  full-screen gallery on the site; Drive remains as the complete archive.
- **The page hijacked scrolling** inside a fixed 1512px canvas, which broke
  find-in-page, anchors and keyboard scrolling. Now a real responsive document.
- **Fonts were obfuscated blobs** with no fallback stack. Now self-hosted with
  real fallbacks.
- **Email and phone were plain text.** Now `mailto:`, `wa.me` and click-to-copy.
