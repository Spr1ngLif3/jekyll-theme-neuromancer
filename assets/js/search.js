/*!
 * Neuromancer theme — client-side search.
 * Loads /assets/search.json once and filters it in the browser.
 * Results are rendered with DOM APIs (no innerHTML) so post content can
 * never inject markup.
 */
(function () {
  "use strict";

  var form = document.querySelector("form[data-search-index]");
  if (!form) return;

  var input = form.querySelector("input[type=search]");
  var results = document.getElementById("search-results");
  var status = document.getElementById("search-status");
  var index = null;
  var debounce;

  function setStatus(text) { status.textContent = text; }

  function load() {
    if (index) return Promise.resolve(index);
    return fetch(form.getAttribute("data-search-index"), { credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) { index = data; return data; });
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

  function render(matches) {
    results.textContent = "";
    matches.forEach(function (entry) {
      var li = document.createElement("li");
      li.className = "post-list-item";

      var time = document.createElement("time");
      time.className = "post-list-date";
      time.dateTime = entry.date;
      time.textContent = entry.date;

      var body = document.createElement("div");
      body.className = "post-list-body";
      var link = document.createElement("a");
      link.className = "post-list-title";
      link.href = entry.url;
      link.textContent = entry.title;
      body.appendChild(link);

      li.appendChild(time);
      li.appendChild(body);
      results.appendChild(li);
    });
  }

  function search(query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      results.textContent = "";
      setStatus("");
      return;
    }
    load().then(function (data) {
      var matches = data
        .map(function (entry) { return { entry: entry, score: score(entry, terms) }; })
        .filter(function (m) { return m.score > 0; })
        .sort(function (a, b) { return b.score - a.score; })
        .map(function (m) { return m.entry; });
      render(matches);
      setStatus(matches.length + (matches.length === 1 ? " match" : " matches") + " for \"" + query + "\"");
    }).catch(function () {
      setStatus("error: could not load the search index.");
    });
  }

  function syncUrl(query) {
    if (!window.history || !window.history.replaceState) return;
    var url = new URL(window.location.href);
    if (query) { url.searchParams.set("q", query); } else { url.searchParams.delete("q"); }
    window.history.replaceState(null, "", url);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    search(input.value.trim());
  });

  input.addEventListener("input", function () {
    clearTimeout(debounce);
    debounce = setTimeout(function () {
      var query = input.value.trim();
      syncUrl(query);
      search(query);
    }, 150);
  });

  var initial = new URLSearchParams(window.location.search).get("q");
  if (initial) {
    input.value = initial;
    search(initial.trim());
  }
})();
