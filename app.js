// Chamak page: hero, category tabs over the product grid, kits, build-your-own kit and the bulk form.
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
    drop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11Z"/></svg>',
    close: '<svg width="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    out: '<svg width="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  };

  // Add (pay on delivery) plus the secondary "Buy online" button, side by side.
  const onlineBtn = (p) =>
    `<button class="amz" type="button" data-online="${p.id}" aria-haspopup="dialog">Buy online</button>`;
  const buyPair = (p, cls = "") =>
    `<div class="buy-pair">
      <div data-buy="${p.id}"${cls ? ` data-buy-class="${cls}"` : ""}></div>
      ${onlineBtn(p)}
    </div>`;

  // ---------- hero ----------
  document.querySelectorAll("[data-pack]").forEach((el) => {
    el.innerHTML = pack(byId(el.dataset.pack));
  });
  const hero = byId("kit-chhath");
  document.querySelector(".hk-line").textContent = hero.line;
  document.querySelector(".hk-list").innerHTML = hero.items
    .map((id) => `<li>${byId(id).short}</li>`)
    .concat(`<li class="is-yield">Makes ${shop.volume(hero.makes)}</li>`)
    .join("");
  document.querySelector(".hk-buy .price").innerHTML =
    `<b>${rupees(hero.price)}</b><s>${rupees(hero.mrp)}</s><span>Save ${rupees(hero.mrp - hero.price)}</span>`;

  // ---------- "Buy online": one shared panel listing every store for the chosen product ----------
  const storeGroups = [
    { id: "india", label: "Delivered across India" },
    { id: "quick", label: "Quick delivery apps, where they deliver" },
  ];
  const sheet = document.createElement("dialog");
  sheet.className = "stores";
  sheet.setAttribute("aria-labelledby", "stores-title");
  document.body.appendChild(sheet);

  function openStores(p) {
    sheet.innerHTML = `
      <div class="stores-head">
        <div class="stores-pack">${pack(p)}</div>
        <div><h2 id="stores-title">Buy online</h2><p>${p.name}</p></div>
        <button class="stores-x" type="button" aria-label="Close">${icon.close}</button>
      </div>
      ${storeGroups
        .map(
          (g) => `<h3>${g.label}</h3><ul>${shop.stores
            .filter((st) => st.group === g.id)
            .map(
              (st) =>
                `<li><a href="${p.links[st.id]}" target="_blank" rel="noopener"><span>${st.name}</span>${icon.out}<span class="sr">(opens in a new tab)</span></a></li>`,
            )
            .join("")}</ul>`,
        )
        .join("")}
      <p class="stores-note">In Patna? <button type="button" class="stores-add">Add to bag and pay on delivery</button></p>`;
    sheet.querySelector(".stores-x").onclick = () => sheet.close();
    sheet.querySelector(".stores-add").onclick = () => {
      cart.add(p.id);
      sheet.close();
      cart.drawer.open();
    };
    sheet.showModal();
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-online]");
    if (b) openStores(byId(b.dataset.online));
  });
  // A click on the dimmed backdrop (outside the panel box) closes it.
  sheet.addEventListener("click", (e) => {
    if (e.target === sheet) sheet.close();
  });

  // ---------- shop: category tabs over the grid ----------
  const tabsEl = document.querySelector(".tabs");
  const panelsEl = document.querySelector(".panels");

  function card(p) {
    return `<li class="card" style="--tint:${p.art.body}">
      <div class="card-art">${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}${pack(p)}</div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="card-size">${p.size}</p>
        <p class="card-yield${p.conc ? "" : " is-plain"}">${p.conc ? icon.drop : ""}${p.yield}</p>
        <p class="card-line">${p.line}</p>
        <div class="card-buy">
          <p class="price"><b>${rupees(p.price)}</b><s>${rupees(p.mrp)}</s><span>${off(p)}% off</span></p>
          ${buyPair(p)}
        </div>
      </div>
    </li>`;
  }

  tabsEl.innerHTML = shop.categories
    .map((c, i) => {
      const n = shop.singles.filter((s) => s.cat === c.id).length;
      return `<button type="button" role="tab" id="tab-${c.id}" aria-controls="panel-${c.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab="${c.id}">${c.label}<span>${n}</span></button>`;
    })
    .join("");
  panelsEl.innerHTML = shop.categories
    .map(
      (c, i) =>
        `<div class="panel" role="tabpanel" id="panel-${c.id}" aria-labelledby="tab-${c.id}"${i ? " hidden" : ""}>
          <ul class="grid">${shop.singles
            .filter((s) => s.cat === c.id)
            .map(card)
            .join("")}</ul>
        </div>`,
    )
    .join("");

  function selectTab(id, focus) {
    tabsEl.querySelectorAll("[data-tab]").forEach((b) => {
      const on = b.dataset.tab === id;
      b.setAttribute("aria-selected", on);
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    panelsEl
      .querySelectorAll(".panel")
      .forEach((p) => (p.hidden = p.id !== `panel-${id}`));
  }

  tabsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]");
    if (b) selectTab(b.dataset.tab);
  });
  // Arrow keys move between tabs, as screen-reader users expect from a tablist.
  tabsEl.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const ids = shop.categories.map((c) => c.id);
    const cur = ids.indexOf(
      tabsEl.querySelector('[aria-selected="true"]').dataset.tab,
    );
    const next =
      ids[(cur + (e.key === "ArrowRight" ? 1 : ids.length - 1)) % ids.length];
    selectTab(next, true);
    e.preventDefault();
  });
  document
    .querySelectorAll("[data-jump]")
    .forEach((a) =>
      a.addEventListener("click", () => selectTab(a.dataset.jump)),
    );

  // ---------- ready kits (the festival kit is the hero, so it is left out here) ----------
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
            ${buyPair(k)}
          </div>
        </div>
      </li>`,
    )
    .join("");

  // ---------- build your own kit ----------
  const groupsEl = document.querySelector(".pick-groups");
  const slotsEl = document.querySelector(".tray-slots");
  const fillEl = document.querySelector(".meter-fill");
  const hintEl = document.querySelector(".tray-hint");
  const priceEl = document.querySelector(".tray-price");
  const addBtn = document.querySelector(".tray-add");
  const clearBtn = document.querySelector(".tray-clear");
  const picked = new Set();
  const groupTitle = { home: "Ghar ke liye", car: "Gaadi ke liye" };

  groupsEl.innerHTML = shop.categories
    .map(
      (c) => `<h3 class="pick-title">${groupTitle[c.id] || c.label}</h3>
      <ul class="picks" aria-label="${c.label} products you can add to your kit">${shop.singles
        .filter((s) => s.cat === c.id)
        .map(
          (
            s,
          ) => `<li><button class="pick" type="button" data-pick="${s.id}" aria-pressed="false">
            <span class="pick-art">${pack(s)}</span>
            <span class="pick-name">${s.name}</span>
            <span class="pick-meta">${s.conc ? `${s.conc}X · ` : ""}<b>${rupees(s.price)}</b></span>
            <span class="pick-mark">${icon.plus}${icon.check}</span>
          </button></li>`,
        )
        .join("")}</ul>`,
    )
    .join("");

  function renderTray(justAdded) {
    const ids = [...picked];
    const n = ids.length;
    slotsEl.innerHTML = Array.from({ length: Math.max(8, n) }, (_, i) => {
      const s = ids[i] && byId(ids[i]);
      return s
        ? `<li class="slot is-full${s.id === justAdded ? " is-new" : ""}" title="${s.name}">${pack(s)}</li>`
        : `<li class="slot" aria-hidden="true"></li>`;
    }).join("");

    fillEl.style.setProperty("--n", Math.min(n, 10));
    const tier = shop.tierFor(n);
    const next = shop.tiers.find((t) => n < t.min);
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
    groupsEl.querySelectorAll("[data-pick]").forEach((b) => {
      b.setAttribute("aria-pressed", picked.has(b.dataset.pick));
    });
  }

  groupsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-pick]");
    if (!b) return;
    const id = b.dataset.pick;
    if (picked.has(id)) picked.delete(id);
    else picked.add(id);
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
