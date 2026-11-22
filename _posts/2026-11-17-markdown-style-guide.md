---
title: markdown style guide
description: Every Markdown element the theme styles, in one place.
tags: [jekyll, reference]
---

This post shows how the theme renders common Markdown elements. Use it as
a reference when writing.

## headings

### third level

#### fourth level

## text

Everything is set in IBM Plex Mono; hierarchy comes from size, weight and colour. You can use **bold**, *italic*,
~~strikethrough~~, `inline code`, <kbd>Ctrl</kbd> + <kbd>C</kbd>,
<mark>highlighted text</mark> and [links](https://jekyllrb.com).
Abbreviations like <abbr title="Intrusion Countermeasures Electronics">ICE</abbr>
get a dotted underline.

## lists

- unordered item
- another item
  - nested item
  - another nested item
- final item

1. first step
2. second step
3. third step

- [x] write the theme
- [x] write the docs
- [ ] take over the matrix

## blockquote

> Cyberspace. A consensual hallucination experienced daily by billions of
> legitimate operators, in every nation.

## table

| tool      | purpose               | language |
|-----------|-----------------------|----------|
| `nmap`    | network discovery     | C++      |
| `ghidra`  | reverse engineering   | Java     |
| `radare2` | binary analysis       | C        |

## definition list

ICE
: Intrusion Countermeasures Electronics.

deck
: The hardware used to jack into the matrix.

## image

![The theme favicon]({{ '/assets/images/favicon.svg' | relative_url }}){: width="96" height="96"}

## footnotes

Markdown footnotes are supported.[^1]

---

That's everything.

[^1]: Rendered by kramdown at the bottom of the post.
