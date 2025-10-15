## Gezmu Frontend (Static Prototype)

Gezmu helps gadget vendors advertise and connect with buyers without requiring a physical store visit. This repository contains the static front-end prototype of the Gezmu marketplace experience. Buttons and flows navigate between pages only; no backend calls are made yet. Another team will integrate real APIs later.

This is currently a TypeScript-to-JavaScript migration in progress. Some components may still contain TypeScript annotations or incomplete JSX from the original design system.

## Tech stack

- React 18 + Vite + SWC (fast dev/build)
- Tailwind utility classes (a prebuilt CSS snapshot is included in `src/index.css`)
- Radix UI primitives and shadcn-inspired components under `src/components/ui`
- Icons via `lucide-react`

## Project structure

Top-level files:

- `index.html` — Vite entry
- `vite.config.js` — Vite + React SWC config
- `package.json` — scripts and dependencies
- `src/main.jsx` — React root
- `src/App.jsx` — page switching (temporary) using local state

Key folders:

- `src/components/` — page components and UI primitives
  - `navigation.jsx` — top navigation bar
  - `landing-page.jsx` — marketing/hero page
  - `marketplace.jsx` — products grid (static initially)
  - `auth-pages.jsx` — sign in/up screens (static initially)
  - `messages.jsx`, `orders.jsx`, `checkout.jsx`, `store-*`, `repair-service.jsx`, `blog.jsx` — flows (static)
  - `ui/` — reusable UI components (button, input, card, etc.)
- `src/index.css` — prebuilt Tailwind CSS snapshot (no Tailwind build step required yet)
- `src/styles/globals.css` — additional global styles

## Current status (migration in progress)

This project was originally written in TypeScript and is being converted to JavaScript. Some files still contain TS-only syntax or incomplete JSX. Expect compile errors until we finish the cleanup. Examples:

- Type annotations like `: React.FormEvent`, `: React.ComponentProps<...>` in `.jsx` files
- Generic types (e.g., `VariantProps`) and type-only imports
- Components referencing helpers not yet implemented in JS (e.g., `useAuth`, `apiRequest`, `toast`)
- Unbalanced JSX (missing tags) from the design export

We will progressively fix these as we wire up the static flows.

## Getting started (Windows PowerShell)

Prerequisites:

- Node.js 18+ (recommended) and npm 9+

Install dependencies and start the dev server:

```powershell
cd C:\xampp\htdocs\gezmu
npm install
npm run dev
```

Vite will start the dev server (default: http://localhost:3000). If the browser does not open automatically, open it manually.

Build for production output:

```powershell
cd C:\xampp\htdocs\gezmu
npm run build
```

The build output will be in the `build` folder (configured in `vite.config.js`).

## How navigation works (for now)

Until routing is finalized, page switching uses local state in `src/App.jsx` via `currentView` and `onNavigate(view, data)`. The navigation bar and page buttons call `onNavigate` to move forward through flows. No data is persisted and no network calls are made.

Planned routes (static):

- `/` — Landing
- `/marketplace` — Marketplace
- `/auth/signin`, `/auth/signup` — Auth screens
- `/messages` — Conversations
- `/checkout` — Checkout
- `/orders` — Orders
- `/store/dashboard`, `/store/products` — Store owner flows
- `/repair` — Repair service
- `/blog` — Blog

We may introduce `react-router-dom` later to formalize URLs and browser navigation.

## Conventions for the static prototype

- Buttons and CTAs only navigate to the next page or show UI feedback; they do not hit APIs.
- Where legacy code references `useAuth`, `apiRequest`, or `toast`, we will stub or remove these in the static prototype.
- Keep components presentational and deterministic. If state is needed, keep it local to the component.

## Troubleshooting common issues

1. TypeScript syntax in `.jsx` files

- Remove type annotations like `: React.FormEvent` and `: React.ComponentProps<...>`
- Remove or inline generic utility types like `VariantProps`
- Ensure imports exist for any helpers you use (e.g., `cn` from `src/components/ui/utils.js`)

2. Incomplete JSX from design export

- Close all tags and ensure component wrappers (`Card`, `CardHeader`, `CardContent`, etc.) are properly nested
- Prefer simpler HTML+Tailwind first; add design-system wrappers after the page compiles

3. Missing helpers

- Replace backend helpers (`useAuth`, `apiRequest`) with placeholders or no-ops for now
- Replace `toast` with simple inline messages or a minimal Toaster wrapper once available

## Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production

## Roadmap (next steps)

We will iterate in small, verifiable steps:

1. Stabilize core UI utilities in JS (e.g., fix `components/ui/button.jsx`, `components/ui/input.jsx`) and ensure `cn` helper is imported where needed.
2. Fix `navigation.jsx` and `landing-page.jsx` JSX so the app compiles and navigation works.
3. Implement Marketplace with placeholder data (no API), keep filters static but functional.
4. Add Auth pages with simple forms that only navigate forward.
5. Add Checkout summary with hardcoded product and a “Place Order” button that navigates to Orders.
6. Decide on `react-router-dom` vs. the current `currentView` approach and implement basic routes.
7. Polish visuals, add loading skeletons/placeholders, and write lightweight component docs.

We’ll keep this README updated as we ship each step.

## Attribution

Some UI components and styles are adapted from shadcn/Radix patterns and design exports. We will replace or refine them as we standardize our component library for Gezmu.
