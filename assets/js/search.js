/*!
 * Neuromancer theme — client-side search.
 * - search box: live results in a dropdown, "/" focuses it; on small
 *   screens the top bar's search button turns the bar into the field
 * - results page: full list, synced with ?q= in the URL
 * The index (/assets/search.json) is fetched once, on first use. Results are
 * rendered with DOM APIs (no innerHTML) so post content can never inject markup.
 */
(function () {
  "use strict";

  var indexRequest = null;

  function loadIndex(url) {
    if (!indexRequest) {
      indexRequest = fetch(url, { credentials: "same-origin" }).then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      });
      indexRequest.catch(function () { indexRequest = null; }); // allow a retry
    }
    return indexRequest;
  }

  function score(entry, terms) {
    var title = entry.title.toLowerCase();
    var tags = (entry.tags || []).join(" ").toLowerCase();
    var body = (entry.content || "").toLowerCase();
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      var hit = false;
      if (title.indexOf(t) !== -1) { total += 10; hit = true; }
      if (tags.indexOf(t) !== -1) { total += 5; hit = true; }
      if (body.indexOf(t) !== -1) { total += 1; hit = true; }
      if (!hit) return 0; // every term must match somewhere
    }
    return total;
  }

  // Resolves to the entries matching every term, best first.
  function search(url, query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return loadIndex(url).then(function (data) {
      return data
        .map(function (entry) { return { entry: entry, score: score(entry, terms) }; })
        .filter(function (m) { return m.score > 0; })
        .sort(function (a, b) { return b.score - a.score; })
        .map(function (m) { return m.entry; });
    });
  }

  function summary(count, query) {
    return count + (count === 1 ? " match" : " matches") + " for \"" + query + "\"";
  }

  function link(entry, className) {
    var a = document.createElement("a");
    a.className = className;
    a.href = entry.url;
    a.textContent = entry.title;
    return a;
  }

  // Header box -----------------------------------------------------------------

  function setupBox(form) {
    var url = form.getAttribute("data-search-index");
    var input = form.querySelector("input");
    var panel = form.querySelector(".site-search-results");
    var status = panel.querySelector(".site-search-status");
    var list = panel.querySelector("ul");
    var bar = form.closest(".site-bar");
    var trigger = bar && bar.querySelector("[data-search-trigger]");
    var cancel = bar && bar.querySelector("[data-search-cancel]");
    var LIMIT = 8;
    var latest = 0;
    var debounce;

    // Small screens: search mode replaces the bar's title and buttons.
    function openSearch() {
      // Only where the search button is shown (small screens).
      if (trigger && trigger.offsetParent !== null) bar.setAttribute("data-searching", "");
      input.focus();
    }

    function closeSearch() {
      if (bar) bar.removeAttribute("data-searching");
      input.value = "";
      panel.hidden = true;
      if (trigger) trigger.focus({ preventScroll: true });
    }

    if (trigger) trigger.addEventListener("click", openSearch);
    if (cancel) cancel.addEventListener("click", closeSearch);

    function update() {
      var query = input.value.trim();
      var request = ++latest;
      if (!query) { panel.hidden = true; return; }
      search(url, query).then(function (matches) {
        if (request !== latest) return; // a newer query is in flight
        list.textContent = "";
        matches.slice(0, LIMIT).forEach(function (entry) {
          var li = document.createElement("li");
          li.appendChild(link(entry, "site-search-link"));
          list.appendChild(li);
        });
        panel.hidden = false;
        status.textContent = summary(matches.length, query);
      }, function () {
        list.textContent = "";
        panel.hidden = false;
        status.textContent = "error: could not load the search index.";
      });
    }

    input.addEventListener("input", function () {
      clearTimeout(debounce);
      debounce = setTimeout(update, 120);
    });
    input.addEventListener("focus", function () {
      loadIndex(url).catch(function () {}); // warm up; errors surface on search
      if (input.value.trim()) update();
    });
    // Keep focus in the input when a result is clicked or tapped.
    panel.addEventListener("mousedown", function (event) { event.preventDefault(); });
    form.addEventListener("focusout", function (event) {
      if (!form.contains(event.relatedTarget)) panel.hidden = true;
    });
    form.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (bar && bar.hasAttribute("data-searching")) { closeSearch(); return; }
      panel.hidden = true;
      input.blur();
    });
    document.addEventListener("keydown", function (event) {
      var target = event.target;
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
      if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      event.preventDefault();
      openSearch();
    });
  }

  // Results page ----------------------------------------------------------------

  function setupPage(form) {
    var url = form.getAttribute("data-search-index");
    var input = form.querySelector("input");
    var results = document.getElementById("search-results");
    var status = document.getElementById("search-status");
    var debounce;

    function render(matches) {
      results.textContent = "";
      matches.forEach(function (entry) {
        var li = document.createElement("li");
        var time = document.createElement("time");
        var body = document.createElement("div");
        li.className = "post-list-item";
        time.className = "post-list-date";
        time.dateTime = entry.date;
        time.textContent = entry.date;
        body.className = "post-list-body";
        body.appendChild(link(entry, "post-list-title"));
        li.appendChild(time);
        li.appendChild(body);
        results.appendChild(li);
      });
    }

    function run(query) {
      if (!query) {
        results.textContent = "";
        status.textContent = "";
        return;
      }
      search(url, query).then(function (matches) {
        render(matches);
        status.textContent = summary(matches.length, query);
      }, function () {
        status.textContent = "error: could not load the search index.";
      });
    }

    function syncUrl(query) {
      var next = new URL(window.location.href);
      if (query) { next.searchParams.set("q", query); } else { next.searchParams.delete("q"); }
      window.history.replaceState(null, "", next);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      run(input.value.trim());
    });

    input.addEventListener("input", function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        var query = input.value.trim();
        syncUrl(query);
        run(query);
      }, 150);
    });

    var initial = new URLSearchParams(window.location.search).get("q");
    if (initial) {
      input.value = initial;
      run(initial.trim());
    }
  }

  var box = document.querySelector("form.site-search");
  if (box) setupBox(box);
  document.querySelectorAll("form[data-search-page]").forEach(setupPage);
})();
