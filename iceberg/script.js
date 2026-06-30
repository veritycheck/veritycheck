// ============ DATA ============
// Each layer: label shown on the ice block, the depth tag, the fact title + body,
// hitsNeeded = clicks to break through, height = visual thickness (taller = deeper/bigger)
const LAYERS = [
    {
      label: "memes & social feeds",
      icon: "🌊",
      hits: 2,
      height: 90,
      depth: "surface",
      title: "The part everyone sees",
      body: "Roughly 5 billion people use the internet, but what most of them experience day to day is a tiny little part of it, a handful of apps recommending content back to them. The other 99% of the internet is invisible by design.",
      links: [
        { label: "Internet usage statistics, Our World in Data", url: "https://ourworldindata.org/internet" },
        { label: "How recommendation algorithms work, Wikipedia", url: "https://en.wikipedia.org/wiki/Recommender_system" }
      ]
    },
    {
      label: "search engines",
      icon: "🔍",
      hits: 4,
      height: 95,
      depth: "shallow",
      title: "Search sees less than you think",
      body: "Google and other search engines only index a fraction of all web pages, the publicly linked, crawlable ones. Pages behind logins, paywalls, or simply not linked from anywhere else never make it into the index at all.",
      links: [
        { label: "How Google Search indexing works", url: "https://developers.google.com/search/docs/fundamentals/how-search-works" },
        { label: "Deep web vs. surface web , explainer", url: "https://en.wikipedia.org/wiki/Deep_web" }
      ]
    },
    {
      label: "email & cloud storage",
      icon: "📧",
      hits: 5,
      height: 100,
      depth: "shallow",
      title: "Boring, but it's the backbone",
      body: "Email predates the World Wide Web by over a decade, the first email was sent in 1971, almost 20 years before the first website existed in 1991. The 'boring' infrastructure is often the oldest part of the stack.",
      links: [
        { label: "History of email , Wikipedia", url: "https://en.wikipedia.org/wiki/Email#History" },
        { label: "The first website ever published , CERN", url: "https://home.cern/science/computing/birth-web/short-history-web" }
      ]
    },
    {
      label: "forums & old web",
      icon: "💬",
      hits: 5,
      height: 105,
      depth: "submerged",
      title: "Link rot is real",
      body: "Studies estimate a large share of links on the web simply stop working within a few years, pages get deleted, sites shut down, domains expire. Huge amounts of the early 'public' internet have already quietly vanished.",
      links: [
        { label: "Link rot research , Pew Research Center", url: "https://www.pewresearch.org/short-reads/2024/05/17/many-links-on-the-internet-point-to-content-that-no-longer-exists/" },
        { label: "The Internet Archive's Wayback Machine", url: "https://web.archive.org/" }
      ]
    },
    {
      label: "deep web (logins, intranets)",
      icon: "🔐",
      hits: 6,
      height: 110,
      depth: "deep",
      title: "Not the spooky part yet",
      body: "The 'deep web' just means anything not indexed by search engines, your email inbox, banking portal, private cloud docs, company intranets. It's estimated to be hundreds of times larger than the indexed surface web, and it's almost entirely mundane.",
      links: [
        { label: "Deep web , Wikipedia overview", url: "https://en.wikipedia.org/wiki/Deep_web" },
        { label: "Deep web vs. dark web, explained , Kaspersky", url: "https://www.kaspersky.com/resource-center/threats/deep-web" }
      ]
    },
    {
      label: "abandoned servers & ghost sites",
      icon: "🖥️",
      hits: 6,
      height: 115,
      depth: "deep",
      title: "Online ghost towns",
      body: "Countless websites still run on servers nobody actively maintains like old company sites, dead startups, personal pages from the 2000s, still technically online, still technically reachable, completely forgotten by their owners.",
      links: [
        { label: "Abandonware & digital preservation , Wikipedia", url: "https://en.wikipedia.org/wiki/Abandonware" },
        { label: "Why old websites never really die , explainer", url: "https://www.theverge.com/2021/6/28/22554153/internet-archive-wayback-machine-dead-websites" }
      ]
    },
    {
      label: "Tor & onion routing",
      icon: "🧅",
      hits: 8,
      height: 120,
      depth: "dark",
      title: "Onions, not skulls",
      body: "Tor routes traffic through multiple encrypted relays so no single point knows both who you are and what you're requesting. It was originally developed by the U.S. Naval Research Laboratory for protecting government communications, not for crime.",
      links: [
        { label: "How Tor works , Tor Project", url: "https://support.torproject.org/about/how-is-tor-different-than-other-proxies/" },
        { label: "History of onion routing , Wikipedia", url: "https://en.wikipedia.org/wiki/Onion_routing" }
      ]
    },
    {
      label: "darknet markets",
      icon: "🕳️",
      hits: 8,
      height: 125,
      depth: "dark",
      title: "The part the iceberg memes love",
      body: "This is the layer most 'internet iceberg' memes obsess over, but it's a tiny fraction of all internet traffic. Most of the actual dark web is dead links, abandoned forums, and pages that load once and never again.",
      links: [
        { label: "Darknet market , Wikipedia", url: "https://en.wikipedia.org/wiki/Darknet_market" },
        { label: "How big is the dark web, really? , research summary", url: "https://www.recordedfuture.com/threat-intelligence-101/dark-web-monitoring/dark-web-vs-deep-web-vs-surface-web" }
      ]
    },
    {
      label: "internet infrastructure",
      icon: "🛰️",
      hits: 8,
      height: 130,
      depth: "abyssal",
      title: "It's mostly just cables",
      body: "Almost all intercontinental internet traffic, over 95% of it, travels through undersea fiber-optic cables, not satellites. There are hundreds of these cables crossing ocean floors, and ships exist specifically to repair them when they break.",
      links: [
        { label: "Interactive map of undersea cables , TeleGeography", url: "https://www.submarinecablemap.com/" },
        { label: "Submarine communications cable, Wikipedia", url: "https://en.wikipedia.org/wiki/Submarine_communications_cable" }
      ]
    },
    {
      label: "the protocols holding it all together",
      icon: "⚙️",
      hits: 8,
      height: 140,
      depth: "core",
      title: "TCP/IP: the actual bedrock",
      body: "Every layer above runs on the same handful of protocols designed in the 1970s, TCP/IP. No central authority owns or controls them. The 'internet' isn't a place, it's an agreement, thousands of independent networks agreeing to speak the same language.",
      links: [
        { label: "Internet protocol suite , Wikipedia", url: "https://en.wikipedia.org/wiki/Internet_protocol_suite" },
        { label: "A brief history of the internet , Internet Society", url: "https://www.internetsociety.org/internet/history-internet/brief-history-internet/" }
      ]
    }
  ];
  
  // ============ STATE ============
  let currentLayer = 0;
  let currentHits = 0;
  const totalLayers = LAYERS.length;
  
  // ============ DOM ============
  const icebergCard = document.getElementById("icebergCard");
  const icebergShape = document.getElementById("icebergShape");
  const crackLayer = document.getElementById("crackLayer");
  const hudDepth = document.getElementById("hudDepth");
  const hudPips = document.getElementById("hudPips");
  const progressFill = document.getElementById("progressFill");
  const progressPct = document.getElementById("progressPct");
  const layerCounter = document.getElementById("layerCounter");
  const factCard = document.getElementById("factCard");
  const factDepth = document.getElementById("factDepth");
  const factTitle = document.getElementById("factTitle");
  const factBody = document.getElementById("factBody");
  const factLinksEl = document.getElementById("factLinks");
  const factLogList = document.getElementById("factLogList");
  const bergInstructions = document.getElementById("bergInstructions");
  const endSection = document.getElementById("endSection");
  const resetBtn = document.getElementById("resetBtn");
  const rebuildBtn = document.getElementById("rebuildBtn");

  function colorForStep(palette, frac) {
    const idx = Math.round(frac * (palette.length - 1));
    return getComputedStyle(document.documentElement).getPropertyValue(palette[idx]).trim();
  }

  // ============ BUILD CRACK LAYER ============
  function buildCracks() {
    crackLayer.innerHTML = "";
    CRACK_PATHS.forEach((d, i) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "crack-line");
      path.dataset.index = i;
      crackLayer.appendChild(path);
    });
  }

  function pipsHTML(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<span></span>";
    return s;
  }

  function refreshPips() {
    if (currentLayer >= totalLayers) {
      hudPips.innerHTML = "";
      return;
    }
    hudPips.innerHTML = pipsHTML(LAYERS[currentLayer].hits);
  }

  const ICE_PALETTE = ["--ice0","--ice1","--ice2","--ice3","--ice4","--ice5","--ice6","--ice7","--ice8","--ice9","--ice10"];

  function updateIcebergVisual() {
    const frac = currentLayer / totalLayers;
    icebergShape.style.fill = colorForStep(ICE_PALETTE, frac);
    if (currentLayer >= totalLayers) {
      icebergCard.classList.add("melted");
    }
  }

  // ============ INTERACTION ============
  function handleIcebergClick(evt) {
    if (currentLayer >= totalLayers) return;

    currentHits++;
    const layer = LAYERS[currentLayer];

    icebergCard.classList.remove("cracking");
    void icebergCard.offsetWidth;
    icebergCard.classList.add("cracking");

    const pips = hudPips.querySelectorAll("span");
    if (pips[currentHits - 1]) pips[currentHits - 1].classList.add("hit");

    spawnHitFeedback(evt, layer.hits - currentHits);

    if (currentHits >= layer.hits) {
      breakLayer();
    }
  }

  function spawnHitFeedback(evt, remaining) {
    const rect = icebergCard.getBoundingClientRect();
    const fb = document.createElement("div");
    fb.className = "hit-feedback pop";
    fb.textContent = remaining > 0 ? "crack!" : "broke through!";
    fb.style.left = (evt.clientX - rect.left) + "px";
    fb.style.top = (evt.clientY - rect.top) + "px";
    icebergCard.appendChild(fb);
    setTimeout(() => fb.remove(), 650);
  }

  function breakLayer() {

    setTimeout(() => {
      revealFact(currentLayer);
      currentLayer++;
      currentHits = 0;
      updateProgress();
      updateIcebergVisual();
      refreshPips();

      if (currentLayer >= totalLayers) {
        finishBerg();
      } else {
        hudDepth.textContent = LAYERS[currentLayer].depth;
      }
    }, 280);
  }
  
  // ============ FACT REVEAL ============
  function revealFact(index) {
    const layer = LAYERS[index];
    factDepth.textContent = layer.depth;
    factTitle.textContent = layer.title;
    factBody.textContent = layer.body;
    factCard.classList.remove("flash");
    void factCard.offsetWidth;
    factCard.classList.add("flash");
  
    renderLinks(layer.links);
  
    if (factLogList.querySelector(".fact-log-empty")) {
      factLogList.innerHTML = "";
    }
    const item = document.createElement("div");
    item.className = "fact-log-item";
    item.innerHTML = `
      <span class="ln">${String(index + 1).padStart(2, "0")}</span>
      <div class="lt-wrap">
        <span class="lt">${layer.title}</span>
        ${linksToInlineHTML(layer.links)}
      </div>
    `;
    factLogList.prepend(item);
  
    bergInstructions.classList.add("hide");
  }
  
  function renderLinks(links) {
    factLinksEl.innerHTML = "";
    if (!links || links.length === 0) return;
  
    const heading = document.createElement("p");
    heading.className = "fact-links-label";
    heading.textContent = "// read more";
    factLinksEl.appendChild(heading);
  
    links.forEach((l) => {
      const a = document.createElement("a");
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "fact-link";
      a.innerHTML = `${l.label} <span class="fact-link-arrow">↗</span>`;
      factLinksEl.appendChild(a);
    });
  }
  
  function linksToInlineHTML(links) {
    if (!links || links.length === 0) return "";
    const anchors = links
      .map((l) => `<a href="${l.url}" target="_blank" rel="noopener" class="log-link">source</a>`)
      .join(" · ");
    return `<span class="log-links">${anchors}</span>`;
  }
  
  // ============ PROGRESS ============
  function updateProgress() {
    const pct = Math.round((currentLayer / totalLayers) * 100);
    progressFill.style.width = pct + "%";
    progressPct.textContent = pct;
    layerCounter.textContent = `layer ${String(currentLayer).padStart(2, "0")} / ${totalLayers}`;
  }
  
  // ============ END STATE ============
  function finishBerg() {
    layerCounter.textContent = `layer ${totalLayers} / ${totalLayers} · done`;
    hudDepth.textContent = "core";
    endSection.classList.add("show");
    setTimeout(() => {
      endSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  }
  
  // ============ RESET ============
  function resetBerg() {
    currentLayer = 0;
    currentHits = 0;
    factDepth.textContent = ",";
    factTitle.textContent = "Start chipping";
    factBody.textContent = "Every click reveals a fact about the internet , from the stuff you scroll past daily to what's actually running underneath it. Get chipping to reveal the first one.";
    factLinksEl.innerHTML = "";
    factLogList.innerHTML = `<p class="fact-log-empty">nothing yet. get to work.</p>`;
    bergInstructions.classList.remove("hide");
    endSection.classList.remove("show");
    icebergCard.classList.remove("melted");
    hudDepth.textContent = LAYERS[0].depth;
    crackLayer.innerHTML = ""; 
    updateIcebergVisual();
    refreshPips();
    updateProgress();
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  }
  
  resetBtn.addEventListener("click", resetBerg);
  rebuildBtn.addEventListener("click", resetBerg);
  icebergCard.addEventListener("click", handleIcebergClick);
  
  // ============ INIT ============
  buildCracks();
  hudDepth.textContent = LAYERS[0].depth;
  updateIcebergVisual();
  refreshPips();
  updateProgress();