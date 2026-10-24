# MAMA_PROJECT - demo shop websites

Four static demo shops plus a pitch page, made so the owner can pitch two side-hustle ideas in Bihar.
Everything must stay free: static files only, no payment gateway, no paid hosting.

## Commands

- Test: `npm test` (runs `node --test`, no dependencies)
- Serve locally: `npm run serve`, then open http://localhost:8080/
- Before every deploy: `npm run stamp` (versions CSS/JS links so browsers never mix a new page with a cached old stylesheet)

## Layout

- `index.html` - pitch page linking all demos, with costs and the business plan.
- `shared/cart.js` - cart, drawer and checkout used by every shop. Pure helpers are unit-tested.
- `shared/packs.js` - draws product packshots as SVG from an `art` object.
- `shared/base.css` - reset, drawer and checkout styles, themed by CSS tokens.
- `sites/<shop>/` - one folder per shop: `index.html`, `checkout.html`, `style.css`, `products.js`, `app.js`.

## Rules

- Each shop sets `window.SHOP` in `products.js` and themes the shared parts by overriding tokens in `style.css`.
- Checkout is pay-on-delivery only (cash or UPI at the door) plus "Order on WhatsApp". Never add a payment gateway.
- All products, prices and reviews are invented samples; every footer says so.
- Supplement copy must not claim to cure or treat disease.
- Paths are relative so the site works from any GitHub Pages sub-path.
- Give every inline `<svg>` a `width` attribute so it stays icon-sized even if CSS fails to load.
