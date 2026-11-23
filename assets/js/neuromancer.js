/*!
 * Neuromancer theme — progressive enhancements.
 * - language labels and copy buttons on code blocks
 * - permalink anchors on headings inside posts
 * - light/dark theme toggle (choice saved in localStorage)
 * - drawer menu on small screens (top bar button)
 * The site is fully usable without this script.
 */
(function () {
  "use strict";

  var PLAIN = ["plaintext", "text"];
  var THEME_KEY = "nm-theme";
  var root = document.documentElement;

  function enhanceCodeBlock(block) {
    // Fenced blocks carry `language-x` on the wrapper; {% highlight %} puts data-lang on <code>.
    var code = block.querySelector("code");
    var match = /(?:^|\s)language-([\w+#-]+)/.exec(block.className);
    var lang = match ? match[1] : code && code.getAttribute("data-lang");
    if (lang && PLAIN.indexOf(lang) === -1) block.setAttribute("data-lang", lang);

    if (!navigator.clipboard) return; // requires a secure context (https or localhost)
    var source = block.querySelector("td.code pre, td.rouge-code pre") || code;
    var button = document.createElement("button");
    var timer;

    button.type = "button";
    button.className = "copy-button";
    button.textContent = "copy";
    button.setAttribute("aria-label", "Copy code to clipboard");

    function flash(state, label) {
      clearTimeout(timer);
      button.setAttribute("data-state", state);
      button.textContent = label;
      timer = setTimeout(function () {
        button.removeAttribute("data-state");
        button.textContent = "copy";
      }, 1600);
    }

    button.addEventListener("click", function () {
      navigator.clipboard.writeText(source.innerText.replace(/\n$/, "")).then(
        function () { flash("ok", "copied"); },
        function () { flash("err", "error"); }
      );
    });

    block.appendChild(button);
  }

  function addHeadingAnchor(heading) {
    var anchor = document.createElement("a");
    anchor.className = "heading-anchor";
    anchor.href = "#" + encodeURIComponent(heading.id);
    anchor.setAttribute("aria-label", "Permalink to this section");
    anchor.textContent = "#";
    heading.appendChild(anchor);
  }

  function currentTheme() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  }

  function setupThemeToggle(button) {
    var meta = document.querySelector('meta[name="theme-color"]');

    function render() {
      var current = currentTheme();
      button.setAttribute("data-current", current);
      button.setAttribute("aria-label", "Switch to " + (current === "dark" ? "light" : "dark") + " theme");
      if (meta) meta.content = getComputedStyle(root).getPropertyValue("--nm-bg").trim();
    }

    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage blocked: not persisted */ }
      render();
    });

    render();
    button.hidden = false;
  }

  // Small screens: the sidebar opens as a drawer from the top bar's menu button.
  function setupMenu(toggle) {
    var sidebar = document.getElementById(toggle.getAttribute("aria-controls"));
    var mask = document.querySelector(".site-mask");
    if (!sidebar || !mask) return;

    function isOpen() { return root.hasAttribute("data-sidebar-open"); }

    function setOpen(open, restoreFocus) {
      root.toggleAttribute("data-sidebar-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      mask.hidden = !open;
      if (open) {
        var first = sidebar.querySelector("a, button");
        if (first) first.focus({ preventScroll: true });
      } else if (restoreFocus) {
        toggle.focus({ preventScroll: true });
      }
    }

    toggle.addEventListener("click", function () { setOpen(!isOpen(), true); });
    mask.addEventListener("click", function () { setOpen(false, true); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) setOpen(false, true);
    });
    // Leaving the small-screen layout closes the drawer.
    window.matchMedia("(min-width: 64rem)").addEventListener("change", function (event) {
      if (event.matches && isOpen()) setOpen(false, false);
    });
  }

  function init() {
    document.querySelectorAll("div.highlighter-rouge, figure.highlight").forEach(enhanceCodeBlock);
    document.querySelectorAll(".post .prose :is(h2, h3, h4)[id]").forEach(addHeadingAnchor);
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) setupThemeToggle(toggle);
    var menu = document.querySelector("[data-menu-toggle]");
    if (menu) setupMenu(menu);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
