# Embata Massage Spa

Marketing site with online booking and Paystack payments, built with Next.js 14 (App Router), Tailwind CSS, Prisma + PostgreSQL and Brevo transactional email.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage — hero, stats, featured services, testimonials, CTA |
| `/services` | Full service catalogue with exact prices |
| `/about` | Story, approach and standards |
| `/reviews` | Client testimonials |
| `/contact` | Enquiry form, map, address, hours |
| `/book/[service]` | Booking form — pay in full via Paystack |
| `/book/verify` | Paystack callback — verifies payment, emails admin + customer |
| `/admin` | Admin panel (protected) — bookings, revenue, status updates |
| `/admin/login` | Admin sign-in |

## Local setup

```bash
npm install
cp .env.example .env      # then fill in every value
npm run db:push           # create tables in your Postgres database
npm run dev
```

## Environment variables

See [`.env.example`](.env.example).

| Variable | Where it comes from |
| --- | --- |
| `DATABASE_URL` | Neon or the Vercel Postgres integration |
| `PAYSTACK_SECRET_KEY` | Paystack Dashboard → Settings → API Keys & Webhooks |
| `PAYSTACK_PUBLIC_KEY` | Same page (currently unused — server-side flow only) |
| `BREVO_API_KEY` | Brevo → SMTP & API → API Keys |
| `BREVO_SENDER_EMAIL` | Must be a **verified sender** in Brevo |
| `BREVO_SENDER_NAME` | Shown as the email sender name |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin panel login credentials |
| `SESSION_SECRET` | `openssl rand -hex 32` — signs the admin session cookie |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for the Paystack callback |

## How a booking flows

1. Customer picks a service on `/services` → lands on `/book/<slug>`.
2. `POST /api/bookings` validates the form (zod), writes a `PENDING_PAYMENT`
   row using the price from `src/lib/services.ts` (never from the client), then
   calls Paystack `transaction/initialize`.
3. Customer is redirected to Paystack checkout.
4. Paystack returns to `/book/verify?reference=…`, which calls
   `transaction/verify`, compares amount and currency, flips the row to `PAID`,
   and sends two emails through Brevo — one to `ADMIN_EMAIL`, one to the
   customer.
5. `POST /api/paystack/webhook` runs the same path as a fallback and is
   authenticated with the `x-paystack-signature` HMAC.

## Testing with Paystack test mode

Use the test secret key (`sk_test_…`) and Paystack's test card:

```
4084 0840 8408 4081   CVV 408   PIN 0000   OTP 123456
```

## Deploying to Vercel

1. Push this repository to GitHub and import it in Vercel.
2. Add every variable from `.env.example` in **Project → Settings → Environment
   Variables**, including `NEXT_PUBLIC_SITE_URL` set to the production URL.
3. The build command is `prisma generate && next build` (already set in
   `package.json`), so no extra Vercel configuration is needed.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # prisma generate + next build
npm run start    # serve the production build
npm run db:push  # sync the Prisma schema to the database
```
