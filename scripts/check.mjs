import { access, readFile } from "node:fs/promises";
import { siteConfig } from "../site.config.mjs";
import { projects, routes } from "../content/site-content.mjs";

const root = new URL("../", import.meta.url);
const errors = [];
const pages = [];

for (const locale of ["tr", "en"]) {
  pages.push(...Object.values(routes[locale]));
  projects[locale].forEach((project) => pages.push(routes[locale].projects + project.slug + "/"));
}

for (const route of [...new Set(pages)]) {
  const file = new URL("." + route + "index.html", root);
  try {
    const html = await readFile(file, "utf8");
    if (!html.includes("<title>")) errors.push(route + ": missing title");
    if (!html.includes('name="description"')) errors.push(route + ": missing description");
    if (!html.includes('hreflang="')) errors.push(route + ": missing hreflang");
    if (/\[[A-Z0-9_]+\]/.test(html)) errors.push(route + ": visible placeholder");
    if (/href="(?:#|undefined|null)"/.test(html)) errors.push(route + ": broken placeholder link");
    if (!html.includes('id="main"')) errors.push(route + ": missing main landmark");
    const internalLinks = [...html.matchAll(/href="(\/[^"]*)"/g)].map((match) => match[1]);
    for (const href of internalLinks) {
      const clean = href.split("#")[0].split("?")[0];
      if (!clean || /\.(?:png|svg|css|js|xml|txt)$/i.test(clean)) continue;
      const target = clean.endsWith("/") ? "." + clean + "index.html" : "." + clean;
      try {
        await access(new URL(target, root));
      } catch {
        errors.push(route + ": missing internal target " + clean);
      }
    }
  } catch {
    errors.push(route + ": file not generated");
  }
}

if (!siteConfig.siteUrl.startsWith("https://")) errors.push("siteUrl must use https");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Checked " + new Set(pages).size + " routes: no broken placeholders or required metadata omissions.");
