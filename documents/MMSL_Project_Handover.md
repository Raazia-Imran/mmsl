# MMSL Project Handover

Prepared 24 November 2026; storage revised 25 November 2026 | Status: client review and ownership handover pending

## Read this first

[VERIFIED FROM REPOSITORY] MMSL is the Multiscale Modelling and Simulation Lab website for NED University of Engineering and Technology. It uses React/Vite for the frontend and Sanity for content. Current repository: https://github.com/Raazia-Imran/mmsl . The original PHP website is reference material. Do not restart the site from the PHP source or create a new CMS project.

[USER-PROVIDED NOTE] The owner wants a portable handover for another AI assistant, a polished GitHub README, editable developer notes, PDFs, original client files, generated assets and a clear plan for transferring hosting from the developer to the client. The requested Windows destination is D:\PROJECTS DATA\MMSL. Remote file access was explicitly authorized for this work.

[INFERENCE] Intended visitors include researchers, students and prospective collaborators or industry partners. Success means accurate approved content, editable Sanity records, a working site under client-controlled accounts/domain, documented ownership, and enough source material to resume without this ChatGPT account. There is no evidenced course rubric, submission deadline or page limit for this handover.

## What was actually inspected

[VERIFIED FROM CURRENT FILE] Connected Windows device DESKTOP-NIQRJA5: working folder D:\ALL PROJECTS\multiscale-lab; original source folder D:\ALL PROJECTS\MMSL-PHP-Original; destination D:\PROJECTS DATA. Read local Git status/remotes/history, root package configuration and both untracked CMS helper scripts. Searched for project AGENTS.md; none was found outside dependencies. Original files were copied, not moved.

[VERIFIED FROM REPOSITORY] Cloned and read the current repository, README, docs, routes/content layer, build/metadata code, Vercel configuration, Studio navigation, migration scripts and GitHub workflows. Baseline main: c9e573b4fa8359394397022de51d921cd68244d0 (18 November 2026, 22:37 Karachi). The baseline local checkout matched this code. Two local scripts were untracked; no tracked application modifications were reported.

[VERIFIED FROM CURRENT FILE] Read the saved MMSL content documents, including MMSL_Sanity_Content_Guide.docx version 3, updated 18 November 2026 at 17:39 UTC. Recovered four generated source PNGs and the original client RAR. The two supplied RAR versions have identical SHA-256 and size; retain one canonical copy.

[VERIFIED FROM CURRENT FILE] Read the public Sanity API on 24 November and saved its response and all 25 image assets. Read the public site, Studio HTML and robots file. Authenticated Vercel inspection returned the project and latest READY production deployment. These are observations, not a new functional/browser test suite.

[UNRESOLVED] Full previous conversations were not available. This session supplied summaries and selected excerpts only. Sanity draft records, private account membership/billing, full CMS export, Search Console property access, final client domain and final hosting team were not inspected. Do not claim those are backed up or approved.

## Authoritative sources and links

[VERIFIED FROM REPOSITORY] Code and configuration: https://github.com/Raazia-Imran/mmsl/tree/main . Baseline code commit: https://github.com/Raazia-Imran/mmsl/commit/c9e573b4fa8359394397022de51d921cd68244d0 . README-only handover commit: ca88976bfd848944439444b25fcf3990eb4546c4. No application code or dependency changes were made in this task.

[VERIFIED FROM CURRENT FILE] Review site: https://multiscale-lab.vercel.app/ . Vercel project: multiscale-lab, ID prj_OKUY0Q8GwRW3rMRFuLPlXqO0C3F1, account/team ID team_Uen0LerYNIgbBJ3XXoexY3lu. Dashboard route: https://vercel.com/raazias-projects-142c0b42/multiscale-lab (derived from the deployment team slug; dashboard navigation not independently opened). Latest observed deployment dpl_9w7SiqUYJxX7y8zxtCn3MoHHF1H1 was READY, target production. The API also returned live:false; therefore READY must not be treated as client acceptance or final launch. SSO protection is enabled for all_except_custom_domains; some review URLs may require authentication.

[VERIFIED FROM REPOSITORY] Sanity project 4isekt9n, organization o6odkcj36, dataset production. Content Studio: https://multiscale-ned-lab.sanity.studio/ . Management entry: https://www.sanity.io/manage/project/4isekt9n . Studio application ID: be7c9nq12qsxff1zgzisoo1y. These are public identifiers, not passwords. The Studio URL returned HTTP 200, but a signed-in publishing operation was not performed.

