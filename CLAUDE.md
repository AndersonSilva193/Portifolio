# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio of Anderson Silva (Java back-end developer, Curitiba/PR), aimed at recruiters (CLT/internship) and freelance clients. It is a static site in Portuguese (`lang="pt-BR"`): plain HTML, CSS and vanilla JS, with no build step, package manager, linter or tests. The README is only a title.

## Running

Open `index.html` in a browser, or serve the folder with any static server (e.g. `python -m http.server`). Deployment is by pushing to `main` (published at andersonsilva193.github.io/Portifolio/).

## Architecture

- `index.html` — single page with sections `#inicio` (hero), `#sobre`, `#projetos`, `#tecnologias`, `#contato`. Projects are hand-written `<article class="card">` elements, split into "Projetos em produção" (`.grid-featured`) and "Projetos de estudo". Adding a project means copying a card and adding an image to `img/`.
- `css/style.css` — theming through CSS variables on `:root` (`--bg`, `--card`, `--text`, `--muted`, `--border`, `--accent`, `--on-accent`). The light theme is `body.light`, which overrides the same variables. Links are unstyled by default; buttons use `.btn`, `.btn-primary`, `.btn-outline` and card links use `.links a`.
- `js/script.js` — theme toggle only. It toggles `body.light`, swaps the `src` of the icon inside `#themeBtn` (`img/dark.png` / `img/sun.png`), and persists the choice in `localStorage` (falls back to `prefers-color-scheme`).
- `Anderson_Silva_CV_Java_Backend.pdf` — resume linked from the hero "Baixar currículo" button. Keep it consistent with the projects and stack shown on the site.

## Gotchas

- Contact data (WhatsApp `5541984018011`, e-mail, LinkedIn, GitHub) is duplicated in the hero, the contact section and the resume; update all of them together.
- Image paths are relative (`img/...`) and filename casing matters on case-sensitive hosts (e.g. `JavaAPI.jpg`, `MySpotify.jpg`).
- Do not invent metrics or experience in the copy; the resume is the source of truth (first professional opportunity in software, Angular at a basic level, bilingual support experience at Concentrix).
