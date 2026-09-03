# codenzicShop — React Shopping Cart

A polished, production-quality ecommerce shopping experience built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Product data is fetched and validated from a live API, and the cart is managed through a persistent, performant global store.

## Features

- **Product catalogue** — browse and search the full product list with a responsive grid
- **Product detail page** — dedicated route with an image gallery, live description, price, rating and stock status
- **Quick preview** — open a product image in a lightbox modal straight from the catalogue, without leaving the listing
- **Search & filters** — filter by text, category, and a min/max price range, with a one-click Clear Filters reset
- **Loading, error & empty states** — skeleton loading, a retry action on failure, and a helpful no-results state
- **Cart** — add, increase, decrease, remove and clear items, with live order summary and subtotal
- **Cart persistence** — cart contents survive page reloads via `localStorage`
- **Checkout** — a validated shipping form with per-field errors, order summary, and a success state that clears the cart
- **Responsive layout** — intentionally designed for mobile, tablet and desktop
- **Accessible** — semantic HTML, labelled inputs, keyboard navigation, visible focus states, and accessible icon buttons

## Tech Stack

| Concern        | Technology                                   |
| -------------- | -------------------------------------------- |
| Framework      | React 19 + TypeScript                        |
| Build tool     | Vite 8                                       |
| Styling        | Tailwind CSS 4                               |
| Server state   | TanStack Query (React Query)                 |
| Cart state     | Zustand (`persist` middleware)               |
| Validation     | Zod                                          |
| Routing        | React Router 7                               |
| Icons          | lucide-react                                 |
| Linting        | Oxlint                                       |

## Getting Started

### Prerequisites

- **Node.js** (v18 or newer recommended)
- **npm** or **pnpm**

### Install

```bash
# with npm
npm install

# or with pnpm
pnpm install
```

### Run in development

```bash
npm run dev
# or
pnpm dev
```

Open `http://localhost:5173` in your browser.

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Routes

| Path           | Page                          |
| -------------- | ----------------------------- |
| `/`            | Product catalogue + filters   |
| `/product/:id` | Product detail page           |
| `/cart`        | Shopping cart                 |
| `/checkout`    | Checkout form                 |

## Project Structure

```
src/
├── components/
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── SearchFilters.tsx
├── pages/
│   ├── ProductDetailPage.tsx
│   └── ProductsPage.tsx
├── hooks/
│   ├── useProduct.ts
│   └── useProductFilters.ts
├── schemas/
│   ├── checkoutSchema.ts
│   └── productSchema.ts
├── store/
│   └── cartStore.ts
├── App.tsx
└── main.tsx
```

## Architecture Notes

- **Zustand** is the single source of truth for cart state; totals and item counts are derived from it, never duplicated.
- **TanStack Query** owns all server/data fetching, so product data is cached and shared across the catalogue and detail pages.
- **Zod** validates the API response at runtime (`productSchema`) and the checkout form (`checkoutSchema`).
- The product schema is enriched with real API fields (`description`, `stock`, `images`) so the detail page displays only genuine data — no fabricated reviews or specs.
- Checkout runs only after the user chooses to proceed from the cart, and a successful order clears the cart through the existing store action.

## Data Source

Product data is fetched from the public [DummyJSON](https://dummyjson.com/products) API. No backend or payment gateway is required for this assignment.

## License

Private / for evaluation purposes.