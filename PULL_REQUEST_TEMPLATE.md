# Phase 1: Repair — remove fences, fix titles, standardize nav/footer

This pull request makes the Phase 1 repairs described in the project plan:

- Remove accidental Markdown fences from HTML files that were appearing as literal text on the site.
- Add centralized header/footer include fragments and a tiny client-side loader so future header/footer edits only require a single change.
- Fix incorrect page <title> tags and add basic SEO metadata (meta description + canonical links) using the CNAME domain.
- Replace duplicated About content on blog.html and resources.html with simple placeholders.
- Add EvidencePath Claim Check — In Development placeholder on the homepage.

ZIP file handling:
- The large archive `metabolic-health-academy-v3-transformed.zip` has been moved into `/archive/` within this branch for cleanliness. It is still present in the repository history and is not deleted. Do NOT merge this PR until you have inspected the ZIP locally and are comfortable with it being in the published branch.

QA checklist:
- [ ] Check that no files contain triple-backtick fences (```html) or similar artifacts.
- [ ] Open `index.html` and other key pages locally and verify header/footer load and that titles/meta look correct.
- [ ] Verify canonical URLs use https://themetabolichealthacademy.com/
- [ ] Inspect `/archive/metabolic-health-academy-v3-transformed.zip` locally and confirm no sensitive data.

To inspect ZIP locally:
- ls -lh archive/metabolic-health-academy-v3-transformed.zip
- unzip -l archive/metabolic-health-academy-v3-transformed.zip
- unzip archive/metabolic-health-academy-v3-transformed.zip -d inspect-folder

If you want me to remove the ZIP from the published branch after inspection, explicitly tell me and I will remove it and rotate any keys if needed.
