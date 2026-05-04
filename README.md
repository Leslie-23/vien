# VIEN — Rustic Shoe Store

An edgy, rustic-themed full-stack shoe selling website built with React + Vite (frontend) and Express + MongoDB (backend), with Cloudinary integration for image uploads.

## Structure

- `client/` — React + Vite + React Router frontend (TypeScript)
- `server/` — Express + Mongoose backend with Cloudinary image handling

## Pages

| Route | Description |
| ------------- | ---------------------------------------- |
| `/` | Home — hero, categories, featured, testimonials |
| `/shop` | Shop — filterable & sortable product catalog |
| `/shop/:id` | Product Detail — full product view with sizes |
| `/about` | Our Story — brand values, process |
| `/contact` | Contact — form + workshop info |
| `*` | 404 |

## Prerequisites

- **Node.js** ≥ 18
- **MongoDB** (local or Atlas)
- **Cloudinary** account (only needed for real image uploads)

## Setup

```bash
git clone https://github.com/Leslie-23/vien.git
cd vien
cp .env.example server/.env   # then edit server/.env
npm install
npm run dev
```

Open the frontend at http://localhost:3000 — Vite proxies `/api` to the backend on port `4000`.

## Environment Variables

Server (`server/.env`):

| Variable | Description |
| ----------------------- | -------------------------------- |
| `MONGODB_URI` | MongoDB connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `PORT` | Backend port (default: 4000) |
| `ADMIN_TOKEN` | Token required for admin endpoints (e.g. `GET /api/contact`). Send as `x-admin-token` header. |

Client (optional, `client/.env`):

| Variable | Description |
| ----------------- | ----------------------------------------------------- |
| `VITE_API_BASE` | Absolute API origin. Only set when the client is deployed separately from the API. In dev the Vite proxy handles `/api`. |

## API Endpoints

### Products

- `GET /api/products` — list all (supports `?category=`, `?featured=true`, `?inStock=true`, `?sort=price_asc|price_desc|name`)
- `GET /api/products/:id` — get product details
- `POST /api/products` — create product (`multipart/form-data` for image upload)
- `PUT /api/products/:id` — update product
- `DELETE /api/products/:id` — delete product

### Upload

- `POST /api/upload` — upload image to Cloudinary
- `DELETE /api/upload/:publicId` — delete image from Cloudinary

### Contact

- `POST /api/contact` — submit contact form
- `GET /api/contact` — list submissions **(admin: requires `x-admin-token`)**

### Newsletter

- `POST /api/newsletter` — subscribe

### Misc

- `GET /api` — welcome
- `GET /api/health` — health check
- `GET /api/categories` — list shoe categories

## Cart

The cart lives entirely on the client (React Context + `localStorage`, key `vien-cart-v1`). Checkout is a placeholder — wire it up to your payment provider when you're ready.

## Tech Stack

- **Frontend**: React 18, Vite, React Router, TypeScript
- **Backend**: Express, Mongoose, Cloudinary, Multer
- **Database**: MongoDB
- **Styling**: Custom CSS (rustic/edgy theme with Playfair Display + Inter)
