# Golden Horizon Research — WordPress + WooCommerce Setup

This is the plan to turn the **customer portal** (and store) from the current
front-end demo into a genuinely working system, using the stack from the
original brief: **WordPress + WooCommerce + WooCommerce Subscriptions + Stripe**.

> Why this is needed: the deployed site is a static React app. A static site has
> no database, no user sessions, and no safe place for secret keys, so it cannot
> authenticate real customers, store orders, take payments, or manage
> subscriptions on its own. WooCommerce supplies all of that.

There are two ways to combine WooCommerce with this design. Pick one.

---

## Option A — Full WordPress (recommended, fastest to "actually works")

WooCommerce renders the store and the **My Account** portal itself. You get real
accounts, orders, downloads (COA PDFs), subscriptions, and tracking with almost
no custom code — you theme it to match this design.

### 1. Hosting & WordPress
- Provision WordPress on managed hosting (Kinsta, WP Engine, SiteGround, Cloudways)
  or a VPS. You need PHP 8.1+, MySQL/MariaDB, HTTPS.
- WordPress.com works **only on the Commerce plan** (it's the tier that allows
  installing WooCommerce + third-party plugins). The Business plan can install
  plugins too. Lower tiers cannot run WooCommerce Subscriptions.

### 2. Core plugins
| Plugin | Purpose |
|---|---|
| **WooCommerce** | Store, cart, checkout, **My Account** portal, orders |
| **WooCommerce Subscriptions** (paid, by Woo) | Recurring billing + customer pause / skip / cancel |
| **WooCommerce Stripe Gateway** (free) | Card payments via Stripe; supports Subscriptions |
| **WooCommerce Shipment Tracking** (or AfterShip) | Tracking numbers shown in My Account |
| **A caching/security plugin** | Performance + hardening |

The built-in **My Account** page already provides: Dashboard, Orders, Downloads
(your COA PDFs), Addresses, Payment methods, and — with Subscriptions — a
**Subscriptions** tab with Pause / Skip / Cancel. That *is* the customer portal.

### 3. Catalog / COA model
- Create products for each material (Reference/Calibration/Assay).
- Store batch metadata as **product attributes** or **custom fields**: `batch`,
  `lot`, `purity`, `analysis_date`, `status`. (A field plugin like ACF helps.)
- Attach the **COA PDF** as a *downloadable file* on the product so it appears
  under **My Account → Downloads** for purchasers. Public COA lookup (the Verify
  page) can stay a separate searchable index — see the headless API notes below
  if you want this React Verify page to read live data.

### 4. Subscriptions (one-time + subscription)
- For products you sell on subscription, add a **Subscription** product type (from
  the Subscriptions plugin) or enable "also sell as subscription".
- Pause / Skip / Cancel are automatic in My Account once Subscriptions is active.

### 5. Theme to match this design
- Build a child theme (or use a block theme) and bring over the tokens from
  `src/styles/tokens/` (colors, type, spacing) so WooCommerce pages match the
  dark gold look. The hero/marketing pages can be rebuilt with the block editor
  or this React app can remain the marketing front (see Option B).

### 6. Legal
- Keep the site-wide disclaimer in the footer and on every product:
  *"For laboratory research purposes only. Not intended for human consumption.
  Not intended to diagnose, treat, cure, or prevent any disease."*

**Result:** a real, working portal with minimal custom code. The main work is
theming and content entry, not engineering.

---

## Option B — Headless (keep this exact React site)

Keep this React app as the storefront and call WooCommerce over its APIs. You
preserve the design pixel-for-pixel; you take on more integration work.

What talks to what:
- **Products / catalog** → WooCommerce **Store API** (`/wp-json/wc/store/v1`),
  public, read-only, no secret key. Safe to call from the browser.
- **Cart / checkout** → Store API cart endpoints, or redirect to Stripe Checkout.
- **Customer auth + orders** → needs a token flow. Install a **JWT auth** plugin
  (e.g. "JWT Authentication for WP REST API"); the React app logs in against it
  and stores a short-lived token to read the customer's orders.
- **Subscriptions management** → the WooCommerce REST API can *read* subscriptions
  (with API keys, server-side only — never ship secret keys to the browser), but
  customer self-service pause/cancel is cleanest via the hosted **My Account**
  page or **Stripe's Customer Portal**. Practical headless pattern: link the
  "Manage subscription" button to the WooCommerce My Account subscriptions URL.

This repo already includes the **read-only products client** to make the catalog
real with zero secrets — see below.

### Wiring the headless products client (already in this repo)
1. Copy `.env.example` to `.env` and set your store URL:
   ```
   VITE_WC_STORE_URL=https://store.goldenhorizon.example
   ```
2. With that set, `src/lib/catalog.js` fetches live products from the Store API
   and maps them into the shape the UI expects. **If the variable is unset or the
   request fails, it falls back to the bundled sample catalog**, so the site never
   breaks.
3. Map your batch/lot/purity fields: in WooCommerce, expose them as product
   `meta_data` (keys `batch`, `lot`, `purity`, `analysis_date`, `status`); the
   client reads those keys. Adjust the key names in `src/lib/catalog.js` if yours
   differ.

### What still needs your store before it can be finished
- Auth (JWT plugin) + the live store URL/credentials — then I can wire the
  Account login and order history to real endpoints.
- Stripe keys (publishable for Checkout; secret stays server-side) for payments.
- Real COA PDFs uploaded as product downloads.

---

## Recommendation

Go **Option A** for the portal itself — WooCommerce's My Account + Subscriptions
is the genuinely-working customer portal with the least custom code, and it's
exactly what the brief specified. Use this React app for the marketing/Verify
front if you like the look (Option B's products client lets it read the same
catalog).

When you have a store URL + admin access (and Stripe keys), I can:
- finish the headless products/Verify integration, and/or
- theme the WooCommerce store + My Account to match this design.
