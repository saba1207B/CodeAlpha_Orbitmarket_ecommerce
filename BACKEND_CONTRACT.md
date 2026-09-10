# Orbit Market backend contract

The deployed GitHub Pages site is a static frontend. It currently uses localStorage so the entire experience can be previewed without a server. This document defines the small backend surface required to replace the demo persistence with Django REST Framework, Express, or another API service.

## Recommended tables

| Table | Required fields |
|---|---|
| `products` | `id`, `slug`, `name`, `category`, `description`, `price_cents`, `compare_at_cents`, `image_url`, `detail_image_url`, `badge`, `specs_json`, `inventory_count`, `created_at`, `updated_at` |
| `users` | `id`, `name`, `email`, `password_hash`, `created_at`, `updated_at` |
| `orders` | `id`, `user_id`, `email`, `shipping_name`, `shipping_address`, `status`, `subtotal_cents`, `total_cents`, `created_at` |
| `order_items` | `id`, `order_id`, `product_id`, `product_name_snapshot`, `unit_price_cents`, `quantity` |

Store money as integer cents. Hash passwords with Argon2 or bcrypt; never store plaintext passwords. Add a unique index on `users.email` and an index on `orders.user_id`.

## API surface

| Method | Route | Purpose | Auth |
|---|---|---|---|
| `GET` | `/api/products` | List products. Support `category`, `sort`, and `search` query parameters. | Public |
| `GET` | `/api/products/:slug` | Return one product and related products. | Public |
| `POST` | `/api/auth/register` | Validate name/email/password, create user, return a session. | Public |
| `POST` | `/api/auth/login` | Authenticate and return a secure HTTP-only session cookie or token. | Public |
| `POST` | `/api/auth/logout` | Clear the current session. | Signed in |
| `GET` | `/api/auth/me` | Return the signed-in user profile. | Signed in |
| `POST` | `/api/orders` | Validate inventory, calculate totals server-side, create an order, and start payment. | Optional / recommended |
| `GET` | `/api/orders` | Return the current user’s orders. | Signed in |
| `GET` | `/api/orders/:id` | Return one order for the current user. | Signed in |

## Frontend replacement points

1. Replace `products` and `categories` imports in `client/src/pages/Home.tsx` with a product query layer.
2. Replace the `StoreProvider` methods in `client/src/contexts/StoreContext.tsx` with `fetch` or a typed client for `/api/products`, `/api/auth/*`, and `/api/orders`.
3. Keep the cart state client-side until checkout, but re-fetch product prices and inventory on order creation.
4. Replace `CheckoutDialog`’s `placeOrder` call with `POST /api/orders` and redirect to the payment provider or hosted checkout session.
5. Keep the demo fallback only for local preview; do not mix demo orders with production orders.

## Security and deployment

- Host the API on a service that supports Python/Node and a managed database; GitHub Pages cannot run the API.
- Configure CORS for the exact GitHub Pages origin.
- Use HTTPS, secure HTTP-only cookies, CSRF protection where cookie sessions are used, rate limiting, and server-side validation.
- Calculate price, tax, shipping, and inventory on the server. Treat all values from the browser as untrusted.
- Keep payment provider secrets and database credentials in backend environment variables, never in Vite client code.
