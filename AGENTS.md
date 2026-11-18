# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project

Personal portfolio of Anderson Silva (Java back-end developer, Curitiba/PR), aimed at recruiters (CLT/internship) and freelance clients. It is a static site in Portuguese (`lang="pt-BR"`): plain HTML, CSS and vanilla JS, with no build step, package manager, linter or tests. The README is only a title.

## Running

Open `index.html` in a browser, or serve the folder with any static server (e.g. `python -m http.server`). Deployment is by pushing to `main` (published at andersonsilva193.github.io/Portifolio/).

## Architecture

- `index.html`: single page with `#inicio` (hero), `#sites` (three project chapters plus the phone lineup), `#sistemas` (AgendaBarber panel and GitHub study repos), an about block, and `#contato`. Each project chapter is an `<article class="chapter">` with a giant name (`.giant`, sized per word through `--fit`), a `.screen` holding a poster `<img>` and a `<canvas>`, and a `.chapter-text` block. `--seq-bg` sets the chapter ground to the site's own colour; `data-tone="dark"` switches the text to light; `--focus` moves the horizontal crop of the frames.
- `img/seq/<site>/d_###.webp`: real scroll captures of each live site at 1440x700. `data-seq` names the folder and `data-frames-d` the frame count. `m_000.webp` is the phone poster used in the lineup. To add or refresh a project, recapture its frames with headless Chrome at 1440x700 and update `data-frames-d`.
- `css/style.css`: light only. Tokens on `:root` (`--bg`, `--ink`, `--ink-2`, `--line`, `--bezel`, `--wash`). Buttons: `.pill` (primary, black), `.ghost` (outlined), `.more` (underlined text link with a CSS chevron `.chev`). Geist variable is self-hosted from `fonts/`.
- `js/script.js`: nav hide/show and current-section underline, copy-email button with toast, phone tilt, the `FrameSeq` canvas loader, and the GSAP scenes inside `gsap.matchMedia`: pinned hero that scales the Açaí screen to full bleed while its frames scrub, chapter scrubs, masked title reveals, lineup stagger. GSAP 3.12.5 and ScrollTrigger load from cdnjs; without them, or with reduced motion or Save-Data, the page stays complete with static posters.
- `Anderson_Silva_CV_Java_Backend.pdf`: resume linked from the about block and the contact section. Keep it consistent with the projects and stack shown on the site.
- `PRODUCT.md` and `.impeccable/`: design context (product truth, direction contract, comps, build state, cinematic brief and asset manifest). `.impeccable/` is a dot-folder, so GitHub Pages does not publish it.

## Gotchas

- Contact data (WhatsApp `5541984018011`, e-mail, LinkedIn, GitHub) is duplicated in the nav pill, the lineup CTA, the contact section and the resume; update all of them together.
- Image paths are relative (`img/...`) and filename casing matters on case-sensitive hosts.
- Copy is pt-BR and follows the humanizer rules: no em or en dashes, no "não é X, é Y" staging, no forced triads. Concept projects (Volt Ride, Kumara 8K) stay labeled as concept.
- Do not invent metrics or experience in the copy; the resume is the source of truth (first professional opportunity in software, Angular at a basic level, bilingual support experience at Concentrix).
