---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Portfolio home (index.html)

Mode: Experience (portfolio; the work leads from the first viewport), with one Persuade job: open a WhatsApp conversation.

Audience and job: small-business owners on a phone, in daylight, deciding in seconds whether to message about a site; recruiters on desktop looking for the resume and the Java work.
Proof on hand: four live sites (Açaí do GQ and Barber Agenda are real; Volt Ride and Kumara 8K are concept work and are labeled), study repos on GitHub, the resume PDF.
Constraints: static HTML/CSS/vanilla JS on GitHub Pages, GSAP + ScrollTrigger from a pinned CDN, pt-BR copy passed through the humanizer rules (no em dashes, no "não é X, é Y", no forced triads, no inflated words). User-pinned bar: premium product-launch level (Apple product pages), clean and lean, impress in the first second, many small details (interaction feedback, micro-animation, ScrollTrigger).

Approved comps: `.impeccable/mocks/comp-1-tela.png` (approved, first viewport), combined with `comp-3-profundidade.png` (project chapter grammar) and `comp-2-lineup.png` (closing lineup of the sites section).

## Direction contract

THESIS: Each site is presented the way a product is launched: one screen, enormous type, silence around it. The page refuses the developer portfolio's grid of equal project cards and tech-pill rows.

OWN-WORLD: Near-white ground (#F5F5F7 family) and near-black ink; Geist 800 tight for display, Geist regular for text. No accent colour of its own: colour enters only through the work, and each project chapter takes its ground from that site's own first frame. Components are quiet: black pill for the one primary action, underlined text links with a chevron, thin rounded screen bezels with a long soft shadow.

STORY: The visitor sees at once that this person makes sites with their own look, watches a real client site work under their thumb, flips through three more, notices there is a Java system behind them, and taps WhatsApp.

FIRST VIEWPORT: Thin bar (name left, three links centred, black WhatsApp pill right). Centred headline at ~5.5rem, one line of support under it. Below, the Açaí do GQ site in a wide rounded screen filling the lower 60% of the viewport, caption "Açaí do GQ. Cliente real. Visitar o site ›" under it. The primary action is the pill, visible without scrolling.

FORM: Product-launch page, user-pinned (canon chosen in words over the rolled directions). seed:465bdf7ff31770ac

SIGNATURE: Scroll is the control. The hero pins; the screen grows to full bleed while the real Açaí site scrolls inside it frame by frame (the cup fills, the toppings land), and scrolling back empties it. Each project chapter repeats the grammar at smaller scale: its giant name sits behind the screen and its own scroll plays as you pass. Everything else moves little: masked line reveals on chapter titles, press feedback on buttons, chevrons that nudge, a copy-to-clipboard toast for the e-mail, a nav that steps aside on scroll down.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