[UNRESOLVED] Google Search Console entry: https://search.google.com/search-console . No MMSL property ID, verified owner, submission record or final domain was established. This is an entry link only; do not say Search Console is configured. Form service entry: https://web3forms.com/ ; recipient ownership and live delivery remain unverified.

## Files and their roles

[USER-PROVIDED NOTE] Storage arrangement revised 25 November 2026: keep only START_HERE.md and the two main PDFs in D:\PROJECTS DATA\MMSL. The repository's documents/ folder holds the editable handover, AI resume prompt, hosting guide, client documents, original archive, source artwork and selected evidence. Duplicate source snapshots, Git bundles, downloaded CDN copies and the old local ZIP are unnecessary and are removed after the GitHub copies are verified.

[VERIFIED FROM CURRENT FILE] The original archive multiscale-lab.rar is 1,784,546 bytes; SHA-256 905323c40ca74832c8830c85be53b794acefe921e3b0c4ebc45279b79a6d4a75. The original Windows working project remains D:\ALL PROJECTS\multiscale-lab. Its two local CMS helpers remain preserved; reference copies are included with the repository documents. Do not execute a helper just because it is included.

[USER-PROVIDED NOTE] Start online at https://github.com/Raazia-Imran/mmsl/tree/main/documents . Clone the repository when source is needed. The earlier full handover ZIP remains an archival copy from before the storage cleanup; its file paths and inventory no longer describe the minimal local folder.

[VERIFIED FROM CURRENT FILE] Latest editorial guides: MMSL_Sanity_Content_Guide.docx v3 (38,704 bytes) and MMSL_Website_Content_Required.docx (37,640 bytes), both dated 18 November. Earlier MMSL_Website_Overview and client forms, dated 7 November, document original questions and should not override current routes or CMS state. The repository records document versions; documents/FILE_MANIFEST.json records file sizes and SHA-256 hashes for the published handover materials.

[VERIFIED FROM CURRENT FILE] Recovered original generated artwork: Engineering science icon collection.png; Fluid, structural, and molecular engineering icons.png; Microfluidics, carbon fiber, and steel.png; Crystal lattice to fluid ribbon.png. These are conceptual illustration sources, not experimental figures. The supplied animation article is inspiration material, not a conversation transcript or project requirement specification; it is not republished with the guides.

## Architecture and developer setup

[VERIFIED FROM REPOSITORY] Node engines: >=22.12.0 and <25; GitHub CI and observed Vercel use 24. package.json and package-lock.json define this JavaScript project; package.xml is not the dependency manifest. A copied folder will still need dependencies installed. No Python backend, separate Vercel database or PHP server is needed for the redesigned site.

[VERIFIED FROM REPOSITORY] To resume with Git, run: git clone https://github.com/Raazia-Imran/mmsl.git ; then cd mmsl ; npm ci ; npm run dev. Git bundles and duplicate source copies are not retained in the minimal local handover folder. Installing packages requires network access. Never overwrite an existing working folder during recovery.

[VERIFIED FROM REPOSITORY] Available commands: npm run studio starts the editor; npm run build builds and prerenders into dist; npm run preview serves the built site; npm run studio:build compiles Studio. Existing CI runs npm test, npm run build, node scripts/check-build.mjs and npm run studio:build. No local application tests or builds were rerun for this documentation-only task, per the user's instruction.

[VERIFIED FROM REPOSITORY] frontend-ui/src/content.js owns routes, queries, normalization, URL handling and image crops. content.json is an initial migration/offline fallback. frontend-ui/src/components, pages and hooks contain UI behavior. cms-backend/schemaTypes and sanity.config.js define fields and editor navigation. scripts/build.mjs prerenders pages, inserts metadata, and generates robots/sitemap. vercel.json defines security headers and legacy redirects.

[VERIFIED FROM REPOSITORY] Browser reads update after published CMS edits and refresh. Static HTML and search/social metadata require a frontend rebuild after editorial changes. Preserve intentional empty collections. Page paths are development-owned even though most wording and content images are editable in Sanity. The reviewStatus field does not hide published items.

[VERIFIED FROM REPOSITORY] Frontend variables: VITE_SANITY_PROJECT_ID=4isekt9n; VITE_SANITY_DATASET=production; VITE_SITE_URL=actual HTTPS origin; VITE_PUBLIC_INDEXING=false during review. VITE_WEB3FORMS_ACCESS_KEY is configured only after client recipient setup. SANITY_API_TOKEN is terminal-only; never add a VITE_ prefix. GitHub's Studio workflow expects the separate secret SANITY_AUTH_TOKEN. No secret values were collected or included.

