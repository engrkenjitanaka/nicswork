---
name: nicswork
description: Dark screening-room portfolio for a multimedia designer — near-black ground, one warm practical light, and the client's own footage and print work as the only bright things on the page.
colors:
  ink: "#08090A"
  panel: "#101113"
  panel-2: "#17191C"
  line: "#26282C"
  chalk: "#F4F3F1"
  mute: "#9B9894"
  amber: "#E0A95F"
typography:
  display: "Poppins, 300–600"
  script: "Sacramento, 400"
rounded:
  none: "0"
  hairline: "2px"
  pill: "9999px"
spacing:
  section: "6rem / 8rem (py-24 / sm:py-32)"
  gutter: "clamp(1rem, 4vw, 3rem)"
  shell: "1280px"
components:
  - nav-pill
  - lite-video-facade
  - collection-stack
  - gallery-dialog
  - capability-rail
  - copy-control
---

# Design System: nicswork

## Overview

**Creative North Star: "A reel, not a résumé."**

The page is a dark screening room. The ground gives off no light of its own; the
only bright things are Jonji's footage and his printed work. Everything the
interface adds — rules, labels, controls — stays at or below the brightness of
the work it frames, so nothing on the page competes with the thing the visitor
came to judge.

This identity is inherited, not invented. The incumbent Canva site established
the near-black ground, the full-bleed portrait, the wide-tracked capitals and
the script greeting. This system keeps all four and rebuilds what the export
could not do: a real type scale, a real grid, and motion that answers actions.

**Key Characteristics:**

- Near-black ground (`ink`) with panels lifted exactly one step, never more
- One warm accent, sampled from the practical LEDs in the hero photograph
- Geometric sans throughout; capitals carry labels, never decoration
- Work sits directly on the ground — no card chrome, no containers
- Motion answers a person's action; exactly one sequence runs unprompted

## Color

`ink` is the room. `panel` and `panel-2` are the only lifts, and they exist to
seat media, not to draw boxes. `line` is the single hairline value for every
rule and border on the page.

**The Practical Light Rule.** `amber` is the room's one light source, sampled
from the LED strips behind Jonji in the hero photograph. It appears where the
visitor acts and nowhere else: focus ring, active nav marker, copy
confirmation, the gallery's current-slide dot, hover intent. It is never a
separator, never a bullet, never decoration. The one place it behaves as light
rather than as fill is the falloff at the top of the Work section, which
carries the hero's lamps past the fold so the photograph and the dark page read
as one room.

**The Alpha Edge Rule.** The print work is supplied as cut-outs with real
transparency. Their edges come from their own alpha — `drop-shadow` follows the
mask, so each print casts its own shadow. Never `box-shadow`, which would
outline the tile box instead and draw a frame the design does not have.

## Typography

Poppins carries everything. It is the closest obtainable match to the
obfuscated geometric face in the incumbent export, and its circular bowls suit
a page whose other shapes are rectangles of media.

- **Display** — `clamp(2.75rem, 1.2rem + 7.6vw, 6rem)`, weight 500, tracking
  `-0.04em`. The name only.
- **Section** — `clamp(1.5rem, 1.1rem + 1.9vw, 2.5rem)`, weight 300.
- **Label** — uppercase, `0.14em`–`0.34em` tracking, 0.64–0.72rem.
- **Body** — 0.92–0.95rem, `line-height: 1.75`, measure capped at 68ch.

Sacramento appears exactly once, for "Hello, I'm". It is inherited lettering
and part of the name lockup — not a label above a heading.

**The No-Eyebrow Rule.** No tracked label sits above a heading to introduce it.
Capitals are used for things that are genuinely labels — a work category, a
control — never as a decorative run-in.

## Motion

**The One Sequence Rule.** Exactly one animation runs without being asked for:
the hero assembling on load — script, then the name wiping up, then the rule
drawing out, then the plate and the action. Everything else in the page
responds to a person: the pile fanning under the cursor, the poster warming,
the gallery opening, the copy control confirming.

Easing is `cubic-bezier(0.16, 1, 0.3, 1)` everywhere. Scroll reveals stagger on
`--i` and run on the two work sections only, never as one identical entrance on
every section.

Every animation collapses under `prefers-reduced-motion`, and the piles resolve
to their **open** state rather than freezing shut, so reduced motion never
hides content.

**The Reachable Pause Rule.** The capability rail moves on its own for longer
than five seconds, so it carries a real pause button with `aria-pressed`.
Hover is not a control: it is unreachable by keyboard and touch.

## Surfaces

The browser's own chrome is part of the design: selection is `amber` on `ink`,
the focus ring is a 2px `amber` outline at 3px offset, the scrollbar thumb is
`line` on a transparent track, underlines sit at `0.22em`, and counts are
`tabular-nums`.

## Do's

- Let the work be the brightest thing in any viewport
- Put media directly on the ground; use `line` for separation
- Reserve `amber` for moments the visitor causes
- Give every auto-running motion a control that works without a pointer
- Keep body measure between 65 and 75 characters

## Don'ts

- Don't box content into same-size cards of icon + label + text
- Don't put a tracked label above a heading
- Don't use `amber` as a bullet, divider, or ornament
- Don't add a second unprompted animation above the fold
- Don't draw a frame around a cut-out; let its alpha be the edge
- Don't let an interface element out-brighten the work beside it
