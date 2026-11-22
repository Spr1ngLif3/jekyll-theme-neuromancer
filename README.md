<p align="center">
  <img src=".github/assets/title.png" alt="guest@neuromancer:~$ prompt with a glitched hostname, cyan accent" width="454">
</p>

# neuromancer

[![GitHub stars](https://img.shields.io/github/stars/Spr1ngLif3/jekyll-theme-neuromancer?style=flat&color=00ff9c)](https://github.com/Spr1ngLif3/jekyll-theme-neuromancer/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-00ff9c.svg)](LICENSE.txt)

A minimal, dark Jekyll theme inspired by hacker and cyberpunk culture.
It's built for personal sites and blogs on GitHub Pages.

- Monospace type, neon accents, and a sticky sidebar with a terminal prompt and blinking cursor
- Blog posts with reading time, tags and previous/next links
- Archive grouped by year, a tag index, and client-side search
- RSS, sitemap and SEO tags through the official Jekyll plugins
- Neon syntax highlighting with language labels and copy buttons
- Dark and light schemes with a toggle, five accent colours, and an optional CRT scanline overlay
- Accessible: skip link, visible focus, AA contrast, reduced-motion support, print styles
- No web fonts, no trackers, no frameworks, and the JavaScript is optional
- Works on classic GitHub Pages (Jekyll 3.10, libsass) and on Jekyll 4

## Installation

### GitHub Pages (recommended)

In your site's `_config.yml`:

```yaml
remote_theme: Spr1ngLif3/jekyll-theme-neuromancer

plugins:
  - jekyll-remote-theme
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
```

To pin a release, use `remote_theme: Spr1ngLif3/jekyll-theme-neuromancer@v0.2.0`.

### As a gem

```ruby
# Gemfile
gem "jekyll-theme-neuromancer"
```

```yaml
# _config.yml
theme: jekyll-theme-neuromancer
```

Then run `bundle install`. Gem installs load the theme's plugins on their own.

### Pages to add to your site

A theme can't ship pages, so create the ones you want. Each one is a few
lines of front matter:

| file        | front matter                                              |
|-------------|-----------------------------------------------------------|
| `index.md`  | `layout: home`                                            |
| `about.md`  | `layout: page`, `title: about`, `permalink: /about/`      |
| `blog.md`   | `layout: archive`, `title: archive`, `permalink: /blog/`  |
| `tags.md`   | `layout: tags`, `title: tags`, `permalink: /tags/`        |
| `search.md` | `layout: search`, `title: search`, `permalink: /search/`  |
| `404.md`    | `layout: page`, `title: "404"`, `permalink: /404.html`    |

The demo pages in this repository are good starting points.

## Configuration

Theme options go under the `neuromancer` key. Every option is optional:

```yaml
title: my site
description: notes from the sprawl
author:
  name: anon

neuromancer:
  accent: green           # green | cyan | magenta | amber | violet
  color_scheme: dark      # dark | light | auto (follow the visitor's OS)
  theme_toggle: true      # light/dark switch in the sidebar
  prompt_user: guest      # header shows <prompt_user>@<prompt_host>:~$
  prompt_host: my-site    # default: slugified site title
  avatar: /assets/images/avatar.png   # square image above the nav (cropped to square)
  avatar_alt: Portrait of me          # default: author.name
  scanlines: false        # CRT scanline overlay
  date_format: "%Y-%m-%d"
  home_posts: 5           # posts listed on the home page (0 hides the list)
  show_excerpts: true     # excerpts in the home page list
  reading_time: true
  words_per_minute: 200
  archive_url: /blog/
  tags_url: /tags/
  favicon: /assets/images/favicon.svg
  credit: true            # "powered by jekyll + neuromancer" in the footer

  terminal:               # shell session on the home page
    - command: whoami     # default: author name
      output: anon
    - command: cat motd   # default: site description
      output: notes from the sprawl

  nav:                    # a "home" link is always added first
    - title: blog
      url: /blog/
    - title: about
      url: /about/

  social:
    - name: github
      url: https://github.com/username
    - name: mastodon
      url: https://infosec.exchange/@username   # rel="me" is added automatically

  comments:
    giscus:               # https://giscus.app (only rendered when JEKYLL_ENV=production)
      repo: username/repo
      repo_id: R_xxxxxxxx
      category: Comments
      category_id: DIC_xxxxxxxx
      # mapping: pathname
      # theme: transparent_dark
```

Recommended Jekyll settings:

```yaml
markdown: kramdown
kramdown:
  input: GFM
  syntax_highlighter: rouge

sass:
  style: compressed
  # Hides Dart Sass's @import deprecation notice on Jekyll 4.
  # The theme keeps @import so it still compiles with libsass on GitHub Pages.
  quiet_deps: true
  silence_deprecations: [import]

defaults:
  - scope: { path: "", type: posts }
    values: { layout: post }
```

### Front matter

| key                | where       | effect                                         |
|--------------------|-------------|------------------------------------------------|
| `title`            | all         | page/post title                                |
| `description`      | posts       | used for SEO and as the excerpt in lists       |
| `tags`             | posts       | listed under the post and on the tag index     |
| `last_modified_at` | posts       | shows an "updated" date                        |
| `author`           | posts       | overrides `site.author.name`                   |
| `comments: false`  | posts       | turns off comments for one post                |
| `subtitle`         | pages       | line under the page title                      |
| `posts_title`      | home        | heading above the recent-posts list            |
| `image`            | all         | social preview image (via jekyll-seo-tag)      |

If a `layout: home` page has content, that content replaces the terminal
block.

## Customization

- **Colours and fonts:** create `_sass/neuromancer/_custom.scss` in your site
  and override the CSS custom properties:

  ```scss
  :root {
    --nm-accent: #39ff14;
    --nm-accent-soft: rgba(57, 255, 20, 0.12);
    --nm-font-body: system-ui, sans-serif;  // sans-serif body, mono UI
    --nm-measure: 52rem;                     // wider content column
    --nm-avatar-size: 10rem;                 // bigger sidebar image
  }
  ```

  See [`_sass/neuromancer/_variables.scss`](_sass/neuromancer/_variables.scss)
  for every token.
- **Analytics, web fonts, meta tags:** create `_includes/custom-head.html`.
- **Scripts before `</body>`:** create `_includes/custom-footer.html`.
- **Anything else:** copy the layout or include you want to change from this
  repository into your site and edit it there. Jekyll uses your copy instead
  of the theme's.

## Development

```sh
script/bootstrap   # install dependencies
script/server      # http://localhost:4000 with live reload
script/cibuild     # build + html-proofer + gem build (same as CI)
```

The repository doubles as the theme's demo site. Only `_layouts`,
`_includes`, `_sass` and `assets` are packaged into the gem. See
[CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and the release process.

## License

[MIT](LICENSE.txt)
