/*!
 * Neuromancer theme — progressive enhancements.
 * - language labels and copy buttons on code blocks
 * - permalink anchors on headings inside posts
 * The site is fully usable without this script.
 */
(function () {
  "use strict";

  var PLAIN = ["plaintext", "text"];

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

  function init() {
    document.querySelectorAll("div.highlighter-rouge, figure.highlight").forEach(enhanceCodeBlock);
    document.querySelectorAll(".post .prose :is(h2, h3, h4)[id]").forEach(addHeadingAnchor);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
