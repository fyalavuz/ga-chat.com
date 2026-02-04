# GA Chat Website

Static marketing + legal pages for **GA Chat**, designed to be deployed on **GitHub Pages** with the custom domain **ga-chat.com**.

## Local preview

Option A (simple): open `public/index.html` in your browser.

Option B (recommended): run a local static server:

```bash
python3 -m http.server 8080 --directory public
```

Then visit `http://localhost:8080/`.

## GitHub Pages deployment

This repo includes a GitHub Actions workflow that publishes the `public/` directory to GitHub Pages:

- Workflow: `.github/workflows/pages.yml`
- Site content: `public/`

### One-time GitHub setup

1. Push `main` to GitHub.
2. In GitHub: **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push any commit (or re-run the workflow) to trigger deployment.

## Custom domain (Cloudflare DNS)

This repo ships a `public/CNAME` file set to `ga-chat.com`. To point your Cloudflare domain to GitHub Pages:

### Option 1 (common): Apex A records + `www` CNAME

In Cloudflare DNS:

- `A` record: `@` → `185.199.108.153` (DNS only)
- `A` record: `@` → `185.199.109.153` (DNS only)
- `A` record: `@` → `185.199.110.153` (DNS only)
- `A` record: `@` → `185.199.111.153` (DNS only)
- `CNAME` record: `www` → `fyalavuz.github.io` (DNS only)

Then in GitHub: **Settings → Pages → Custom domain** set to `ga-chat.com` and enable **Enforce HTTPS** after the certificate is issued.

### Option 2: Apex CNAME flattening

If you prefer, Cloudflare supports CNAME flattening at the apex:

- `CNAME` record: `@` → `fyalavuz.github.io` (DNS only)
- `CNAME` record: `www` → `ga-chat.com` (DNS only)

## Content notes

- The legal pages in `public/privacy.html` and `public/terms.html` are general templates. Review and customize for your product and jurisdiction.
- Update the contact email (`support@ga-chat.com`) everywhere if needed.
