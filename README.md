<div align="center">
  <img src="frontend-ui/public/images/logo.png" alt="Multiscale Lab" width="340" />
  <h1>Multiscale Modelling &amp; Simulation Lab</h1>
  <p><strong>Small scales. Bigger possibilities.</strong></p>
  <p>NED University of Engineering and Technology · Department of Mechanical Engineering</p>
  <p><a href="https://multiscale-lab.vercel.app/">Review website</a> · <a href="https://multiscale-ned-lab.sanity.studio/">Content Studio</a> · <a href="https://www.sanity.io/manage/project/4isekt9n">Sanity project</a></p>
</div>

---

A research lab website built with **React, Vite and Sanity**, with static HTML for each route and interactive navigation, scientific visuals, publication search and Lab Highlights. Vercel hosts the frontend; Sanity hosts the content and editor.

> **Status: client review, not final launch.** Mission and Vision, publication details, contact information, media permissions and the client hosting/domain arrangement remain pending. Conceptual artwork is illustrative and must not be presented as measured research output.

## Explore the website

| Page | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Lab introduction, research and featured content |
| About | `/about/` | Scope, Mission and Vision |
| Services | `/services/` | Research projects and FEA, CFD and MD expertise |
| Research Papers | `/papers/` | Searchable publications and detail dialogs |
| Lab Highlights | `/achievements/` | Separate Achievements and News carousels |
| Collaborators | `/collaborators/` | Approved organization logos and links |
| Team | `/team/` | CMS-managed people and profiles |
| Contact | `/contact/` | Contact information and optional enquiry form |
| Privacy | `/privacy/` | Editable information-handling notice |

There are **nine routes plus a 404 page**. Resources records are retained in Sanity, but `/resources/` is not a current route. Legacy PHP, Projects and Clients redirects are defined in `vercel.json`.

## Start developing

Use Node.js **22.12 through 24**; CI uses **24**. Run commands from the repository root:

```sh
git clone https://github.com/Raazia-Imran/mmsl.git
cd mmsl
npm ci
npm run dev
```

```sh
npm run studio       # Local Sanity editor
npm run build        # Frontend + static HTML into dist/
npm run preview      # Preview the frontend build
npm run studio:build # Compile the Studio
```

Available validation commands are `npm test` and `node scripts/check-build.mjs` after a build. See the existing CI workflow for required checks. Editing documentation does not require changing application code or dependencies.

## How content reaches the website

Sanity published content feeds the browser and build-time prerendering. Browser edits appear after refresh; rebuild the frontend to refresh static HTML and search/social metadata too. `frontend-ui/src/content.json` is a migration/offline fallback, not a substitute for a current CMS backup. Intentional empty collections are preserved.

| Setting | Value / use |
| --- | --- |
| Sanity project | `4isekt9n` |
| Organization | `o6odkcj36` |
| Dataset | `production` |
| Studio | https://multiscale-ned-lab.sanity.studio/ |
| Studio application ID | `be7c9nq12qsxff1zgzisoo1y` |

Content images, labels, page introductions, projects, expertise, papers, people, highlights and collaborators are editable in Studio. **Client content review is a review label; it does not hide a published item.** Empty News cards are placeholders, not announcements.

### Environment configuration

Use `.env.example` as a variable-name reference. Its older “NEW project” comment is obsolete: reuse the selected lab project.

| Variable | Configuration |
| --- | --- |
| `VITE_SANITY_PROJECT_ID` | `4isekt9n` |
| `VITE_SANITY_DATASET` | `production` |
| `VITE_SITE_URL` | Actual HTTPS origin; update after the client domain is agreed |
| `VITE_PUBLIC_INDEXING` | Keep `false` during review; enable after content/domain approval |
| `VITE_WEB3FORMS_ACCESS_KEY` | Configure only after client recipient setup |
| `SANITY_PROJECT_ID`, `SANITY_DATASET` | Terminal import configuration |
| `SANITY_API_TOKEN` | Optional terminal-only import credential |

Never put an authentication token in a `VITE_` variable or commit credentials. GitHub Studio deployment uses the repository secret named `SANITY_AUTH_TOKEN`; its value is not part of the project documentation.

## Project map

| Location | Responsibility |
| --- | --- |
| `frontend-ui/src/components`, `pages`, `hooks` | Interface, composition and interactions |
| `frontend-ui/src/content.js` | Routes, CMS queries, normalization and safe URLs |
| `frontend-ui/src/content.json` | Migration/offline fallback |
| `frontend-ui/public` | Supplied assets, branding, redirects and headers |
| `cms-backend/schemaTypes` | Content models |
| `cms-backend/sanity.config.js` | Studio navigation and document controls |
| `cms-backend/seed` | Import and content migrations; inspect before running |
| `cms-backend/seed/media` | Six distinct conceptual research/expertise illustrations |
| `scripts` | Build, metadata, branding and content import tools |
| `tests`, `.github/workflows` | Validation and Studio deployment workflows |
| `docs` | Content review, setup, asset provenance and ownership notes |

The original PHP website is reference material, not the runtime. Older docs mention `source-reference/`; that directory is absent from this repository snapshot. Preserve the separately supplied original archive.

## Deployment and ownership

Vercel uses repository root `/`, install `npm ci`, build `npm run build`, output `dist`, Node **24.x**. Review URL: https://multiscale-lab.vercel.app/ . Review indexing is disabled. The form stays inactive without its access key.

Keep Sanity project `4isekt9n`; **do not create or delete a replacement project**. GitHub and Vercel ownership do not transfer Sanity memberships or form ownership. Client Vercel transfer, domain setup and Search Console ownership remain separate handover tasks. Do not assume Search Console is configured because metadata exists.

## Read before changing the project

- [Sanity setup](docs/SANITY-SETUP.md)
- [Content requiring client confirmation](docs/CONTENT-REVIEW.md)
- [Ownership and hosting handover](docs/OWNERSHIP-AND-HANDOVER.md)
- [Launch checklist](docs/LAUNCH-CHECKLIST.md)
- [Asset provenance and motion](docs/ASSETS-AND-MOTION.md)
- [Earlier verification record](docs/VERIFICATION.md)

**Evidence note, 24 November 2026:** the published dataset contained 48 content documents and 25 image assets, including three empty News records. Older notes reporting 22 records/eight images describe the initial import. The deployed homepage includes Open Graph image dimensions. Recheck live data before relying on these counts. No client approval or final launch is implied.

## Project documents

[Open the handover, client guides and source materials](documents/README.md). Editable guides and PDFs are kept here so the local handover folder can stay small.
