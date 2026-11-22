# Randy's Records

A blog about my tech projects, styled like a retro game magazine. The top of the home page is my desk seen from above: a turntable on the left and my computer setup on the right. Every post is a record in its sleeve, standing face-out on wooden wall ledges below the desk, with a museum-style label underneath. Hover a sleeve and the record slides halfway out, showing its album-art sticker, and spins. On phones the desk shows only the turntable. Click the sleeve or record and it flies onto the turntable, the arm drops, and the post opens.

Built with **React + Vite + plain CSS**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # production build in dist/
```

## Write a post

Add a Markdown file to `src/posts/`. The filename becomes the URL (`#/record/<filename>`).

```markdown
---
title: My Cool Project
description: One or two sentences for the label card under the record.
date: 2026-12-01
tags: [hardware, rust]
---

Intro paragraph...

## First track
Each `##` heading shows up in the record's tracklist.
```

Optional front matter: `short` (sticker and label text if the title is long), `color` (sleeve color), `band` (`sunset`, `ocean`, `lime`, `berry`, `night`), `art` (`stripes`, `sunrise`, `rings`, `dots`, `bars`), `draft: true`.

Private posts go in `src/posts/private/` (images in `public/private/`). Git ignores both folders, so those posts only exist on your computer and only show while `npm run dev` is running.

The lettering on every sleeve and record label comes from `--font-tape` in `src/styles.css`. Change that one line (and the Google Fonts link in `index.html`) to switch fonts.

`tags` are still read from front matter but aren't shown on the site yet.

See the "How to Press a New Record" sheet (kept as a private post) for the full list.

## Contact page

Edit `src/contact.js` to change what the "Contact me" page shows. Empty entries are hidden.

## Project layout

```
src/
  posts/            Markdown posts (the records)
  lib/records.js    Loads posts, picks sleeve colors and art, catalog numbers, tracklists
  components/       Turntable, Vinyl, Sleeve, RecordSleeve, DeskComputer, Masthead, Tabs
  pages/            Home (desk + wall of records), RecordPage (the listening booth), Contact
  contact.js        What the Contact me page lists
  styles.css        Page styling (cover, post page, contact)
  records.css       Desk, turntable, records, sleeves and the wall shelves
docs/timeline/      Dated screenshots of how the design has changed
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.
One-time setup: **Settings → Pages → Source: GitHub Actions**.
The site will live at `https://rleandicho.github.io/Randys_Records_Blog/`. `base` in `vite.config.js` is relative, so it also works on a custom domain.
