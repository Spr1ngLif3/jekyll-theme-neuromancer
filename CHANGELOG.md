# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- "pinned" section at the top of the home page for posts with
  `pinned: true` in their front matter (heading via `pinned_title`).
  Pinned posts are left out of "recent works".
- `terminal: false` hides the presentation block.

### Changed

- The presentation block (`whoami` / `cat motd`) moved from the home page
  into the sidebar, between the title and the navigation, on every page,
  with a darker, more discreet background (`--nm-bg-panel`).
- Home page lists posts in a single column at every screen size.
- Home excerpts come from the post's paragraphs (headings, lists and code
  are skipped), cut to `neuromancer.excerpt_words` (35) and capped at the
  reading width; the `description` is used only when a post has no
  paragraphs.
- Self-hosted IBM Plex Mono (SIL OFL) as the single typeface, for the same
  look on every device.
- Clearer type hierarchy: larger scale (16px base), body text one step dimmer
  than headings, and a smaller, quieter interface layer (nav, metadata,
  footer).
- Section headings (home post list, archive years, tag groups, comments)
  are plain headings instead of small `//` labels; the home one ("recent
  works" by default, was "recent transmissions") uses the accent colour.
- Home terminal block: commands are shown without the `$` prompt, in the
  accent colour, and the first output is shown as a large headline.
- Page and post titles, and headings inside pages and posts, no longer show
  `#` / `##` / `###` markers.
- Tags are shown without a `#` prefix (chips and tag page headings).
- Page titles (about, works, tags, search, 404) use the accent colour; post
  titles keep the heading colour.
- The archive page is titled "works" by default.
- Post metadata shows only the date; the home page post list shows titles
  and excerpts without dates.

- Wider layout: the sidebar is pinned to the left edge and the content area
  uses the remaining width (up to `--nm-content`, 90rem). Reading text is
  capped at `--nm-measure` (now a line length, 72ch); code blocks, tables
  and figures may use the full width.
- Search moved from a nav page to a box on every page: in a narrow right
  column (`--nm-rail`) mirroring the sidebar on screens from 64rem, and as a
  full-width bar under the header on smaller ones. It shows live results, opens the full results
  page on Enter and is focused with `/`. New options: `neuromancer.search`,
  `neuromancer.search_url`.
- The header cursor no longer blinks.
- On small screens the theme toggle sits next to the feed links.

### Removed

- `grep -i` label on the search page.
- Reading time and author in post metadata (`neuromancer.reading_time`,
  `neuromancer.words_per_minute`).

## [0.2.0] - 2026-11-22

### Added

- Light colour scheme using the same accent hues, tuned to pass WCAG AA.
  `neuromancer.color_scheme` (`dark` | `light` | `auto`) sets the default.
- `light / dark` toggle at the bottom of the sidebar, highlighting the active
  scheme (`neuromancer.theme_toggle`).
  The visitor's choice is saved in localStorage and applied before first paint.

- Optional square sidebar image between the title and the navigation
  (`neuromancer.avatar`, `neuromancer.avatar_alt`, `--nm-avatar-size`).
- `neuromancer.terminal` option to configure the home page shell session.

### Changed

- A `home` link is always the first navigation item; the site title is no
  longer a link. `/` entries in `neuromancer.nav` are skipped.

- Navigation moved from a top bar to a sticky left sidebar on wide screens
  (stacked header on small screens); `./` prefix removed from nav items.
- Social links and the RSS link moved from the footer to the bottom of the
  sidebar. The RSS link is added automatically; remove any `rss` entry from
  `neuromancer.social` to avoid a duplicate.
- `--nm-measure` now includes the content column's padding; new
  `--nm-sidebar` token sets the sidebar width.

### Fixed

- CSS and JS URLs carry a build-time version (`?v=`), so browsers fetch fresh
  assets after every rebuild instead of mixing new pages with cached scripts.

- Contrast of code comments, tag counts and the search placeholder now meets
  WCAG AA in the dark scheme.

### Removed

- Blinking cursor line at the end of the home page terminal block.

## [0.1.0] - 2026-11-20

### Added

- Layouts: `default`, `home`, `page`, `post`, `archive`, `tags`, `search`.
- Terminal-style header prompt with blinking cursor and glitch hover effect.
- Five accent presets (`green`, `cyan`, `magenta`, `amber`, `violet`) and an
  optional CRT scanline overlay.
- Post metadata: date, last-updated date, reading time, author and tags.
- Previous/next post navigation.
- Year-grouped archive and tag index pages.
- Client-side search backed by a generated `assets/search.json` index.
- Neon Rouge syntax theme with language labels and copy-to-clipboard buttons.
- Heading permalink anchors in posts.
- Optional giscus comments.
- SEO, RSS feed and sitemap via `jekyll-seo-tag`, `jekyll-feed` and
  `jekyll-sitemap`.
- `custom-head.html`, `custom-footer.html` and `_custom.scss` override hooks.
- Accessibility: skip link, visible focus styles, reduced-motion support,
  print stylesheet.

[Unreleased]: https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/releases/tag/v0.2.0
[0.1.0]: https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/tree/14b6386
