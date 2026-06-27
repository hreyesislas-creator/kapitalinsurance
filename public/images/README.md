# Image assets

Drop the client's real photography here, then reference it via the `<Photo>`
component with `src="/images/<file>"`. Until a real `src` is provided, `<Photo>`
renders an elegant branded placeholder automatically.

Suggested files (used as placeholders today):
- `jenisffer-hero.jpg`      → Home hero portrait of Jenisffer Bravo
- `jenisffer-about.jpg`     → About page portrait
- `team-office.jpg`         → "Why choose us" team/office shot
- `auto.jpg`, `home.jpg`, … → optional per-service hero imagery

Optimize before upload (long edge ~1600px, compressed). Next/Image handles AVIF/WebP.
Also add `public/logo.png` (square, ~512px) and `public/apple-icon.png` (180px) for
social sharing and iOS bookmarks.
