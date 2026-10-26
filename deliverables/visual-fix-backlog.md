# Visual fix backlog

Status: `TARGETED_FIX`

## VIS-HOME-FAMILY-CARD-BALANCE-001

- Route: `/`
- Section: `components/home/families-section.tsx`
- Evidence: `C:\Users\Grandlin\AppData\Local\Temp\codex-clipboard-b7e8d00d-76da-4662-b720-95c30a819c7f.png`
- Problem: the three equal-height family cards use inconsistent image-stage heights and product scales. The first card has one oversized product, while the other two compress several small products into shallow strips. Large empty content areas separate the facts from the bottom CTA.
- Fix scope: use one consistent image-stage height and optical product scale; apply one composition rule to all three cards; keep product subjects fully visible; reduce artificial vertical whitespace; keep headings, facts and CTA on a shared rhythm.
- Acceptance: desktop and 390px screenshots show balanced card weights, complete products, continuous clean backgrounds and readable CTAs without excessive blank space.
- Current result: implemented and desktop-reviewed; 390px visual evidence remains pending because the active in-app browser does not expose viewport emulation.

## VIS-HOME-MATERIAL-CARD-DENSITY-002

- Route: `/`
- Section: `components/home/materials-section.tsx`
- Evidence: `C:\Users\Grandlin\AppData\Local\Temp\codex-clipboard-9bba63c2-a79c-4dcd-a85c-0e01e061a885.png`
- Problem: the material columns are oversized containers for very little content. Brass contains two small product tiles while stainless steel and aluminum contain only one, leaving visibly uneven internal density and large unused areas. The nested bordered product tiles make the section read like cards inside cards instead of a clear material comparison.
- Fix scope: reduce the section card height to content height; use a consistent image strip or representative product composition for each material; normalize optical image scale; remove unnecessary nested-card framing; make the material distinction and applicable products the primary reading order.
- Acceptance: all three material columns have comparable visual density, product imagery remains complete, and desktop/390px layouts communicate material-to-product relationships without dead space or nested-card clutter.
- Current result: implemented and desktop-reviewed; 390px visual evidence remains pending.

## VIS-HEADER-PRODUCT-MENU-DISMISS-003

- Route: all public pages, desktop navigation.
- Section: `components/site/site-header.tsx`
- Evidence: `C:\Users\Grandlin\AppData\Local\Temp\codex-clipboard-4cd2af68-00dc-4336-8c09-dafaae286f50.png`
- Problem: the Products submenu can remain visible after the visitor has moved away, covering the page and leaving an ambiguous active state.
- Fix scope: use explicit desktop-menu state; close on pointer exit, click or tap outside, Escape, route change and child navigation while preserving keyboard focus access.
- Acceptance: the menu stays available while the pointer or keyboard focus is inside it, then reliably dismisses through every supported exit path.
- Current result: implemented with route-change, pointer-exit, outside-pointer, blur and Escape dismissal paths; automated source regression passes.

## VIS-COMPANY-GALLERY-MASONRY-004

- Routes: `/about`, `/manufacturing`.
- Evidence: reviewer screenshot `codex-clipboard-81796cf6-5a64-4506-a4f7-e0d7f1949f56.png` and direct instruction on 2026-10-26.
- Problem: equal-ratio image tiles flatten the different facility views; the first exterior photo is dark and lacks clarity.
- Fix scope: AI-enhance only exposure and clarity of the first real exterior photo, then use the project masonry contract with natural proportions, per-image reveal, hover feedback, accessible lightbox navigation, Escape and scroll restoration.
- Acceptance: desktop and 390px verify first/middle/last image reveal, open/switch/close, focus return, reduced motion and zero scroll-position drift.
- Current result: implemented; desktop lightbox open/close readback recorded `scroll delta = 0`; 390px visual interaction evidence remains pending.

## VIS-APPLICATIONS-TEXT-HEAVY-005

- Route: `/applications`.
- Evidence: reviewer screenshot `codex-clipboard-4d657da2-cdbe-4a08-acfa-2ecd9d3fc1e7.png`.
- Problem: the page is dominated by repeated text cards; the small icons do not provide enough visual hierarchy or product context.
- Fix scope: add a real product-range visual introduction and rebuild the application list as graphic information panels with larger semantic icons and compact RFQ cues; do not fabricate application photography.
- Acceptance: the page has a clear visual-to-information rhythm and remains scannable without relying on hover.
- Current result: implemented with verified product-range imagery and semantic graphic panels; desktop-reviewed, 390px visual evidence pending.

## VIS-ABOUT-IMAGE-NARRATIVE-006

- Route: `/about`.
- Evidence: reviewer screenshot `codex-clipboard-62da06ca-f13e-4611-a0e3-9a934b9a4ac8.png`.
- Problem: the opening company section reads like a text-and-table document even though verified company photography exists later on the page.
- Fix scope: place a real facility image into the opening company narrative, retain sourced company facts, and follow with the masonry facility story.
- Acceptance: company identity is established through real imagery before the fact table, on desktop and mobile.
- Current result: implemented with the AI-enhanced verified exterior photo and facility gallery; desktop-reviewed, 390px visual evidence pending.
