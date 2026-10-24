# Motion plan

Status: PASS. Scene count: 4. Desktop, 390 px mobile and reduced-motion plans are ready.

## External candidates reviewed

1. Motion `inView` official documentation: adopt section-local viewport entry; reject global timers and off-screen completion.
2. Motion `scroll` official documentation: adopt only for a short manufacturing progress line; reject pinned storytelling and decorative parallax.
3. MDN `prefers-reduced-motion`: remove non-essential scaling and panning when the operating system requests reduced motion.

## RC-M01 — supplied banner carousel

Three customer banners crossfade with restrained horizontal continuity. Real HTML headings and CTAs remain above the artwork. Desktop and mobile use separate focal positioning; controls include previous, next and pause. Reduced motion removes auto-advance and crossfade while retaining all content.

## RC-M02 — section-local viewport reveal

Every major public-page section receives an independent 16–24 px rise and fade when it actually enters the viewport. Product cards may stagger up to 60 ms, capped within each visible row. No fixed global timeout marks future sections complete; a fault fallback makes content visible without consuming the later viewport animation.

## RC-M03 — manufacturing flow

Material preparation → hot forging → machining and assembly → inspection → shipment uses a connecting line that advances only while the section is visible. Desktop is horizontal; 390 px mobile stacks vertically. Reduced motion renders the final line and nodes immediately.

## RC-M04 — interaction feedback

Navigation underline, product-card elevation, FAQ disclosure, carousel controls and CTA press/focus states use 150–220 ms transitions. Product images retain complete-subject `contain` presentation; hover scale cannot crop the product. Reduced motion removes transform travel while preserving focus, hover colour and disclosure state.

## Reuse decision

The Anli lookup returned original product-motion and cards-motion packages. Their bounded-card patterns may inform implementation, but the customer combination is purpose-built: supplied three-banner advertising, valve/fitting product containment, a sourced forging-to-shipment process and section-local lifecycle rules.
