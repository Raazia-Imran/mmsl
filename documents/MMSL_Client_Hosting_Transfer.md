# MMSL Client Hosting Transfer

Prepared 24 November 2026; storage note added 25 November 2026 | Planning document: transfer not performed

[USER-PROVIDED NOTE] Editable project and transfer guides are kept at https://github.com/Raazia-Imran/mmsl/tree/main/documents . The minimal local folder contains only START_HERE.md and the two main PDFs. Clone the repository when code is needed. Older full-package ZIPs are archival copies and do not describe the current local layout.

## Current arrangement

[VERIFIED FROM CURRENT FILE] Review frontend https://multiscale-lab.vercel.app/ belongs to Vercel project multiscale-lab, ID prj_OKUY0Q8GwRW3rMRFuLPlXqO0C3F1, team/account team_Uen0LerYNIgbBJ3XXoexY3lu. The latest observed production deployment is READY. This is a review environment with indexing disabled, not client acceptance.

[VERIFIED FROM REPOSITORY] Source https://github.com/Raazia-Imran/mmsl ; main baseline application c9e573b4fa8359394397022de51d921cd68244d0; README update ca88976bfd848944439444b25fcf3990eb4546c4. Sanity project 4isekt9n / production and Studio https://multiscale-ned-lab.sanity.studio/ remain separate from Vercel ownership.

[USER-PROVIDED NOTE] The remaining goal is to move hosting from the developer's Vercel account to the client. The client destination team/account and final domain have not been supplied in accessible materials. This document authorizes no transfer, DNS change or account membership mutation by itself.

## Decide and record before transfer

1. [UNRESOLVED] Obtain the exact client Vercel team slug/ID and designated owner. Confirm the client's plan and payment method through the normal dashboard; do not assume current plan eligibility.
2. [UNRESOLVED] Decide whether the developer repository remains the deployment source or whether history must also be copied into a client-owned GitHub repository. Preserve the developer original unless explicitly instructed otherwise.
3. [UNRESOLVED] Confirm the intended domain, registrar, DNS manager and Search Console owner. No final custom domain or verified MMSL Search Console property was established.
4. [UNRESOLVED] Record who owns Sanity organization/project access, recipient email and Web3Forms, and who signs off the final site. Moving Vercel does not settle these separately managed accounts.

## Prepare a recoverable baseline

[INFERENCE] Before the eventual authorized transfer, capture a current Git commit/bundle, an authenticated Sanity export with assets, build settings, redirects, domains and environment variable names/scopes. Store secret values in an approved credential manager, not this PDF, GitHub or an AI prompt. The current public CMS snapshot does not include drafts or permissions.

[VERIFIED FROM REPOSITORY] Expected build settings: repository root /; install npm ci; build npm run build; output dist; Node 24.x. Preserve vercel.json headers/redirects. Preserve the existing review URL and any future custom domain details shown in the actual transfer preview.

[VERIFIED FROM REPOSITORY] Variable checklist: VITE_SANITY_PROJECT_ID=4isekt9n; VITE_SANITY_DATASET=production; VITE_SITE_URL=the actual site origin; VITE_PUBLIC_INDEXING=false until approval; optional VITE_WEB3FORMS_ACCESS_KEY only after recipient setup. Match production/preview/development scopes deliberately. Never expose SANITY_API_TOKEN or SANITY_AUTH_TOKEN through VITE_ variables.

## Transfer the existing Vercel project

[INFERENCE] Recommended route: transfer the existing project after destination access is ready. Keep the same domain and URL paths. This reduces unnecessary reconfiguration compared with deleting the project.

[VERIFIED FROM CURRENT FILE] Official Vercel documentation, checked 24 November, states that the operator must own the source team and belong to the destination team. It documents the transfer under Project Settings > General > Transfer Project. Review the destination and the transfer preview before confirming. A destination payment method may be required. The actual transfer requires a later explicit instruction from the user.

[VERIFIED FROM CURRENT FILE] Vercel documentation says deployments, project configuration, Git repository link, domains/aliases, security settings and dashboard environment variables transfer or copy. Integrations and some separately managed resources require separate handling. Use the current transfer preview and documentation; do not assume every service transfers.

[UNRESOLVED] No final transfer preview, destination membership, payment method, integration list or transfer success was inspected in this session.

## Optional client GitHub copy

[INFERENCE] If a client-owned repository is required, inspect an empty destination first, copy the Git history using GitHub's documented duplication workflow, and compare main branch SHAs. A mirror push can overwrite destination refs, so it must never target a populated repository without explicit review and authorization. Issue/PR history, secrets and integrations need separate handling.

[INFERENCE] Reconnect Git integration inside the client-owned Vercel project to the agreed client repository. Preserve production branch, build settings, environment variables, domains and access rules. Recreate the Studio deployment secret through normal secret settings if this workflow is also moving. Do not retrieve or print the secret value to document it.

## Sanity, forms and domain tasks

[VERIFIED FROM REPOSITORY] Reuse project 4isekt9n and dataset production. Confirm client organization membership and billing independently. Do not delete the project, reseed over client edits or create a replacement dataset just to change hosting. Update CORS only for the exact chosen frontend and Studio origins, with credential settings appropriate to each.

[UNRESOLVED] Set up a client-controlled Web3Forms recipient/access key and confirm official contact details and privacy wording. Run an authorized enquiry only after recipient setup. No live form delivery was verified here.

[INFERENCE] Once the client domain is agreed and approved, configure the domain in the destination Vercel project and make only required DNS changes. Set VITE_SITE_URL to the final HTTPS origin. Rebuild after approved CMS edits so static HTML and metadata match browser content. Keep VITE_PUBLIC_INDEXING=false until the final content/domain review is accepted.

[UNRESOLVED] Search Console: https://search.google.com/search-console . Select or create the correct property using the owner account and normal ownership verification. Submit the generated /sitemap.xml only after indexing is enabled. An account-only hosting transfer with unchanged public URLs should be treated separately from a domain/URL migration.

## Acceptance checklist after authorized transfer

[INFERENCE] Record the destination project/team, final deployment commit and URL. Confirm HTTPS, all nine routes and legacy redirects; current CMS content and images; contact behavior; headers; canonical/OG URLs; robots/sitemap; Git deployment access; Studio editing access; owner permissions; and billing. These checks are a future plan, not tests performed during this handover task.

[INFERENCE] Keep the previous recoverable deployment and account access until the client accepts. If a deployment fails, use the recorded prior deployment/build settings and diagnose before changing DNS again. Remove temporary developer access only after the client confirms ownership and continued maintenance arrangements.

## Remaining work and resume point

[UNRESOLVED] First obtain the exact client Vercel team slug/ID and invitation. Expected output: a filled ownership table covering Vercel, GitHub, Sanity, domain/DNS, Search Console and form recipient, with owner, developer access and pending action for each. Do not initiate transfer until those destination details and an explicit transfer instruction are available.

## Official references checked 24 November 2026

- Vercel transfer requirements and included/excluded resources: https://vercel.com/docs/projects/transferring-projects
- GitHub repository duplication: https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository
- Google guidance for hosting changes without URL changes: https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes

## Change log

24 November 2026: prepared from repository configuration, authenticated Vercel project metadata and current official references. No ownership transfer, DNS change, manual deployment or external message performed.
