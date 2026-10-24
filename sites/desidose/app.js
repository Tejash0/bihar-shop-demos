// DesiDose page: mood filter, product grid, trial row and hero packs.
(function () {
  "use strict";
  const shop = window.SHOP;
  const cart = window.Shop.init(shop);
  const { rupees } = window.Shop;
  const byId = (id) => shop.products.find((p) => p.id === id);
  const trialIds = new Set(shop.trials.map((t) => t.id));
  const catalogue = shop.products.filter((p) => !trialIds.has(p.id));

  document.querySelectorAll("[data-pack]").forEach((el) => {
    const p = byId(el.dataset.pack);
    el.innerHTML = window.Packs.pack(p.art, p.name);
  });

  const off = (p) => (p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0);
  const star =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>';

  function card(p) {
    return `<li class="card" style="--tint:${p.art.body}">
      <div class="card-art">${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}${window.Packs.pack(p.art, p.name)}</div>
      <div class="card-body">
        <p class="card-rating">${star}<b>${p.rating}</b><span>(${p.reviews.toLocaleString("en-IN")})</span></p>
        <h3>${p.name}</h3>
        <p class="card-herb">${p.herb}</p>
        <p class="card-line">${p.line}</p>
        <p class="card-size">${p.size}</p>
        <div class="card-buy">
          <p class="price"><b>${rupees(p.price)}</b>${p.mrp ? `<s>${rupees(p.mrp)}</s><span>${off(p)}% off</span>` : ""}</p>
          <div data-buy="${p.id}"></div>
        </div>
      </div>
    </li>`;
  }

  const grid = document.querySelector(".grid");
  const moodsEl = document.querySelector(".moods");
  let mood = "all";

  moodsEl.innerHTML = shop.moods
    .map(
      (m) =>
        `<button type="button" role="tab" aria-selected="${m.id === mood}" data-mood="${m.id}">${m.label}</button>`,
    )
    .join("");

  function renderGrid() {
    const list = catalogue.filter((p) => mood === "all" || p.mood === mood);
    grid.innerHTML = list.map(card).join("");
    cart.repaint();
  }

  moodsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-mood]");
    if (!b || b.dataset.mood === mood) return;
    mood = b.dataset.mood;
    moodsEl
      .querySelectorAll("[data-mood]")
      .forEach((x) => x.setAttribute("aria-selected", x === b));
    // Cross-fade the grid where the browser supports view transitions.
    if (
      document.startViewTransition &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      document.startViewTransition(renderGrid);
    else renderGrid();
  });

  document.querySelector(".trial-row").innerHTML = shop.trials
    .map(
      (t) => `<li class="trial-card">
        <div class="trial-art">${window.Packs.pack(t.art, t.name)}</div>
        <h3>${t.name}</h3>
        <p>${t.size} · <b>${rupees(t.price)}</b></p>
        <div data-buy="${t.id}" data-buy-class="is-small"></div>
      </li>`,
    )
    .join("");

  renderGrid();
})();
