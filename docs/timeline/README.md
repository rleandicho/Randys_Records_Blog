# Design timeline

A visual history of how the blog looks as it changes. Newest entries go at the top.
Each entry gets its own dated folder of screenshots (`YYYY-MM-DD-short-name/`).

How to add an entry:

1. `npm run build && npx vite preview`
2. Screenshot the home page (desktop and mobile) and one post page.
3. Drop them in a new dated folder here and add a section below: what changed and why.

---

## 2026-11-22 · Going live

First push to `main`. New tagline ("Blog posts about my life in tech, works in progress, and current learnings"), the footer now says "Page contains AI Generated Content", and the LED wash under the shelves is 25% dimmer (`--shelf-light` in `src/records.css`, 1 is full brightness). The live site launches with an empty wall. All the starter posts, including the test pressing and the instruction sheet, moved to `src/posts/private/`, which git ignores: they only show on Randy's computer under `npm run dev`.

| Live site, empty wall | Private posts on Randy's computer, dimmer lights |
| --- | --- |
| ![Live](2026-11-22-go-live/17-live-empty.png) | ![Private](2026-11-22-go-live/17-private-posts-dimmer.png) |

## 2026-11-22 · Slat wall with lit shelves

Randy picked the walnut slat wall and asked for more character, with light under the shelves like his reference photos. The wall now runs the full width of the page down into the footer. It has rounded walnut slats over black acoustic felt, each slat a slightly different tone with grain running along it, three warm ceiling spots fading down the wall, and darker corners. The ledges are light oak floating shelves with a warm LED strip tucked underneath that washes light down the slats. The labels are trimmed: no "Randy's Records" line, the year moves from the label to the sleeve sticker, the post number replaces "Vinyl LP", and the accession number after the date is gone.

![The wall](2026-11-22-slat-wall/16-wall.png)

| Shelf light up close | Phone |
| --- | --- |
| ![Shelf light](2026-11-22-slat-wall/16-shelf-light.png) | ![Phone](2026-11-22-slat-wall/16-mobile.png) |

![Home, desktop](2026-11-22-slat-wall/16-home-desktop.png)

---

## 2026-11-22 · Museum labels and album-art stickers

The cards under each record are now museum wall labels, styled after the one Randy sent: maker in bold, the title in bold italics with the year, a "medium" line (Vinyl LP and read time), then the summary and a date line with an accession-style number. The Play button is gone; clicking the sleeve or the record opens the post. Each record's center sticker is now the album art. Hovering a sleeve slides the record out until half the sticker shows, and it spins for as long as the sleeve or record is hovered; the empty wall above a sleeve no longer triggers it. The grey wall panel is gone too (option A below), so the shelves hang straight on the page.

![The wall](2026-11-22-museum-labels/15-wall.png)

Options shown for the space behind the shelves:

![Wall options](2026-11-22-museum-labels/15-wall-options.png)

| Home (desktop) | Phone |
| --- | --- |
| ![Home, desktop](2026-11-22-museum-labels/15-home-desktop.png) | ![Phone](2026-11-22-museum-labels/15-mobile.png) |

---

## 2026-11-22 · Records on the wall

Records are bigger than tapes, so they're shown the way people actually display them: face-out on stained wood picture ledges on a painted wall (Randy's reference photo), three to a shelf on desktop and two on phones. Each sleeve leans back slightly against the wall and has a label card under the ledge with the date, title, summary and a Play button. Hovering straightens the sleeve and slides the record up out of the top. Clicking still flies it onto the turntable. On phones, the desk now shows only the turntable.

![The wall](2026-11-22-record-wall/14-wall.png)

![A record sliding up out of its sleeve, left to right](2026-11-22-record-wall/14-record-rising.png)

| Home (desktop) | Phone |
| --- | --- |
| ![Home, desktop](2026-11-22-record-wall/14-home-desktop.png) | ![Phone](2026-11-22-record-wall/14-mobile.png) |

---

## 2026-11-22 · Everything on the desk at true scale

Randy felt the turntable's scale was off, and it was. The record was only about half the turntable's width (a real 12-inch record covers about two thirds), and the body was too shallow. The gear also wasn't drawn at one scale. Now everything is sized in real millimeters: the turntable is 450 × 368 mm with a 296 mm platter, a 302 mm record and a 223 mm tonearm; the keyboard is about 355 mm wide; the monitor is a 612 mm 27-inch panel; and the mouse, desk mat and sticky notes match. On the desktop layout the turntable and the computer side share the same scale.

![The desk at true scale](2026-11-22-true-scale/13-desk.png)

| Turntable, playing | Phone |
| --- | --- |
| ![Turntable](2026-11-22-true-scale/13-turntable.png) | ![Phone](2026-11-22-true-scale/13-mobile.png) |

---

## 2026-11-22 · Desk gear, closer to the real thing

