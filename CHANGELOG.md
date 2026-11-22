# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/releases/tag/v0.1.0
