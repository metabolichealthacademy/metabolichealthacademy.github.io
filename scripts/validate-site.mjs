import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pages = ["index.html","start-here.html","about.html","conditions.html","blog.html","resources.html","contact.html","privacy.html","terms.html","disclaimer.html","ai-disclaimer.html","editorial-policy.html","evidence-policy.html","corrections-policy.html","ai-policy.html","sponsorship-policy.html","404.html"];
const expectedNav = ["index.html","start-here.html","conditions.html","resources.html","blog.html","about.html"];
const trustLinks = ["editorial-policy.html","evidence-policy.html","corrections-policy.html","ai-policy.html","sponsorship-policy.html"];
const errors = [];
for (const page of pages) {
  const file = join(root,page);
  if (!existsSync(file)) { errors.push(`${page}: missing file`); continue; }
  const html = readFileSync(file,"utf8");
  if (/```(?:html)?/i.test(html)) errors.push(`${page}: contains Markdown fence`);
  for (const token of ["<title>",'name="description"','name="viewport"','rel="canonical"',"<header","<nav","<main","<footer"]) if (!html.includes(token)) errors.push(`${page}: missing ${token}`);
  for (const link of expectedNav) if (!html.includes(`href="${link}"`)) errors.push(`${page}: navigation missing ${link}`);
  for (const link of trustLinks) if (!html.includes(`href="${link}"`)) errors.push(`${page}: footer missing ${link}`);
  if (/href=["']#["']/i.test(html)) errors.push(`${page}: contains placeholder href="#"`);
  if (/Austin Beck|Dustin Rivera|Dr\.\s+(?:Austin|Dustin)/i.test(html)) errors.push(`${page}: obsolete or disallowed presenter name`);
  const refs=[...html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)].map(m=>m[1]);
  for (const ref of refs) {
    if (/^(?:https?:|mailto:|tel:|#)/i.test(ref)) continue;
    const clean=ref.split(/[?#]/)[0]; if(!clean) continue;
    const target=clean.startsWith("/")?join(root,clean.slice(1)):join(root,clean);
    if(!existsSync(target)) errors.push(`${page}: broken local reference ${ref}`);
  }
}
function walk(dir){for(const name of readdirSync(dir)){if(name===".git")continue;const path=join(dir,name);if(statSync(path).isDirectory())walk(path);else if(name.toLowerCase().endsWith(".zip"))errors.push(`public ZIP must be removed: ${path.slice(root.length+1)}`);}} walk(root);
const cname=join(root,"CNAME"); if(!existsSync(cname)||readFileSync(cname,"utf8").trim()!=="themetabolichealthacademy.com") errors.push("CNAME is missing or changed");
for(const required of ["style.css","site.js","library.js","data/library.json","robots.txt","sitemap.xml"]) if(!existsSync(join(root,required))) errors.push(`${required}: missing file`);
const libraryPath=join(root,"data/library.json");
if(existsSync(libraryPath)){
  try{
    const library=JSON.parse(readFileSync(libraryPath,"utf8"));
    if(library.schema_version!==1||!Array.isArray(library.resources)) errors.push("data/library.json: invalid schema");
    const ids=new Set();
    for(const item of library.resources||[]){
      for(const key of ["id","title","summary","topic","audiences","type","status"]) if(!item[key]) errors.push(`data/library.json: ${item.id||"unknown"} missing ${key}`);
      if(ids.has(item.id)) errors.push(`data/library.json: duplicate id ${item.id}`); ids.add(item.id);
      if(!["available","coming-soon"].includes(item.status)) errors.push(`data/library.json: invalid status for ${item.id}`);
      if(item.status==="available"&&!item.href) errors.push(`data/library.json: available resource ${item.id} missing href`);
      if(item.status==="coming-soon"&&item.href) errors.push(`data/library.json: coming-soon resource ${item.id} must not have href`);
    }
  }catch{errors.push("data/library.json: invalid JSON");}
}
if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log(`Validated ${pages.length} pages and Phase 4A Learning Library data.`);
