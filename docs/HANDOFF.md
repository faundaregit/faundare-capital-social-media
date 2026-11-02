# Faundare Capital Social Media — Production and QC Handoff

Prepared: 2026-11-01 (America/Chicago)  
Target repository: `faundaregit/faundare-capital-social-media`  
Handoff branch: `codex/handoff-2026-11-01`

## Goal

Move Faundare Capital's social-media research, coded design production, rendering, and independent QC into a reproducible Codex Cloud workflow. GitHub is the execution source for code and portable assets. Google Drive remains the authoritative location for governance, approvals, registers, and operating records. Signed-in browser work—including GoHighLevel scheduling, Instagram/LinkedIn administration, and final publishing—must remain local because Codex Cloud does not inherit local browser sessions.

The business objective is not simply to publish consistently. The system must produce useful, share-worthy real-estate content that can earn non-follower reach, profile visits, and qualified follows while preserving factual accuracy and Faundare's visual identity.

## Completed work

- Established separate Production and independent QC roles. Production may not self-approve.
- Rebuilt the workflow around mandatory gates: reference-post discovery, topic selection, factual brief, visual concepts, production draft, production pre-QC, independent QC, revision cycles, freeze, approval, and scheduling.
- Adopted the approved `M2.1A-TW1.3-dark` logo as the default social-media logo master.
- Established a 1080 × 1350 primary format and a 360 × 450 mobile proof requirement.
- Developed reusable Node/Sharp and Python/Pillow rendering experiments for maps, ranked charts, editorial illustrations, promotional posts, and funded-deal layouts.
- Produced evidence records, captions, concept records, freeze packages, and independent-QC records for several V2 posts.
- Completed the data-center logistics post package (`SM-2026-11-02-MKT-IOS`). Its current final renderer creates both full-size and mobile-proof images. Scheduling evidence indicates it was placed for Thursday, 2026-11-05; confirm in GoHighLevel before relying on that date.
- Audited the local candidate files for common credential patterns. No matches were found in the text/code selected for this branch.
- Excluded follower-audit data, signed-in planner screenshots, credentials, local environment files, and scheduling proofs from this branch.

## Governing decisions

### Content and topic selection

1. Start from proven social posts published by approved reference accounts; do not invent topics from an unstructured research scan.
2. Always record and show the exact reference post used for topic selection.
3. Newsworthy posts must be illustration-led and data-driven.
4. Verify all factual claims with primary or authoritative sources. A popular reference post is an interest signal, not factual proof.
5. Do not reuse rejected topics or repeat published posts.
6. Avoid stale datasets unless the post delivers a clear, current lesson. Do not present an old study as current market evidence.
7. Favor constructive, decision-useful angles. Do not default to negative news or messages that discourage investors without a useful action or opportunity.

### Visual production

1. A reader must understand the topic and main point within roughly three seconds.
2. Use one dominant visual mechanism per post. Avoid unexplained lines, crowded annotations, ornamental cards, redundant summaries, and small labels.
3. Data visualization form must fit the claim; do not default repeatedly to bar charts.
4. Preserve negative space, especially above the main illustration, and balance spacing above and below the chart area.
5. Use large, explicit headlines. Avoid vague contrast formulas such as “More X. Not always more Y.” unless the contrast is truly the finding.
6. Use the TW1.3 logo master at a visibly branded size without crowding the source line.
7. Sources may be fine print, but the primary message and data labels must remain readable in the 360 × 450 proof.
8. Educational and news posts should be graph/illustration-led. Promotional and funded-deal posts may use property photography and a concise information hierarchy.

### QC and iteration

1. QC is performed independently from Production.
2. A failed draft returns to Production with specific findings, severity, and acceptance criteria.
3. Do not stop after reporting a failure. Continue the Production → QC loop until the asset passes, the user pauses it, or evidence shows the concept itself should be retired.
4. Give a viable concept several focused correction cycles before replacing its layout. Start with typography, spacing, hierarchy, labels, contrast, and visual balance; escalate to structural layout changes only when those corrections cannot solve the problem.
5. Freeze only after full-size and mobile review, factual verification, logo check, source check, duplication check, and user approval.

### Publishing cadence

- The latest funded-deal decision is one funded-deal post per week on Saturday.
- Replace the former second weekly funded-deal slot with an additional promotional post.
- A post every day was judged too aggressive for the current audience and production capacity. Confirm the remaining weekly pillar assignments in the operating register before scheduling.
- Never publish automatically. Scheduling and publishing require explicit approval and a local signed-in browser session.

## Current production state

### Ready or near-ready

- `SM-2026-11-02-MKT-IOS`: data-center construction/logistics footprint. Final SVG, PNG, mobile proof, factual brief, caption, concept record, and QC handoff records exist. Confirm independent-QC disposition and GoHighLevel schedule.

### Draft/history packages

- `SM-2026-10-30-MKT-INCOME`: multiple purchasing-power/income visual iterations. Treat as design history, not an automatically approved current post.
- `SM-2026-10-30-MKT-MIDDLE-CLASS`: state-level middle-class income concept. Drafts and QC records exist; it is not frozen for publishing.
- `prototypes/`: historical design experiments. Several scripts still reference local Windows paths or local-only source images. They are useful as design history but are not yet a portable Cloud production pipeline.

