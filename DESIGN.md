---
name: Anderson Silva
description: Portfolio of a Curitiba developer, staged like a product launch where each site is the product.
colors:
  paper: "#f8f8f7"
  ink: "#0e0e10"
  ink-soft: "#55555b"
  hairline: "#e2e2df"
  bezel: "#111113"
  wash: "#efeeeb"
  chapter-ink-soft: "#4e4c47"
  night-ink: "#f4f2ee"
  night-ink-soft: "#b9b4ab"
  live-signal: "#3ddc84"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.6rem, 5.3vw, 6rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  giant:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "min(15rem, calc(var(--fit, 15) * 1vw))"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 5.2vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 2rem)"
    fontWeight: 700
    letterSpacing: "-0.025em"
  lede:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.12rem, 1.6vw, 1.4rem)"
    fontWeight: 400
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  pill: "999px"
  screen: "22px"
  screen-mobile: "14px"
  portrait: "28px"
  row: "10px"
  focus: "6px"
spacing:
  gutter: "24px"
  gutter-tight: "16px"
  bar: "62px"
  bar-mobile: "56px"
  wrap: "1120px"
  chapter-wrap: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.78em 1.35em"
  button-primary-hover:
    backgroundColor: "#2a2a2e"
  button-primary-lg:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "1em 1.6em"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "1em 1.5em"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  link-more:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  screen:
    backgroundColor: "{colors.wash}"
    rounded: "{rounded.screen}"
  repo-row:
    rounded: "{rounded.row}"
    padding: "20px 8px"
  repo-row-hover:
    backgroundColor: "rgb(255 255 255 / .7)"
    padding: "20px 16px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
---

# Design System: Anderson Silva

## Overview

**Creative North Star: "The Launch Stage"**

The page is a quiet stage and every site is the product being launched on it. The house itself owns almost nothing: a near-white paper ground, near-black ink, one variable sans at two extremes of weight, and screens with a thin dark bezel. Colour, texture and personality enter only through the work, which is shown at a size where its craft is legible, and each project chapter borrows its ground and its giant name colour from that site's own first frame.

Density is low and deliberate. One idea per viewport, enormous type, wide silence around the screen. Scroll is the control surface: the hero pins and its screen grows to full bleed while the real site plays frame by frame, chapters scrub their own site as they pass, and everything else moves very little. The system is light only (`color-scheme: light`); there is no theme switch in the build.

The world rejects the developer-portfolio vocabulary of equal project cards in a grid and rows of technology pills. Technology is named in plain sentences.

**Key Characteristics:**
- Neutral house, colourful work: no house accent; colour comes from the shown sites.
- Geist 800 at -0.04em for display, Geist 400 for reading.
- Real site captures inside bezelled screens, played by scroll.
- One black pill per context for the WhatsApp action; everything else is an underlined link with a CSS chevron.
- Long, soft, low shadows; no borders on surfaces except hairline list rules.

## Colors

A warm-neutral paper and ink palette with no accent of its own; hue belongs to the projects.

### Primary
- **Press Ink** (ink): text, the primary pill, the toast, selection background, the active state of the ghost button. It is the only "action" colour the house owns.

### Neutral
- **Gallery Paper** (paper): page ground and the browser `theme-color`.
- **Wash Stone** (wash): ground of the systems section and the default fill of a screen before frames load.
- **Graphite** (ink-soft): secondary copy, ledes, captions, footer, repo descriptions.
- **Hairline** (hairline): footer rule. List rules in the repo list use a slightly darker one-off (`#d9d8d3`).
- **Bezel Black** (bezel): the screen bezel and the phone frame. On dark chapters the screen bezel lifts to `#26262a` so it still reads against the ground.
- **Chapter Graphite** (chapter-ink-soft): secondary text inside light project chapters.
- **Night Ink / Night Ink Soft** (night-ink, night-ink-soft): primary and secondary text inside dark chapters (`data-tone="dark"`).

### Signal
- **Live Green** (live-signal): only the small "No ar" status dot in the hero tag, with a 3px halo at 25% alpha. It is a status light, not an accent.

