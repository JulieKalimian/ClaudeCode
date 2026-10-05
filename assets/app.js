(function () {
  "use strict";

  const DATA = window.MODA;
  const CREDITS = window.MODA_CREDITS || {};
  const STATUS = { peak: "Peaking", rising: "Rising", early: "Early signal" };
  const STATUS_ORDER = { peak: 0, rising: 1, early: 2 };
  const SECTIONS = new Set(["top", "trends", "studio", "colors", "ss27"]);
  const BASE_TITLE = "Moda Trend Report";

  const byId = new Map(DATA.trends.map((t) => [t.id, t]));
  const catLabel = Object.fromEntries(DATA.categories.map((c) => [c.id, c.label]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const home = document.getElementById("home");
  const detail = document.getElementById("detail");

  const state = { season: "fw26", category: "all", sort: "editor" };
  let view = null;
  let homeScroll = 0;
  let routedHash = null;

  // ---------- Saved trends (per-browser convenience) ----------
  const SAVE_KEY = "moda:saved";
  function readSaved() {
    try {
      const raw = JSON.parse(localStorage.getItem(SAVE_KEY) || "[]");
      return Array.isArray(raw) ? raw.filter((id) => byId.has(id)) : [];
    } catch (e) {
      return [];
    }
  }
  function writeSaved() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify([...saved]));
    } catch (e) {
      /* storage unavailable: saved trends last for this visit only */
    }
  }
  const saved = new Set(readSaved());

  // ---------- Helpers ----------
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const src = (id, n) => `images/${id}-${n}.jpg`;
  const range = (n) => Array.from({ length: n }, (_, i) => i + 1);
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const listShort = (arr) => (arr.length <= 2 ? arr.join(", ") : `${arr[0]}, ${arr[1]} +${arr.length - 2}`);
  const updated = new Date(DATA.updated + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const ICON = {
    heart:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z"/></svg>',
    left: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  };

  function inSeason(season) {
    return DATA.trends.filter((t) => season === "all" || t.season === season);
  }

  // ---------- Cards ----------
  function cardHTML(t, opts) {
    opts = opts || {};
    const isSaved = saved.has(t.id);
    const season = DATA.seasons[t.season];
    const where = t.seenAt.length ? `Seen at ${listShort(t.seenAt)}` : catLabel[t.category];
    const meta =
      where === season.short
        ? `<strong>${esc(season.short)}</strong>`
        : `<strong>${esc(season.short)}</strong> · ${esc(where)}`;
    const second =
      t.images > 1 ? `<img class="img-b" src="${src(t.id, 2)}" alt="" loading="lazy" decoding="async">` : "";
    return `<article class="card" data-id="${t.id}">
      <div class="card-media">
        <span class="badge ${t.status}">${STATUS[t.status]}</span>
        <img class="img-a" src="${src(t.id, 1)}" alt="Inspiration photo for ${esc(t.name)}" loading="${opts.eager ? "eager" : "lazy"}" decoding="async">
        ${second}
      </div>
      <button class="save-btn" type="button" data-save="${t.id}" aria-pressed="${isSaved}" aria-label="${isSaved ? "Remove" : "Save"} ${esc(t.name)}"><span>${ICON.heart}</span></button>
      <div class="card-body">
        <div class="swatches" aria-hidden="true">${t.palette
          .map((p) => `<span class="swatch" style="background:${p.hex}"></span>`)
          .join("")}</div>
        <h3><a href="#${t.id}">${esc(t.name)}</a></h3>
        <p class="dek">${esc(t.dek)}</p>
        <p class="meta">${meta}</p>
      </div>
    </article>`;
  }

  // ---------- Home ----------
  function renderHome() {
    const fw = inSeason("fw26").length;
    const st = inSeason("studio").length;
    const studioStats = [
      byId.get("retro-track").stats[0],
      byId.get("studio-sets").stats[2],
      byId.get("studio-sets").stats[0],
    ];

    home.innerHTML = `
      <section class="hero" id="top" aria-labelledby="hero-title">
        <div class="hero-media">
          <img src="images/the-trench-2.jpg" alt="" decoding="async">
          <img src="images/faux-fur-shearling-1.jpg" alt="" decoding="async" fetchpriority="high">
          <img src="images/scarlet-1.jpg" alt="" decoding="async">
        </div>
        <div class="hero-copy">
          <p class="eyebrow">Fall/Winter 2026 Trend Report</p>
          <h1 id="hero-title">The New Season Edit</h1>
          <p class="hero-sub">${fw} runway trends, ${st} studio trends and an early read on Spring 2027. Updated ${updated}.</p>
          <div class="hero-ctas">
            <a class="btn btn-light" href="#trends" data-season="fw26">Explore Fall '26</a>
            <a class="btn btn-ghost-light" href="#ss27">Spring '27 preview</a>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="cat-title">
        <div class="section-head">
          <div><p class="eyebrow">Browse</p><h2 id="cat-title">Trends by category</h2></div>
        </div>
        <div class="tiles">${DATA.categories
          .map((c) => {
            const n = DATA.trends.filter((t) => t.category === c.id).length;
            return `<button class="tile" type="button" data-tile="${c.id}">
              <span class="tile-media"><img src="images/${c.cover}.jpg" alt="" loading="lazy" decoding="async"></span>
              <span class="tile-label"><strong>${esc(c.label)}</strong><span>${plural(n, "trend")}</span></span>
            </button>`;
          })
          .join("")}</div>
      </section>

      <section class="section" id="trends" aria-labelledby="trends-title">
        <div class="section-head">
          <div>
            <p class="eyebrow">Trend index</p>
            <h2 id="trends-title"></h2>
            <p class="intro" id="trends-intro"></p>
          </div>
        </div>
        <div class="toolbar">
          <div class="toolbar-group">
            <div class="segmented" role="group" aria-label="Season">
              ${[
                ["fw26", "Fall '26"],
                ["studio", "Studio"],
                ["ss27", "Spring '27"],
                ["all", "All"],
              ]
                .map(([id, label]) => `<button type="button" data-season-btn="${id}">${label}</button>`)
                .join("")}
            </div>
          </div>
          <div class="toolbar-group cats" role="group" aria-label="Category" id="cat-chips"></div>
          <div class="toolbar-meta">
            <span class="count" id="trend-count" aria-live="polite"></span>
            <label class="sort">Sort
              <select id="sort-select">
                <option value="editor">Editor's order</option>
                <option value="status">Peaking first</option>
                <option value="az">A to Z</option>
              </select>
            </label>
          </div>
        </div>
        <div class="grid" id="trend-grid"></div>
      </section>

      <section class="section" id="studio" aria-labelledby="studio-title">
        <div class="section-head">
          <div>
            <p class="eyebrow">Studio to Street</p>
            <h2 id="studio-title">Activewear that looks like an outfit</h2>
            <p class="intro">${esc(DATA.seasons.studio.intro)}</p>
          </div>
          <a class="text-link" href="#trends" data-season="studio">See all studio trends</a>
        </div>
        <div class="studio-block">
          <figure class="studio-feature">
            <img src="images/retro-track-2.jpg" alt="A runner in a red top and black leggings" loading="lazy" decoding="async">
            <figcaption><span class="eyebrow" style="color:inherit">This fall</span><strong>Flares, retro track and mocha sets</strong></figcaption>
          </figure>
          <div class="studio-copy">
            <div class="stat-row">${studioStats
              .map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`)
              .join("")}</div>
            <div class="grid">${inSeason("studio").map((t) => cardHTML(t)).join("")}</div>
          </div>
        </div>
      </section>

      <section class="section" id="colors" aria-labelledby="colors-title">
        <div class="section-head">
          <div>
            <p class="eyebrow">Color story</p>
            <h2 id="colors-title">The colors of the season</h2>
            <p class="intro">Four shades carrying fall right now, and three already arriving for spring.</p>
          </div>
        </div>
        <div class="colors">${DATA.colors
          .map(
            (c) => `<div class="color">
              <div class="color-chip" style="background:${c.hex}"></div>
              <span class="season-tag">${esc(DATA.seasons[c.season].short)}</span>
              <strong>${esc(c.name)}</strong>
              <code>${esc(c.hex)}</code>
              <p>${esc(c.note)}</p>
            </div>`
          )
          .join("")}</div>
      </section>

      <section class="section" id="ss27" aria-labelledby="ss27-title">
        <div class="section-head">
          <div>
            <p class="eyebrow">Early read · Milan and Paris, September 2026</p>
            <h2 id="ss27-title">Spring/Summer 2027</h2>
            <p class="intro">${esc(DATA.seasons.ss27.intro)}</p>
          </div>
          <div class="rail-controls">
            <button class="icon-btn" type="button" data-rail="-1" aria-label="Scroll back">${ICON.left}</button>
            <button class="icon-btn" type="button" data-rail="1" aria-label="Scroll forward">${ICON.right}</button>
          </div>
        </div>
        <div class="rail" id="ss27-rail">${inSeason("ss27").map((t) => cardHTML(t)).join("")}</div>
      </section>`;

    renderIndex();
    setupRail();
  }

  function renderIndex() {
    const grid = document.getElementById("trend-grid");
    if (!grid) return;
    const pool = inSeason(state.season);
    const cats = DATA.categories.filter((c) => pool.some((t) => t.category === c.id));
    if (state.category !== "all" && !cats.some((c) => c.id === state.category)) state.category = "all";

    const seasonInfo = DATA.seasons[state.season];
    document.getElementById("trends-title").textContent = seasonInfo ? seasonInfo.label : "Every trend";
    document.getElementById("trends-intro").textContent = seasonInfo
      ? seasonInfo.intro
      : "Fall/Winter 2026, Studio to Street and the Spring/Summer 2027 early read in one place.";

    document.querySelectorAll("[data-season-btn]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.seasonBtn === state.season));
    });

    const chips = document.getElementById("cat-chips");
    chips.hidden = cats.length < 2;
    chips.innerHTML = [{ id: "all", label: "All" }]
      .concat(cats)
      .map(
        (c) =>
          `<button class="chip" type="button" data-cat="${c.id}" aria-pressed="${state.category === c.id}">${esc(c.label)}</button>`
      )
      .join("");

    document.getElementById("sort-select").value = state.sort;

    let list = pool.filter((t) => state.category === "all" || t.category === state.category);
    if (state.sort === "status") {
      list = list.slice().sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
    } else if (state.sort === "az") {
      list = list.slice().sort((a, b) => a.name.replace(/^'/, "").localeCompare(b.name.replace(/^'/, "")));
    }

    document.getElementById("trend-count").textContent = plural(list.length, "trend");
    grid.innerHTML = list.length
      ? list.map((t, i) => cardHTML(t, { eager: i < 4 })).join("")
      : `<p class="empty">No trends match these filters.</p>`;
  }

  function setupRail() {
    const rail = document.getElementById("ss27-rail");
    if (!rail) return;
    const btns = document.querySelectorAll("[data-rail]");
    const sync = () => {
      const max = rail.scrollWidth - rail.clientWidth - 2;
      btns[0].disabled = rail.scrollLeft <= 2;
      btns[1].disabled = rail.scrollLeft >= max;
    };
    btns.forEach((b) =>
      b.addEventListener("click", () => {
        rail.scrollBy({ left: Number(b.dataset.rail) * rail.clientWidth * 0.75, behavior: reduceMotion ? "auto" : "smooth" });
      })
    );
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  }

  // ---------- Detail ----------
  function related(t) {
    const others = DATA.trends.filter((o) => o.id !== t.id);
    const sameCat = others.filter((o) => o.category === t.category);
    const sameSeason = others.filter((o) => o.season === t.season && o.category !== t.category);
    return sameCat.concat(sameSeason).slice(0, 4);
  }

  function renderDetail(t) {
    const season = DATA.seasons[t.season];
    const isSaved = saved.has(t.id);
    const photos = range(t.images).map((n) => ({ n, credit: CREDITS[`${t.id}-${n}`] }));

    detail.innerHTML = `
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="#trends" data-season="${t.season}">${esc(season.label)}</a>
        <span aria-hidden="true">/</span>
        ${
          t.season === "studio"
            ? ""
            : `<a href="#trends" data-season="${t.season}" data-cat-link="${t.category}">${esc(catLabel[t.category])}</a>
        <span aria-hidden="true">/</span>`
        }
        <span aria-current="page">${esc(t.name)}</span>
      </nav>
      <div class="pdp">
        <div class="pdp-gallery-wrap">
          <div class="pdp-gallery" id="pdp-gallery">${photos
            .map(
              (p) => `<figure>
                <img src="${src(t.id, p.n)}" alt="Inspiration photo ${p.n} for ${esc(t.name)}" ${p.n > 1 ? 'loading="lazy"' : ""} decoding="async">
                ${p.credit ? `<figcaption>Photo: <a href="${esc(p.credit.url)}" target="_blank" rel="noopener">${esc(p.credit.author)}</a> · CC BY 2.0</figcaption>` : ""}
              </figure>`
            )
            .join("")}</div>
          ${t.images > 1 ? `<div class="pdp-dots" aria-hidden="true">${photos.map((p) => `<span${p.n === 1 ? ' class="on"' : ""}></span>`).join("")}</div>` : ""}
        </div>

        <div class="pdp-info">
          <div class="tags">
            <span class="badge ${t.status}">${STATUS[t.status]}</span>
            <span class="eyebrow">${esc(t.season === "studio" ? season.label : `${season.label} · ${catLabel[t.category]}`)}</span>
          </div>
          <h1 id="pdp-title" tabindex="-1">${esc(t.name)}</h1>
          <p class="lede">${esc(t.dek)}</p>

          <div class="pdp-block">
            <p class="label">Palette: <b id="palette-name">${esc(t.palette[0].name)}</b></p>
            <div class="palette-pick" role="group" aria-label="Palette">${t.palette
              .map(
                (p, i) =>
                  `<button type="button" data-swatch="${esc(p.name)}" aria-pressed="${i === 0}" aria-label="${esc(p.name)}" style="background:${p.hex}"></button>`
              )
              .join("")}</div>
          </div>

          ${
            t.seenAt.length
              ? `<div class="pdp-block"><p class="label"><b>Seen at</b></p><ul class="seen-list">${t.seenAt
                  .map((s) => `<li>${esc(s)}</li>`)
                  .join("")}</ul></div>`
              : ""
          }

          <p class="summary">${esc(t.summary)}</p>

          ${
            t.stats
              ? `<div class="stat-row">${t.stats
                  .map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`)
                  .join("")}</div>`
              : ""
          }

          <button class="btn btn-block" type="button" data-save="${t.id}" data-save-label aria-pressed="${isSaved}">${
      isSaved ? "Saved to my edit" : "Save to my edit"
    }</button>

          <div class="accordion">
            <details open>
              <summary>How to wear it</summary>
              <div class="acc-body"><ol>${t.howToWear.map((h) => `<li>${esc(h)}</li>`).join("")}</ol></div>
            </details>
            <details>
              <summary>Key pieces</summary>
              <div class="acc-body"><ul class="pieces">${t.keyPieces.map((k) => `<li>${esc(k)}</li>`).join("")}</ul></div>
            </details>
            <details>
              <summary>Sources</summary>
              <div class="acc-body">
                <p class="fine">Reporting for the ${esc(season.label)} section draws on:</p>
                <ul class="pieces">${season.sources
                  .map((id) => DATA.sources[id])
                  .map(
                    (s) =>
                      `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.outlet)}: ${esc(s.title)}</a></li>`
                  )
                  .join("")}</ul>
              </div>
            </details>
            <details>
              <summary>About the photos</summary>
              <div class="acc-body">
                <p class="fine">These photos illustrate the trend. They were not taken at the shows named above. They come from Google's Open Images dataset under a CC BY 2.0 license and are cropped to fit.</p>
                <ul class="pieces">${photos
                  .filter((p) => p.credit)
                  .map(
                    (p) =>
                      `<li>"${esc(p.credit.title)}" by <a href="${esc(p.credit.url)}" target="_blank" rel="noopener">${esc(p.credit.author)}</a>, <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener">CC BY 2.0</a></li>`
                  )
                  .join("")}</ul>
              </div>
            </details>
          </div>
        </div>
      </div>

      <section class="section related" aria-labelledby="related-title">
        <div class="section-head">
          <div><p class="eyebrow">Keep exploring</p><h2 id="related-title">Pairs well with</h2></div>
          <a class="text-link" href="#trends" data-season="${t.season}">All ${esc(season.short)} trends</a>
        </div>
        <div class="grid">${related(t).map((r) => cardHTML(r)).join("")}</div>
      </section>`;

    const gallery = document.getElementById("pdp-gallery");
    const dots = detail.querySelectorAll(".pdp-dots span");
    if (dots.length) {
      gallery.addEventListener(
        "scroll",
        () => {
          const i = Math.round(gallery.scrollLeft / Math.max(1, gallery.clientWidth));
          dots.forEach((d, k) => d.classList.toggle("on", k === i));
        },
        { passive: true }
      );
    }
  }

  // ---------- Footer ----------
  function renderFooter() {
    const groups = ["fw26", "studio", "ss27"].map((id) => {
      const s = DATA.seasons[id];
      return `<div><h3>${esc(s.label)}</h3><ul>${s.sources
        .map((sid) => DATA.sources[sid])
        .map(
          (src) =>
            `<li><a href="${esc(src.url)}" target="_blank" rel="noopener"><strong>${esc(src.outlet)}</strong><span>${esc(src.title)}</span></a></li>`
        )
        .join("")}</ul></div>`;
    });
    document.getElementById("footer").innerHTML = `
      <div class="footer-cols">
        <div class="footer-about">
          <span class="wordmark">moda</span>
          <p>Moda is a seasonal trend report built from runway, street and retail coverage published through ${updated}. The Peaking, Rising and Early signal labels are our editorial read.</p>
          <p>Photos illustrate each trend and were not taken at the shows described. They come from Google's Open Images dataset under CC BY 2.0. <button class="link-btn" type="button" data-open="credits-panel">See photo credits</button></p>
        </div>
        <div class="footer-sources">${groups.join("")}</div>
      </div>
      <div class="footer-base">
        <span>Updated ${updated}</span>
        <span>Saved trends stay in this browser only.</span>
      </div>`;
  }

  function renderCredits() {
    const rows = [];
    DATA.trends.forEach((t) => {
      range(t.images).forEach((n) => {
        const c = CREDITS[`${t.id}-${n}`];
        if (!c) return;
        rows.push(`<li>
          <img src="${src(t.id, n)}" alt="" loading="lazy" decoding="async">
          <div><strong>${esc(t.name)}</strong>, photo ${n}
            <span>"${esc(c.title)}" by <a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.author)}</a>, CC BY 2.0. Cropped.</span>
          </div>
        </li>`);
      });
    });
    document.getElementById("credits-body").innerHTML = `
      <p class="intro">All photos come from Google's Open Images dataset and were originally posted to Flickr under the <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener">CC BY 2.0</a> license. They illustrate each trend and were not taken at the shows described.</p>
      <ol>${rows.join("")}</ol>`;
  }

  // ---------- Saved panel + state sync ----------
  function renderSaved() {
    const count = saved.size;
    const badge = document.getElementById("saved-count");
    badge.textContent = String(count);
    badge.hidden = count === 0;
    document.getElementById("saved-btn").setAttribute("aria-label", `Saved trends, ${count} saved`);

    const body = document.getElementById("saved-body");
    if (!count) {
      body.innerHTML = `<div class="saved-empty">
        <p>Tap the heart on any trend to save it here and build your own edit for the season.</p>
        <a class="btn btn-outline" href="#trends" data-close>Browse trends</a>
      </div>`;
      return;
    }
    const items = DATA.trends.filter((t) => saved.has(t.id));
    body.innerHTML =
      items
        .map(
          (t) => `<div class="saved-item">
            <img src="${src(t.id, 1)}" alt="" loading="lazy" decoding="async">
            <a href="#${t.id}" data-close><strong>${esc(t.name)}</strong><span>${esc(DATA.seasons[t.season].label)} · ${esc(
            catLabel[t.category]
          )}</span><span class="swatches">${t.palette
            .map((p) => `<i class="swatch" style="background:${p.hex}"></i>`)
            .join("")}</span></a>
            <button class="icon-btn" type="button" data-save="${t.id}" aria-label="Remove ${esc(t.name)}">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
            </button>
          </div>`
        )
        .join("") + `<p class="saved-note">${plural(count, "trend")} saved in this browser.</p>`;
  }

  function toggleSave(id) {
    if (saved.has(id)) saved.delete(id);
    else saved.add(id);
    writeSaved();
    const on = saved.has(id);
    const t = byId.get(id);
    document.querySelectorAll(`[data-save="${id}"]`).forEach((b) => {
      if (b.closest("#saved-panel")) return;
      b.setAttribute("aria-pressed", String(on));
      if (b.hasAttribute("data-save-label")) b.textContent = on ? "Saved to my edit" : "Save to my edit";
      else b.setAttribute("aria-label", `${on ? "Remove" : "Save"} ${t.name}`);
    });
    renderSaved();
  }

  // ---------- Search ----------
  const SUGGEST = ["Capes", "Prada", "Red", "Leggings", "Pearls", "Shearling", "Chanel"];
  function searchText(t) {
    return [t.name, t.dek, t.summary, catLabel[t.category], DATA.seasons[t.season].label]
      .concat(t.seenAt, t.keyPieces, t.palette.map((p) => p.name))
      .join(" ")
      .toLowerCase();
  }
  const INDEX = DATA.trends.map((t) => [t, searchText(t)]);

  function renderSearch(q) {
    const results = document.getElementById("search-results");
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      results.innerHTML = "";
      return;
    }
    const hits = INDEX.filter(([, text]) => terms.every((w) => text.includes(w))).map(([t]) => t);
    results.innerHTML = hits.length
      ? hits
          .slice(0, 8)
          .map(
            (t) => `<li><a href="#${t.id}" data-close>
              <img src="${src(t.id, 1)}" alt="" loading="lazy" decoding="async">
              <div><strong>${esc(t.name)}</strong><span>${esc(DATA.seasons[t.season].label)} · ${esc(t.dek)}</span></div>
            </a></li>`
          )
          .join("")
      : `<li class="none">No trends match "${esc(q)}". Try a designer, a color or a piece like "trench".</li>`;
  }

  // ---------- Views + routing ----------
  function showHome() {
    if (view === "home") return;
    detail.hidden = true;
    detail.innerHTML = "";
    home.hidden = false;
    document.title = BASE_TITLE;
    view = "home";
  }

  function showDetail(t) {
    if (view === "home") homeScroll = window.scrollY;
    home.hidden = true;
    detail.hidden = false;
    renderDetail(t);
    document.title = `${t.name} · ${BASE_TITLE}`;
    view = "detail";
    window.scrollTo(0, 0);
    const h = document.getElementById("pdp-title");
    if (h) h.focus({ preventScroll: true });
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === "top") window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function setHash(id) {
    try {
      history.pushState(null, "", `#${id}`);
      routedHash = location.hash;
    } catch (e) {
      /* history unavailable in this frame; the view still updates */
    }
  }

  function route() {
    // Browsers fire both popstate and hashchange for one navigation; handle it once.
    if (location.hash === routedHash) return;
    routedHash = location.hash;
    const id = decodeURIComponent(location.hash.slice(1));
    if (byId.has(id)) {
      showDetail(byId.get(id));
      return;
    }
    const fromDetail = view === "detail";
    showHome();
    if (fromDetail) window.scrollTo(0, homeScroll);
    else if (SECTIONS.has(id)) scrollToSection(id);
  }

  function goSection(id) {
    showHome();
    if (location.hash !== `#${id}`) setHash(id);
    // Wait a frame so the home view is laid out before scrolling.
    requestAnimationFrame(() => scrollToSection(id));
  }

  // ---------- Events ----------
  document.addEventListener("click", (e) => {
    const target = e.target;

    const saveBtn = target.closest("[data-save]");
    if (saveBtn) {
      e.preventDefault();
      toggleSave(saveBtn.dataset.save);
      return;
    }

    const opener = target.closest("[data-open]");
    if (opener) {
      const dlg = document.getElementById(opener.dataset.open);
      if (dlg && !dlg.open) dlg.showModal();
      return;
    }

    const dialog = target.closest("dialog");
    if (dialog && target.closest("[data-close]")) dialog.close();
    if (dialog && target === dialog) {
      // A click on the dialog element itself lands either on its backdrop or on
      // empty panel space; close only for the backdrop.
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
      return;
    }

    const tile = target.closest("[data-tile]");
    if (tile) {
      state.season = "all";
      state.category = tile.dataset.tile;
      renderIndex();
      goSection("trends");
      return;
    }

    const seasonBtn = target.closest("[data-season-btn]");
    if (seasonBtn) {
      state.season = seasonBtn.dataset.seasonBtn;
      renderIndex();
      return;
    }

    const chip = target.closest("[data-cat]");
    if (chip) {
      state.category = chip.dataset.cat;
      renderIndex();
      return;
    }

    const swatch = target.closest("[data-swatch]");
    if (swatch) {
      swatch.parentElement.querySelectorAll("[data-swatch]").forEach((b) => b.setAttribute("aria-pressed", String(b === swatch)));
      document.getElementById("palette-name").textContent = swatch.dataset.swatch;
      return;
    }

    const link = target.closest('a[href^="#"]');
    if (link) {
      const id = link.getAttribute("href").slice(1);
      if (SECTIONS.has(id)) {
        e.preventDefault();
        if (link.dataset.season) {
          state.season = link.dataset.season;
          state.category = link.dataset.catLink || "all";
        }
        if (view !== "home") showHome();
        renderIndex();
        goSection(id);
      }
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.id === "sort-select") {
      state.sort = e.target.value;
      renderIndex();
    }
  });

  document.getElementById("menu-btn").addEventListener("click", () => document.getElementById("menu-panel").showModal());
  document.getElementById("saved-btn").addEventListener("click", () => document.getElementById("saved-panel").showModal());
  document.getElementById("search-btn").addEventListener("click", () => {
    const panel = document.getElementById("search-panel");
    panel.showModal();
    const input = document.getElementById("search-input");
    input.focus();
    input.select();
  });

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", () => renderSearch(searchInput.value));
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const first = document.querySelector("#search-results a");
    if (first) {
      document.getElementById("search-panel").close();
      location.hash = first.getAttribute("href");
    }
  });
  document.getElementById("search-suggest").innerHTML =
    `<span class="label">Try</span>` +
    SUGGEST.map((s) => `<button class="chip" type="button" data-suggest="${esc(s)}">${esc(s)}</button>`).join("");
  document.getElementById("search-suggest").addEventListener("click", (e) => {
    const b = e.target.closest("[data-suggest]");
    if (!b) return;
    searchInput.value = b.dataset.suggest;
    renderSearch(searchInput.value);
    searchInput.focus();
  });

  window.addEventListener("hashchange", route);
  window.addEventListener("popstate", route);

  // ---------- Announcement bar ----------
  const MESSAGES = [
    `Fall/Winter 2026 trend report: ${inSeason("fw26").length} runway trends, updated ${updated}`,
    "Spring/Summer 2027 early read: first notes from Milan and Paris",
    "Save trends with the heart to build your own edit",
  ];
  if (!reduceMotion) {
    const el = document.getElementById("announce-text");
    let i = 0;
    setInterval(() => {
      if (document.hidden) return;
      el.classList.add("is-fading");
      setTimeout(() => {
        i = (i + 1) % MESSAGES.length;
        el.textContent = MESSAGES[i];
        el.classList.remove("is-fading");
      }, 350);
    }, 5000);
  }
  document.getElementById("announce-text").textContent = MESSAGES[0];

  // ---------- Boot ----------
  renderHome();
  renderFooter();
  renderCredits();
  renderSaved();
  route();
  if (view === null) showHome();
})();
