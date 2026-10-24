# MAMA_PROJECT - Chamak demo shop

Demo website for Chamak, a home cleaning and car care concentrates brand made locally in Patna, sold for local delivery and on Amazon.
Everything must stay free: static files only, no payment gateway, no paid hosting.
Live at https://tejash0.github.io/bihar-shop-demos/ (GitHub Pages from `main`).

## Commands

- Test: `npm test` (runs `node --test`, no dependencies)
- Serve locally: `npm run serve`, then open http://localhost:8080/
- Before every deploy: `npm run stamp` (versions CSS/JS links so browsers never mix a new page with a cached old stylesheet)

## Layout

- `index.html`, `checkout.html`, `style.css` - the Chamak shop.
- `products.js` - `window.SHOP`: settings, products, kits, Amazon links. Edit prices and products here.
- `app.js` - category tabs, product cards, kit builder, bulk-order form.
- `shared/cart.js` - cart, drawer and checkout. Pure helpers are unit-tested.
- `shared/packs.js` - draws product packshots as SVG from an `art` object.
- `shared/base.css` - reset, drawer and checkout styles, themed by CSS tokens.
- `sites/chamak/` - redirects only, so the old link already shared on WhatsApp still works.

## Rules

- Checkout is pay-on-delivery only (cash or UPI at the door) plus "Order on WhatsApp" and "Buy on Amazon". Never add a payment gateway.
- Products, prices and reviews are samples until the owner sends real ones; the footer says so.
- Never use another brand's name (e.g. "Lizol") or germ-kill claims ("sanitizer", "99.9%") without lab proof.
- Paths are relative so the site works from any GitHub Pages sub-path.
- Give every inline `<svg>` a `width` attribute so it stays icon-sized even if CSS fails to load.
