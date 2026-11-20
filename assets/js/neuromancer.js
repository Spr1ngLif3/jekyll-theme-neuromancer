/*!
 * Neuromancer theme — progressive enhancements.
 * - language labels and copy buttons on code blocks
 * - permalink anchors on headings inside article content
 * Everything here is optional: the site is fully usable without JavaScript.
 */
(function () {
  "use strict";

  function labelCodeBlocks() {
    var blocks = document.querySelectorAll("div.highlighter-rouge, figure.highlight");
    Array.prototype.forEach.call(blocks, function (block) {
      var match = /(?:^|\s)language-([\w+#-]+)/.exec(block.className);
      if (!match) {
        var code = block.querySelector("code[data-lang]");
        if (code) match = [null, code.getAttribute("data-lang")];
      }
      if (match && match[1] !== "plaintext" && match[1] !== "text") {
        block.setAttribute("data-lang", match[1]);
      }
    });
    return blocks;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(area);
      if (ok) { resolve(); } else { reject(new Error("copy failed")); }
    });
  }

  function addCopyButtons(blocks) {
    Array.prototype.forEach.call(blocks, function (block) {
      // Skip blocks nested in other highlighted blocks.
      if (block.parentElement && block.parentElement.closest(".highlighter-rouge, figure.highlight")) return;
      var code = block.querySelector("td.code pre, td.rouge-code pre, pre code, pre");
      if (!code) return;

      var button = document.createElement("button");
      button.type = "button";
      button.className = "copy-button";
      button.textContent = "copy";
      button.setAttribute("aria-label", "Copy code to clipboard");

      var timer;
      button.addEventListener("click", function () {
        copyText(code.innerText.replace(/\n$/, "")).then(
          function () { setState("ok", "copied"); },
          function () { setState("err", "error"); }
        );
      });

      function setState(state, label) {
        clearTimeout(timer);
        button.setAttribute("data-state", state);
        button.textContent = label;
        timer = setTimeout(function () {
          button.removeAttribute("data-state");
          button.textContent = "copy";
        }, 1600);
      }

      block.appendChild(button);
    });
  }

  function addHeadingAnchors() {
    var headings = document.querySelectorAll(".post .prose h2[id], .post .prose h3[id], .post .prose h4[id]");
    Array.prototype.forEach.call(headings, function (heading) {
      var anchor = document.createElement("a");
      anchor.className = "heading-anchor";
      anchor.href = "#" + encodeURIComponent(heading.id);
      anchor.setAttribute("aria-label", "Permalink to this section");
      anchor.textContent = "#";
      heading.appendChild(anchor);
    });
  }

  function init() {
    addCopyButtons(labelCodeBlocks());
    addHeadingAnchors();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
