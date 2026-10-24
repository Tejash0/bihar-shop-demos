// Chamak catalogue and shop settings. Edit prices, products or the WhatsApp number here.
// Loaded before app.js and before the cart starts, so saved custom kits can join the catalogue.
window.SHOP = {
  id: "chamak",
  name: "Chamak",
  whatsapp: "919999999999", // demo number: replace with the real WhatsApp Business number
  delivery: { fee: 25, freeAbove: 249 },
  pincodes: null, // null = accept any 6-digit pincode
  areaNote:
    "Next-day delivery anywhere in Patna if you order by 8 p.m. Rest of Bihar in 3-4 days.",
  eta: "in 1 day",
  orderPrefix: "CH",
  addLabel: "Add",
  emptyHint: "Start with a ready kit, or build your own and get up to 20% off.",

  // Ready kits: one box per cleaning job. The first one is the hero.
  kits: [
    {
      id: "kit-chhath",
      name: "Chhath & Diwali Deep-Clean Kit",
      size: "7 items · whole-ghar clean",
      price: 399,
      mrp: 520,
      contents: [
        "Floor cleaner 1 L",
        "Pital & copper polish",
        "Tile & tap cleaner",
        "Glass spray",
        "Kitchen degreaser",
        "3 microfibre cloths",
        "Scrub pads",
      ],
      art: {
        shape: "box",
        body: "#2A0E3D",
        accent: "#7FF2C3",
        ink: "#2A0E3D",
        label: "DEEP CLEAN",
        sub: "chhath + diwali",
      },
    },
    {
      id: "kit-car",
      name: "Car Care Kit",
      size: "5 items · one Sunday wash",
      price: 349,
      mrp: 449,
      tag: "Sunday special",
      tint: "#FF6B1A",
      contents: [
        "Car shampoo 500 ml",
        "Dashboard shine",
        "Glass spray",
        "2 microfibre cloths",
        "Wash sponge",
      ],
      art: {
        shape: "box",
        body: "#2A0E3D",
        accent: "#FF6B1A",
        ink: "#2A0E3D",
        label: "CAR CARE",
        sub: "5 items",
      },
    },
    {
      id: "kit-kitchen",
      name: "Kitchen Degrease Kit",
      size: "4 items · oil and masala stains",
      price: 299,
      mrp: 389,
      tag: "Bestseller",
      contents: [
        "Kitchen degreaser spray",
        "Dishwash gel 500 ml",
        "Steel scrub",
        "2 microfibre cloths",
      ],
      art: {
        shape: "box",
        body: "#FFD84A",
        accent: "#2A0E3D",
        ink: "#FFD84A",
        label: "KITCHEN",
        sub: "degrease kit",
      },
    },
    {
      id: "kit-bath",
      name: "Bathroom Shine Kit",
      size: "4 items · tiles, taps, toilet",
      price: 279,
      mrp: 359,
      contents: [
        "Toilet cleaner 500 ml",
        "Tile & tap cleaner",
        "Scrub pads",
        "Handwash 250 ml",
      ],
      art: {
        shape: "box",
        body: "#8FD3FF",
        accent: "#2A0E3D",
        ink: "#8FD3FF",
        label: "BATHROOM",
        sub: "shine kit",
      },
    },
    {
      id: "kit-bike",
      name: "Bike Kit",
      size: "3 items · 10-minute wash",
      price: 199,
      mrp: 259,
      tag: "Under ₹200",
      contents: ["Bike wash 250 ml", "Chrome polish", "Microfibre cloth"],
      art: {
        shape: "box",
        body: "#7FF2C3",
        accent: "#2A0E3D",
        ink: "#7FF2C3",
        label: "BIKE",
        sub: "wash kit",
      },
    },
    {
      id: "kit-hostel",
      name: "Hostel Room Kit",
      size: "5 items · one room, one month",
      price: 249,
      mrp: 329,
      tag: "Student pick",
      contents: [
        "Floor cleaner 500 ml",
        "Handwash 250 ml",
        "Glass spray mini",
        "2 microfibre cloths",
        "Scrub pads",
      ],
      art: {
        shape: "box",
        body: "#FF9EC4",
        accent: "#2A0E3D",
        ink: "#FF9EC4",
        label: "HOSTEL",
        sub: "room kit",
      },
    },
  ],

  // Singles for "Build your own kit". `short` is used in the kit's size line.
  singles: [
    {
      id: "s-floor",
      short: "Floor",
      name: "Floor Cleaner, Lemon",
      size: "500 ml",
      price: 69,
      art: {
        shape: "bottle",
        body: "#FFD84A",
        accent: "#2A0E3D",
        ink: "#FFD84A",
        lid: "#2A0E3D",
        label: "FLOOR",
        sub: "lemon",
      },
    },
    {
      id: "s-dish",
      short: "Dish paste",
      name: "Dishwash Paste",
      size: "400 g tub",
      price: 49,
      art: {
        shape: "tub",
        body: "#7FF2C3",
        accent: "#2A0E3D",
        ink: "#7FF2C3",
        lid: "#2A0E3D",
        label: "DISH",
        sub: "paste",
      },
    },
    {
      id: "s-glass",
      short: "Glass",
      name: "Glass Cleaner Spray",
      size: "250 ml",
      price: 79,
      art: {
        shape: "spray",
        body: "#8FD3FF",
        accent: "#2A0E3D",
        ink: "#8FD3FF",
        lid: "#2A0E3D",
        label: "GLASS",
        sub: "streak-free",
      },
    },
    {
      id: "s-degrease",
      short: "Degreaser",
      name: "Kitchen Degreaser",
      size: "250 ml spray",
      price: 89,
      art: {
        shape: "spray",
        body: "#FF6B1A",
        accent: "#2A0E3D",
        ink: "#FF6B1A",
        lid: "#2A0E3D",
        label: "GREASE",
        sub: "kitchen",
      },
    },
    {
      id: "s-toilet",
      short: "Toilet",
      name: "Toilet Cleaner",
      size: "500 ml",
      price: 75,
      art: {
        shape: "bottle",
        body: "#2A0E3D",
        accent: "#7FF2C3",
        ink: "#2A0E3D",
        lid: "#7FF2C3",
        label: "TOILET",
        sub: "thick gel",
      },
    },
    {
      id: "s-tile",
      short: "Tile",
      name: "Tile & Tap Cleaner",
      size: "500 ml",
      price: 79,
      art: {
        shape: "bottle",
        body: "#FF9EC4",
        accent: "#2A0E3D",
        ink: "#FF9EC4",
        lid: "#2A0E3D",
        label: "TILE",
        sub: "& tap",
      },
    },
    {
      id: "s-hand",
      short: "Handwash",
      name: "Handwash, Neem",
      size: "250 ml",
      price: 55,
      art: {
        shape: "dropper",
        body: "#7FF2C3",
        accent: "#2A0E3D",
        ink: "#7FF2C3",
        lid: "#2A0E3D",
        label: "HAND",
        sub: "neem",
      },
    },
    {
      id: "s-pital",
      short: "Pital polish",
      name: "Pital & Copper Polish",
      size: "100 g",
      price: 79,
      art: {
        shape: "jar",
        body: "#FFB547",
        accent: "#2A0E3D",
        ink: "#FFB547",
        lid: "#2A0E3D",
        label: "PITAL",
        sub: "polish",
      },
    },
    {
      id: "s-cloth",
      short: "Cloths",
      name: "Microfibre Cloths",
      size: "Pack of 2",
      price: 59,
      art: {
        shape: "sachet",
        body: "#2A0E3D",
        accent: "#FF6B1A",
        ink: "#2A0E3D",
        label: "CLOTH",
        sub: "2 pack",
      },
    },
    {
      id: "s-scrub",
      short: "Scrubs",
      name: "Scrub Pads",
      size: "Pack of 3",
      price: 29,
      art: {
        shape: "sachet",
        body: "#FFD84A",
        accent: "#2A0E3D",
        ink: "#FFD84A",
        label: "SCRUB",
        sub: "3 pack",
      },
    },
  ],

  // Refill pouches: same liquid, a third cheaper than buying a new bottle.
  refills: [
    {
      id: "r-floor",
      name: "Floor Cleaner Refill",
      size: "1 L pouch",
      price: 79,
      mrp: 113,
      art: {
        shape: "pouch",
        body: "#FFD84A",
        accent: "#2A0E3D",
        ink: "#FFD84A",
        label: "FLOOR",
        sub: "1 L refill",
      },
    },
    {
      id: "r-dish",
      name: "Dishwash Gel Refill",
      size: "1 L pouch",
      price: 69,
      mrp: 99,
      art: {
        shape: "pouch",
        body: "#FF6B1A",
        accent: "#2A0E3D",
        ink: "#FF6B1A",
        label: "DISH",
        sub: "1 L refill",
      },
    },
    {
      id: "r-hand",
      name: "Handwash Refill",
      size: "750 ml pouch",
      price: 49,
      mrp: 70,
      art: {
        shape: "pouch",
        body: "#2A0E3D",
        accent: "#7FF2C3",
        ink: "#2A0E3D",
        label: "HAND",
        sub: "750 ml refill",
      },
    },
    {
      id: "r-glass",
      name: "Glass Cleaner Refill",
      size: "500 ml pouch",
      price: 59,
      mrp: 85,
      art: {
        shape: "pouch",
        body: "#8FD3FF",
        accent: "#2A0E3D",
        ink: "#8FD3FF",
        label: "GLASS",
        sub: "500 ml refill",
      },
    },
  ],

  // Build-your-own tiers: more items, bigger discount.
  tiers: [
    { min: 4, off: 0.1 },
    { min: 6, off: 0.15 },
    { min: 8, off: 0.2 },
  ],
  kitMin: 3, // smallest kit the builder will add to the bag
  kitKey: "chamak-kits", // localStorage key for saved custom kits
};