## Current pages and decisions

[VERIFIED FROM REPOSITORY] Nine routes plus 404: Home /; About /about/; Services /services/; Research Papers /papers/; Lab Highlights /achievements/; Collaborators /collaborators/; Team /team/; Contact /contact/; Privacy /privacy/. Old /projects/ and /clients/ redirect to Services and Collaborators. /resources/ is absent from the route list, although four CMS resources and its old page record remain. Do not restore a Resources page based on the 7 November overview alone.

[VERIFIED FROM REPOSITORY] Existing design includes the original lab logo, white/orange/blue and purple accents, floating compact navigation, scale explorer, project panels, publication dialogs, image crop support, reduced-motion handling and swipe/arrow carousels. Three projects and three expertise cards have six distinct illustrations. Lab Highlights contains separate Achievements and News areas.

[USER-PROVIDED NOTE] Prior supplied notes request lighter purple, smaller fonts, a white hero, consistent backgrounds, active-only underlines, smoother transitions, transparent institutional branding, and client-editable images. These are orientation notes; do not infer that every visual detail was approved or freshly tested. Prior notes about an Events timeline are not confirmed as the current next task; no separate Events route exists in current code.

[VERIFIED FROM REPOSITORY] Preserve supplied logos and label conceptual artwork honestly. Missing people, awards, full author lists, DOIs, PDFs and results must not be invented. Prior docs explicitly reject artificial loading delays, copying third-party template assets, and presenting local interaction as real-time collaboration. Preserve these choices unless the user changes the brief.

## Live content and evidence

[VERIFIED FROM CURRENT FILE] Public Sanity snapshot, 24 November: 73 total records = 48 content documents + 25 image assets. Content breakdown: websiteCopy 11; pageContent 9; partner 6; achievement 4; resource 4; expertise 3; newsItem 3; project 3; publication 2; homePage 1; pageSettings 1; siteSettings 1. No teamMember documents were returned. The latest returned update was 18 November 2026 at 17:35:25 UTC. These counts include dormant records and placeholders, not necessarily visible approved content.

[VERIFIED FROM CURRENT FILE] Three News entries have empty titles and placeholder:true with needs-review status. HomePage has no Mission or Vision values. Public contact email and phone are empty. The two publication records and three project records remain needs-review. Thus an editable schema or populated collection does not prove content completeness.

[VERIFIED FROM CURRENT FILE] Site and Studio returned HTTP 200. Homepage metadata contains noindex,nofollow and og:image:width 1200 / height 630. robots.txt says Disallow: /. The older missing-OG-dimensions issue is superseded by current code and observed HTML. Final SEO launch is still pending.

[VERIFIED FROM REPOSITORY] GitHub validation run 44360684908 succeeded for baseline c9e573b. Studio workflow run 44360684789 also reports success for that commit. A successful workflow can skip deployment when its token is absent; job logs were not inspected, so newest Studio schema publication remains unconfirmed. Do not rerun a deployment just to resolve this in a handover-only task.

## Conflicts and stale information

[VERIFIED FROM CURRENT FILE] Older docs say 22 records/eight images: superseded by the 48/25 public snapshot. Earlier documents list ten pages including Resources: superseded by the nine current route definitions. Earlier labels Projects, Clients and Partners, and Achievements now map to Services, Collaborators and Lab Highlights.

[VERIFIED FROM REPOSITORY] The Windows origin still points at https://github.com/Raazia-Imran/new-lab.git, while the accessible canonical repository is mmsl and both baseline histories match. The new README uses mmsl. The original local remote was preserved rather than changed silently. Older docs and .env.example still contain obsolete references to a NEW project; do not follow that comment.

[VERIFIED FROM REPOSITORY] Earlier docs claim original PHP files are committed in source-reference/. That directory is absent from the inspected repository. The separate original folder and supplied RAR are therefore important independent evidence.

[UNRESOLVED] Source content conflicts remain: Modeling versus Modelling in branding; Composite Material Reinforcement versus Material Reinforcement Studies; incomplete publication author lists; award, over-50-papers, grant and tool claims; identity/relationship permissions for six collaborator logos. The original client documents record these questions; no current approval evidence resolves them.

