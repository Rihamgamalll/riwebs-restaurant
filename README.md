# RiWebs Restaurant — Production-ready build

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The site has a built-in Next.js order API at `/api/orders`, so WhatsApp checkout works locally and on Vercel even without Railway.

## WhatsApp checkout

The phone number is intentionally **not displayed on the Contact page**. It is used only when the customer confirms the cart. The order items, quantities, sizes/types/flavours, extras and total are converted into a WhatsApp message automatically and sent to `201013290912`.

## Languages

The header includes **EN | عربي**. Arabic switches the document to RTL and translates navigation, pages, cart, product customizer, menu labels, product names/descriptions and the main home experience. The selected language is saved in localStorage.

## Mobile hero

Desktop hero background:

`public/assets/background.png`

Mobile hero background:

`public/assets/background-mobile.png`

Replace `background-mobile.png` with your final mobile artwork using exactly the same filename if needed.

## Box animation

The packing scene now contains only two equal-stage states:

1. `public/assets/box-open.png` — shown when the packing scene is reached.
2. `public/assets/box-closed.png` — replaces it on the next scroll beat.

Both are rendered in the exact same stage/inset with no ingredient assembly and no scale jump.

## Deploy frontend to Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output: Next.js default.
6. If you are using the Railway API, add:

```env
NEXT_PUBLIC_API_URL=https://YOUR-RAILWAY-SERVICE.up.railway.app
```

If this variable is empty, the frontend uses the built-in Vercel `/api/orders` endpoint.

## Deploy backend to Railway

The optional standalone backend is in `/backend`.

1. Create a Railway project from the same repository.
2. Set the service **Root Directory** to `backend`.
3. Railway will run `npm start`.
4. Add the environment variable:

```env
FRONTEND_URL=https://YOUR-VERCEL-DOMAIN.vercel.app
NODE_ENV=production
```

5. Optional but recommended: add a Railway PostgreSQL service. Railway will provide `DATABASE_URL`. When `DATABASE_URL` exists, confirmed orders are stored automatically in the `orders` table.
6. Copy the Railway public URL to the Vercel `NEXT_PUBLIC_API_URL` variable and redeploy the frontend.

Health check: `/health`
Order endpoint: `POST /api/orders`

## Before launch

- Confirm final menu prices and availability.
- Confirm final opening hours.
- Replace the mobile background if your newest artwork is not already in the ZIP.
- Add the final Vercel domain to Railway `FRONTEND_URL`.
- Test one English and one Arabic WhatsApp order on mobile before launch.
