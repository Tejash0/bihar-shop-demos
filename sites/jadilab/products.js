// Jadi Lab catalogue, herb labels and shop settings. Edit prices, products or the WhatsApp number here.
(function () {
  "use strict";

  // Pack colours: amber glass, Indian indigo (neel) and marigold.
  const AMBER = "#8A4B14";
  const NEEL = "#1C2B6B";
  const MARIGOLD = "#F4A42C";
  const WHITE = "#FFFFFF";

  // Every herb label shares the same safety tests; only the active marker changes.
  const safety = (metals, microbes) => [
    { test: "Heavy metals", result: metals },
    { test: "Microbes", result: microbes },
    { test: "Pesticide residue", result: "Not detected, 200-residue panel" },
  ];

  window.SHOP = {
    id: "jadilab",
    name: "Jadi Lab",
    whatsapp: "919999999999", // demo number: replace with the real WhatsApp Business number
    delivery: { fee: 30, freeAbove: 299 },
    pincodes: null, // null = accept any 6-digit pincode
    areaNote:
      "Patna gets it the next day. Rest of Bihar in 3-5 days. Pay cash or UPI when it arrives.",
    eta: "in 1-2 days",
    orderPrefix: "JL",
    addLabel: "Add",
    emptyHint:
      "Not sure where to start? A ₹29 seven-day strip is the cheapest way to meet a herb.",

    needs: [
      { id: "all", label: "All herbs" },
      { id: "stress", label: "Stress & sleep" },
      { id: "gut", label: "Gut" },
      { id: "immunity", label: "Immunity" },
      { id: "energy", label: "Energy" },
      { id: "skin", label: "Skin & hair" },
    ],

    products: [
      {
        id: "ashwa-tabs",
        name: "Ashwagandha KSM-66",
        size: "60 tablets · 2 months",
        price: 349,
        mrp: 449,
        needs: ["stress", "energy"],
        herb: "ashwagandha",
        dose: "600 mg root extract a day",
        line: "Two tablets after dinner. Studied for stress and sleep quality.",
        tag: "Bestseller",
        rating: 4.7,
        reviews: 1462,
        art: {
          shape: "bottle",
          body: AMBER,
          accent: WHITE,
          ink: NEEL,
          lid: NEEL,
          label: "ASHWA",
          sub: "KSM-66 · 60 tabs",
        },
      },
      {
        id: "shilajit-drops",
        name: "Shilajit Drops",
        size: "20 ml · 40 days",
        price: 399,
        mrp: 549,
        needs: ["energy"],
        herb: "shilajit",
        dose: "Purified resin, 250 mg per 5 drops",
        line: "Five drops in warm water. Himalayan resin, metal-tested every batch.",
        tag: "New",
        rating: 4.6,
        reviews: 538,
        art: {
          shape: "dropper",
          body: AMBER,
          accent: MARIGOLD,
          ink: NEEL,
          lid: NEEL,
          label: "SHILAJIT",
          sub: "resin drops",
        },
      },
      {
        id: "triphala-chews",
        name: "Triphala Gut Chews",
        size: "30 chews · 1 month",
        price: 249,
        mrp: 299,
        needs: ["gut"],
        herb: "triphala",
        dose: "Amla, harad, baheda, 500 mg",
        line: "One chew at night. Tastes like imli candy, not a bitter churan.",
        rating: 4.5,
        reviews: 911,
        art: {
          shape: "jar",
          body: AMBER,
          accent: MARIGOLD,
          ink: NEEL,
          lid: NEEL,
          label: "TRIPHALA",
          sub: "gut chews",
        },
      },
      {
        id: "chyawan-bites",
        name: "Chyawanprash Bites",
        size: "30 bites · 1 month",
        price: 299,
        mrp: 349,
        needs: ["immunity", "energy"],
        herb: "amla",
        dose: "Amla + 30 herbs, no added refined sugar",
        line: "The winter jar, as a chewy square. No sticky spoon in the drawer.",
        tag: "Winter pick",
        rating: 4.6,
        reviews: 724,
        art: {
          shape: "jar",
          body: NEEL,
          accent: MARIGOLD,
          ink: NEEL,
          lid: MARIGOLD,
          label: "CHYAWAN",
          sub: "prash bites",
        },
      },
      {
        id: "tulsi-melts",
        name: "Tulsi-Mulethi Throat Melts",
        size: "24 melts",
        price: 149,
        needs: ["immunity"],
        herb: "tulsi",
        dose: "Tulsi + mulethi + honey",
        line: "Let one melt slowly. For long lectures and dusty auto rides.",
        rating: 4.4,
        reviews: 389,
        art: {
          shape: "jar",
          body: MARIGOLD,
          accent: WHITE,
          ink: NEEL,
          lid: NEEL,
          label: "TULSI",
          sub: "+ mulethi melts",
        },
      },
      {
        id: "amla-fizz",
        name: "Amla C Fizz",
        size: "10 fizzy tablets",
        price: 199,
        mrp: 249,
        needs: ["immunity", "skin"],
        herb: "amla",
        dose: "80 mg natural vitamin C from amla",
        line: "Drop one in a glass of water. Nimbu-pani with ambitions.",
        rating: 4.7,
        reviews: 1033,
        art: {
          shape: "bottle",
          body: MARIGOLD,
          accent: NEEL,
          ink: WHITE,
          lid: NEEL,
          label: "AMLA C",
          sub: "fizz · 10 tabs",
        },
      },
      {
        id: "night-drops",
        name: "Jatamansi Night Drops",
        size: "20 ml · 1 month",
        price: 329,
        mrp: 399,
        needs: ["stress"],
        herb: "ashwagandha",
        dose: "Jatamansi + ashwagandha, alcohol-free",
        line: "Ten drops before bed, phone face-down. A wind-down ritual in a bottle.",
        rating: 4.5,
        reviews: 402,
        art: {
          shape: "dropper",
          body: NEEL,
          accent: WHITE,
          ink: NEEL,
          lid: MARIGOLD,
          label: "NIGHT",
          sub: "jatamansi drops",
        },
      },
      {
        id: "bhringraj-gummies",
        name: "Bhringraj Hair Gummies",
        size: "30 gummies · 1 month",
        price: 279,
        mrp: 349,
        needs: ["skin"],
        herb: "amla",
        dose: "Bhringraj + amla + biotin",
        line: "Nani's hair-oil herbs, eaten instead of oiled. Kokum-berry flavour.",
        rating: 4.4,
        reviews: 617,
        art: {
          shape: "jar",
          body: NEEL,
          accent: WHITE,
          ink: NEEL,
          lid: MARIGOLD,
          label: "BHRINGRAJ",
          sub: "hair gummies",
        },
      },
    ],

    // Seven-day strips: the cheap way to try a herb before the full pack.
    trials: [
      {
        id: "trial-ashwa",
        name: "Ashwagandha strip",
        size: "7 tablets",
        price: 29,
        art: {
          shape: "sachet",
          body: AMBER,
          accent: WHITE,
          ink: NEEL,
          label: "7 DAYS",
          sub: "ashwagandha",
        },
      },
      {
        id: "trial-triphala",
        name: "Triphala strip",
        size: "7 chews",
        price: 29,
        art: {
          shape: "sachet",
          body: MARIGOLD,
          accent: WHITE,
          ink: NEEL,
          label: "7 DAYS",
          sub: "triphala",
        },
      },
      {
        id: "trial-chyawan",
        name: "Chyawanprash strip",
        size: "7 bites",
        price: 29,
        art: {
          shape: "sachet",
          body: NEEL,
          accent: MARIGOLD,
          ink: NEEL,
          label: "7 DAYS",
          sub: "chyawanprash",
        },
      },
    ],

    // "Read the label": one entry per hero herb. Sources and reports are invented samples.
    herbs: [
      {
        id: "ashwagandha",
        name: "Ashwagandha",
        latin: "Withania somnifera · root",
        art: "b-ashwa",
        hook: "The bedtime root.",
        source:
          "Roots from the Neemuch-Mandsaur belt of Madhya Pradesh, pulled after 150 days and dried in the shade. Root only, never leaf.",
        nani: "Half a spoon of churan stirred into warm haldi milk, handed to whoever had been “running on no sleep” that week.",
        research:
          "Root extract has been studied in small clinical trials for stress and sleep quality. Results look promising. It is not a sleeping pill, and it takes weeks, not hours.",
        batch: "JL-ASH-0924",
        report: [
          ...safety(
            "Lead 0.31 · Arsenic 0.08 · Cadmium <0.05 · Mercury <0.02 ppm",
            "Total count 1,200 cfu/g · E. coli, Salmonella absent",
          ),
          { test: "Withanolides", result: "5.3% (label says ≥5%)" },
        ],
      },
      {
        id: "shilajit",
        name: "Shilajit",
        latin: "Mineral pitch · purified resin",
        art: "b-shilajit",
        hook: "Mountain resin, metal-tested.",
        source:
          "Raw pitch from high rock seams in Kinnaur, Himachal Pradesh, above 3,500 m. Purified in water and sun-dried before it becomes drops.",
        nani: "A pea-sized piece melted into warm milk on winter mornings, for what everyone just called “taakat”.",
        research:
          "Studied for energy and fatigue, mostly for its fulvic acid. The evidence is early, which is exactly why we test every batch for heavy metals before it ships.",
        batch: "JL-SHJ-0812",
        report: [
          ...safety(
            "Lead 0.92 · Arsenic 0.21 · Cadmium 0.06 · Mercury <0.02 ppm",
            "Total count 800 cfu/g · Yeast & mould within limit",
          ),
          { test: "Fulvic acid", result: "61% (label says ≥50%)" },
        ],
      },
      {
        id: "triphala",
        name: "Triphala",
        latin: "Amla + harad + baheda · fruit",
        art: "b-triphala",
        hook: "Three fruits, one routine.",
        source:
          "Amla from Pratapgarh in Uttar Pradesh. Harad and baheda gathered by forest cooperatives in Bastar, Chhattisgarh. Equal parts, by weight.",
        nani: "A spoon of triphala in warm water before bed, with the family motto: “pet saaf, toh sab saaf”.",
        research:
          "Studied for digestion and regularity, and for its antioxidant content. Gentle and slow by design. Not a quick fix and not a laxative.",
        batch: "JL-TRI-0907",
        report: [
          ...safety(
            "Lead 0.44 · Arsenic 0.11 · Cadmium <0.05 · Mercury <0.02 ppm",
            "Total count 2,100 cfu/g · E. coli, Salmonella absent",
          ),
          { test: "Tannins", result: "28% (label says ≥25%)" },
        ],
      },
      {
        id: "tulsi",
        name: "Tulsi",
        latin: "Ocimum tenuiflorum · leaf",
        art: "b-tulsi",
        hook: "The courtyard plant.",
        source:
          "Krishna and Rama tulsi leaf from small farms around Barabanki, near Lucknow. Picked in the morning, dried within a day so the oil stays in.",
        nani: "Two leaves in the morning chai, and tulsi-adrak kadha the second anyone in the house sneezed.",
        research:
          "Studied for the body’s stress response and seasonal wellbeing. We pair it with mulethi for a soothing melt. It soothes; it does not treat infections.",
        batch: "JL-TUL-0830",
        report: [
          ...safety(
            "Lead 0.27 · Arsenic 0.06 · Cadmium <0.05 · Mercury <0.02 ppm",
            "Total count 1,500 cfu/g · E. coli, Salmonella absent",
          ),
          { test: "Eugenol", result: "0.9% (label says ≥0.7%)" },
        ],
      },
      {
        id: "amla",
        name: "Amla",
        latin: "Phyllanthus emblica · fruit",
        art: "b-amla",
        hook: "Vitamin C, the desi way.",
        source:
          "Banarasi amla from orchards in Pratapgarh, Uttar Pradesh, harvested November to January when the fruit is at its sourest.",
        nani: "A murabba jar warming in the winter sun, and amla in everything from achaar to hair oil.",
        research:
          "A natural source of vitamin C, which supports normal immune function. Also studied for skin and hair. Ours is measured, so the label tells you how much.",
        batch: "JL-AML-1002",
        report: [
          ...safety(
            "Lead 0.19 · Arsenic 0.05 · Cadmium <0.05 · Mercury <0.02 ppm",
            "Total count 900 cfu/g · E. coli, Salmonella absent",
          ),
          { test: "Vitamin C", result: "82 mg per tablet (label says 80 mg)" },
        ],
      },
    ],
  };

  // Trials live in the cart catalogue too, so the shared cart can price them.
  window.SHOP.products.push(...window.SHOP.trials);
})();
