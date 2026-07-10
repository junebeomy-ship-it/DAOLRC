(function () {
  const DATA = window.RESTAURANT_DATA;
  const $ = (s) => document.querySelector(s);

  // 카테고리별 로고 색상 + 이모지 (로고 대체용 이니셜 아바타)
  const CAT = {
    ramen:      { emoji: "🍜", grad: ["#ff6a3d", "#ff2e63"], label: "라멘" },
    soupcurry:  { emoji: "🍛", grad: ["#f7971e", "#ffd200"], label: "수프카레" },
    takoyaki:   { emoji: "🐙", grad: ["#f857a6", "#ff5858"], label: "타코야키" },
    okonomiyaki:{ emoji: "🥞", grad: ["#f9a826", "#ef4b4b"], label: "오코노미야키" },
    kushikatsu: { emoji: "🍢", grad: ["#c94b4b", "#4b134f"], label: "쿠시카츠" },
    motsunabe:  { emoji: "🍲", grad: ["#e53935", "#e35d5b"], label: "모츠나베" },
    misokatsu:  { emoji: "🍖", grad: ["#8e2de2", "#c94b4b"], label: "미소카츠" },
    tebasaki:   { emoji: "🍗", grad: ["#f7b733", "#fc4a1a"], label: "테바사키" },
    unagi:      { emoji: "🍱", grad: ["#654ea3", "#eaafc8"], label: "장어덮밥" },
    udon:       { emoji: "🍥", grad: ["#36d1dc", "#5b86e5"], label: "우동" },
    soba:       { emoji: "🍜", grad: ["#3a7bd5", "#3a6073"], label: "소바" },
    kaiseki:    { emoji: "🍶", grad: ["#0f2027", "#78909c"], label: "카이세키" },
    cafe:       { emoji: "☕", grad: ["#a8763e", "#5c3d2e"], label: "카페" }
  };
  const catOf = (c) => CAT[c] || { emoji: "🍴", grad: ["#555", "#888"], label: "맛집" };

  const chipBox   = $("#cityChips");
  const searchEl  = $("#search");
  const suggestEl = $("#suggest");
  const resultsEl = $("#results");
  const emptyEl   = $("#empty");
  const cardsEl   = $("#cards");
  const titleEl   = $("#resultsTitle");
  const filtersEl = $("#typeFilters");

  let currentCity = null;
  let currentType = "all";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return "&#" + m.charCodeAt(0) + ";";
    });
  }

  DATA.cities.forEach((c) => {
    const b = document.createElement("button");
    b.className = "chip";
    b.dataset.city = c.id;
    b.innerHTML = c.emoji + " " + c.name + ' <span class="jp">' + c.jp + "</span>";
    b.onclick = () => selectCity(c.id);
    chipBox.appendChild(b);
  });

  function selectCity(id) {
    currentCity = id;
    currentType = "all";
    document.querySelectorAll(".chip").forEach((el) => {
      el.classList.toggle("active", el.dataset.city === id);
    });
    const city = DATA.cities.find((c) => c.id === id);
    searchEl.value = city ? city.name : "";
    hideSuggest();
    renderFilters();
    render();
    if (resultsEl.scrollIntoView) {
      resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function renderFilters() {
    const list = DATA.places[currentCity] || [];
    const hasCafe = list.some((p) => p.type === "카페");
    const hasFood = list.some((p) => p.type === "음식점");
    const opts = [["all", "전체"]];
    if (hasFood) opts.push(["음식점", "음식점"]);
    if (hasCafe) opts.push(["카페", "카페"]);
    filtersEl.innerHTML = "";
    opts.forEach((pair) => {
      const b = document.createElement("button");
      b.textContent = pair[1];
      b.className = pair[0] === currentType ? "active" : "";
      b.onclick = () => { currentType = pair[0]; renderFilters(); render(); };
      filtersEl.appendChild(b);
    });
  }

  function render() {
    const city = DATA.cities.find((c) => c.id === currentCity);
    let list = DATA.places[currentCity] || [];
    if (currentType !== "all") list = list.filter((p) => p.type === currentType);

    emptyEl.hidden = true;
    resultsEl.hidden = false;
    titleEl.innerHTML = city.emoji + " " + city.name +
      ' <small>' + list.length + "곳의 맛집·카페</small>";

    cardsEl.innerHTML = "";
    list.forEach((p, i) => {
      const cat = catOf(p.category);
      const card = document.createElement("article");
      card.className = "card";
      card.style.animationDelay = i * 45 + "ms";
      const tagText = p.type + " · " + cat.label + (p.area ? " · " + esc(p.area) : "");
      const menuHtml = p.menu.map((m) => "<span>" + esc(m) + "</span>").join("");
      card.innerHTML =
        '<div class="card-top">' +
          '<div class="logo" style="background:linear-gradient(135deg,' +
            cat.grad[0] + "," + cat.grad[1] + ')">' + cat.emoji + "</div>" +
          '<div class="card-name">' +
            "<h3>" + esc(p.name) + "</h3>" +
            '<div class="jp">' + esc(p.jp || "") + "</div>" +
          "</div>" +
        "</div>" +
        '<span class="tag">' + tagText + "</span>" +
        '<div class="divider"></div>' +
        '<div class="row"><span class="ico">🕒</span><b>' + esc(p.hours) + "</b></div>" +
        '<div class="row"><span class="ico">🍽️</span>대표 메뉴</div>' +
        '<div class="menu">' + menuHtml + "</div>";
      cardsEl.appendChild(card);
    });
  }

  function buildSuggest(q) {
    q = q.trim().toLowerCase();
    if (!q) return DATA.cities;
    return DATA.cities.filter((c) =>
      c.name.toLowerCase().includes(q) || c.jp.includes(q) || c.id.includes(q)
    );
  }
  function showSuggest() {
    const items = buildSuggest(searchEl.value);
    if (!items.length) { hideSuggest(); return; }
    suggestEl.innerHTML = "";
    items.forEach((c) => {
      const b = document.createElement("button");
      b.innerHTML = c.emoji + " " + c.name + ' <span class="jp">' + c.jp + "</span>";
      b.onclick = () => selectCity(c.id);
      suggestEl.appendChild(b);
    });
    suggestEl.hidden = false;
  }
  function hideSuggest() { suggestEl.hidden = true; }

  searchEl.addEventListener("input", showSuggest);
  searchEl.addEventListener("focus", showSuggest);
  searchEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const items = buildSuggest(searchEl.value);
      if (items.length) selectCity(items[0].id);
    } else if (e.key === "Escape") {
      hideSuggest();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrap")) hideSuggest();
  });
})();
