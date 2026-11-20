# Contributing

Thanks for your interest in improving neuromancer!

## Development setup

Requirements: Ruby >= 3.0 and Bundler.

```sh
script/bootstrap   # install gems into ./vendor/bundle
script/server      # serve the demo site at http://localhost:4000
script/cibuild     # build, validate HTML and build the gem (what CI runs)
```

The repository is both the theme and its demo site:

| path                         | shipped in the gem | purpose                    |
|------------------------------|--------------------|----------------------------|
| `_layouts/`, `_includes/`    | yes                | theme templates            |
| `_sass/`, `assets/`          | yes                | styles, scripts, images    |
| `_posts/`, `*.md`, `_config.yml` | no             | demo content & config      |

## Guidelines

- **Keep it minimal.** New features should be optional and cost nothing
  when disabled. No external fonts, trackers or frameworks.
- **Stay GitHub Pages compatible.** Use only
  [plugins supported by GitHub Pages](https://pages.github.com/versions/),
  Liquid that works on Jekyll 3.9, and Sass that compiles with libsass
  (no `@use`, `math.div` or other module-system features).
- **Accessibility matters.** Keep text contrast at WCAG AA, preserve focus
  styles, and respect `prefers-reduced-motion`.
- **JavaScript is progressive enhancement.** Pages must remain usable
  without it (search is the only exception).
- Document new options in `README.md` and the demo `_config.yml`, and add
  an entry under `Unreleased` in `CHANGELOG.md`.

## Commits and pull requests

- Branch from `main`; keep pull requests focused on one change.
- Use [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `docs:`, `chore:` ...).
- CI must pass: it builds the demo site with Jekyll 4 and with the
  `github-pages` gem, runs html-proofer and builds the gem.
- Include a screenshot for visual changes.

## Releasing

1. Bump `spec.version` in `jekyll-theme-neuromancer.gemspec`.
2. Move `Unreleased` entries in `CHANGELOG.md` under the new version.
3. Commit, then tag: `git tag -a vX.Y.Z -m "vX.Y.Z" && git push --follow-tags`.
4. The `release` workflow builds the gem and attaches it to a GitHub release.
