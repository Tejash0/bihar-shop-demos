// Shared cart, cart drawer and checkout for every demo shop.
// Pure helpers (totals, WhatsApp text, validation) are exported for node tests;
// the DOM layer runs only in the browser and is styled by shared/base.css + brand tokens.
(function (root) {
  "use strict";

  // ---------- pure helpers ----------

  const rupees = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  // lines: { [productId]: qty }. Unknown ids and non-positive quantities are dropped.
  function resolve(lines, products) {
    const byId = new Map(products.map((p) => [p.id, p]));
    return Object.entries(lines)
      .filter(([id, qty]) => byId.has(id) && qty > 0)
      .map(([id, qty]) => ({ product: byId.get(id), qty }));
  }

  function totals(lines, products, delivery = {}) {
    const items = resolve(lines, products);
    const count = items.reduce((s, l) => s + l.qty, 0);
    const subtotal = items.reduce((s, l) => s + l.qty * l.product.price, 0);
    const mrp = items.reduce(
      (s, l) => s + l.qty * (l.product.mrp || l.product.price),
      0,
    );
    const fee = delivery.fee || 0;
    const freeAbove = delivery.freeAbove ?? Infinity;
    const deliveryFee = count === 0 || subtotal >= freeAbove ? 0 : fee;
    return {
      items,
      count,
      subtotal,
      savings: mrp - subtotal,
      deliveryFee,
      toFree:
        count && Number.isFinite(freeAbove)
          ? Math.max(0, freeAbove - subtotal)
          : 0,
      total: subtotal + deliveryFee,
    };
  }

  function orderText(shop, t, customer) {
    const rows = t.items.map(
      (l) =>
        `• ${l.product.name} (${l.product.size}) x${l.qty} = ${rupees(l.qty * l.product.price)}`,
    );
    const out = [
      `Hi ${shop.name}! I'd like to order:`,
      ...rows,
      `Delivery: ${t.deliveryFee ? rupees(t.deliveryFee) : "Free"}`,
      `Total: ${rupees(t.total)}`,
    ];
    if (customer) {
      out.push(
        "",
        `Name: ${customer.name}`,
        `Phone: ${customer.phone}`,
        `Address: ${customer.address}, ${customer.pincode}`,
        `Pay: ${customer.payment}`,
      );
    }
    return out.join("\n");
  }

  const whatsappUrl = (number, text) =>
    `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

  // Returns { field: message } for each invalid field; empty object means valid.
  function validate(c, pincodes) {
    const e = {};
    if (!c.name || c.name.trim().length < 2) e.name = "Enter your name";
    // Accepts 98xxxxxxxx, +91 98xxx xxxxx and 098xxxxxxxx.
    const digits = (c.phone || "")
      .replace(/\D/g, "")
      .replace(/^(91|0)(?=\d{10}$)/, "");
    if (!/^[6-9]\d{9}$/.test(digits))
      e.phone = "Enter a 10-digit mobile number";
    if (!c.address || c.address.trim().length < 8)
      e.address = "Add house, street and landmark";
    if (!/^\d{6}$/.test(c.pincode || "")) e.pincode = "Pincode is 6 digits";
    else if (pincodes && !pincodes.includes(c.pincode))
      e.pincode = "We don’t deliver here yet";
    return e;
  }

  const core = { rupees, resolve, totals, orderText, whatsappUrl, validate };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = core;
    return;
  }

  // ---------- browser layer ----------

  const icon = {
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h12l1 13H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    minus:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20Z"/><path d="M9 10h.01M12 10h.01M15 10h.01"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
  };

  const store = {
    get(key) {
      try {
        return JSON.parse(localStorage.getItem(key)) || {};
      } catch {
        return {};
      }
    },
    set(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch {
        /* private mode: cart lives for this page only */
      }
    },
  };

  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );

  function create(shop) {
    const key = `demo-cart:${shop.id}`;
    let lines = store.get(key);
    const listeners = [];
    const products = shop.products;
    const find = (id) => products.find((p) => p.id === id);
    const art = (p) => (root.Packs ? root.Packs.pack(p.art, p.name) : "");

    const cart = {
      shop,
      get lines() {
        return lines;
      },
      totals: () => totals(lines, products, shop.delivery),
      qty: (id) => lines[id] || 0,
      set(id, qty) {
        if (!find(id)) return;
        if (qty > 0) lines[id] = Math.min(qty, 99);
        else delete lines[id];
        store.set(key, lines);
        listeners.forEach((fn) => fn());
      },
      add(id, n = 1) {
        cart.set(id, cart.qty(id) + n);
      },
      clear() {
        lines = {};
        store.set(key, lines);
        listeners.forEach((fn) => fn());
      },
      onChange: (fn) => listeners.push(fn),
      art,
      icon,
      whatsappFor: (customer) =>
        whatsappUrl(shop.whatsapp, orderText(shop, cart.totals(), customer)),
    };
    return cart;
  }

  function stepper(cart, id, cls = "") {
    const q = cart.qty(id);
    const p = cart.shop.products.find((x) => x.id === id);
    if (!q)
      return `<button class="buy-add ${cls}" data-add="${id}" type="button">${esc(cart.shop.addLabel || "Add")}</button>`;
    return `<div class="buy-stepper ${cls}" role="group" aria-label="Quantity of ${esc(p.name)}">
      <button type="button" data-dec="${id}" aria-label="Remove one">${icon.minus}</button>
      <output aria-live="polite">${q}</output>
      <button type="button" data-inc="${id}" aria-label="Add one">${icon.plus}</button>
    </div>`;
  }

  function mountDrawer(cart) {
    const shop = cart.shop;
    const el = document.createElement("div");
    el.className = "cart-root";
    el.innerHTML = `
      <div class="cart-scrim" data-close-cart></div>
      <aside class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" tabindex="-1">
        <header class="cart-head">
          <h2 id="cart-title">Your bag</h2>
          <button class="cart-x" type="button" data-close-cart aria-label="Close bag">${icon.close}</button>
        </header>
        <div class="cart-body"></div>
        <footer class="cart-foot"></footer>
      </aside>
      <div class="cart-toast" role="status" aria-live="polite"></div>`;
    document.body.appendChild(el);
    const body = el.querySelector(".cart-body");
    const foot = el.querySelector(".cart-foot");
    const drawer = el.querySelector(".cart-drawer");
    let lastFocus = null;

    function render() {
      const t = cart.totals();
      if (!t.count) {
        body.innerHTML = `<div class="cart-empty"><p>Your bag is empty.</p><p>${esc(shop.emptyHint || "Add something you like and it will show up here.")}</p></div>`;
        foot.innerHTML = "";
        return;
      }
      const progress = Number.isFinite(shop.delivery?.freeAbove)
        ? Math.min(100, (t.subtotal / shop.delivery.freeAbove) * 100)
        : 100;
      body.innerHTML = `
        <div class="cart-progress">
          <p>${t.toFree ? `Add <b>${rupees(t.toFree)}</b> more for free delivery` : `<b>Free delivery</b> unlocked`}</p>
          <div class="cart-bar"><span style="width:${progress}%"></span></div>
        </div>
        <ul class="cart-lines">${t.items
          .map(
            ({ product: p, qty }) => `
          <li>
            <div class="cart-thumb">${cart.art(p)}</div>
            <div class="cart-info"><p class="cart-name">${esc(p.name)}</p><p class="cart-size">${esc(p.size)}</p>${stepper(cart, p.id, "is-small")}</div>
            <p class="cart-price">${rupees(p.price * qty)}</p>
          </li>`,
          )
          .join("")}</ul>`;
      foot.innerHTML = `
        <dl class="cart-sum">
          <div><dt>Items (${t.count})</dt><dd>${rupees(t.subtotal)}</dd></div>
          ${t.savings > 0 ? `<div class="is-save"><dt>You save</dt><dd>${rupees(t.savings)}</dd></div>` : ""}
          <div><dt>Delivery</dt><dd>${t.deliveryFee ? rupees(t.deliveryFee) : "Free"}</dd></div>
          <div class="is-total"><dt>To pay</dt><dd>${rupees(t.total)}</dd></div>
        </dl>
        <a class="cart-checkout" href="${shop.checkoutUrl || "checkout.html"}">Checkout · ${rupees(t.total)}</a>
        <a class="cart-wa" href="${cart.whatsappFor()}" target="_blank" rel="noopener">${icon.chat}<span>Order on WhatsApp instead</span></a>`;
    }

    const open = () => {
      lastFocus = document.activeElement;
      el.classList.add("is-open");
      document.documentElement.classList.add("cart-lock");
      drawer.focus();
    };
    const close = () => {
      el.classList.remove("is-open");
      document.documentElement.classList.remove("cart-lock");
      lastFocus?.focus?.();
    };

    let toastTimer;
    const toast = (msg) => {
      const t = el.querySelector(".cart-toast");
      t.innerHTML = `${icon.check}<span>${esc(msg)}</span>`;
      t.classList.add("is-on");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => t.classList.remove("is-on"), 1800);
    };

    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && el.classList.contains("is-open") && close(),
    );
    cart.onChange(render);
    render();
    return { open, close, toast };
  }

  // Wires [data-add|inc|dec], [data-buy], [data-cart-count], [data-open-cart], [data-cart-bar].
  function init(shop) {
    const cart = create(shop);
    const drawer = mountDrawer(cart);

    function paint() {
      const t = cart.totals();
      document.querySelectorAll("[data-cart-count]").forEach((n) => {
        n.textContent = t.count;
        n.hidden = !t.count;
      });
      document
        .querySelectorAll("[data-cart-total]")
        .forEach((n) => (n.textContent = rupees(t.total)));
      document
        .querySelectorAll("[data-cart-bar]")
        .forEach((n) => n.classList.toggle("is-on", t.count > 0));
      document.querySelectorAll("[data-buy]").forEach((n) => {
        n.innerHTML = stepper(cart, n.dataset.buy, n.dataset.buyClass || "");
      });
    }

    document.addEventListener("click", (e) => {
      const t = e.target.closest(
        "[data-add],[data-inc],[data-dec],[data-open-cart],[data-close-cart]",
      );
      if (!t) return;
      if (t.dataset.add) {
        // The same product can appear in two lists, so remember which one was clicked.
        const host = t.closest("[data-buy]");
        cart.add(t.dataset.add);
        const p = shop.products.find((x) => x.id === t.dataset.add);
        drawer.toast(`${p.name} added`);
        // Keep keyboard focus on the stepper that replaced the button.
        host?.querySelector("[data-inc]")?.focus({ preventScroll: true });
      } else if (t.dataset.inc) cart.add(t.dataset.inc);
      else if (t.dataset.dec) cart.add(t.dataset.dec, -1);
      else if (t.hasAttribute("data-open-cart")) drawer.open();
      else if (t.hasAttribute("data-close-cart")) drawer.close();
    });

    cart.onChange(paint);
    paint();
    // Product grids rendered after init can call this to refresh their buy controls.
    cart.repaint = paint;
    cart.drawer = drawer;
    return cart;
  }

  // Renders the checkout page into `host`. No payment is taken: pay-on-delivery only.
  function mountCheckout(cart, host) {
    const shop = cart.shop;

    function summary(t) {
      return `
        <ul class="co-lines">${t.items
          .map(
            ({ product: p, qty }) =>
              `<li><div class="co-thumb">${cart.art(p)}</div><div><p class="co-name">${esc(p.name)}</p><p class="co-size">${esc(p.size)} · x${qty}</p></div><p>${rupees(p.price * qty)}</p></li>`,
          )
          .join("")}</ul>
        <dl class="cart-sum">
          <div><dt>Items (${t.count})</dt><dd>${rupees(t.subtotal)}</dd></div>
          ${t.savings > 0 ? `<div class="is-save"><dt>You save</dt><dd>${rupees(t.savings)}</dd></div>` : ""}
          <div><dt>Delivery</dt><dd>${t.deliveryFee ? rupees(t.deliveryFee) : "Free"}</dd></div>
          <div class="is-total"><dt>To pay on delivery</dt><dd>${rupees(t.total)}</dd></div>
        </dl>`;
    }

    function renderForm() {
      const t = cart.totals();
      if (!t.count) {
        host.innerHTML = `<div class="co-empty"><h1>Your bag is empty</h1><p>Pick a few things first, then come back here.</p><a class="cart-checkout" href="index.html">Back to shop</a></div>`;
        return;
      }
      const areas = shop.areaNote
        ? `<p class="co-hint">${esc(shop.areaNote)}</p>`
        : "";
      host.innerHTML = `
        <div class="co-grid">
          <form class="co-form" novalidate>
            <h1>Checkout</h1>
            <p class="co-demo">Demo shop: no real order is placed and no money is taken.</p>
            <fieldset>
              <legend>Delivery details</legend>
              <label>Full name<input name="name" autocomplete="name" required></label>
              <label>Mobile number<input name="phone" inputmode="numeric" autocomplete="tel" placeholder="10-digit number" required></label>
              <label>House, street, landmark<textarea name="address" rows="3" autocomplete="street-address" required></textarea></label>
              <label>Pincode<input name="pincode" inputmode="numeric" maxlength="6" autocomplete="postal-code" required></label>
              ${areas}
            </fieldset>
            <fieldset>
              <legend>Pay when it arrives</legend>
              <label class="co-pay"><input type="radio" name="payment" value="Cash on delivery" checked><span><b>Cash on delivery</b><small>Pay the rider in cash</small></span></label>
              <label class="co-pay"><input type="radio" name="payment" value="UPI on delivery"><span><b>UPI on delivery</b><small>Scan the rider's QR at your door</small></span></label>
            </fieldset>
            <button class="cart-checkout" type="submit">Place order · ${rupees(t.total)}</button>
            <a class="cart-wa" href="${cart.whatsappFor()}" target="_blank" rel="noopener">${icon.chat}<span>Or send this order on WhatsApp</span></a>
          </form>
          <aside class="co-summary"><h2>Order summary</h2>${summary(t)}</aside>
        </div>`;

      const form = host.querySelector("form");
      // Clear a field's error as soon as the buyer starts fixing it.
      form.addEventListener("input", (e) => {
        if (!e.target.hasAttribute("aria-invalid")) return;
        e.target.removeAttribute("aria-invalid");
        e.target.nextElementSibling?.classList.contains("co-err") &&
          e.target.nextElementSibling.remove();
      });
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        data.phone = data.phone.replace(/\D/g, "").slice(-10);
        const errors = validate(data, shop.pincodes);
        form.querySelectorAll(".co-err").forEach((n) => n.remove());
        form
          .querySelectorAll("[aria-invalid]")
          .forEach((n) => n.removeAttribute("aria-invalid"));
        const bad = Object.keys(errors);
        if (bad.length) {
          bad.forEach((name) => {
            const input = form.elements[name];
            input.setAttribute("aria-invalid", "true");
            input.insertAdjacentHTML(
              "afterend",
              `<span class="co-err">${esc(errors[name])}</span>`,
            );
          });
          form.elements[bad[0]].focus();
          return;
        }
        renderDone(data, cart.totals());
      });
    }

    function renderDone(customer, t) {
      const id = `${shop.orderPrefix || "DM"}-${String(Date.now()).slice(-6)}`;
      const wa = cart.whatsappFor(customer);
      cart.clear();
      host.innerHTML = `
        <div class="co-done">
          <div class="co-tick">${icon.check}</div>
          <h1>Order placed</h1>
          <p>Thanks, ${esc(customer.name.split(" ")[0])}. Order <b>${id}</b> for ${rupees(t.total)} will reach ${esc(customer.pincode)} ${esc(shop.eta || "soon")}.</p>
          <p class="co-demo">This is a demo, so nothing will actually be delivered.</p>
          <a class="cart-checkout" href="index.html">Keep shopping</a>
          <a class="cart-wa" href="${wa}" target="_blank" rel="noopener">${icon.chat}<span>Send order details on WhatsApp</span></a>
        </div>`;
      host.querySelector("h1").focus?.();
    }

    renderForm();
  }

  root.Shop = { ...core, init, mountCheckout, stepper, icon };
})(typeof window !== "undefined" ? window : globalThis);
