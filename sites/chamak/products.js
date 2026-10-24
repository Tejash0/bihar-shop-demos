// Chamak catalogue and shop settings. Edit prices, products, Amazon links or the WhatsApp number here.
// Loaded before app.js and before the cart starts, so saved custom kits can join the catalogue.
// `conc` is the concentrate strength: 50 means 1 part concentrate makes 50 parts of ready cleaner.
// `ml` is the bottle size; `makes` (litres) is worked out from both. Leave `conc` out for ready-to-use items.
window.SHOP = {
  id: "chamak",
  name: "Chamak",
  whatsapp: "919999999999", // demo number: replace with the real WhatsApp Business number
  delivery: { fee: 25, freeAbove: 249 },
  pincodes: null, // null = accept any 6-digit pincode
  areaNote:
    "Next-day delivery anywhere in Patna if you order by 8 p.m. Outside Patna, buy on Amazon.",
  eta: "in 1 day",
  orderPrefix: "CH",
  addLabel: "Add",
  emptyHint: "Start with a ready kit, or build your own and get up to 20% off.",

  categories: [
    { id: "home", label: "Home Cleaning" },
    { id: "car", label: "Auto Car Care" },
  ],

  // Singles: everything sold on its own. `short` is used in kit size lines.
  singles: [
    // ---------- Home Cleaning (the owner's list) ----------
    {
      id: "h-glass",
      cat: "home",
      short: "Glass",
      name: "Glass & Mirror Cleaner",
      conc: 50,
      ml: 100,
      price: 129,
      mrp: 179,
      line: "Streak-free windows, mirrors and almirah glass. Mix into any spray bottle.",
      art: {
        shape: "spray",
        body: "#8FD3FF",
        accent: "#2A0E3D",
        ink: "#8FD3FF",
        lid: "#2A0E3D",
        label: "GLASS",
        sub: "50X concentrate",
      },
    },
    {
      id: "h-floor",
      cat: "home",
      short: "Floor",
      name: "Perfumed Floor Cleaner, Jasmine",
      conc: 50,
      ml: 200,
      price: 149,
      mrp: 199,
      tag: "Bestseller",
      line: "Jasmine that stays after the pocha dries. Half a cap per bucket.",
      art: {
        shape: "bottle",
        body: "#FF9EC4",
        accent: "#2A0E3D",
        ink: "#FF9EC4",
        lid: "#2A0E3D",
        label: "FLOOR",
        sub: "jasmine 50X",
      },
    },
    {
      id: "h-heavy",
      cat: "home",
      short: "Heavy-duty floor",
      name: "Heavy-Duty Floor Cleaner",
      conc: 50,
      ml: 500,
      price: 249,
      mrp: 329,
      tag: "For shops",
      line: "Commercial strength for shops, offices and coaching halls with heavy footfall.",
      art: {
        shape: "can",
        body: "#2A0E3D",
        accent: "#FFD84A",
        ink: "#2A0E3D",
        label: "HEAVY",
        sub: "floor 50X",
      },
    },
    {
      id: "h-bath",
      cat: "home",
      short: "Bathroom",
      name: "Heavy-Duty Bathroom Cleaner",
      conc: 20,
      ml: 250,
      price: 149,
      mrp: 189,
      line: "Cuts hard-water marks and soap scum on tiles, taps and buckets.",
      art: {
        shape: "bottle",
        body: "#7FF2C3",
        accent: "#2A0E3D",
        ink: "#7FF2C3",
        lid: "#2A0E3D",
        label: "BATH",
        sub: "20X concentrate",
      },
    },
    {
      id: "h-dish",
      cat: "home",
      short: "Dishwash",
      name: "Dishwash Gel Concentrate",
      conc: 5,
      ml: 250,
      price: 99,
      mrp: 129,
      line: "Lifts oil from kadhai and tiffin. Dilute into your old dishwash bottle.",
      art: {
        shape: "pouch",
        body: "#FFD84A",
        accent: "#2A0E3D",
        ink: "#FFD84A",
        label: "DISH",
        sub: "5X gel",
      },
    },
    {
      id: "h-toilet",
      cat: "home",
      short: "Toilet",
      name: "Ultra Shine Toilet Bowl Cleaner",
      conc: 3,
      ml: 250,
      price: 89,
      mrp: 110,
      line: "Thick gel that clings under the rim and leaves the bowl shining white.",
      art: {
        shape: "bottle",
        body: "#2A0E3D",
        accent: "#7FF2C3",
        ink: "#2A0E3D",
        lid: "#7FF2C3",
        label: "TOILET",
        sub: "3X ultra shine",
      },
    },
    {
      id: "h-hand",
      cat: "home",
      short: "Handwash",
      name: "Foaming Handwash",
      conc: 5,
      ml: 100,
      price: 79,
      mrp: 99,
      line: "Fill a foam pump with water and a little of this. Soft on hands, neem fresh.",
      art: {
        shape: "dropper",
        body: "#7FF2C3",
        accent: "#2A0E3D",
        ink: "#7FF2C3",
        lid: "#2A0E3D",
        label: "HAND",
        sub: "5X foam",
      },
    },
    {
      id: "h-fresh",
      cat: "home",
      short: "Freshener",
      name: "Room Freshener & Odour Remover",
      conc: 2,
      ml: 100,
      price: 99,
      mrp: 129,
      line: "Two sprays clear cooking and damp smells. Mogra and sandal notes.",
      art: {
        shape: "spray",
        body: "#FFB547",
        accent: "#2A0E3D",
        ink: "#FFB547",
        lid: "#2A0E3D",
        label: "FRESH",
        sub: "2X room spray",
      },
    },

    // ---------- Auto Car Care (placeholder list until the owner sends his) ----------
    {
      id: "c-shampoo",
      cat: "car",
      short: "Car shampoo",
      name: "Car Wash Shampoo, Wash & Wax",
      conc: 100,
      ml: 200,
      price: 199,
      mrp: 249,
      tag: "Bestseller",
      line: "One capful in a bucket washes a whole car and leaves a wax shine.",
      art: {
        shape: "can",
        body: "#FF6B1A",
        accent: "#2A0E3D",
        ink: "#FF6B1A",
        label: "WASH",
        sub: "wash & wax 100X",
      },
    },
    {
      id: "c-waterless",
      cat: "car",
      short: "Waterless wash",
      name: "Waterless Car & Bike Wash",
      conc: 10,
      ml: 100,
      price: 149,
      mrp: 199,
      line: "Spray, wipe, done. For flats and hostels with no space for a bucket.",
      art: {
        shape: "spray",
        body: "#2A0E3D",
        accent: "#7FF2C3",
        ink: "#2A0E3D",
        lid: "#7FF2C3",
        label: "NO WATER",
        sub: "10X wash",
      },
    },
    {
      id: "c-shine",
      cat: "car",
      short: "Dash shine",
      name: "Dashboard & Tyre Shine",
      ml: 200,
      price: 179,
      mrp: 229,
      line: "Ready to use. Matte-black dash and glossy tyres in one bottle.",
      art: {
        shape: "jar",
        body: "#2A0E3D",
        accent: "#FF6B1A",
        ink: "#2A0E3D",
        lid: "#FF6B1A",
        label: "SHINE",
        sub: "dash & tyre",
      },
    },
    {
      id: "c-washer",
      cat: "car",
      short: "Windshield",
      name: "Windshield Washer",
      conc: 100,
      ml: 50,
      price: 79,
      mrp: 99,
      line: "A few drops in the washer tank. Clears dust and bird mess without smears.",
      art: {
        shape: "dropper",
        body: "#8FD3FF",
        accent: "#2A0E3D",
        ink: "#8FD3FF",
        lid: "#2A0E3D",
        label: "WIPER",
        sub: "100X",
      },
    },
    {
      id: "c-alloy",
      cat: "car",
      short: "Alloy",
      name: "Alloy & Rim Cleaner",
      conc: 10,
      ml: 100,
      price: 169,
      mrp: 219,
      line: "Loosens brake dust and road grime from alloys and steel rims.",
      art: {
        shape: "bottle",
        body: "#C9D3E0",
        accent: "#2A0E3D",
        ink: "#C9D3E0",
        lid: "#2A0E3D",
        label: "ALLOY",
        sub: "10X rim",
      },
    },
    {
      id: "c-seat",
      cat: "car",
      short: "Seat",
      name: "Seat & Fabric Cleaner",
      conc: 20,
      ml: 100,
      price: 149,
      mrp: 189,
      line: "Lifts chai and mud stains from car seats, roof lining and sofa covers.",
      art: {
        shape: "spray",
        body: "#7FF2C3",
        accent: "#2A0E3D",
        ink: "#7FF2C3",
        lid: "#2A0E3D",
        label: "SEAT",
        sub: "20X fabric",
      },
    },
    {
      id: "c-cloth",
      cat: "car",
      short: "Cloths",
      name: "Microfibre Cloth",
      pack: "2-pack",
      price: 99,
      mrp: 149,
      line: "Thick, soft and lint-free. Machine washable, so you reuse them for months.",
      art: {
        shape: "sachet",
        body: "#FFD84A",
        accent: "#2A0E3D",
        ink: "#FFD84A",
        label: "CLOTH",
        sub: "2-pack",
      },
    },
  ],

  // Ready kits: price is below the singles added up (the kit's mrp is that sum).
  kits: [
    {
      id: "kit-chhath",
      name: "Chhath & Diwali Deep-Clean Kit",
      items: ["h-glass", "h-floor", "h-bath", "h-dish", "h-toilet", "h-fresh"],
      price: 599,
      line: "Ghat se pehle, diya se pehle. Every room of the ghar, from one box.",
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
      id: "kit-home",
      name: "Home Starter Kit",
      items: ["h-glass", "h-floor", "h-bath", "h-toilet"],
      price: 449,
      tag: "Start here",
      tint: "#FF6B1A",
      line: "The four bottles every ghar runs out of first.",
      art: {
        shape: "box",
        body: "#FF9EC4",
        accent: "#2A0E3D",
        ink: "#FF9EC4",
        label: "HOME",
        sub: "starter kit",
      },
    },
    {
      id: "kit-car",
      name: "Car Care Kit",
      items: ["c-shampoo", "c-shine", "c-washer", "c-cloth"],
      price: 479,
      tag: "Sunday special",
      line: "A full Sunday wash, inside and out.",
      art: {
        shape: "box",
        body: "#8FD3FF",
        accent: "#2A0E3D",
        ink: "#8FD3FF",
        label: "CAR CARE",
        sub: "4 items",
      },
    },
    {
      id: "kit-bike",
      name: "Bike Kit",
      items: ["c-waterless", "c-shine", "c-cloth"],
      price: 369,
      tag: "Hostel pick",
      line: "Ten minutes, no bucket, a bike that looks new.",
      art: {
        shape: "box",
        body: "#7FF2C3",
        accent: "#2A0E3D",
        ink: "#7FF2C3",
        label: "BIKE",
        sub: "3 items",
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
  const amazon = (name) =>
    "https://www.amazon.in/s?k=" + encodeURIComponent("Chamak " + name);

  // 0.75 -> "750 ml", 1.25 -> "1.25 L", 20.75 -> "20 L" (rounded down, never oversold).
  shop.volume = (litres) =>
    litres < 1
      ? `${Math.round(litres * 1000)} ml`
      : litres >= 10
        ? `${Math.floor(litres)} L`
        : `${+litres.toFixed(2)} L`;

  // What a single makes once mixed, and what each litre of that costs.
  shop.singles.forEach((s) => {
    s.amazon ||= amazon(s.name);
    if (s.conc) {
      s.makes = (s.ml * s.conc) / 1000;
      s.perLitre = Math.round(s.price / s.makes);
      s.size = `${s.ml} ml · ${s.conc}X concentrate`;
      // Small yields read better per 100 ml than as a large per-litre number.
      s.yield =
        s.makes < 1
          ? `Makes ${shop.volume(s.makes)} · ₹${Math.round(s.price / (s.makes * 10))} per 100 ml`
          : `Makes ${shop.volume(s.makes)} · ₹${s.perLitre} per litre`;
    } else {
      s.size = s.pack || `${s.ml} ml · ready to use`;
      s.yield = s.pack ? "Washable and reusable" : "Ready to use, no mixing";
    }
  });

  shop.kits.forEach((k) => {
    const items = k.items.map((id) => singleById.get(id));
    const litres = items.reduce((sum, i) => sum + (i.makes || 0), 0);
    k.contents = items.map((i) => i.name);
    k.mrp = items.reduce((sum, i) => sum + i.price, 0);
    k.makes = litres;
    k.size = `${items.length} items · makes ${shop.volume(litres)}`;
    k.amazon ||= amazon(k.name);
  });

  shop.tierFor = (n) =>
    shop.tiers.reduce((best, t) => (n >= t.min ? t : best), { min: 0, off: 0 });

  // Turns a list of single ids into a cart product. Repeated ids are dropped.
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

  const write = (kits) => {
    try {
      localStorage.setItem(shop.kitKey, JSON.stringify(kits));
    } catch {
      /* private mode: kits live for this page only */
    }
  };

  // Saved kits from older catalogues may name products that no longer exist: drop those kits whole.
  shop.loadKits = () => {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(shop.kitKey));
    } catch {
      saved = null;
    }
    if (!Array.isArray(saved)) return [];
    const valid = saved.filter(
      (k) =>
        Array.isArray(k) &&
        k.length >= shop.kitMin &&
        k.every((id) => singleById.has(id)),
    );
    if (valid.length !== saved.length) write(valid);
    return valid;
  };

  // Keeps the 12 most recent kits; older ones would only matter for very old carts.
  shop.saveKit = (ids) => {
    const kit = shop.makeKit(ids);
    if (!kit) return null;
    const rest = shop.loadKits().filter((k) => shop.makeKit(k)?.id !== kit.id);
    write([...rest, kit.ids].slice(-12));
    shop.addProduct(kit);
    return kit;
  };

  shop.addProduct = (p) => {
    if (!shop.products.some((x) => x.id === p.id)) shop.products.push(p);
  };

  // The cart only knows one list, so every sellable thing joins it,
  // including custom kits saved on earlier visits (otherwise the cart drops them on reload).
  shop.products = [...shop.kits, ...shop.singles];
  shop.loadKits().forEach((ids) => {
    const kit = shop.makeKit(ids);
    if (kit) shop.addProduct(kit);
  });
})(window.SHOP);
