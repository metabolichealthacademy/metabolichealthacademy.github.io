import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pages = [
  "index.html", "about.html", "conditions.html", "blog.html", "resources.html",
  "contact.html", "privacy.html", "terms.html", "disclaimer.html", "ai-disclaimer.html",
  "editorial-policy.html", "evidence-policy.html", "corrections-policy.html",
  "ai-policy.html", "sponsorship-policy.html", "404.html"
];
const expectedNav = ["index.html", "conditions.html", "resources.html", "blog.html", "about.html"];
const trustLinks = ["editorial-policy.html", "evidence-policy.html", "corrections-policy.html", "ai-policy.html", "sponsorship-policy.html"];
const errors = [];

for (const page of pages) {
  const file = join(root, page);
  if (!existsSync(file)) {
    errors.push(`${page}: missing file`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  if (/```(?:html)?/i.test(html)) errors.push(`${page}: contains Markdown fence`);
  for (const token of ["<title>", 'name="description"', 'name="viewport"', 'rel="canonical"', "<header", "<nav", "<main", "<footer"]) {
    if (!html.includes(token)) errors.push(`${page}: missing ${token}`);
  }
  for (const link of expectedNav) {
    if (!html.includes(`href="${link}"`)) errors.push(`${page}: navigation missing ${link}`);
  }
  for (const link of trustLinks) {
    if (!html.includes(`href="${link}"`)) errors.push(`${page}: footer missing ${link}`);
  }
  if (/href=["']#["']/i.test(html)) errors.push(`${page}: contains placeholder href="#"`);
  if (/Austin Beck|Dustin Rivera|Dr\.\s+(?:Austin|Dustin)/i.test(html)) errors.push(`${page}: contains obsolete or disallowed presenter name`);

  const refs = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)].map(match => match[1]);
  for (const ref of refs) {
    if (/^(?:https?:|mailto:|tel:|#)/i.test(ref)) continue;
    const clean = ref.split(/[?#]/)[0];
    if (!clean) continue;
    const target = clean.startsWith("/") ? join(root, clean.slice(1)) : join(root, clean);
    if (!existsSync(target)) errors.push(`${page}: broken local reference ${ref}`);
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === ".git") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.toLowerCase().endsWith(".zip")) errors.push(`public ZIP must be removed: ${path.slice(root.length + 1)}`);
  }
}
walk(root);

const cname = join(root, "CNAME");
if (!existsSync(cname) || readFileSync(cname, "utf8").trim() !== "themetabolichealthacademy.com") {
  errors.push("CNAME is missing or changed");
}
for (const required of ["style.css", "site.js", "robots.txt", "sitemap.xml"]) {
  if (!existsSync(join(root, required))) errors.push(`${required}: missing file`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${pages.length} HTML pages: structure, navigation, trust links, local references, metadata, CNAME, presenter identity, fences, and ZIP policy.`);