### Operational queue notes

- Chinese commercial-property series already published: overview and apartment. Remaining sequence: shopping center, warehouse/industrial, office, restaurant.
- Approved Chinese funded-deal queue was confirmed posted through `baton-rouge-dscr-cashout-206632`. The Hammond $215,500 fix-and-flip package was delivered on 2026-11-01 but was not confirmed posted at handoff time.
- Do not infer posting from delivery. Require explicit confirmation before advancing a queue.

## Remaining tasks

1. Change this repository to private before adding internal SOP exports, account data, unpublished deal details, or private source assets. It was public when this handoff was prepared.
2. Create and publish a Codex Cloud environment from this repository and run the setup/test commands below.
3. Add repository-safe snapshots of the authoritative Production SOP, QC Standard, governance rules, reference-account registry, and operating register. Until the repository is private, keep those documents in restricted Google Drive.
4. Remove hard-coded Windows/OneDrive paths from historical prototype scripts. Resolve assets relative to the repository root or environment variables.
5. Consolidate the many one-off renderers into a documented template system with shared brand tokens, typography, logo placement, source treatment, and output validation.
6. Add a manifest per post containing: post ID, pillar, status, reference post, primary sources, claim guardrails, selected concept, output files, QC cycles, approval, schedule, and publish confirmation.
7. Reconcile the actual GoHighLevel calendar with the operating register. Browser scheduling cannot be verified from Codex Cloud.
8. Run independent QC on any current draft before calling it ready. Do not treat the presence of a final-looking PNG as approval.
9. Expand automated checks to include text safe areas, minimum type sizes, contrast, logo version/hash, duplicate post IDs, missing source metadata, and caption/graphic claim consistency.

## Blockers and boundaries

- **Repository visibility:** the target repository is public. This branch is intentionally sanitized.
- **Cloud browser limitation:** Codex Cloud cannot use the desktop's signed-in browser, local OneDrive paths, active processes, or local browser cookies.
- **Authoritative records:** current governance and status records live in Google Drive and need either connector access or private, controlled snapshots for Cloud tasks.
- **Legacy portability:** some historical scripts contain absolute local file paths and depend on files outside this repository.
- **Reference assets:** third-party post screenshots are not included in this sanitized branch. Obtain them through the approved reference registry and respect copyright/source restrictions.
- **Publishing authority:** no task may publish automatically or silently change loan facts, schedules, or queue status.

## Repository setup

### Node renderers

```bash
corepack enable
pnpm install
pnpm test
```

### Python prototypes

```bash
python -m venv .venv
# Linux/macOS
source .venv/bin/activate
# Windows PowerShell
# .venv\\Scripts\\Activate.ps1
python -m pip install -r requirements.txt
```

The repository includes Geist Regular and Medium font files under `assets/fonts/` with their OFL license. In a Linux Cloud environment, register them before rendering any script that resolves fonts by family name:

```bash
mkdir -p "$HOME/.local/share/fonts/faundare"
cp assets/fonts/*.ttf "$HOME/.local/share/fonts/faundare/"
fc-cache -f
```

## Tests and results at handoff

The branch-level acceptance command is:

```bash
pnpm test
```

It performs the following:

1. Re-renders the three data-center concept PNGs from SVG.
2. Re-renders the selected data-center final asset with the approved TW1.3 logo.
3. Verifies the final asset is exactly 1080 × 1350.
4. Verifies the mobile proof is exactly 360 × 450.

Local audit results before push:

- GitHub access: admin/push access confirmed for `faundaregit/faundare-capital-social-media`.
- Target repository: empty at the beginning of handoff; default branch configured as `main`.
- Secret-pattern scan: no common credential patterns found in the candidate text/code set.
- Exclusions: follower-audit CSV and signed-in scheduling screenshots were not staged.
- Direct local render test: passed using Sharp 0.34.4. The concepts and final asset were regenerated successfully.
- Dimension validation: passed for `post-v2-1080x1350.png` (1080 × 1350) and `post-v2-mobile-proof.png` (360 × 450).
- Local package-runner note: the Codex desktop bundled pnpm policy blocked dependency lifecycle scripts during `pnpm test`, even though Sharp was installed and the equivalent direct Node render/verification commands passed. Re-run `pnpm test` in the published Cloud environment and record the result there.

## Recommended Codex Cloud task split

### Production task

Work only from approved reference-post candidates and verified evidence. Create the factual brief and three genuinely distinct visual concepts before selecting one. Produce the full-size asset, mobile proof, caption, production pre-QC record, and manifest. Never mark your own work QC-passed.

### Independent QC task

Review the frozen candidate against the repository rules and authoritative QC standard. Check the evidence, claim-to-visual consistency, three-second comprehension, hierarchy, mobile readability, brand/logo use, source treatment, duplication, and caption consistency. Return a clear pass or a prioritized defect list with acceptance criteria. Do not redesign the asset inside QC.

### Local operations task

After user approval and independent QC pass, use the signed-in desktop browser to reconcile the calendar, schedule the post, save schedule evidence to the restricted operating record, and later record explicit publish confirmation.

