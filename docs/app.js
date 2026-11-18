/* ==========================================================================
   NUTC "Open Another Door" Blueprint Interactive Controls
   ========================================================================== */

(function () {
  "use strict";

  /* ── 1. Mobile Navigation Drawer & Active Scroll-Spy ── */
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const navLinks = Array.from(document.querySelectorAll(".site-nav .nav-link"));

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = Array.from(document.querySelectorAll("main > section[id]"));
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            const match = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-active", match);
          });
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.05 }
    );
    sections.forEach(function (sec) {
      spy.observe(sec);
    });
  }

  /* ── 2. Section 1: Seven-Scene Blueprint Briefing Index ── */
  const sceneBriefs = {
    s01: {
      code: "S01 //",
      num: "SCENE 01 / 07",
      text: "灰暗 PPT 投影片 3D 碎裂解體 → 立體門扉開啟：破除「只用 AI 做簡報」的假轉型。"
    },
    s02: {
      code: "S02 //",
      num: "SCENE 02 / 07",
      text: "三座跨界造物工坊展開：互動軟體造物 × 3D 空間視覺 × 程式碼驅動動態影音與音效。"
    },
    s03: {
      code: "S03 //",
      num: "SCENE 03 / 07",
      text: "盤點 15,600+ 師生、6 大學院與三學制體質：捨棄硬體軍備戰與論文課，啟動雙引擎。"
    },
    s04: {
      code: "S04 //",
      num: "SCENE 04 / 07",
      text: "1 核心樞紐「AI 造物者社群」：禁空泛論文與靜態 PPT，每月 30 分鐘 Live Build 實戰。"
    },
    s05: {
      code: "S05 //",
      num: "SCENE 05 / 07",
      text: "引擎一「系辦 × iPAS 微軟體特攻隊」：嚴守零個資沙盒紅線，目標縮減 70% 重複工時。"
    },
    s06: {
      code: "S06 //",
      num: "SCENE 06 / 07",
      text: "引擎二「三學制 3 小時跨門挑戰」：不改 18 學分課綱，精準切入五專、四技、二技。"
    },
    s07: {
      code: "S07 //",
      num: "SCENE 07 / 07",
      text: "3 階段滾動擴張：第 1 學期點火 → 第 2 學期校發立項 → 第 2 年跨界大賞與作品換算力。"
    }
  };

  const sceneTabs = Array.from(document.querySelectorAll(".scene-chip[data-scene]"));
  const sceneBriefBar = document.getElementById("scene-brief-bar");

  sceneTabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const key = btn.getAttribute("data-scene");
      const info = sceneBriefs[key];
      if (!info || !sceneBriefBar) return;

      sceneTabs.forEach(function (t) {
        const active = t === btn;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });

      sceneBriefBar.innerHTML =
        "<span><strong>" +
        info.code +
        "</strong> " +
        info.text +
        "</span><span class=\"mono\">" +
        info.num +
        "</span>";
    });
  });

  /* ── 3. Section 2: Inter-University Strategy Matrix Filter ── */
  const matrixButtons = Array.from(document.querySelectorAll("[data-matrix-filter]"));
  const matrixRows = Array.from(document.querySelectorAll("#matrix-table tbody tr"));

  matrixButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const filter = btn.getAttribute("data-matrix-filter");
      matrixButtons.forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });

      matrixRows.forEach(function (row) {
        const cat = row.getAttribute("data-cat");
        if (filter === "all") {
          row.classList.remove("is-dimmed");
        } else if (filter === "nutc") {
          row.classList.toggle("is-dimmed", cat !== "nutc");
        } else {
          row.classList.toggle("is-dimmed", cat !== filter && cat !== "nutc");
        }
      });
    });
  });

  /* ── 4. Section 3: Core 1-2-3 Architecture SVG Interactive Focus ── */
  const archSvg = document.getElementById("core-arch-svg");
  const archButtons = Array.from(document.querySelectorAll("[data-arch-focus]"));
  const archNodes = Array.from(document.querySelectorAll("#core-arch-svg .arch-node"));
  const archFlows = Array.from(document.querySelectorAll("#core-arch-svg .arch-flow"));
  const specCards = Array.from(document.querySelectorAll("#arch-legend-grid .node-spec-card"));

  let currentArchFocus = "all";

  function applyArchFocus(focus) {
    currentArchFocus = focus;

    archButtons.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-arch-focus") === focus);
    });

    if (!archSvg) return;

    if (focus === "all") {
      archSvg.classList.remove("has-focus");
      archNodes.forEach(function (n) { n.classList.remove("is-focused"); });
      archFlows.forEach(function (f) { f.classList.remove("is-focused"); });
      specCards.forEach(function (c) {
        c.classList.remove("is-focused", "is-dimmed");
      });
      return;
    }

    archSvg.classList.add("has-focus");
    archNodes.forEach(function (n) {
      n.classList.toggle("is-focused", n.getAttribute("data-node") === focus);
    });
    archFlows.forEach(function (f) {
      const tags = (f.getAttribute("data-flow") || "").split(/\s+/);
      f.classList.toggle("is-focused", tags.indexOf(focus) !== -1);
    });
    specCards.forEach(function (c) {
      const isMatch = c.getAttribute("data-focus") === focus;
      c.classList.toggle("is-focused", isMatch);
      c.classList.toggle("is-dimmed", !isMatch);
    });
  }

  archButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyArchFocus(btn.getAttribute("data-arch-focus"));
    });
  });

  function toggleOrSelectFocus(targetFocus) {
    if (currentArchFocus === targetFocus) {
      applyArchFocus("all");
    } else {
      applyArchFocus(targetFocus);
    }
  }

  archNodes.forEach(function (node) {
    node.addEventListener("click", function () {
      toggleOrSelectFocus(node.getAttribute("data-node"));
    });
    node.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        toggleOrSelectFocus(node.getAttribute("data-node"));
      }
    });
  });

  specCards.forEach(function (card) {
    card.addEventListener("click", function () {
      toggleOrSelectFocus(card.getAttribute("data-focus"));
    });
    card.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        toggleOrSelectFocus(card.getAttribute("data-focus"));
      }
    });
  });

  /* ── 5. Section 4: 6-Week Sandbox Pain-Point Compression Simulator ── */
  const sandboxCases = {
    rag: {
      deliverable: "24 小時系辦修課法規問答微軟體",
      pct: "-75%",
      beforeHrs: "10.0 hr/週",
      beforePct: 84,
      afterHrs: "2.5 hr/週",
      afterPct: 21,
      input: "輸入：公開學則・歷年抵免 Q&A",
      redline: "紅線：無學生姓名・無成績學號",
      tech: "技術：RAG 向量檢索 + 引用出處"
    },
    form: {
      deliverable: "空白實習合約與表單格式自動檢核器",
      pct: "-70%",
      beforeHrs: "8.0 hr/週",
      beforePct: 68,
      afterHrs: "2.4 hr/週",
      afterPct: 20,
      input: "輸入：空白合約範本・欄位規則表",
      redline: "紅線：僅格式比對・學生敏資不外傳",
      tech: "技術：規則引擎 + 前端本地解析"
    },
    promo: {
      deliverable: "系網活動圖文與多管道排程產生工具",
      pct: "-69%",
      beforeHrs: "6.5 hr/週",
      beforePct: 55,
      afterHrs: "2.0 hr/週",
      afterPct: 17,
      input: "輸入：公開講座資訊・系網版型規範",
      redline: "紅線：僅公開宣傳文稿・不碰名單",
      tech: "技術：多模態模板 + 自動排程輸出"
    },
    eval: {
      deliverable: "評鑑公開佐證資料結構化彙整工具",
      pct: "-70%",
      beforeHrs: "12.0 hr/週",
      beforePct: 96,
      afterHrs: "3.6 hr/週",
      afterPct: 29,
      input: "輸入：去識別化統計指標・公開成果",
      redline: "紅線：物理隔離校務核心資料庫",
      tech: "技術：結構化彙整 Agent + 清單輸出"
    }
  };

  const simTabs = Array.from(document.querySelectorAll(".sim-tab[data-case]"));
  const elDeliverable = document.getElementById("sim-deliverable");
  const elPct = document.getElementById("sim-pct");
  const elBarBefore = document.getElementById("sim-bar-before");
  const elBarAfter = document.getElementById("sim-bar-after");
  const elValBefore = document.getElementById("sim-val-before");
  const elValAfter = document.getElementById("sim-val-after");
  const elGuardStrip = document.getElementById("sim-guard-strip");

  simTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const key = tab.getAttribute("data-case");
      const data = sandboxCases[key];
      if (!data) return;

      simTabs.forEach(function (t) {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });

      if (elDeliverable) elDeliverable.textContent = data.deliverable;
      if (elPct) elPct.textContent = data.pct;
      if (elBarBefore) elBarBefore.style.transform = "scaleX(" + (data.beforePct / 100) + ")";
      if (elBarAfter) elBarAfter.style.transform = "scaleX(" + (data.afterPct / 100) + ")";
      if (elValBefore) elValBefore.textContent = data.beforeHrs;
      if (elValAfter) elValAfter.textContent = data.afterHrs;

      if (elGuardStrip) {
        elGuardStrip.innerHTML =
          "<span class=\"pill-tag mint\">" + data.input + "</span>" +
          "<span class=\"pill-tag coral\">" + data.redline + "</span>" +
          "<span class=\"pill-tag cyan\">" + data.tech + "</span>";
      }
    });
  });
})();
