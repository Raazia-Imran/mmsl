import { getCliClient } from "sanity/cli";
import { readFile } from "node:fs/promises";
const c = getCliClient({ apiVersion: "2025-02-19" }).withConfig({
  useCdn: false,
});
if (c.config().projectId !== "4isekt9n")
  throw Error("Unexpected Sanity project");
if (!process.argv.includes("--apply")) {
  console.log(
    "Preview only. Upload six distinct topic illustrations, add empty News cards and rename the page. Pass --apply.",
  );
  process.exit(0);
}
const entries = [
  [
    "project-nano",
    "nano-channel",
    "Conceptual fluid flow between atomically textured nano-channel walls.",
  ],
  [
    "project-composite",
    "fibre-composite",
    "Fibre-reinforced composite with alternating layers and exposed fibres.",
  ],
  [
    "project-steel",
    "steel-transformation",
    "Conceptual change in the grain microstructure of steel.",
  ],
  [
    "expertise-fea",
    "fea",
    "Conceptual finite element mesh on a mechanical bracket under load.",
  ],
  [
    "expertise-cfd",
    "cfd",
    "Conceptual flow streamlines around an aerodynamic airfoil.",
  ],
  [
    "expertise-md",
    "md",
    "Moving atoms in a molecular dynamics simulation cell.",
  ],
];
for (const [id, file, imageAlt] of entries) {
  const asset = await c.assets.upload(
    "image",
    await readFile(new URL(`./media/${file}.webp`, import.meta.url)),
    { filename: `${file}.webp` },
  );
  await c
    .patch(id)
    .set({
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      imageAlt,
    })
    .commit();
}
const labels = {
  "Achievement milestones": "Achievements",
  "Latest news": "News",
  "Card carousel": "Card carousel",
  "Previous card": "Previous card",
  "Next card": "Next card",
  "Swipe or use the arrow controls": "Swipe or use the arrow controls",
  "News card awaiting content": "News card awaiting content",
};
await c.createIfNotExists({
  _id: "wording-highlights",
  _type: "websiteCopy",
  title: "Lab Highlights and carousel controls",
  order: 11,
  entries: Object.entries(labels).map(([key, value], i) => ({
    _key: `text${i}`,
    key,
    value,
  })),
});
let tx = c.transaction();
for (let i = 1; i <= 3; i++)
  tx = tx.createIfNotExists({
    _id: `news-placeholder-${i}`,
    _type: "newsItem",
    placeholder: true,
    title: "",
    description: "",
    order: i,
    reviewStatus: "needs-review",
  });
await tx.commit();
const page = await c.getDocument("page-achievements");
await c
  .patch(page._id)
  .ifRevisionId(page._rev)
  .set({
    title: "Lab Highlights",
    kicker: "FROM THE LAB",
    description: "Achievements and the latest updates from the lab.",
  })
  .commit();
const settings = await c.getDocument("siteSettings");
await c
  .patch(settings._id)
  .ifRevisionId(settings._rev)
  .set({
    navigation: settings.navigation.map((n) =>
      n.path === "/achievements/" ? { ...n, label: "Lab Highlights" } : n,
    ),
  })
  .commit();
await c.patch("homePage").set({ achievementTitle: "Lab Highlights" }).commit();
for (const doc of await c.fetch('*[_type=="websiteCopy"]')) {
  const updated = doc.entries?.map((e) =>
    e.key === "Achievements"
      ? { ...e, value: "Lab Highlights" }
      : e.key === "Our achievements"
        ? { ...e, value: "All highlights" }
        : e,
  );
  if (updated && JSON.stringify(updated) !== JSON.stringify(doc.entries))
    await c
      .patch(doc._id)
      .ifRevisionId(doc._rev)
      .set({ entries: updated })
      .commit();
}
console.log(
  "Six distinct illustrations uploaded. Lab Highlights now contains separate Achievements and News cards; News placeholders contain no invented content.",
);
