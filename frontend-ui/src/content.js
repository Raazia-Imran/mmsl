import source from "./content.json" with { type: "json" };
export const fallbackContent = source;
export const paths = [
  "/",
  "/about/",
  "/services/",
  "/papers/",
  "/achievements/",
  "/collaborators/",
  "/contact/",
  "/privacy/",
  "/team/",
];
export const routeNames = {
  "/": "Home",
  "/about/": "About Us",
  "/services/": "Services",
  "/papers/": "Research Papers",
  "/achievements/": "Achievements & News",
  "/collaborators/": "Collaborators",
  "/contact/": "Contact Us",
  "/privacy/": "Privacy Notice",
  "/team/": "Team",
};
export function safeUrl(value) {
  if (
    typeof value !== "string" ||
    !value ||
    value === "#" ||
    /[\\\x00-\x1f]/.test(value)
  )
    return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const u = new URL(value);
    return ["https:", "http:", "mailto:", "tel:"].includes(u.protocol)
      ? value
      : null;
  } catch {
    return null;
  }
}
export function imageUrl(item, imageField, pathField) {
  const image = item?.[imageField];
  const src = safeUrl(image?.asset?.url);
  const dimensions = image?.asset?.metadata?.dimensions;
  if (src && image.crop && dimensions?.width && dimensions?.height) {
    const { left = 0, right = 0, top = 0, bottom = 0 } = image.crop;
    const { width, height } = dimensions;
    const rect = [
      Math.round(left * width),
      Math.round(top * height),
      Math.max(1, Math.round((1 - left - right) * width)),
      Math.max(1, Math.round((1 - top - bottom) * height)),
    ];
    const url = new URL(src);
    url.searchParams.set("rect", rect.join(","));
    return url.href;
  }
  return src || safeUrl(item?.[pathField]);
}
export function normalizeContent(data) {
  if (!data?.settings) return source;
  return {
    settings: {
      ...data.settings,
      address: data.settings.address || [],
      navigation: (data.settings.navigation || [])
        .filter((n) => n.path !== "/resources/")
        .map((n) =>
          n.path === "/clients/"
            ? { ...n, path: "/collaborators/" }
            : n.path === "/projects/"
              ? { ...n, path: "/services/" }
              : n,
        ),
    },
    home: {
      ...(data.home || {}),
      aboutParagraphs: data.home?.aboutParagraphs || [],
    },
    pageSettings: Array.isArray(data.pages)
      ? { pages: data.pages }
      : data.pageSettings || { pages: [] },
    team: data.team || [],
    copy: data.copy || [],
    expertise: Array.isArray(data.expertise) ? data.expertise : [],
    ...Object.fromEntries(
      ["projects", "publications", "achievements", "partners", "resources"].map(
        (key) => [key, Array.isArray(data[key]) ? data[key] : []],
      ),
    ),
  };
}
export async function fetchContent(projectId, dataset = "production", signal) {
  if (
    !projectId ||
    !/^[a-z0-9]+$/.test(projectId) ||
    !/^[a-z0-9_-]+$/.test(dataset)
  )
    return source;
  const imageProjection =
    '...,"asset": asset->{url,metadata{dimensions{width,height}}}';
  const query = `{
    "copy": *[_type == "websiteCopy"] | order(order asc),
"team": *[_type == "teamMember"] | order(order asc){...,photo{${imageProjection}}},
    "expertise": *[_type == "expertise"] | order(order asc, _id asc){...,image{${imageProjection}}},
    "pages": *[_type == "pageContent"],
    "pageSettings": *[_type == "pageSettings" && _id == "pageSettings"][0],
    "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{...,logo{${imageProjection}},favicon{${imageProjection}},socialImage{${imageProjection}}},
    "home": *[_type == "homePage" && _id == "homePage"][0]{...,heroImage{${imageProjection}}},
    "projects": *[_type == "project"] | order(order asc, _id asc){...,image{${imageProjection}}},
    "publications": *[_type == "publication"] | order(order asc, _id asc){...,"pdfUrl":pdf.asset->url},
    "achievements": *[_type == "achievement"] | order(date desc, order asc, _id asc){...,cover{${imageProjection}}},
    "partners": *[_type == "partner"] | order(order asc, _id asc){...,logo{${imageProjection}},favicon{${imageProjection}},socialImage{${imageProjection}}},
    "resources": *[_type == "resource"] | order(order asc, _id asc){...,"fileUrl":file.asset->url}
  }`;
  const url = new URL(
    `https://${projectId}.apicdn.sanity.io/v2025-02-19/data/query/${dataset}`,
  );
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "published");
  const response = await fetch(url, {
    signal: signal || AbortSignal.timeout(8000),
    credentials: "omit",
  });
  if (!response.ok)
    throw new Error(`Content service returned ${response.status}`);
  const payload = await response.json();
  return normalizeContent(payload.result);
}
