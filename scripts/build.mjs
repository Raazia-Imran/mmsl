import { build, loadEnv } from "vite";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
process.chdir(root);
const config = path.join(root, "frontend-ui/vite.config.js");
await build({ configFile: config });
await build({
  configFile: config,
  build: {
    ssr: path.join(root, "frontend-ui/src/prerender.jsx"),
    outDir: path.join(root, ".ssr"),
    emptyOutDir: true,
  },
});
const { render, paths, routeNames, content } = await import(
  pathToFileURL(path.join(root, ".ssr/prerender.js")).href
);
const template = await readFile("dist/index.html", "utf8");
const env = loadEnv("production", root, "");
const publicIndexing =
  (process.env.VITE_PUBLIC_INDEXING ?? env.VITE_PUBLIC_INDEXING) === "true";
let origin = process.env.VITE_SITE_URL || env.VITE_SITE_URL || "";
if (publicIndexing && !/^https:\/\//.test(origin))
  throw new Error(
    "VITE_SITE_URL must be an HTTPS origin before public indexing is enabled.",
  );
origin = origin.replace(/\/$/, "");
const escape = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
for (const route of [...paths, "/404/"]) {
  const known = paths.includes(route);
  const page = content.pageSettings?.pages?.find((page) => page.path === route);
  const title =
    route === "/"
      ? content.settings.title
      : `${page?.seoTitle || page?.title || routeNames[route] || ""} | ${content.settings.title}`;
  const description =
    route === "/"
      ? content.home.heroDescription
      : page?.seoDescription?.trim() ||
        page?.description?.trim() ||
        `${page?.seoTitle || page?.title || routeNames[route] || ""} | ${content.settings.title}`;
  const robots = publicIndexing && known ? "index,follow" : "noindex,nofollow";
  const url = origin + route;
  const image = content.settings.socialImage?.asset?.url || "";
  const imageAlt = content.settings.socialImageAlt || "";
  const meta = (name, value, type = "name") =>
    `<meta ${type}="${name}" content="${escape(value)}"/>`;
  const og = (name, value) => meta(`og:${name}`, value, "property");
  const tags = [
    `<title>${escape(title)}</title>`,
    meta("description", description),
    meta("robots", robots),
    og("title", title),
    og("description", description),
    og("type", "website"),
    og("site_name", content.settings.title),
    og("locale", "en_PK"),
    meta("twitter:card", "summary_large_image"),
    meta("twitter:title", title),
    meta("twitter:description", description),
  ];
  const twitterSite = process.env.VITE_TWITTER_SITE || env.VITE_TWITTER_SITE;
  if (/^@[a-zA-Z0-9_]{1,15}$/.test(twitterSite || "")) {
    tags.push(meta("twitter:site", twitterSite));
  }
  if (origin && known) {
    tags.push(
      `<link rel="canonical" href="${escape(url)}"/>`,
      og("url", url),
      og("image", image),

      og(
        "image:width",
        content.settings.socialImage?.asset?.metadata?.dimensions?.width ||
          "1200",
      ),
      og(
        "image:height",
        content.settings.socialImage?.asset?.metadata?.dimensions?.height ||
          "630",
      ),
      og("image:alt", imageAlt),
      meta("twitter:image", image),
      meta("twitter:image:alt", imageAlt),
    );
    const schema = {
      "@context": "https://schema.org",
      "@type": route === "/" ? "WebSite" : "WebPage",
      name: title,
      description,
      url,
      inLanguage: "en-PK",
    };
    const json = JSON.stringify(schema).replaceAll("<", "\\u003c");
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }
  const favicon = content.settings.favicon?.asset?.url || "";
  const html = template
    .replace(
      "<!--site-icons-->",
      `<link rel="icon" href="${escape(favicon)}"/><link rel="apple-touch-icon" href="${escape(favicon)}"/>`,
    )
    .replace("<!--app-html-->", () => render(route))
    .replace("<!--page-meta-->", () => tags.join("\n"))
    .replace(
      "</head>",
      `<script id="initial-content" type="application/json">${JSON.stringify(content).replaceAll("<", "\\u003c")}</script></head>`,
    );
  const out =
    route === "/404/"
      ? "dist/404.html"
      : route === "/"
        ? "dist/index.html"
        : `dist${route}index.html`;
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
}
await writeFile(
  "dist/robots.txt",
  publicIndexing
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n",
);
if (publicIndexing)
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${escape(origin + p)}</loc></url>`).join("")}</urlset>`,
  );
await rm(".ssr", { recursive: true, force: true });
console.log(
  `Pre-rendered ${paths.length} pages and 404. Indexing: ${publicIndexing ? "enabled" : "disabled for review"}.`,
);
