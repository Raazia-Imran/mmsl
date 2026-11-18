import { getCliClient } from "sanity/cli";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../..", import.meta.url));
const data = JSON.parse(
  await readFile(path.join(root, "frontend-ui/src/content.json"), "utf8"),
);
const wording = JSON.parse(
  await readFile(new URL("./website-copy.json", import.meta.url), "utf8"),
);
const client = getCliClient({ apiVersion: "2025-02-19" }).withConfig({
  useCdn: false,
});
if (client.config().projectId !== "4isekt9n") throw Error("Unexpected project");
if (!process.argv.includes("--apply")) {
  console.log(
    "Preview only. Moves current website media and wording into Sanity. Pass --apply.",
  );
  process.exit(0);
}
const docs = await client.fetch('*[!(_id in path("drafts.**"))]');
const find = (id) => docs.find((d) => d._id === id);
const media = async (file) => {
  const asset = await client.assets.upload(
    "image",
    await readFile(path.join(root, "frontend-ui/public", file)),
    { filename: path.basename(file) },
  );
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
};
let tx = client.transaction();
for (const group of wording) tx = tx.createIfNotExists(group);
await tx.commit();
const settings = find("siteSettings");
if (!settings.cmsMediaMigrated) {
  const logo = await media("images/lab-mark.png");
  const favicon = await media("brand/icon-180.png");
  const socialImage = await media("brand/social-card.png");
  const heroImage = await media("images/hero-bg.png");
  await client
    .patch("siteSettings")
    .set({
      logo,
      favicon,
      socialImage,
      socialImageAlt: "Multiscale Modelling and Simulation Lab",
      cmsMediaMigrated: true,
    })
    .unset(["logoPath", "nedLogoPath"])
    .commit();
  await client
    .patch("homePage")
    .set({ heroImage, heroImageAlt: "Engineering simulation visual" })
    .unset(["heroImagePath"])
    .commit();
}
const projectMedia = {
  "project-nano": "flow",
  "project-composite": "structure",
  "project-steel": "material",
};
const expertiseMedia = {
  "expertise-fea": "structure",
  "expertise-cfd": "flow",
  "expertise-md": "material",
};
for (const [id, icon] of Object.entries({
  ...projectMedia,
  ...expertiseMedia,
})) {
  const doc = find(id);
  if (!doc) continue;
  if (!doc.image?.asset) {
    const image = await media(`images/research/icon-${icon}.webp`);
    await client
      .patch(id)
      .setIfMissing({ image, imageAlt: doc.title })
      .commit();
  }
  if (doc.icon) await client.patch(id).unset(["icon"]).commit();
}
for (const partner of data.partners) {
  const doc = find(partner._id);
  if (!doc) continue;
  if (!doc.logo?.asset) {
    const logo = await media(partner.logoPath);
    await client.patch(doc._id).setIfMissing({ logo }).commit();
  }
  await client.patch(doc._id).unset(["logoPath"]).commit();
}
const icons = [
  "M21 12a9 9 0 1 1-9-9m5 1-5 8m5-8 1 4 4-1M16 12a4 4 0 1 1-4-4",
  "M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15",
  "m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5",
  "M6 7h12M6 7v10m0 0h12M18 7v10M6 7l12 10M6 17l12-10M8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0M20 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0M8 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0M20 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
];
for (const [i, item] of data.achievements.entries()) {
  const doc = find(item._id);
  if (!doc || doc.cover?.asset) continue;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><defs><linearGradient id="g"><stop stop-color="#e9e9f0"/><stop offset="1" stop-color="#e3d9f8"/></linearGradient></defs><path fill="url(#g)" d="M0 0h640v360H0z"/><svg x="286" y="146" width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#4548a2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${icons[i % 4]}"/></svg></svg>`;
  const asset = await client.assets.upload("image", Buffer.from(svg), {
    filename: `news-${i + 1}.svg`,
  });
  await client
    .patch(doc._id)
    .setIfMissing({
      cover: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      coverAlt: "",
    })
    .commit();
}
const titles = {
  "/services/": "Services",
  "/achievements/": "Achievements & News",
  "/collaborators/": "Collaborators",
  "/contact/": "Contact the lab",
};
for (const doc of docs.filter((d) => d._type === "pageContent")) {
  const original = data.pageSettings.pages.find((p) => p.path === doc.path);
  if (titles[doc.path] && original?.title === doc.title)
    await client.patch(doc._id).set({ title: titles[doc.path] }).commit();
}
const home = find("homePage");
const updates = {};
if (home.achievementTitle === data.home.achievementTitle)
  updates.achievementTitle = "Achievements & News";
if (home.partnersTitle === data.home.partnersTitle)
  updates.partnersTitle = "Collaborators";
if (Object.keys(updates).length)
  await client.patch(home._id).set(updates).commit();
console.log(
  "Migrated current images, browser/share images, project and Expertise icons, News covers and website wording. Existing editorial text preserved.",
);