### Named Rules
**The Borrowed Colour Rule.** The house has no accent. A project chapter sets its ground (`--seq-bg`) to the background of that site's first frame and its giant name (`--giant`) to that site's own brand colour; `data-tone` switches the chapter text to Night Ink when the ground is dark. Never introduce a house hue to "tie the page together".

**The One Black Button Rule.** Press Ink filled pills are reserved for the WhatsApp action (bar, lineup, contact). Every other action is a ghost pill or a text link.

## Typography

**Display Font:** Geist variable, self-hosted woff2 (100 to 900, latin and latin-ext subsets), falling back to ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif.
**Body Font:** Geist, same file.

**Character:** One family pushed to two poles. Display is Geist 800 with tight tracking (-0.04em) and near-solid leading, so headlines sit like product names; text is Geist 400 at a comfortable 1.55 leading.

### Hierarchy
- **Display** (800, clamp(2.6rem, 5.3vw, 6rem), 1.04): the hero headline only. On phones clamp(2.45rem, 11.2vw, 3.4rem) at 1.02.
- **Giant** (800, min(15rem, fit x 1vw), 0.86, no wrap): the project name behind each chapter screen. `--fit` is tuned per name so it spans the chapter width; it is decorative and `aria-hidden`, with the real heading in the chapter text.
- **Headline** (800, clamp(2.3rem, 5.2vw, 5rem), 1.04): section titles (lineup, systems, contact), always inside a masked reveal line. A smaller step (800, clamp(1.8rem, 3.2vw, 2.8rem), -0.035em) serves the about heading.
- **Title** (700, clamp(1.5rem, 2.2vw, 2rem), -0.025em): chapter project names. List titles use 700 at 1.35rem.
- **Lede** (400, clamp(1.12rem, 1.6vw, 1.4rem), -0.01em, max 60ch): the paragraph under a section headline, in Graphite. The hero support line is the same voice at clamp(1.02rem, 1.72vw, 1.55rem).
- **Body** (400, 1.0625rem, 1.55): reading text; chapter copy 1.08rem capped at 56ch, about copy 1.12rem at 62ch, captions 72ch.
- **Label** (600, 1rem, line-height 1): buttons, link text, phone names. Repo names 650 at 1.1rem; stack notes 0.9rem in Graphite.

### Named Rules
**The Two Weights Rule.** Headings are 800 or 700, text is 400, labels are 500 to 650. No light or thin display weights.

**The Balanced Line Rule.** Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

## Layout

Full-width sections stacked on a single column; content sits in a 1120px wrap with 24px gutters, chapters in a 1240px inner column (16px gutters on phones). Section padding is fluid, roughly clamp(72px to 110px at the small end, 128px to 190px at the large end), so the rhythm opens up with the viewport.

- **Bar:** fixed, 62px (56px under 768px). Name left, three links centred absolutely, the WhatsApp pill right. Transparent at the top; after 8px of scroll it gains an 84% paper fill with an 18px saturated blur and a 1px hairline shadow. Past 160px it slides up on scroll down and returns on scroll up or when it receives focus. Links hide on phones; the pill stays.
- **Hero stage:** one full viewport (100svh, min 600px), centred headline and support line, the screen anchored to the bottom at min(70.6vw, (100svh - 300px) x 2.057) and 1440/700, a caption under it.
- **Chapter:** giant name, then the screen pulled up over it by a negative margin (clamp(-60px, -3vw, -22px)), then a two-column text grid (copy left, "Visitar o site" link bottom-right). On phones the grid collapses to one column and the link moves under the copy.
- **Lineup:** four phones in a 4-column grid (max 1120px) with perspective; on phones it becomes a horizontal scroll-snap rail at 58vw per phone with hidden scrollbar.
- **Repo list:** full-width rows on a four-column grid (name, description, stack, chevron); on phones name, description and stack stack in one column with the chevron pinned right.
- **Breakpoint:** one, at 767px / 768px. Reduced motion is treated as a separate layout state (see Components, Motion).

## Elevation & Depth

Depth comes from long, soft, low-hanging shadows under screens and devices, never from borders or tonal card stacks. Shadows have a large negative spread so they pool under the object instead of haloing it. The page itself is flat; only shown work and floating UI (pill hover, hero tag, toast) lift.

