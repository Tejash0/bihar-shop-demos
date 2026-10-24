// Chamak page: hero packs, ready-kit grid, build-your-own kit, refills and the bulk form.
(function () {
  "use strict";
  const shop = window.SHOP;
  const cart = window.Shop.init(shop);
  const { rupees } = window.Shop;
  const pack = (p) => window.Packs.pack(p.art, p.name);
  const byId = (id) => shop.products.find((p) => p.id === id);
  const off = (p) => (p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0);
  const icon = {
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
  };

  // ---------- hero ----------
  document.querySelectorAll("[data-pack]").forEach((el) => {
    el.innerHTML = pack(byId(el.dataset.pack));
  });
  const hero = byId("kit-chhath");
  document.querySelector(".hk-list").innerHTML = hero.contents
    .map((c) => `<li>${c}</li>`)
    .join("");

  // ---------- ready kits ----------
  document.querySelector(".kit-grid").innerHTML = shop.kits
    .filter((k) => k.id !== hero.id)
    .map(
      (k) => `<li class="kit" style="--tint:${k.tint || k.art.body}">
        <div class="kit-art">${k.tag ? `<span class="kit-tag">${k.tag}</span>` : ""}${pack(k)}</div>
        <div class="kit-body">
          <h3>${k.name}</h3>
          <p class="kit-size">${k.size}</p>
          <p class="kit-has">${k.contents.join(" · ")}</p>
          <div class="kit-buy">
            <p class="price"><b>${rupees(k.price)}</b><s>${rupees(k.mrp)}</s><span>Save ${rupees(k.mrp - k.price)}</span></p>
            <div data-buy="${k.id}"></div>
          </div>
        </div>
      </li>`,
    )
    .join("");

  // ---------- refills ----------
  document.querySelector(".refill-row").innerHTML = shop.refills
    .map(
      (r) => `<li class="refill">
        <div class="refill-art">${pack(r)}</div>
        <h3>${r.name}</h3>
        <p class="refill-size">${r.size}</p>
        <p class="price"><b>${rupees(r.price)}</b><s>${rupees(r.mrp)}</s></p>
        <div data-buy="${r.id}" data-buy-class="is-small"></div>
      </li>`,
    )
    .join("");

  // ---------- build your own kit ----------
  const picksEl = document.querySelector(".picks");
  const slotsEl = document.querySelector(".tray-slots");
  const fillEl = document.querySelector(".meter-fill");
  const hintEl = document.querySelector(".tray-hint");
  const priceEl = document.querySelector(".tray-price");
  const addBtn = document.querySelector(".tray-add");
  const clearBtn = document.querySelector(".tray-clear");
  const maxItems = shop.singles.length;
  const picked = new Set();

  picksEl.innerHTML = shop.singles
    .map(
      (
        s,
      ) => `<li><button class="pick" type="button" data-pick="${s.id}" aria-pressed="false">
        <span class="pick-art">${pack(s)}</span>
        <span class="pick-name">${s.name}</span>
        <span class="pick-meta">${s.size} · <b>${rupees(s.price)}</b></span>
        <span class="pick-mark">${icon.plus}${icon.check}</span>
      </button></li>`,
    )
    .join("");

  function nextTier(n) {
    return shop.tiers.find((t) => n < t.min);
  }

  function renderTray(justAdded) {
    const ids = [...picked];
    const n = ids.length;
    const slots = Math.max(8, n);
    slotsEl.innerHTML = Array.from({ length: slots }, (_, i) => {
      const s = ids[i] && byId(ids[i]);
      return s
        ? `<li class="slot is-full${s.id === justAdded ? " is-new" : ""}" title="${s.name}">${pack(s)}</li>`
        : `<li class="slot" aria-hidden="true"></li>`;
    }).join("");

    fillEl.style.setProperty("--n", n);
    const tier = shop.tierFor(n);
    const next = nextTier(n);
    if (!n) hintEl.textContent = "Tap any product to drop it in your kit.";
    else if (n < shop.kitMin)
      hintEl.textContent = `Add ${shop.kitMin - n} more to make a kit. ${shop.tiers[0].min}+ items get ${shop.tiers[0].off * 100}% off.`;
    else if (next)
      hintEl.innerHTML = `${tier.off ? `<b>${tier.off * 100}% off unlocked.</b> ` : ""}Add ${next.min - n} more for ${next.off * 100}% off.`;
    else
      hintEl.innerHTML = `<b>${tier.off * 100}% off, the best price.</b> Full chamak.`;

    const full = ids.reduce((s, id) => s + byId(id).price, 0);
    const price = Math.round(full * (1 - tier.off));
    priceEl.innerHTML = n
      ? `<b>${rupees(price)}</b>${tier.off ? `<s>${rupees(full)}</s><span>You save ${rupees(full - price)}</span>` : ""}`
      : "";
    addBtn.disabled = n < shop.kitMin;
    addBtn.textContent = n
      ? `Add kit to bag · ${rupees(price)}`
      : "Add kit to bag";
    clearBtn.hidden = !n;
    picksEl.querySelectorAll("[data-pick]").forEach((b) => {
      b.setAttribute("aria-pressed", picked.has(b.dataset.pick));
    });
  }

  picksEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-pick]");
    if (!b) return;
    const id = b.dataset.pick;
    if (picked.has(id)) picked.delete(id);
    else if (picked.size < maxItems) picked.add(id);
    renderTray(picked.has(id) ? id : null);
  });

  clearBtn.addEventListener("click", () => {
    picked.clear();
    renderTray();
  });

  addBtn.addEventListener("click", () => {
    const kit = shop.saveKit([...picked]);
    if (!kit) return;
    cart.add(kit.id);
    cart.drawer.toast(`${kit.name} added`);
    picked.clear();
    renderTray();
  });

  renderTray();
  // Grids above were drawn after the cart started, so give them their buy buttons now.
  cart.repaint();

  // ---------- bulk enquiry -> WhatsApp ----------
  const form = document.querySelector(".bulk-form");
  const note = form.querySelector(".bulk-note");
  form.addEventListener("input", (e) =>
    e.target.removeAttribute("aria-invalid"),
  );
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const phone = (d.phone || "")
      .replace(/\D/g, "")
      .replace(/^(91|0)(?=\d{10}$)/, "");
    const bad = [];
    if (!d.type) bad.push("type");
    if (!d.qty) bad.push("qty");
    if (!d.name || d.name.trim().length < 2) bad.push("name");
    if (!/^[6-9]\d{9}$/.test(phone)) bad.push("phone");
    form
      .querySelectorAll("[aria-invalid]")
      .forEach((n) => n.removeAttribute("aria-invalid"));
    if (bad.length) {
      bad.forEach((n) => form.elements[n].setAttribute("aria-invalid", "true"));
      form.elements[bad[0]].focus();
      note.textContent =
        "Please fill all four: business type, monthly quantity, name and a 10-digit mobile number.";
      note.classList.add("is-err");
      return;
    }
    const text = [
      `Hi ${shop.name}! Bulk order enquiry.`,
      `Business: ${d.type}`,
      `Monthly quantity: ${d.qty}`,
      `Name: ${d.name.trim()}`,
      `Phone: ${phone}`,
    ].join("\n");
    note.classList.remove("is-err");
    note.textContent = "Opening WhatsApp with your details. Just press send.";
    window.open(
      window.Shop.whatsappUrl(shop.whatsapp, text),
      "_blank",
      "noopener",
    );
  });
})();