The arms and the coffee mug are gone, and the desk mat is plain black with no stitching. The keyboard is now modeled on Randy's tenkeyless board: a black plate with floating keys, real legends, the arrow and navigation cluster, a small OLED and a metal roller in the top-right corner, a warm three-color glow under the keys, and a wrist rest. The mouse is a wireless one with no cable. The monitor is drawn straight from above (stand foot, back of the panel, thin lit front edge, light falling on the desk) instead of the tilted screen that looked like it faced two ways. The turntable got real parts: a knurled counterweight, a gimbal, an anti-skate dial, a cue lever, an arm rest with a clip, an offset headshell with a finger lift, round brushed buttons and a felt mat.

![The desk](2026-11-22-desk-gear/12-desk.png)

| Computer side | Turntable, playing |
| --- | --- |
| ![Computer](2026-11-22-desk-gear/12-computer.png) | ![Turntable](2026-11-22-desk-gear/12-turntable.png) |

![Phone](2026-11-22-desk-gear/12-mobile.png)

---

## 2026-11-22 · Back to records, with a desk

Randy switched back to the original idea: every post is a vinyl record, and the player is a turntable. The top of the home page is now his desk seen from above. A gloss-black belt-drive turntable (modeled on the Yamaha TT-N503 look, without any branding) sits on the left. On the right is a computer: monitor with code typing itself out, a keyboard with three-color accent keys, a mouse, a mug, sticky notes, and his arms typing. The crate under the desk holds record sleeves spine-out. Hovering one pulls the sleeve up and slides the record out next to the summary. Clicking flies the record onto the platter, the tonearm swings over, the platter spins, and the post opens with the turntable at the top.

![The desk](2026-11-22-records-and-desk/11-desk.png)

![A record sliding out of its sleeve, left to right](2026-11-22-records-and-desk/11-record-sliding-out.png)

| Record on the platter | Post page |
| --- | --- |
| ![Playing](2026-11-22-records-and-desk/11-playing.png) | ![Post page](2026-11-22-records-and-desk/11-post.png) |

| Home (desktop) | Phone |
| --- | --- |
| ![Home, desktop](2026-11-22-records-and-desk/11-home-desktop.png) | ![Phone](2026-11-22-records-and-desk/11-mobile.png) |

---

## 2026-11-22 · Cases that open

"On repeat" is gone from the spines. Each tape now sits inside a clear case with a printed J-card on the lid. When you hover (or tap on a phone), the case slides out of the drawer, the lid swings open on its left hinge, and the tape slides out in front of it next to the summary. Clicking plays the opening first, then flies the tape up into the deck.

![Opening sequence, left to right](2026-11-22-case-opening/10-opening-sequence.png)

| Case open (desktop) | Phone, after tapping a case |
| --- | --- |
| ![Case open](2026-11-22-case-opening/10-hover.png) | ![Phone, after a tap](2026-11-22-case-opening/10-mobile-tap.png) |

---

## 2026-11-22 · Back to the design board: a drawer of tape cases

Randy wanted it to feel less like a product page and more like a personal blog, inspired by tapes stored spine-out in drawers and on shelves. The rack of cards is gone. The deck is now centered, and below it sits a painted wooden drawer with each post as a tape in its case, spine out. Hovering a case (or tapping on a phone) slides the tape out with a summary of the post. Clicking it, or "Play tape", flies the tape up into the deck and opens the post. The masthead is centered and smaller.

| Home (desktop) | Hovering a case |
| --- | --- |
| ![Home, desktop](2026-11-22-tape-drawer/09-home-desktop.png) | ![Hovering a case](2026-11-22-tape-drawer/09-hover.png) |

| Tape flying into the deck | Phone, after tapping a case |
| --- | --- |
| ![Tape flying into the deck](2026-11-22-tape-drawer/09-tape-flying.png) | ![Phone, after a tap](2026-11-22-tape-drawer/09-mobile-tap.png) |

---

## 2026-11-22 · Genres out, "Contact me" in

Genres are gone for now: no filter tabs, no tag chips on tapes or post pages, and the sidebar stat shows total minutes instead. The tabs are now "All tapes" and "Contact me". Contact me is a new page whose details come from `src/contact.js`.

| Home (desktop) | Contact (desktop) | Contact (mobile) |
| --- | --- | --- |
| ![Home, desktop](2026-11-22-contact/08-home-desktop.png) | ![Contact, desktop](2026-11-22-contact/08-contact-desktop.png) | ![Contact, mobile](2026-11-22-contact/08-contact-mobile.png) |

---

## 2026-11-22 · PLAY loads the first tape

Removed the "How to play" heading and the "Insert coin · 1P start" line from the sidebar card. Pressing PLAY on the empty deck now flies the first tape on the rack into the deck and opens it. If a genre filter is on, it uses the first tape in that filter.

| Home (desktop) | PLAY pressed |
| --- | --- |
| ![Home, desktop](2026-11-22-play-first/07-home-desktop.png) | ![PLAY loading the first tape](2026-11-22-play-first/07-play-loads-first-tape.png) |

---

