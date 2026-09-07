# Run doc — veritycheck.xyz static site

Plain static HTML site. No build step, no dependencies, no env files.

## Reproduce artifacts

Nothing to reproduce. All pages are plain HTML/CSS/JS served as-is from the repo root.
Optional: the guestbook can consume `everyone/comments.json` (a sample is committed);
a Cloudflare Worker lives in `serverless/` and is deployed separately with
`npx wrangler deploy` from that folder (requires a Cloudflare login) — not needed for preview.

## Run the server

```
python -m http.server 8787 --bind 127.0.0.1
```

From the repo root. Port 8787 has no project default (static site), so it was chosen as a free port.
Entry points: `/3/` (door page), `/celebrity/`, `/everyone/`, `/1/`, `/2/`.
