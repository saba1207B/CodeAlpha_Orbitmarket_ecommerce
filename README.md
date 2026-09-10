# 🛍️ Orbit Market

> A modern, responsive e-commerce storefront built as a full-stack web project with a polished shopping experience and GitHub Pages deployment support.

<p align="center">
  <a href="https://saba1207b.github.io/CodeAlpha_Orbitmarket_ecommerce/">
    <strong>🚀 Live Demo</strong>
  </a>
  ·
  <a href="https://github.com/saba1207B/CodeAlpha_Orbitmarket_ecommerce">
    <strong>📦 Source Code</strong>
  </a>
</p>

---

## ✨ Overview

**Orbit Market** is a polished e-commerce storefront designed to demonstrate a complete modern shopping experience in the browser. It combines a responsive React interface with product discovery, product details, shopping-bag interactions, demo authentication, and a local checkout flow.

The project is also prepared for **GitHub Pages**, with an automated GitHub Actions workflow that builds the static frontend and publishes it whenever changes are pushed to `main`.

### 🌐 Live Demo

**[Open Orbit Market →](https://saba1207b.github.io/CodeAlpha_Orbitmarket_ecommerce/)**

> The live deployment is a frontend demonstration. Account, cart, and order data are intentionally stored locally in the browser rather than processed as real transactions.

---

## 🎯 Features

- 🛒 **Product Catalog** — Browse a curated collection of products.
- 🔎 **Category Filtering & Sorting** — Quickly find products using catalog controls.
- 🖼️ **Product Details** — View product imagery, specifications, quantity controls, and related products.
- 🛍️ **Shopping Bag** — Add products, change quantities, remove items, and calculate subtotals.
- 👤 **Demo Authentication** — Registration and sign-in flows backed by browser `localStorage`.
- 💳 **Demo Checkout** — Complete a simulated checkout and receive an order confirmation state.
- 📱 **Responsive UI** — Designed for desktop, tablet, and mobile layouts.
- ♿ **Accessibility Support** — Accessible labels and interaction patterns are included throughout the interface.
- 🌓 **Reduced Motion Support** — Respects users who prefer reduced motion.
- 🔗 **GitHub Pages Routing** — Hash-based routing keeps product URLs compatible with repository-based Pages deployments.
- ⚡ **Automated Deployment** — GitHub Actions builds and deploys the static site from `main`.
- 🧩 **Backend Contract** — Includes `BACKEND_CONTRACT.md` describing the API/database surface required for production persistence.

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Frontend UI and component architecture |
| **TypeScript** | Type-safe application development |
| **Vite** | Development server and frontend build tooling |
| **Tailwind CSS** | Responsive styling and design system |
| **Framer Motion** | UI motion and interactive animation |
| **Radix UI** | Accessible interface primitives |
| **Lucide React** | Interface icons |
| **React Hook Form** | Form handling |
| **Zod** | Schema validation |
| **Wouter** | Lightweight client-side routing |
| **Express** | Backend/server foundation |
| **pnpm** | Package management |
| **GitHub Actions** | Continuous deployment |
| **GitHub Pages** | Static frontend hosting |

The project's package configuration includes React, TypeScript, Vite, Tailwind CSS, Framer Motion, Express, Radix UI, Wouter, Zod, and other supporting libraries. fileciteturn7file0L2-L5

---

## 📁 Project Structure

```text
CodeAlpha_Orbitmarket_ecommerce/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── client/
│   └── src/
├── server/
├── scripts/
├── patches/
├── BACKEND_CONTRACT.md
├── components.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```

The repository contains separate `client` and `server` areas, a Pages deployment workflow, project configuration, and a backend contract for future production integration. fileciteturn5file0L2-L2

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- **Node.js 22+** recommended for the current deployment workflow.
- **pnpm 10+**.
- Git.

### 1. Clone the repository

```bash
git clone https://github.com/saba1207B/CodeAlpha_Orbitmarket_ecommerce.git
cd CodeAlpha_Orbitmarket_ecommerce
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the development server

```bash
pnpm dev
```

Vite starts the development environment and exposes the application for local development.

### 4. Build the project

```bash
pnpm build
```

### 5. Build the GitHub Pages version

```bash
pnpm run build:pages
```

The static Pages build is generated in the `dist/` directory.

### 6. Preview the production build

```bash
pnpm preview
```

### 7. Type-check the project

```bash
pnpm check
```

---

## 🌍 GitHub Pages Deployment

Orbit Market includes an automated workflow at `.github/workflows/deploy-pages.yml`. It runs when changes are pushed to `main` or when the workflow is manually triggered. The workflow installs dependencies, builds the static frontend, uploads the `dist` artifact, and deploys it through GitHub Pages. fileciteturn8file0L2-L5

### Deployment flow

```text
Push to main
     ↓
GitHub Actions
     ↓
Install pnpm dependencies
     ↓
Build static frontend
     ↓
Upload Pages artifact
     ↓
Deploy to GitHub Pages
     ↓
Live Orbit Market website
```

### Live URL

🔗 **https://saba1207b.github.io/CodeAlpha_Orbitmarket_ecommerce/**

---

## 🏗️ Production Backend

The GitHub Pages version is intentionally a **frontend/demo deployment**. GitHub Pages cannot run a persistent Node/Express or Django backend, database services, authentication infrastructure, or payment secrets.

For a production release, the frontend can be connected to a separately deployed backend for:

- User accounts and authentication
- Product and inventory management
- Persistent carts
- Order management
- Database storage
- Secure payment processing
- Server-side validation

The required backend/API surface is documented in [`BACKEND_CONTRACT.md`](./BACKEND_CONTRACT.md).

**Never commit database credentials, OAuth secrets, API secrets, or payment keys to this repository.**

---

## 🎨 Customization

Key application areas can be customized from the following locations:

- `client/src/lib/store.ts` — Product/catalog data and storefront state.
- `client/src/index.css` — Global styling and visual system.
- `client/` — React frontend components and pages.
- `server/` — Server-side foundation for future backend integration.

The current demo uses remote Unsplash image URLs. Replace them with properly licensed assets or your own CDN/storage URLs before using the project commercially.

---

## 🔐 Demo Data & Privacy

Orbit Market is designed as a demonstration project. Demo account, cart, and order information is stored locally in the user's browser and is not intended to represent a production authentication or payment system.

Do not enter real payment credentials or sensitive personal information into the demo deployment.

---

## 📌 Project Status

**Status:** 🟢 Active Demo / GitHub Pages Deployment

The storefront is deployed as a static web application and is suitable for demonstrating frontend e-commerce functionality. Production persistence and secure transaction processing require a separately hosted backend.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Sabareesh**

GitHub: [@saba1207B](https://github.com/saba1207B)

---

<p align="center">
  <strong>⭐ If you find Orbit Market useful, consider starring the repository.</strong>
</p>
