// SaafKart page: pincode checker, search, category rail, product grid, ₹10 aisle and monthly kit.
(function () {
  "use strict";
  const shop = window.SHOP;
  const cart = window.Shop.init(shop);
  const { rupees } = window.Shop;
  const byId = (id) => shop.products.find((p) => p.id === id);
  const $ = (s) => document.querySelector(s);
  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const waLink = (text) =>
    `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;

  // One stroke style for every icon: 24px grid, drawn with currentColor (see .ico in style.css).
  const svg = (d) =>
    `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const icons = {
    all: svg(
      '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
    ),
    floor: svg(
      '<path d="M16.5 3 12 13"/><path d="M7 13h10l2 7H5z"/><path d="M9 16.5V20M12 16.5V20M15 16.5V20"/>',
    ),
    kitchen: svg(
      '<path d="M3 12h18a9 9 0 0 1-18 0Z"/><circle cx="9" cy="6.5" r="1.6"/><circle cx="13.5" cy="4" r="1"/><circle cx="15" cy="8" r="1.4"/>',
    ),
    bathroom: svg(
      '<path d="M3 12h18v1.5a5.5 5.5 0 0 1-5.5 5.5h-7A5.5 5.5 0 0 1 3 13.5z"/><path d="M6 12V6.5a2.5 2.5 0 0 1 5 0"/><path d="m7 19-1 2M17 19l1 2"/>',
    ),
    laundry: svg(
      '<rect x="4" y="3" width="16" height="18" rx="2.5"/><circle cx="12" cy="13" r="4.5"/><path d="M7.5 6.5h2M14.5 6.5h2"/>',
    ),
    car: svg(
      '<path d="M3 17v-4l2.5-5.5h13L21 13v4z"/><path d="M3 13h18"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/>',
    ),
    tools: svg(
      '<rect x="3" y="9" width="18" height="10" rx="3"/><path d="M3 13.5h18"/><path d="M8 4.5 9 6M12 3.5v2M16 4.5 15 6"/>',
    ),
    clock: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7"/>'),
    pinOff: svg(
      '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><path d="m9.5 7.5 5 5M14.5 7.5l-5 5"/>',
    ),
    chat: svg(
      '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20Z"/><path d="M9 10h.01M12 10h.01M15 10h.01"/>',
    ),
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
  };

  // ---------- packshots ----------
  document.querySelectorAll("[data-pack]").forEach((el) => {
    const p = byId(el.dataset.pack);
    if (p) el.innerHTML = window.Packs.pack(p.art, p.name);
  });

  // Keep scroll targets clear of the sticky header.
  const header = $(".top");
  const setHeadH = () =>
    document.documentElement.style.setProperty(
      "--head-h",
      `${header.offsetHeight}px`,
    );
  setHeadH();
  addEventListener("resize", setHeadH);

  // ---------- pincode checker ----------
  const PIN_KEY = "saafkart:pin";
  const pinForm = $(".pin");
  const pinInput = $("#pin-input");
  const pinResult = $("#pin-result");
  const chip = $("[data-pin-chip]");

  const savePin = (pin) => {
    try {
      localStorage.setItem(PIN_KEY, pin);
    } catch {
      /* private mode: remember for this visit only */
    }
  };
  const loadPin = () => {
    try {
      return localStorage.getItem(PIN_KEY);
    } catch {
      return null;
    }
  };
  const showChip = (pin) => {
    chip.querySelector("[data-pin-value]").textContent = pin;
    chip.hidden = false;
    setHeadH();
  };

  function checkPin(pin) {
    if (!/^\d{6}$/.test(pin)) {
      pinResult.className = "pin-result is-err";
      pinResult.textContent = "Enter a 6-digit pincode, like 800001.";
      return;
    }
    if (shop.pincodes.includes(pin)) {
      pinResult.className = "pin-result is-ok";
      pinResult.innerHTML = `${icons.check}<span>Delivering to <b>${pin}</b> in 2 hours today</span>`;
      savePin(pin);
      showChip(pin);
    } else {
      pinResult.className = "pin-result is-no";
      pinResult.innerHTML = `${icons.pinOff}<span>Not in <b>${pin}</b> yet.</span>
        <a href="${waLink(`Hi SaafKart! Please tell me when you start delivering to ${pin}.`)}" target="_blank" rel="noopener">${icons.chat}Tell me when you launch here</a>`;
    }
  }

  pinInput.addEventListener("input", () => {
    const digits = pinInput.value.replace(/\D/g, "").slice(0, 6);
    if (digits !== pinInput.value) pinInput.value = digits;
    if (digits.length === 6) checkPin(digits);
    else {
      pinResult.className = "pin-result";
      pinResult.textContent = "";
    }
  });
  pinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkPin(pinInput.value.trim());
  });

  const saved = loadPin();
  if (saved && shop.pincodes.includes(saved)) {
    pinInput.value = saved;
    checkPin(saved);
  }

  // ---------- category rail + grid + search ----------
  const catLabel = Object.fromEntries(
    shop.categories.map((c) => [c.id, c.label]),
  );
  const rail = $(".rail");
  const grid = $(".grid");
  const empty = $(".empty");
  const title = $("#shop-title");
  const count = $(".shop-count");
  const search = $("#q");
  let cat = "all";
  let query = "";

  rail.innerHTML = shop.categories
    .map(
      (c) =>
        `<button type="button" class="chip" data-cat="${c.id}" aria-pressed="${c.id === cat}"><span class="chip-ico">${icons[c.id]}</span><span>${c.label}</span></button>`,
    )
    .join("");
  const paintRail = () =>
    rail
      .querySelectorAll("[data-cat]")
      .forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === cat));

  const off = (p) => (p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0);
  const norm = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const haystack = new Map(shop.products.map((p) => [p.id, norm(p.name)]));
  const matches = (p, q) =>
    norm(q)
      .split(" ")
      .every((w) =>
        haystack
          .get(p.id)
          .split(" ")
          .some((h) => h.startsWith(w)),
      );

  function card(p) {
    const o = off(p);
    return `<li class="card">
      <div class="card-art">${o ? `<span class="card-off">${o}% off</span>` : ""}${window.Packs.pack(p.art, p.name)}</div>
      <p class="card-eta">${icons.clock}2 hrs</p>
      <h3>${esc(p.name)}</h3>
      <p class="card-size">${esc(p.size)}</p>
      <div class="card-buy">
        <p class="price"><b>${rupees(p.price)}</b>${p.mrp ? `<s>${rupees(p.mrp)}</s>` : ""}</p>
        <div data-buy="${p.id}" data-buy-class="is-small"></div>
      </div>
    </li>`;
  }

  function renderGrid() {
    // Full-size packs first, then small packs; the kit only shows up when searched for.
    const list = shop.products
      .filter((p) => (query ? matches(p, query) : p.cat !== "kit"))
      .filter((p) => cat === "all" || p.cat === cat)
      .sort((a, b) => Number(!!a.small) - Number(!!b.small));
    grid.innerHTML = list.map(card).join("");
    empty.hidden = list.length > 0;
    if (!list.length) {
      empty.querySelector(".empty-title").textContent =
        `Nothing called “${query}” yet`;
      empty.querySelector("[data-empty-wa]").href = waLink(
        `Hi SaafKart! Do you have ${query}?`,
      );
    }
    title.textContent = query
      ? `Results for “${query}”`
      : cat === "all"
        ? "Shop by room"
        : catLabel[cat];
    count.textContent = `${list.length} ${list.length === 1 ? "item" : "items"}`;
    cart.repaint();
  }

  function swap() {
    if (document.startViewTransition && !reduced())
      document.startViewTransition(renderGrid);
    else renderGrid();
  }

  rail.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b || b.dataset.cat === cat) return;
    cat = b.dataset.cat;
    paintRail();
    swap();
  });

  const shopSection = $("#shop");
  const showResults = () => {
    const top = shopSection.getBoundingClientRect().top;
    if (top > innerHeight * 0.5 || top < -shopSection.offsetHeight + 200)
      shopSection.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
  };

  search.addEventListener("input", () => {
    const was = query;
    query = search.value.trim();
    // A new search looks across every room.
    if (query && !was && cat !== "all") {
      cat = "all";
      paintRail();
    }
    renderGrid();
    if (query && !was) showResults();
  });
  search.closest("form").addEventListener("submit", (e) => {
    e.preventDefault();
    showResults();
    search.blur();
  });
  $("[data-clear-search]").addEventListener("click", () => {
    search.value = "";
    query = "";
    renderGrid();
    search.focus();
  });

  // ---------- ₹10 aisle ----------
  $(".aisle-row").innerHTML = shop.products
    .filter((p) => p.small)
    .map(
      (p) => `<li class="aisle-card">
        <div class="aisle-art">${window.Packs.pack(p.art, p.name)}</div>
        <div class="aisle-info">
          <h3>${esc(p.name)}</h3>
          <p class="aisle-size">${esc(p.size)}</p>
          <div class="aisle-buy"><p class="aisle-price">${rupees(p.price)}</p><div data-buy="${p.id}" data-buy-class="is-small"></div></div>
        </div>
      </li>`,
    )
    .join("");

  // ---------- monthly kit ----------
  $(".kit-list").innerHTML = shop.kit
    .map((id) => byId(id))
    .map(
      (p) =>
        `<li>${icons.check}<span>${esc(p.name)}</span><small>${esc(p.size)}</small></li>`,
    )
    .join("");

  // ---------- reviews ----------
  document.querySelectorAll(".stars").forEach((el) => {
    const n = Number(el.dataset.stars || 5);
    el.innerHTML = Array.from(
      { length: 5 },
      (_, i) => `<span class="${i < n ? "on" : ""}">${icons.star}</span>`,
    ).join("");
  });

  // The same product can sit in the grid and the ₹10 aisle. cart.js focuses the first
  // stepper it finds after ADD, which could jump the page to the grid. Put focus back on
  // the stepper that was actually clicked, without moving the page.
  let pending = null;
  document.addEventListener(
    "click",
    (e) => {
      const add = e.target.closest("[data-add]");
      pending = add ? { host: add.closest("[data-buy]"), y: scrollY } : null;
      // Make any focus scroll instant, so it can be undone within the same frame.
      if (pending?.host) document.documentElement.style.scrollBehavior = "auto";
    },
    true,
  );
  // Window listeners run after cart.js's document listener, so this frame runs after its focus call.
  addEventListener("click", () => {
    if (!pending?.host) return;
    const { host, y } = pending;
    pending = null;
    requestAnimationFrame(() => {
      const inc = host.querySelector("[data-inc]");
      if (inc && document.activeElement !== inc) {
        inc.focus({ preventScroll: true });
        if (Math.abs(scrollY - y) > 1) scrollTo(0, y);
      }
      document.documentElement.style.scrollBehavior = "";
    });
  });

  renderGrid();
})();