## People, responsibilities and outstanding decisions

[USER-PROVIDED NOTE] Raazia Imran Reshamwala is the developer and project owner requesting the handover. Git history supports her developer role. The lab/client must supply an approver, complete institutional content, final account/team details, domain/DNS ownership, approved contact inbox and media permissions. No client representative's final approval is established.

[UNRESOLVED] Prior notes mention Dr. Tariq Jamil and the source paper records include his name. This does not establish authority to approve MMSL or that he has approved this site. Confirm the designated approver through project correspondence before acceptance. Do not import NC4SCM roles into MMSL.

[USER-PROVIDED NOTE] User preferences: clear direct English; preserve working code and original files; do not run application verification unless requested or instructions require it; no silent pushes, deployment, submissions or external messages. This task explicitly authorized improving GitHub README and writing the handover folder. Future remote access requires permission unless already authorized for the active task.

## Priority actions and risks

1. [UNRESOLVED] Inspect the Studio workflow job log and signed-in Studio schema list to establish whether the latest News/Expertise fields are actually deployed. Expected evidence: exact commit, deploy step outcome and visible fields. Do not change published content just to inspect.
2. [UNRESOLVED] Obtain client-approved Mission/Vision, lab identity, contacts, projects, team, publication details, confirmed milestones, collaborator permissions and resource files. Use the latest content guide and reconcile the original source contradictions.
3. [UNRESOLVED] Agree the destination client Vercel team, GitHub arrangement, domain and owner access. Follow MMSL_Client_Hosting_Transfer.md. No account transfer was performed.
4. [UNRESOLVED] Configure client-owned Web3Forms, approve privacy wording and authorize a real enquiry check. The present UI deliberately disables unconfigured submissions.
5. [UNRESOLVED] After approval, establish the final domain, exact CORS origins, static rebuild process, canonical URLs and Search Console property; only then enable indexing and submit the sitemap.

[UNRESOLVED] Public CMS backup excludes drafts, private documents, account permissions, billing and secrets. Obtain an authenticated Sanity dataset export with assets before major migration. No automatic rebuilding webhook is evidenced. Without a rebuild, browser content and static search/social HTML may disagree. Do not run import/apply scripts against existing content without reviewing their mutation behavior and taking a current backup.

[VERIFIED FROM CURRENT FILE] cms-address.mjs is a mutating helper that patches address/navigation; it does not offer a preview flag. cms-export.mjs prints a content query, not a complete archive. Both were copied as local evidence, not added to GitHub or executed. Their presence is not proof they ran successfully.

## Files to inspect before editing

Read this handover, the newest Git status/history and README; package.json and lockfile; frontend-ui/src/content.js and current published Sanity records; cms-backend/schemaTypes and sanity.config.js; scripts/build.mjs; vercel.json; .github/workflows; docs/CONTENT-REVIEW.md and OWNERSHIP-AND-HANDOVER.md; latest MMSL_Sanity_Content_Guide.docx; original RAR/PHP if resolving source wording; and both local-only helpers before any CMS migration. Treat earlier verification docs as historical evidence rather than new test results.

## Resume here

[UNRESOLVED] Single best next step: confirm the latest Studio schema deployment without editing CMS content. Open https://github.com/Raazia-Imran/mmsl/actions/runs/44360684789 and inspect its deployment step/logs, then inspect https://multiscale-ned-lab.sanity.studio/ with authorized account access. Expected output: a short table listing commit, deploy outcome, availability of News cards/Expertise/image fields, and any remaining blocker. Do not claim schema publishing complete from the workflow's green status alone.

## Change log

- 24 November 2026: reconstructed repository/local/CMS state; preserved original client files, untracked helpers and Git history; recovered source artwork and published CMS assets.
- 24 November 2026: replaced README only in GitHub, commit ca88976bfd848944439444b25fcf3990eb4546c4; corrected clone URL, routes, stale counts and handover limitations. Original README remains recoverable from baseline Git history.
- 24 November 2026: prepared Markdown/PDF handover, client hosting transfer plan and AI resume prompt. No application features, dependencies, client approval, domain, membership, CMS data or form configuration were changed. Existing repository automation may run on the README commit; no manual deployment was requested or invoked.

- 25 November 2026: user requested minimum local storage. Moved useful materials to repository documents/ and kept only two PDFs and START_HERE.md locally; historical technical observations remain dated 24 November. No application feature changes or fresh functional verification are implied.
