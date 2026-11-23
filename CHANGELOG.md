# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.1] - 2026-11-23

### Changed

- Article text (pages and posts) uses the full width of the content area,
  the same as code blocks. `--nm-measure` now only caps home page excerpts.

## [0.3.0] - 2026-11-23

### Added

- Mobile layout (below 64rem): a top bar with a menu button, the site title
  and a search button. The menu opens the sidebar as a drawer (the page
  slides and dims; overlay, Esc or the button close it; focus moves into the
  drawer and back). The search button turns the bar into a search field with
  a cancel button, and live results cover the page. Without JavaScript the
  sidebar and search box are stacked on top.
- Search box on every page with live results, `/` to focus and Enter for the
  full results page: a narrow right column on wide screens (`--nm-rail`).
  Options: `neuromancer.search`, `neuromancer.search_url`.
- "pinned" section at the top of the home page for posts with
  `pinned: true` (heading via `pinned_title`); pinned posts are left out of
  "recent works".
- Presentation block (`whoami` / `cat motd`) in the sidebar on every page;
  `terminal: false` hides it.
- Self-hosted IBM Plex Mono (SIL OFL), the single typeface of the theme.
- Options and tokens: `neuromancer.excerpt_words`, `--nm-content`,
  `--nm-rail`, `--nm-bg-panel`.

### Changed

- Wider layout: the sidebar is pinned to the left edge and the content uses
  the remaining width (up to `--nm-content`, 90rem). Reading text is capped
  at `--nm-measure`, which is now a line length (72ch); code blocks, tables
  and figures may use the full width.
- Clearer type hierarchy: 16px base, body text one step dimmer than
  headings, a smaller and quieter interface layer. No `#` markers on titles
  and headings, no `//` labels on section headings, no `#` on tags.
- Page titles (about, works, tags, search, 404) and the home section
  headings use the accent colour; post titles keep the heading colour.
- Home page: posts in a single column with excerpts taken from the post's
  paragraphs (35 words, code and headings skipped, `description` as
  fallback) and no dates; "recent works" replaces "recent transmissions".
- Post metadata shows only the date.
- The archive page is titled "works" by default.
- The title prompt is `<prompt_host>:~$`; `prompt_user` is optional and adds
  `<prompt_user>@` in front. The prompt links home, and its cursor no longer
  blinks.

### Removed

- Search link in the navigation and the `grep -i` label on the search page.
- Reading time and author in post metadata (`neuromancer.reading_time`,
  `neuromancer.words_per_minute`).
- Multi-column home post list.

### Upgrading from 0.2.0

- Remove the `search` entry from `neuromancer.nav` (search has its own box).
- In `blog.md`, set `title: works` if you want the new default name.
- `reading_time` and `words_per_minute` can be deleted from `_config.yml`.
- Custom CSS using `--nm-measure` as a column width should switch to
  `--nm-content`; `--nm-measure` is now the reading line length.
- Without `prompt_user` the title loses its `guest@` prefix; set
  `prompt_user: guest` to keep it.

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

[Unreleased]: https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/releases/tag/v0.2.0
[0.1.0]: https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/tree/14b6386