### Shadow Vocabulary
- **Hero screen** (`0 34px 60px -26px rgb(20 14 16 / .42), 0 12px 24px -14px rgb(20 14 16 / .28)`): the pinned hero screen at rest; animates to none as it reaches full bleed.
- **Chapter screen** (`0 40px 70px -30px rgb(0 0 0 / .5), 0 14px 28px -16px rgb(0 0 0 / .35)`): screens in light chapters. On dark chapters `0 40px 80px -30px rgb(0 0 0 / .9), 0 0 0 1px rgb(255 255 255 / .08)`, the 1px light ring separating the screen from a near-black ground.
- **Panel screen** (`0 40px 70px -32px rgb(0 0 0 / .45), 0 14px 24px -16px rgb(0 0 0 / .25)`): the systems demo.
- **Phone** (`0 30px 50px -28px rgb(0 0 0 / .55), 0 10px 18px -12px rgb(0 0 0 / .3)`), deepening on hover to `0 44px 60px -30px rgb(0 0 0 / .6), 0 14px 22px -14px rgb(0 0 0 / .3)`.
- **Pill** (`0 1px 2px rgb(0 0 0 / .12)` at rest, `0 8px 20px -8px rgb(0 0 0 / .45)` on hover).
- **Floating chip** (`0 10px 30px -12px rgb(0 0 0 / .35)`) for the hero tag; **toast** `0 18px 40px -16px rgb(0 0 0 / .5)`.

### Named Rules
**The Pooled Shadow Rule.** Every shadow pairs a long blur with a negative spread equal to roughly half its blur, offset downward. No hard offset shadows, no glows, no shadows on text.

## Shapes

Two shape families. Interactive chrome is fully round (999px): pills, ghost buttons, the hero tag and its chips, the toast, the skip link. Shown work sits in softly rounded rectangles: screens at 22px (14px on phones), phones at clamp(22px, 2.8vw, 40px), the portrait at 28px. The screen bezel is an inset 9px Bezel Black border drawn by a pseudo-element (5px on phones), so it can fade out (`--bezel-o`) when the hero screen goes full bleed. Repo rows round to 10px only so their hover fill has soft corners. Focus rings are 2px currentColor at 4px offset with a 6px radius.

Chevrons are drawn in CSS: two borders of a small square at 0.12em, rotated 45deg for "go" and 135deg for "download".

## Components

### Buttons
Quiet, tactile, with press feedback on every one.
- **Shape:** full pill (999px), content centred with a 0.55em gap for an inline SVG icon at 1.15em.
- **Primary (pill):** Press Ink fill, white label, 600 weight, padding 0.78em 1.35em. Small variant 0.95rem at 0.72em 1.2em (bar); large variant 1.15rem at 1em 1.6em with tabular figures (phone number in contact).
- **Hover / Active:** fill lifts to `#2a2a2e` and the shadow deepens; `:active` scales to 0.97 in 150ms on the house ease.
- **Ghost:** transparent with a 1px currentColor border, 500 weight, 1em 1.5em. Hover and the confirmed state (`is-done`, after copying the e-mail) invert to ink fill and paper text.

### Text links (more)
- 600 weight, underline 1.5px at 0.28em offset in currentColor at 35%, going to full currentColor on hover.
- Ends in a CSS chevron that nudges 0.18em forward on hover (the download chevron drops instead). Used for every "Visitar o site", social link and resume download.

### Navigation
- Brand wordmark in 700 at 1.65rem (1.25rem on phones), -0.025em.
- Links 500 at 1.05rem; a 1.5px underline wipes in from the left on hover and marks the current section (`is-current`, set by an IntersectionObserver), wiping out to the right.

### Screen (signature)
The frame every site is shown in. A rounded rectangle with an inset dark bezel, a static `<picture>` poster (the first captured frame, `object-fit: cover`, aligned to the top with a per-screen horizontal `--focus`), and a canvas above it that fades in (250ms) once frames load and is driven by scroll. Its fill before load is the chapter ground (`--seq-bg`), so nothing flashes.

