// Jadi Lab page: shop-by-need filter, product grid, 7-day strips and the "Read the label" accordion.
(function () {
  "use strict";
  const shop = window.SHOP;
  const cart = window.Shop.init(shop);
  const { rupees } = window.Shop;
  const byId = (id) => shop.products.find((p) => p.id === id);
  const trialIds = new Set(shop.trials.map((t) => t.id));
  const catalogue = shop.products.filter((p) => !trialIds.has(p.id));
  const herbName = Object.fromEntries(shop.herbs.map((h) => [h.id, h.name]));

  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );

  const svg = {
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    cup: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V9Z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3c0 1.5 1.5 1.5 1.5 3M12 3c0 1.5 1.5 1.5 1.5 3"/></svg>',
    flask:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/></svg>',
    tick: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };

  // Hero packshots.
  document.querySelectorAll("[data-pack]").forEach((el) => {
    const p = byId(el.dataset.pack);
    el.innerHTML = window.Packs.pack(p.art, p.name);
  });

  // Review stars.
  document
    .querySelectorAll(".stars")
    .forEach((el) => (el.innerHTML = svg.star.repeat(5)));

  // ---------- shop by need ----------
  const off = (p) => (p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0);

  function card(p) {
    const label = herbName[p.herb];
    return `<li class="card">
      <div class="card-art">
        ${p.tag ? `<span class="card-tag">${esc(p.tag)}</span>` : ""}
        ${window.Packs.pack(p.art, p.name)}
      </div>
      <div class="card-body">
        <p class="card-rating">${svg.star}<b>${p.rating}</b><span>(${p.reviews.toLocaleString("en-IN")})</span></p>
        <h3>${esc(p.name)}</h3>
        <p class="card-dose">${esc(p.dose)}</p>
        <p class="card-line">${esc(p.line)}</p>
        <p class="card-size">${esc(p.size)}</p>
        <div class="card-buy">
          <p class="price"><b>${rupees(p.price)}</b>${p.mrp ? `<s>${rupees(p.mrp)}</s><span>${off(p)}% off</span>` : ""}</p>
          <div data-buy="${p.id}"></div>
        </div>
        ${label ? `<button class="card-label" type="button" data-herb="${p.herb}">Read the <span class="lbl-herb">${esc(label.toLowerCase())}</span> label${svg.arrow}</button>` : ""}
      </div>
    </li>`;
  }

  const grid = document.querySelector(".grid");
  const needsEl = document.querySelector(".needs");
  let need = "all";

  needsEl.innerHTML = shop.needs
    .map((n) => {
      const count =
        n.id === "all"
          ? catalogue.length
          : catalogue.filter((p) => p.needs.includes(n.id)).length;
      return `<button type="button" aria-pressed="${n.id === need}" data-need="${n.id}">${esc(n.label)}<span>${count}</span></button>`;
    })
    .join("");

  function renderGrid() {
    const list = catalogue.filter(
      (p) => need === "all" || p.needs.includes(need),
    );
    grid.innerHTML = list.map(card).join("");
    cart.repaint();
  }

  needsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-need]");
    if (!b || b.dataset.need === need) return;
    need = b.dataset.need;
    needsEl
      .querySelectorAll("[data-need]")
      .forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderGrid();
  });

  document.querySelector(".strips-row").innerHTML = shop.trials
    .map(
      (t) => `<li class="strip">
        <div class="strip-art">${window.Packs.pack(t.art, t.name)}</div>
        <div class="strip-info">
          <h4>${esc(t.name)}</h4>
          <p>${esc(t.size)} · <b>${rupees(t.price)}</b></p>
          <div data-buy="${t.id}" data-buy-class="is-small"></div>
        </div>
      </li>`,
    )
    .join("");

  renderGrid();

  // ---------- read the label ----------
  const herbsEl = document.querySelector(".herbs");

  function herb(h, open) {
    const rows = h.report
      .map(
        (r) =>
          `<tr><th scope="row">${esc(r.test)}</th><td>${esc(r.result)}</td><td><span class="pass">${svg.tick}Pass</span></td></tr>`,
      )
      .join("");
    return `<li class="herb${open ? " is-open" : ""}" id="herb-${h.id}">
      <h3>
        <button class="herb-btn" type="button" aria-expanded="${open}" aria-controls="herb-panel-${h.id}" id="herb-btn-${h.id}">
          <span class="herb-ill"><svg aria-hidden="true"><use href="#${h.art}"/></svg></span>
          <span class="herb-title"><span class="herb-name">${esc(h.name)}</span><span class="herb-latin">${esc(h.latin)}</span></span>
          <span class="herb-hook">${esc(h.hook)}</span>
          <span class="herb-toggle">${svg.plus}</span>
        </button>
      </h3>
      <div class="herb-panel" id="herb-panel-${h.id}" role="region" aria-labelledby="herb-btn-${h.id}"${open ? "" : " hidden"}>
        <div class="herb-facts">
          <div class="fact">${svg.pin}<div><h4>Where it’s from</h4><p>${esc(h.source)}</p></div></div>
          <div class="fact">${svg.cup}<div><h4>How Nani used it</h4><p>${esc(h.nani)}</p></div></div>
          <div class="fact">${svg.flask}<div><h4>What research says</h4><p>${esc(h.research)}</p></div></div>
        </div>
        <div class="report">
          <div class="report-head">
            <h4>Lab report</h4>
            <p>Batch ${esc(h.batch)}</p>
            <p class="report-demo">Sample report for demo</p>
          </div>
          <table>
            <caption class="sr-only">Sample lab results for ${esc(h.name)}</caption>
            <thead><tr><th scope="col">Test</th><th scope="col">Result</th><th scope="col">Status</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </li>`;
  }

  herbsEl.innerHTML = shop.herbs.map((h, i) => herb(h, i === 0)).join("");

  // One label open at a time keeps the page short.
  function openHerb(id, toggle) {
    herbsEl.querySelectorAll(".herb").forEach((li) => {
      const btn = li.querySelector(".herb-btn");
      const panel = li.querySelector(".herb-panel");
      const isTarget = li.id === `herb-${id}`;
      const open = isTarget
        ? toggle
          ? btn.getAttribute("aria-expanded") !== "true"
          : true
        : false;
      btn.setAttribute("aria-expanded", open);
      panel.hidden = !open;
      li.classList.toggle("is-open", open);
    });
  }

  herbsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".herb-btn");
    if (btn) openHerb(btn.closest(".herb").id.slice(5), true);
  });

  // "Read the label" links on product cards jump to that herb, opened.
  grid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-herb]");
    if (!b) return;
    openHerb(b.dataset.herb, false);
    const target = document.getElementById(`herb-${b.dataset.herb}`);
    target.scrollIntoView({ block: "start" });
    target.querySelector(".herb-btn").focus({ preventScroll: true });
  });
})();
