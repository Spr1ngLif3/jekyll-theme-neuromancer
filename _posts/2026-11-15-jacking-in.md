---
title: jacking in
description: Welcome to neuromancer, a minimal dark Jekyll theme. Here is what it can do.
tags: [meta, jekyll]
---

Welcome to **neuromancer**, a minimal, dark, terminal-flavoured theme for
Jekyll. It was built for personal sites and blogs hosted on GitHub Pages,
and it tries to stay out of the way of your writing.

## features

- blog posts with reading time, tags and previous/next navigation
- a year-grouped [archive]({{ '/blog/' | relative_url }}) and a [tag index]({{ '/tags/' | relative_url }})
- client-side [search]({{ '/search/' | relative_url }}) with no external services
- RSS feed, sitemap and SEO tags via the official Jekyll plugins
- syntax highlighting with a neon palette and copy-to-clipboard buttons
- five accent colours and an optional CRT scanline overlay
- accessible: skip link, visible focus, reduced-motion support, AA contrast
- no web fonts, no trackers, a few KB of optional JavaScript

## getting started

Add the theme to your GitHub Pages site:

```yaml
# _config.yml
remote_theme: Spr1ngLif3/jekyll-theme-neuromancer
plugins:
  - jekyll-remote-theme
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
```

Then write posts in `_posts/` as usual. See the README for every option.
