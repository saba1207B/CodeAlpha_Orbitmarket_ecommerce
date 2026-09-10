# Orbit Market

A polished, responsive e-commerce storefront for **GitHub Pages**, built with React, TypeScript, Tailwind CSS, and local browser persistence.

## What is included

- Curated product catalog with category filters and sort controls.
- Product detail pages with gallery photography, specs, quantity controls, and related products.
- Shopping bag drawer with quantity updates, item removal, and subtotal calculations.
- Demo account registration and sign-in stored in `localStorage`.
- Demo checkout flow that stores orders locally and shows a confirmation state.
- GitHub Pages-compatible hash routing, responsive mobile layout, accessible labels, and reduced-motion support.
- `.github/workflows/deploy-pages.yml` for automatic deployment on pushes to `main`.
- [`BACKEND_CONTRACT.md`](./BACKEND_CONTRACT.md) describing the Django or Express API/database surface needed for production persistence.

## Run locally

```bash
pnpm install
pnpm dev
```

The project also has two build commands:

```bash
# Full project build
pnpm build

# Static-only build used by GitHub Pages
pnpm run build:pages
```

The Pages artifact is generated in `dist/`.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow builds the static app and publishes the generated `dist/` folder.
4. Because the site uses hash routing, product links remain compatible with repository-based Pages URLs such as `https://username.github.io/orbit-market/#/product/arc-lamp`.

## Production backend note

GitHub Pages can host the storefront UI but cannot run Django, Express, a database, user authentication, or payment secrets. The current demo intentionally keeps those flows local to the browser. For production, deploy the backend separately and connect the frontend using the endpoints documented in `BACKEND_CONTRACT.md`. Do not place database credentials, OAuth secrets, or payment keys in this repository.

## Customization

Product data lives in `client/src/lib/store.ts`. The visual system is defined in `client/src/index.css`. Images currently use remote Unsplash URLs for a lightweight demo; replace them with your own licensed assets or CDN paths before commercial launch.
