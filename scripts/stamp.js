// Adds ?v=<stamp> to every local CSS/JS link in the HTML pages, so browsers fetch fresh files
// after a deploy instead of pairing a new page with a cached old stylesheet.
// Usage: npm run stamp   (run before committing a change that will be deployed)
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 12);

const pages = ["index.html", "checkout.html"].map((page) =>
  path.join(root, page),
);

// Only relative links: hosted fonts and CDNs keep their own URLs.
const local =
  /((?:href|src)=")(?!https?:|\/\/|#|mailto:)([^"?#]+\.(?:css|js))(?:\?v=[^"]*)?(")/g;
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const next = html.replace(local, `$1$2?v=${stamp}$3`);
  if (next !== html) fs.writeFileSync(file, next);
}
console.log(`stamped ${pages.length} pages with v=${stamp}`);
