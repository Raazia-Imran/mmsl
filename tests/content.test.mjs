import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  fallbackContent,
  normalizeContent,
  safeUrl,
  paths,
} from "../frontend-ui/src/content.js";
test("CMS deliberately empty collections remain empty", () => {
  const live = normalizeContent({
    settings: { title: "Live lab" },
    home: { heroTitle: "Live title" },
    projects: [],
    publications: [],
    achievements: [],
    partners: [],
    resources: [],
  });
  assert.equal(live.settings.title, "Live lab");
  for (const key of [
    "projects",
    "publications",
    "achievements",
    "partners",
    "resources",
  ])
    assert.deepEqual(live[key], []);
});
test("unconfigured CMS keeps supplied content", () =>
  assert.deepEqual(normalizeContent(null), fallbackContent));
test("links cannot execute script or become fake downloads", () => {
  for (const input of [
    "javascript:alert(1)",
    "data:text/html,abc",
    "//evil.example",
    "#",
    "",
  ])
    assert.equal(safeUrl(input), null);
  assert.equal(
    safeUrl("https://example.org/paper"),
    "https://example.org/paper",
  );
  assert.equal(safeUrl("/projects/"), "/projects/");
});
test("supplied source text and asset counts are retained", async () => {
  assert.equal(fallbackContent.projects.length, 3);
  assert.equal(fallbackContent.publications.length, 2);
  assert.equal(fallbackContent.partners.length, 6);
  assert.equal(fallbackContent.achievements.length, 4);
  assert.equal(fallbackContent.resources.length, 4);
  assert.equal(paths.length, 9);
});
test("imported document IDs are unique and require editorial review", () => {
  const all = [
    fallbackContent.settings,
    fallbackContent.home,
    ...fallbackContent.projects,
    ...fallbackContent.publications,
    ...fallbackContent.achievements,
    ...fallbackContent.partners,
    ...fallbackContent.resources,
  ];
  assert.equal(new Set(all.map((d) => d._id)).size, all.length);
  assert.ok(all.every((d) => d.reviewStatus === "needs-review"));
});

test("CMS removals do not restore bundled text or media", () => {
  const data = normalizeContent({
    settings: { title: "Client lab", navigation: [], address: [] },
    home: {},
    pages: [],
    expertise: [],
    copy: [],
  });
  assert.equal(data.settings.logo, undefined);
  assert.equal(data.home.heroImage, undefined);
  assert.equal(data.home.heroDescription, undefined);
  assert.deepEqual(data.pageSettings.pages, []);
  assert.deepEqual(data.expertise, []);
  assert.deepEqual(data.copy, []);
});
test("published copy and resolved media survive the CMS boundary", () => {
  const photo = {
    asset: { url: "https://cdn.sanity.io/images/test/production/photo.webp" },
  };
  const copy = [{ entries: [{ key: "Expertise", value: "Our capabilities" }] }];
  const data = normalizeContent({
    settings: { title: "Client lab", logo: photo },
    home: { heroImage: photo },
    copy,
    team: [{ _id: "person", photo, profileUrl: "https://example.org/profile" }],
    projects: [{ _id: "project", image: photo }],
    expertise: [{ _id: "service", image: photo }],
  });
  assert.deepEqual(data.copy, copy);
  assert.deepEqual(data.settings.logo, photo);
  assert.deepEqual(data.home.heroImage, photo);
  assert.deepEqual(data.team[0].photo, photo);
  assert.deepEqual(data.projects[0].image, photo);
  assert.deepEqual(data.expertise[0].image, photo);
});
