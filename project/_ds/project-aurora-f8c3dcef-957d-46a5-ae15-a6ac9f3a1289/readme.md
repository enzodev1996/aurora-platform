# Cobalt Midnight — Design System

A dark, high-contrast fintech design system. Soft neutrals, rounded pills, restrained neon-blue emphasis. Built for a modern treasury/banking product with a cinematic, product-first feel — confident headlines, graphite cards over near-black canvas, and accent blue used only for active or confirmatory states.

> **Sources:** This system was authored entirely from a written brand brief ("Cobalt Midnight" — colors, typography, radius, spacing, and component specs). No codebase, Figma file, or slide deck was provided. If you have the original product source, attach it via Import and the components/UI kit can be tuned to match exactly.

---

## Content Fundamentals

**Voice — calm, precise, product-first.** Copy reads like a competent fintech tool, not a hype brand. Short, declarative, concrete. Numbers and money are the heroes; words stay out of the way.

- **Casing:** Sentence case for everything — headings, buttons, labels, nav. No ALL-CAPS except occasional `micro` data chips with 0.02em tracking (e.g. `USD · ****4021`). Never shout.
- **Person:** Neutral/second-person where addressing the user ("Search transactions", "New transfer"). Marketing headlines use confident imperatives ("Move money", "Built for scale").
- **Tone:** Professional, restrained, technically credible. Trust over delight. No exclamation marks, no jokes.
- **Emoji:** None. Ever. Status is communicated with badges and color, not emoji.
- **Length:** Terse. Button labels 1–3 words. Metric labels 1–2 words. Helper text one short line in `secondary` gray.
- **Examples:** "Confirm transfer" · "Last 30 days" · "Awaiting clearance" · "Notify on large transfers" · "+12.4% vs last month".

---

## Visual Foundations

**Color.** Near-black canvas (`primary #0A0A0B`) with tonal layering up through `surface #0F1115`, `neutral #18181B` (the dominant card tone), and `surface-elevated #1C2028` for inputs. Text is soft off-white (`on-surface #F4F4F5`) for emphasis and gray (`secondary #A1A1AA`) for body. **Accent blue (`#0B84FF`) is rationed** — active nav, focus borders, confirmatory buttons, one highlighted chart bar. Status colors are pale fills with dark ink: `success` mint, `warning` amber, `error` red.

**Type.** Two faces: **Sulphur Point** for headlines (display → sm), **Inter** for body, labels, and UI. Sulphur Point ships as TTF in `tokens/` (Bold 700 for display/lg, Regular 400 for md/sm). Headlines are bold (700) and compressed with negative tracking (display −0.025em, lg −0.015em); mid/small headlines drop to 500 with neutral tracking. Body uses a lighter 400 with generous 1.45–1.6 line height; `body-lg` (500) for leads. Labels are compact and unadorned. No serif, no mono, no decorative faces.

**Spacing & layout.** Rhythm on 6 / 12 / 24 / 48 / 64 / 128. Sections breathe (large padding, open negative space around heroes); cards stay dense internally (~12–16px padding). Product views use a fixed left sidebar (~248px) + main region with aligned gutters and consistent 12px card gaps.

**Depth.** Tonal layering and 1px borders, **not** drop shadows. Surfaces shift fill from ink → surface → graphite; separation comes from `border #2A2F3A` / `muted-border #3A404B`. Reserve any shadow for true overlays (dialogs). Avoid glow.

**Shape.** Soft but not bubbly. `radius-full` pills for buttons and badges; `radius-sm/md` (4–6px) for cards, inputs, and panels; `radius-lg` (12px) for larger shells. Avoid hard 0px corners except utility links.

**Motion & states.** Quick, calm 150ms ease transitions on color/border only — no bounce, no large movement, no infinite loops. **Hover:** primary buttons lighten their dark fill (`primary` → `primary-60`) and brighten text; sidebar rows pick up a faint fill; cards lift their border to `muted-border`. **Focus:** border shifts to accent blue (no glow). **Press:** rely on the hover color shift, not scale.

**Imagery.** The system is UI-first; imagery is minimal. When present, keep it cool, dark, and low-noise to sit on the ink canvas. No bright gradients, no playful illustration.

---

## Iconography

**Lucide** (CDN, `https://unpkg.com/lucide`) is the icon system — clean 1.5–2px stroke outline icons that match the restrained, technical tone. This is a **substitution**: no icon set was provided in the brief. If the real product uses a different set, swap the CDN link and the `data-lucide` names. Icons render in `secondary` gray at 15–18px, brightening to `on-surface` on active/hover. No emoji, no unicode-glyph icons, no hand-drawn SVG.

Brand marks live in `assets/`:
- `logo.svg` — the "Cobalt" wordmark with the accent glyph.
- `mark.svg` — the standalone rounded accent glyph for compact placements (sidebar, favicon).

---

## Index / Manifest

**Foundations**
- `styles.css` — global entry (consumers link this). `@import`s only.
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/fonts.css`
- `guidelines/*.card.html` — specimen cards (colors, type, spacing, radius, brand).

**Components** (`window.CobaltMidnightDesignSystem_f8c3dc`)
- `components/core/` — `Button`, `Card`, `Badge`, `Chip`, `Avatar`
- `components/forms/` — `Input`, `Switch`
- `components/navigation/` — `SidebarItem`, `Tabs`
- `components/fintech/` — `FundingProgress`, `RiskBadge`, `StatusBadge`, `TrustBadge` (KYC / escrow / admin-approved / reserve-backed / smart-contract / blockchain / no-guaranteed-return / no-external-transfer), `MetaBadge` (location / category), `InvestorCount`, `MilestoneTimeline`, `RiskDisclosureCard`, `MoneyAmount` (peso / token), `Wallet` (Deposit / Redeem)

**UI kits**
- `ui_kits/dashboard/` — Cobalt treasury dashboard (`index.html`, `Sidebar.jsx`, `TopBar.jsx`, `Overview.jsx`).

**Assets** — `assets/logo.svg`, `assets/mark.svg`.

**Skill** — `SKILL.md` (Agent-Skills compatible).

---

## Do's & Don'ts
- **Do** keep it dark, restrained, premium; let contrast and spacing do the work.
- **Do** use Inter everywhere with the clean weight hierarchy.
- **Do** favor tonal surfaces + 1px borders over shadows.
- **Do** keep primary actions pill-shaped, compact, calm.
- **Do** use accent blue sparingly — active/confirmatory only.
- **Don't** add bright gradients, loud neons, or playful accents.
- **Don't** over-round cards or add heavy drop shadows.
- **Don't** use emoji or ALL-CAPS (except small data chips).
