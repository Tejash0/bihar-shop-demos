const test = require("node:test");
const assert = require("node:assert/strict");
const {
  totals,
  orderText,
  whatsappUrl,
  validate,
  rupees,
} = require("../shared/cart.js");
const { pack, shapes } = require("../shared/packs.js");

const products = [
  { id: "a", name: "Ashwa Calm", size: "30 gummies", price: 249, mrp: 299 },
  { id: "b", name: "Sattu Shake", size: "1 sachet", price: 20 },
];
const delivery = { fee: 20, freeAbove: 199 };

test("empty cart has no delivery fee", () => {
  const t = totals({}, products, delivery);
  assert.equal(t.count, 0);
  assert.equal(t.total, 0);
  assert.equal(t.deliveryFee, 0);
});

test("below the free threshold adds the fee and reports the gap", () => {
  const t = totals({ b: 3 }, products, delivery);
  assert.equal(t.subtotal, 60);
  assert.equal(t.deliveryFee, 20);
  assert.equal(t.total, 80);
  assert.equal(t.toFree, 139);
});

test("at or above the threshold delivery is free, savings use MRP", () => {
  const t = totals({ a: 1, b: 1 }, products, delivery);
  assert.equal(t.subtotal, 269);
  assert.equal(t.deliveryFee, 0);
  assert.equal(t.savings, 50);
  assert.equal(t.toFree, 0);
});

test("unknown ids and zero quantities are ignored", () => {
  const t = totals({ a: 0, ghost: 4, b: 1 }, products, delivery);
  assert.equal(t.count, 1);
  assert.deepEqual(
    t.items.map((l) => l.product.id),
    ["b"],
  );
});

test("WhatsApp text lists items, total and customer details", () => {
  const t = totals({ a: 2 }, products, delivery);
  const text = orderText({ name: "DesiDose" }, t, {
    name: "Ravi",
    phone: "9876543210",
    address: "Boring Road",
    pincode: "800001",
    payment: "Cash on delivery",
  });
  assert.match(text, /Ashwa Calm \(30 gummies\) x2 = ₹498/);
  assert.match(text, /Total: ₹498/);
  assert.match(text, /Pay: Cash on delivery/);
  const url = whatsappUrl("919999999999", text);
  assert.ok(url.startsWith("https://wa.me/919999999999?text="));
  assert.equal(decodeURIComponent(url.split("text=")[1]), text);
});

test("validation accepts Indian mobile formats and checks pincodes", () => {
  const ok = {
    name: "Ravi",
    address: "Flat 2, Boring Road",
    pincode: "800001",
  };
  for (const phone of ["9876543210", "+91 98765 43210", "09876543210"]) {
    assert.deepEqual(validate({ ...ok, phone }), {}, phone);
  }
  assert.ok(validate({ ...ok, phone: "12345" }).phone);
  assert.ok(validate({ ...ok, phone: "5876543210" }).phone);
  assert.ok(validate({ ...ok, phone: "9876543210", pincode: "8000" }).pincode);
  assert.ok(
    validate({ ...ok, phone: "9876543210", pincode: "110001" }, ["800001"])
      .pincode,
  );
});

test("rupees uses Indian grouping", () => {
  assert.equal(rupees(125000), "₹1,25,000");
});

test("every pack shape renders escaped SVG", () => {
  for (const shape of shapes) {
    const svg = pack(
      { shape, body: "#fff", accent: "#000", label: "A<B", sub: "x" },
      "T&C",
    );
    assert.match(svg, /^<svg class="pack"/);
    assert.match(svg, /A&lt;B/);
    assert.match(svg, /aria-label="T&amp;C"/);
  }
});