### Project chapter
A full-width band whose ground is the site's own first-frame colour, with `data-tone` light or dark. The giant name sits behind the screen in the site's brand colour and drifts from +8% to -8% vertically across the chapter's pass. Below the screen: title, one short paragraph, a spec line (status and stack, in body weight 500 and full ink) and the "Visitar o site" link.

### Phone lineup
Four phone frames (585/1186, Bezel Black border clamp(5px, 0.6vw, 8px)) showing the real mobile first frame of each site, name beneath. With a fine pointer the glass tilts toward the cursor (up to 10deg Y, 8deg X); hover lifts it 10px and slides in a chevron after the name; press settles it to -4px at 0.985 scale.

### Repo list
Rows between hairline rules: name (650), one-line description, stack note, chevron. Hover fills the row with 70% white and widens its side padding from 8px to 16px, and the chevron nudges.

### Hero tag and toast
- **Hero tag:** a white 90% pill holding small round chips (`#f1f0ed`), the last one an ink "No ar" chip with the Live Green dot. It rises in near the end of the hero pin.
- **Toast:** an ink pill fixed bottom-centre, sliding up 20px and fading in over 450ms; it confirms the e-mail copy and dismisses after 2.6s. It is a `role="status"` live region.

### Motion
One easing for UI, `cubic-bezier(.16,1,.3,1)`, used for every CSS transition. GSAP 3.12.5 with ScrollTrigger drives scroll scenes.
- **Hero signature (one per page):** the hero stage pins for 230% of the viewport (170% on phones), scrub 0.6. Copy lifts and fades in the first 16%, the screen scales to cover the viewport while its radius, shadow and bezel go to zero, the site's frames play to 80% of the sequence, and the hero tag rises at 62%.
- **Chapter scrub:** each chapter screen maps scroll from top 85% to bottom 15% onto its frame sequence (scrub true); the systems demo maps top 80% to center 35%.
- **Masked title reveal:** section headlines rise 104% from behind an overflow mask, 0.9s expo.out, once, at top 86%.
- **Lineup stagger:** phones rise 70px and fade in, 0.9s expo.out, 70ms apart, once.
- **Press feedback:** 150ms scale to 0.97 on pills and ghosts; chevrons and underlines in 200 to 350ms.
- **Frames:** WebP sequences, every frame on desktop, every second frame on phones, loaded lazily when within 120% of the viewport.
- **Reduced motion and Save-Data:** no scroll scenes, no canvas; screens show static posters (where a later frame tells the story better, a `prefers-reduced-motion` `<source>` serves it), and CSS transitions collapse to 0.01ms. Without GSAP the page is complete and static.

## Do's and Don'ts

### Do:
- **Do** show only real captures of the live sites (desktop `d_###.webp`, mobile `m_###.webp` sequences and their first-frame posters). Every screen, phone and poster must come from the shipped site it links to.
- **Do** label concept work as concept in the chapter spec line ("Projeto conceito"), and say when a brand is a third party with no relationship.
- **Do** set a new chapter's `--seq-bg` from that site's first frame, its `--giant` from that site's brand colour, its `data-tone` from the ground's lightness, and tune `--fit` so the giant name spans the chapter.
- **Do** keep one pinned, full-bleed scroll signature per page (the hero); other screens scrub in place.
- **Do** give every pressable element press feedback (scale 0.97 at 150ms or an equivalent settle).
- **Do** write copy in pt-BR, in plain sentences: no em or en dashes, no forced lists of three, no inflated claims, no invented metrics.
- **Do** keep the reduced-motion page complete with meaningful static posters.

### Don't:
- **Don't** use generated, illustrated or mocked-up imagery of the work, or stock photography.
- **Don't** introduce a house accent colour or tint the paper toward a hue.
- **Don't** add a second filled black button in the same view, or fill a non-WhatsApp action.
- **Don't** present projects as a grid of equal cards or list a stack as a row of technology pills; name the stack in a sentence or a muted note. The hero tag is a single fact strip (name, status, one stack word), not a stack list.
- **Don't** use icon glyphs or emoji for arrows; chevrons are CSS and icons are inline SVG.
- **Don't** use hard offset shadows, glows or bordered card surfaces; depth is the pooled shadow under shown work.
- **Don't** add small uppercase labels above headings.
