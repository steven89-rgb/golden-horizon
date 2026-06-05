# Golden Horizon Research

A premium e-commerce site for **Golden Horizon Research**, a supplier of research
materials. The site is built to communicate one thing above all: **trust through
transparency** — premium, professional, and verification-focused.

It is a faithful implementation of the *Golden Horizon Research Design System*
(exported from Claude Design): the same tokens, components, copy, and screens,
rebuilt as a real React + Vite single-page application.

> **Positioning guardrail.** Golden Horizon Research is a *research materials
> supplier*. The site makes **no** medical, health, treatment, weight-loss, or
> human-consumption claims, and never references obesity, appetite, fat loss,
> diabetes, cravings, dosing, or health outcomes. Every product surface carries
> the legal disclaimer: *"For laboratory research purposes only. Not intended for
> human consumption. Not intended to diagnose, treat, cure, or prevent any
> disease."* No fabricated reviews, testimonials, or statistics.

## Tech stack

- **React 18** + **react-router-dom** (client-side routing)
- **Vite 5** (dev server + build)
- Design tokens as plain CSS custom properties (`src/styles/tokens/`)
- Components styled inline against those tokens — no CSS-in-JS library, no UI deps

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Pages

| Route          | Screen   | Notes |
|----------------|----------|-------|
| `/`            | Home     | Hero, trust bar, Why, How It Works, COA teaser, FAQ |
| `/shop`        | Shop     | Filterable catalog (Product Type, Availability) |
| `/product/:id` | Product  | Imagery, details, Overview / Verification / Storage / Shipping / FAQ |
| `/verify`      | Verify COAs | Batch/lot search → live verification result panel |
| `/contact`     | Contact  | WhatsApp-first contact, no address/phone |
| `/about`       | About    | Transparency / verification / consistency values |
| `/account`     | Account  | Login → order history, subscriptions, saved COAs, tracking |

**Try the verifier:** on **Verify COAs**, search `GHR-2406-A`, `L-4475-11`, or any
sample batch/lot. Unknown codes return a "No matching record" state.

## Project structure

```
src/
  main.jsx              # entry — mounts <App/> in a BrowserRouter
  App.jsx               # routes + persistent Nav / Footer / WhatsApp FAB
  styles/
    styles.css          # entry stylesheet (@imports only)
    base.css            # global reset + canvas
    tokens/             # colors, typography, layout, fonts (design-system tokens)
  components/           # design-system primitives: Button, Card, Badge, Eyebrow, Input, Select
  layout/              # Nav, Footer, WhatsAppFab, Disclaimer, Logo, Section, Product card, FaqItem
  lib/
    icons.jsx           # Lucide/Feather-idiom line icon set + WhatsApp glyph
    data.js             # sample catalog, FAQ, trust, process content
public/assets/          # brand logo lockups + sun mark
```

## Design foundations

- **Color:** warm-neutral base (paper white, light gray), matte black `#0D0D0D`
  for type and high-contrast panels, soft gold `#C9A76A` as the single accent
  (used like gold leaf — a little, placed deliberately). Status colors are muted.
- **Type:** Hanken Grotesk for everything; Geist Mono for technical data
  (batch / lot / purity / dates). Headings are large, tight, and heavy.
- **Motion:** restrained — buttons scale to 0.97 on press, cards lift on hover,
  quick `ease-out` transitions, no bounce or parallax.
- **Layout:** sticky frosted top nav, trust bar under the hero, floating WhatsApp
  button site-wide, footer carrying the legal disclaimer.

## Caveats / open items (from the design handoff)

1. **Fonts are substitutes.** Hanken Grotesk + Geist Mono (Google Fonts) were
   chosen to match the logo's geometric wordmark. Supply the licensed brand font
   to swap in.
2. **Icons are a Lucide-style substitute.** Recommendation: adopt
   [Lucide](https://lucide.dev) wholesale for production. Confirm or supply the set.
3. **No real product photography or COA PDFs** were provided — the UI uses the sun
   mark as a neutral placeholder and sample batch data. Swap in real assets before
   launch.

The original brief targets a WordPress / WooCommerce production stack; this
repository implements the customer-facing design as a standalone React app that
can be ported to that stack or served as-is.