## 2026-11-22 · Straight tapes

Randy didn't like the tilted tapes, so every tape on the rack now sits straight. They still lift on hover and swing a little as they fly into the deck.

![Tapes close up](2026-11-22-straight-tapes/06-tapes-closeup.png)

| Home (desktop) | Home (mobile) |
| --- | --- |
| ![Home, desktop](2026-11-22-straight-tapes/06-home-desktop.png) | ![Home, mobile](2026-11-22-straight-tapes/06-home-mobile.png) |

---

## 2026-11-22 · Label-card tapes

Randy picked style A from the tape options, with the title centered on the ruled lines. Each tape is now a plain shell with one cream label across the face, the title in Silkscreen on two ruled lines, and a three-color band along the bottom (`band` front matter: `sunset`, `ocean`, `lime`, `berry`, `night`).

![Tapes close up](2026-11-22-label-cards/05-tapes-closeup.png)

| Home (desktop) | Home (mobile) |
| --- | --- |
| ![Home, desktop](2026-11-22-label-cards/05-home-desktop.png) | ![Home, mobile](2026-11-22-label-cards/05-home-mobile.png) |

**Post page**

![Post page, desktop](2026-11-22-label-cards/05-post-desktop.png)

---

## 2026-11-22 · Silkscreen tape font

Randy picked **Silkscreen** (a free pixel font) for the tape titles. Long titles wrap onto two lines instead of being cut off.

| Home (desktop) | Home (mobile) |
| --- | --- |
| ![Home, desktop](2026-11-22-silkscreen/04-home-desktop.png) | ![Home, mobile](2026-11-22-silkscreen/04-home-mobile.png) |

**Post page**

![Post page, desktop](2026-11-22-silkscreen/04-post-desktop.png)

---

## 2026-11-22 · Tweaks after Randy's first look

- Removed the extra captions (vertical title, subtitle under the masthead, deck caption, labels).
- Rainbow cut down to three colors (red, orange, yellow) everywhere: cover stripe, footer, liner-notes bar and tape patterns.
- Removed the "New tapes!" starburst.
- The top line now lists the tech stack instead of "Vol. 03".
- "Mixtape" is now just "tape" across the site.

| Home (desktop) | Home (mobile) |
| --- | --- |
| ![Home, desktop](2026-11-22-tweaks/03-home-desktop.png) | ![Home, mobile](2026-11-22-tweaks/03-home-mobile.png) |

**Post page**

![Post page, desktop](2026-11-22-tweaks/03-post-desktop.png)

---

## 2026-11-22 · Retro game-magazine look, first build

First pass at the redesign, built into the site. Randy picked the desk deck (his Gemini image) for the player. Tape font is Kaushan Script for now, pending Randy's pick.

- Light "printed magazine" paper, a huge masthead, a vertical title, a "New tapes!" starburst and a rainbow stripe across the cover.
- Boombox replaced by a silver portable cassette deck: piano keys (EJECT / REW / FF / PLAY / STOP / PAUSE), VU meters, a tape counter, a volume wheel and a smoked-glass door.
- Tapes restyled Awesome-Mix style: plain shell, handwritten title strip, patterned front (rainbow, diagonal, dots, checker, bands, plaid).
- Chunky bordered cards with hard shadows, an "Insert coin" blink, and a green handheld-screen tracklist on post pages.

Screenshots of this build were removed. The entry above shows the same design after the first round of tweaks.

---

## 2026-11-22 · Explorations for the retro redesign

Not shipped yet. These are the options on the table.

**Tape title fonts.** Six free Google Fonts on Awesome-Mix-style tapes (patterned front, title on a strip above).

Randy liked #3 (Press Start 2P) but wanted more in that direction, so here's a second round of pixel and arcade fonts:

![More pixel font options](2026-11-22-explorations/tape-font-options-pixel.png)

**Tape styles.** After Silkscreen went in, Randy wanted the tapes themselves to look different. Four directions next to the current one:

![Tape style options](2026-11-22-explorations/tape-style-options.png)

**Tape player.** A: a desk deck based on Randy's Gemini image. B: Claude's take, a handheld tape player shaped like an old pocket game console. Randy picked A.

**Home page direction.** Retro game-magazine cover: big masthead, rainbow stripes, Game Boy greens, chunky bordered cards, handheld player in the sidebar.

---

## 2026-11-22 · Cassettes and a boombox (starting point)

The "record store" blog after the switch from vinyl to mixtapes. Dark wood rack, pink neon sign, each post a cassette with a handwritten title label. Clicking a tape flies it into the boombox, the door shuts and the reels spin. Post pages have PLAY / STOP / EJECT.

| Home (desktop) | Home (mobile) |
| --- | --- |
| ![Home, desktop](2026-11-22-cassettes/01-home-desktop.png) | ![Home, mobile](2026-11-22-cassettes/01-home-mobile.png) |

**Post page**

![Post page, desktop](2026-11-22-cassettes/01-post-desktop.png)