(function (shop) {
  "use strict";
  const singleById = new Map(shop.singles.map((s) => [s.id, s]));

  shop.tierFor = (n) =>
    shop.tiers.reduce((best, t) => (n >= t.min ? t : best), { min: 0, off: 0 });

  // Turns a list of single ids into a cart product. Unknown and repeated ids are dropped.
  shop.makeKit = (ids) => {
    const list = [...new Set(ids)].filter((id) => singleById.has(id)).sort();
    if (list.length < shop.kitMin) return null;
    const items = list.map((id) => singleById.get(id));
    const full = items.reduce((s, i) => s + i.price, 0);
    const { off } = shop.tierFor(items.length);
    return {
      id: `kit-${list.join("-")}`,
      ids: list,
      custom: true,
      name: `My kit (${items.length} items)`,
      size: items.map((i) => i.short).join(", "),
      price: Math.round(full * (1 - off)),
      mrp: full,
      art: {
        shape: "box",
        body: "#7FF2C3",
        accent: "#2A0E3D",
        ink: "#7FF2C3",
        label: "MY KIT",
        sub: `${items.length} items`,
      },
    };
  };

  shop.loadKits = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(shop.kitKey));
      return Array.isArray(saved) ? saved.filter(Array.isArray) : [];
    } catch {
      return [];
    }
  };

  // Keeps the 12 most recent kits; older ones would only matter for very old carts.
  shop.saveKit = (ids) => {
    const kit = shop.makeKit(ids);
    if (!kit) return null;
    const rest = shop.loadKits().filter((k) => shop.makeKit(k)?.id !== kit.id);
    try {
      localStorage.setItem(
        shop.kitKey,
        JSON.stringify([...rest, kit.ids].slice(-12)),
      );
    } catch {
      /* private mode: the kit lives for this page only */
    }
    shop.addProduct(kit);
    return kit;
  };

  shop.addProduct = (p) => {
    if (!shop.products.some((x) => x.id === p.id)) shop.products.push(p);
  };

  // The cart only knows one list, so every sellable thing joins it,
  // including custom kits saved on earlier visits (otherwise the cart drops them on reload).
  shop.products = [...shop.kits, ...shop.singles, ...shop.refills];
  shop.loadKits().forEach((ids) => {
    const kit = shop.makeKit(ids);
    if (kit) shop.addProduct(kit);
  });
})(window.SHOP);
