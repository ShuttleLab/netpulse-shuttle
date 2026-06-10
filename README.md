# NetPulse — Website

Marketing and download landing page for **NetPulse**, a lightweight connectivity & exit-IP monitor for Android by ShuttleLab. The Android app itself lives at [ShuttleLab/NetPulse](https://github.com/ShuttleLab/NetPulse); this repo is just the website at [netpulse.shuttlelab.org](https://netpulse.shuttlelab.org). Bilingual (English / 中文), static, runs anywhere.

## Features

- **Landing page** — hero, feature overview, screenshots, how-it-works, and a download call-to-action.
- **Download** — links to the latest APK on GitHub Releases (a Google Play badge is reserved for later via a flag in `app/[locale]/page.tsx`).
- **Privacy policy** — discloses exactly what the app does, the permissions it uses, and the one external service it contacts (`ip9.com.cn` for exit-IP geolocation).
- **Bilingual** — English and Chinese via URL-based i18n (next-intl).
- **Themeable** — ShuttleLab purple palette with light/dark/system appearance.

## Run locally

```bash
npm install
npm run dev
```

(During development open `/en` or `/zh` — `/` is promoted to English only in the production build.)

## Build

```bash
npm run build
```

Output is in `out/` for static deployment to Cloudflare Workers.

## License

Licensed under the GNU Affero General Public License v3.0 — see [LICENSE](./LICENSE).
