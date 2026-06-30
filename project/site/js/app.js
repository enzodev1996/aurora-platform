/* Aurora Wallet — shared app logic (vanilla JS)
   Injects sidebar + header chrome, handles theme, active-nav,
   and a multi-step modal engine for every action flow. */

(function () {
  "use strict";

  /* ---------- Icons ---------- */
  var I = {
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1.2" fill="currentColor" stroke="none"/></svg>',
    invest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6"/></svg>',
    vault: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 8.5V6"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>',
    in: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 4v12M7 11l5 5 5-5M5 20h14"/></svg>',
    out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20V8M7 13l5-5 5 5M5 4h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3l1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3L12 3Z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 16V5M8 9l4-4 4 4M5 19h14"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 12v4"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2 2 2 0 0 1-4 0 1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9 2 2 0 0 1 0-4 1.7 1.7 0 0 0 1.2-2.9l-.1-.1A2 2 0 1 1 7.2 3.3l.1.1a1.7 1.7 0 0 0 2.9-1.2 2 2 0 0 1 4 0 1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9 2 2 0 0 1 0 4 1.7 1.7 0 0 0-1.1 1.6Z"/></svg>'
  };
  window.AuroraIcons = I;

  /* Note: Lend XP page removed — invest and lend are unified into the Invest flow */
  var NAV = [
    { id: "dashboard", label: "Dashboard", icon: "grid", href: "index.html" },
    { id: "wallet", label: "Wallet", icon: "wallet", href: "wallet.html" },
    { id: "invest", label: "Invest", icon: "invest", href: "invest.html" },
    { id: "vault", label: "Aura Vault", icon: "vault", href: "vault.html" },
    { id: "transactions", label: "Transactions", icon: "list", href: "transactions.html" }
  ];
  var TITLES = { dashboard: "Dashboard", wallet: "Wallet", invest: "Invest", vault: "Aura Vault", transactions: "Transactions" };

  function fmt(n) { return n.toLocaleString("en-US"); }
  function fmt2(n) { return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  var ADDR = "0x9C4d8f2a3B1e7D5c0A6f4E2b8C1d9F0e7A3b2D7a";
  var TX = "0x7d2a91c4bb83f0e15a9c2d7b6e4f81c";

  /* ---------- Theme ---------- */
  function getTheme() { return localStorage.getItem("aurora-theme") || "light"; }
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    document.querySelectorAll(".app-root").forEach(function (el) { el.setAttribute("data-theme", t); });
    localStorage.setItem("aurora-theme", t);
    var btn = document.getElementById("themeToggle");
    if (btn) btn.innerHTML = I[t === "dark" ? "sun" : "moon"];
  }
  window.AuroraSetTheme = setTheme;

  /* ---------- Chrome ---------- */
  function buildChrome(page) {
    var sidebar = document.createElement("aside");
    sidebar.className = "app-sidebar";
    var navHtml = NAV.map(function (n) {
      return '<a class="nav-item' + (n.id === page ? " active" : "") + '" href="' + n.href + '">' + I[n.icon] + "<span>" + n.label + "</span></a>";
    }).join("");
    sidebar.innerHTML =
      '<div class="brand"><svg width="30" height="30" viewBox="0 0 40 40" fill="none">' +
      '<defs><radialGradient id="wMark" cx="50%" cy="42%" r="62%"><stop offset="0%" stop-color="#9F5BF0"/><stop offset="100%" stop-color="#7828E8"/></radialGradient></defs>' +
      '<rect x="4" y="4" width="32" height="32" rx="10" fill="url(#wMark)"/><circle cx="20" cy="20" r="6" fill="var(--c-canvas)"/></svg>' +
      '<div><div class="brand-name">Aurora Vault</div><div class="brand-sub">Borealis Finance</div></div></div>' +
      '<nav class="nav">' + navHtml + '</nav>' +
      '<div class="sidebar-foot"><div class="avatar">AM</div>' +
      '<div class="sidebar-user-meta"><div style="font:500 13px/1.2 var(--font-body)">Alex Mercer</div>' +
      '<div class="muted" style="font:400 11px/1.3 var(--font-body);margin-top:2px">Verified · Pro</div></div>' +
      '<button class="icon-btn" title="Settings" style="margin-left:auto;width:34px;height:34px;border:none">' + I.settings + '</button></div>';

    var header = document.createElement("header");
    header.className = "app-header";
    header.innerHTML =
      '<div style="flex:1;min-width:0"><h1>' + (TITLES[page] || "") + "</h1></div>" +
      '<div class="app-search">' + I.search + "<span>Search</span><span class=\"kbd\">⌘K</span></div>" +
      '<button class="icon-btn" title="Notifications">' + I.bell + "</button>" +
      '<button class="icon-btn" id="themeToggle" title="Toggle theme">' + I[getTheme() === "dark" ? "sun" : "moon"] + "</button>" +
      '<button class="btn btn-accent" data-modal="topup" style="height:40px">' + I["in"] + "Top up</button>";
    return { sidebar: sidebar, header: header };
  }

  /* ---------- QR ---------- */
  function qrSvg(seed) {
    var size = 25, cell = 8, h = 2166136261;
    for (var i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
    function rand() { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; }
    function inBox(x, y, bx, by) { return x >= bx && x < bx + 7 && y >= by && y < by + 7; }
    function isFinder(x, y) { return inBox(x, y, 0, 0) || inBox(x, y, size - 7, 0) || inBox(x, y, 0, size - 7); }
    var dim = size * cell, p = ['<rect x="0" y="0" width="' + dim + '" height="' + dim + '" fill="#fff"/>'];
    for (var y = 0; y < size; y++) for (var x = 0; x < size; x++) {
      if (isFinder(x, y)) continue;
      if (rand() > 0.52) p.push('<rect x="' + (x * cell) + '" y="' + (y * cell) + '" width="' + cell + '" height="' + cell + '" fill="#090916"/>');
    }
    function f(bx, by) {
      return '<rect x="' + (bx * cell) + '" y="' + (by * cell) + '" width="' + (7 * cell) + '" height="' + (7 * cell) + '" fill="#090916"/>' +
        '<rect x="' + ((bx + 1) * cell) + '" y="' + ((by + 1) * cell) + '" width="' + (5 * cell) + '" height="' + (5 * cell) + '" fill="#fff"/>' +
        '<rect x="' + ((bx + 2) * cell) + '" y="' + ((by + 2) * cell) + '" width="' + (3 * cell) + '" height="' + (3 * cell) + '" fill="#090916"/>';
    }
    p.push(f(0, 0), f(size - 7, 0), f(0, size - 7));
    return '<svg viewBox="0 0 ' + dim + " " + dim + '" xmlns="http://www.w3.org/2000/svg">' + p.join("") + "</svg>";
  }
  window.AuroraQr = qrSvg;

  /* ---------- Reusable step fragments ---------- */
  function amountBlock(label, unit, sub) {
    return '<div class="eyebrow" style="text-align:center;color:var(--c-muted)">' + label + '</div>' +
      '<div class="amount-display"><span class="amount-num" data-amt>0</span> <span class="muted" style="font:500 18px var(--font-body)">' + unit + '</span>' +
      '<div class="muted" data-sub style="font:400 13px var(--font-body);margin-top:6px">' + sub + '</div></div>' +
      '<div class="chip-row" data-chips style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"></div>';
  }
  function addrBlock(network) {
    return '<div class="muted" style="font:400 12px/1.3 var(--font-body)">Network · ' + network + '</div>' +
      '<div class="qr">' + qrSvg(ADDR) + '</div>' +
      '<div class="tile" style="word-break:break-all;font:400 12px/1.5 var(--font-body)">' + ADDR + '</div>' +
      '<button class="btn btn-secondary full" data-copy>' + I.copy + ' Copy address</button>';
  }
  function summaryRow(k, v, color) {
    return '<div class="row-between" style="font:400 13px/1.6 var(--font-body)"><span class="muted">' + k + '</span><span class="tabular" style="' + (color ? "color:" + color : "") + '">' + v + '</span></div>';
  }
  function successBlock(icon, iconColor, iconBg, title, body, rows) {
    return '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:14px;padding:6px 4px 2px">' +
      '<div style="width:64px;height:64px;border-radius:50%;background:' + iconBg + ';color:' + iconColor + ';display:flex;align-items:center;justify-content:center">' +
      '<span style="width:30px;height:30px;display:flex">' + I[icon] + '</span></div>' +
      '<div style="font:700 22px/1.2 var(--font-head)">' + title + '</div>' +
      '<div class="muted" style="font:400 14px/1.5 var(--font-body);max-width:330px">' + body + '</div>' +
      (rows ? '<div class="tile" style="width:100%;flex-direction:column;align-items:stretch;gap:10px;margin-top:4px">' + rows + '</div>' : '') +
      '</div>';
  }

  /* ---------- Allocation type card ---------- */
  var CHIPS_USDT = [100, 500, 1000, 5000];
  var CHIPS_AP   = [5000, 20000, 50000, 100000];

  function allocCard(id, name, desc, icon, color, selected) {
    var on = selected === id;
    return '<button data-alloc="' + id + '" class="alloc-card" style="all:unset;cursor:pointer;display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:12px;border:1px solid ' + (on ? color : "var(--c-border)") + ';background:' + (on ? color + "14" : "var(--c-elevated)") + '">' +
      '<span style="width:36px;height:36px;flex:none;border-radius:10px;display:flex;align-items:center;justify-content:center;background:' + color + '22;color:' + color + '">' + I[icon] + '</span>' +
      '<span style="display:block"><span style="display:block;font:600 14px/1.2 var(--font-body)">' + name + '</span>' +
      '<span class="muted" style="display:block;font:400 12px/1.4 var(--font-body);margin-top:3px">' + desc + '</span></span></button>';
  }

  function allocStep(ctx) {
    return '<div class="muted" style="font:400 13px/1.5 var(--font-body);margin-bottom:4px">Choose how to allocate your Aurora Points.</div>' +
      '<div style="display:flex;flex-direction:column;gap:10px">' +
      allocCard("SecureNest", "SecureNest", "Guaranteed return · lower risk · 90-day term", "vault", "#0C7A63", ctx.alloc) +
      allocCard("TrustBox", "TrustBox", "Non-guaranteed return · higher yield · 120-day term", "shield", "#B45309", ctx.alloc) +
      '</div>' +
      '<div style="background:rgba(47,107,216,0.07);border:1px solid rgba(47,107,216,0.18);border-radius:12px;padding:12px 14px;display:flex;gap:10px;align-items:flex-start">' +
      '<span style="display:flex;flex:none;width:16px;height:16px;color:var(--c-info-ink)">' + I.info + '</span>' +
      '<div style="font:400 12px/1.5 var(--font-body);color:var(--c-info-ink)"><strong>SecureNest</strong> — Aurora Vault guarantees the return of lent Aurora Points.<br><strong>TrustBox</strong> — Aurora Points are not guaranteed and remain subject to associated risks.</div>' +
      '</div>';
  }

  /* ---------- Flow definitions ---------- */
  var FLOWS = {
    topup: {
      title: "Add funds", unit: "USDT", chips: CHIPS_USDT,
      steps: [
        {
          body: function () { return amountBlock("Amount to deposit", "USDT", "≈ $0.00"); },
          sub: function (a) { return "≈ $" + fmt2(a); },
          primary: "Continue",
          guard: function (c) { return c.amount >= 10; }
        },
        {
          body: function (c) {
            return '<div class="muted" style="text-align:center;font:400 13px var(--font-body)">Send <b style="color:var(--c-text)">' + fmt2(c.amount) + ' USDT</b> to the address below</div>' +
              addrBlock("Binance Smart Chain (BEP-20)") +
              '<div class="callout warn"><span class="ico">' + I.shield + '</span><div class="txt">Send only USDT on the selected network. Wrong-network transfers may not be recoverable.</div></div>';
          },
          primary: "I've sent it",
          back: true
        },
        {
          body: function (c) {
            return successBlock("clock", "var(--c-amber-ink)", "var(--c-warn-bg)",
              "Request submitted",
              "Your deposit of " + fmt2(c.amount) + " USDT is pending admin approval. We'll verify your transaction and credit your wallet, usually within a few hours.",
              summaryRow("Amount", fmt2(c.amount) + " USDT") +
              summaryRow("Network", "BEP-20") +
              summaryRow("Tx hash", TX.slice(0, 8) + "…" + TX.slice(-4)) +
              summaryRow("Status", "Pending review", "var(--c-amber-ink)"));
          },
          primary: "Done",
          done: true
        }
      ]
    },

    /* Invest = Lend Aura XP into a project (unified flow) */
    invest: {
      title: "Invest in project", unit: "AP", chips: CHIPS_AP,
      steps: [
        /* Step 1 — Choose allocation type */
        {
          body: function (c) { return allocStep(c); },
          primary: "Continue",
          guard: function (c) { return !!c.alloc; }
        },
        /* Step 2 — Enter Aurora Points amount */
        {
          body: function (c) {
            var xp = (c.amount || 0) / 100;
            return (c.project ? '<div class="badge-violet" style="margin:0 auto 4px;display:flex;width:fit-content">' + c.project + '</div>' : '') +
              '<div style="display:inline-flex;align-items:center;gap:6px;margin:0 auto 4px;padding:5px 11px;border-radius:9999px;background:' + (c.alloc === "TrustBox" ? "rgba(180,83,9,0.10)" : "rgba(12,122,99,0.10)") + ';border:1px solid ' + (c.alloc === "TrustBox" ? "rgba(180,83,9,0.28)" : "rgba(12,122,99,0.28)") + ';color:' + (c.alloc === "TrustBox" ? "var(--c-amber-ink)" : "var(--c-teal-ink)") + ';font:500 12px var(--font-body);display:flex;width:fit-content;text-align:center">' +
              (c.alloc || "—") + '</div>' +
              amountBlock("Aurora Points to lend", "AP", fmt2(xp) + " Aura XP · $" + fmt2(xp) + " · ₱" + fmt(Math.round(xp * 58)));
          },
          sub: function (a) {
            var xp = a / 100;
            return fmt2(xp) + " Aura XP · $" + fmt2(xp) + " · ₱" + fmt(Math.round(xp * 58));
          },
          primary: "Review request",
          back: true,
          guard: function (c) { return c.amount >= 1000 && c.amount <= 248500; }
        },
        /* Step 3 — Review & conversion */
        {
          body: function (c) {
            var xp = c.amount / 100;
            var col = c.alloc === "TrustBox" ? "var(--c-amber-ink)" : "var(--c-teal-ink)";
            var term = c.alloc === "TrustBox" ? "120 days" : "90 days";
            return '<div class="muted" style="font:400 13px/1.5 var(--font-body)">Review your lending arrangement. Transactions between users and Aurora Vault are structured as lending arrangements, not investments.</div>' +
              '<div style="background:var(--c-elevated);border:1px solid var(--c-border);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px">' +
              '<div style="font:500 11px var(--font-body);color:var(--c-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Calculated conversion</div>' +
              summaryRow("Rate", "100 AP = 1 Aura XP", "var(--c-muted)") +
              summaryRow("Aurora Points", fmt(c.amount) + " AP") +
              summaryRow("Aura XP", fmt2(xp) + " XP", col) +
              summaryRow("USDT equivalent", "≈ $" + fmt2(xp), "var(--c-accent)") +
              summaryRow("PHP equivalent", "≈ ₱" + fmt(Math.round(xp * 58))) +
              '</div>' +
              '<div class="tile" style="flex-direction:column;align-items:stretch;gap:8px">' +
              summaryRow("Allocation", c.alloc, col) +
              (c.project ? summaryRow("Project", c.project) : "") +
              summaryRow("Term", term) +
              summaryRow("Risk", c.alloc === "TrustBox" ? "Higher (not guaranteed)" : "Lower (guaranteed)", col) +
              '</div>' +
              '<div class="callout info"><span class="ico">' + I.shield + '</span><div class="txt"><strong>Project usage notice.</strong> Projects listed under SecureNests and TrustBoxes represent the intended use cases where Aurora Vault plans to deploy the borrowed Aurora Points.</div></div>';
          },
          primary: "Submit request",
          back: true
        },
        /* Step 4 — Success */
        {
          body: function (c) {
            var xp = c.amount / 100;
            var col = c.alloc === "TrustBox" ? "var(--c-amber-ink)" : "var(--c-teal-ink)";
            var count = c.alloc === "TrustBox" ? "3" : "4";
            return successBlock("check", "var(--c-pos-ink)", "var(--c-pos-bg)",
              "Request submitted",
              "Your " + (c.alloc || "") + " lending request has been submitted. Aurora Points will be allocated once confirmed.",
              summaryRow("Allocation", c.alloc, col) +
              summaryRow("AP lent", fmt(c.amount) + " AP") +
              summaryRow("Aura XP", fmt2(xp) + " XP", col) +
              summaryRow("Active " + (c.alloc || "") + "s", count, col));
          },
          primary: "Done",
          done: true
        }
      ]
    },

    vault: {
      title: "Top up Aura Vault", unit: "USDT", chips: CHIPS_USDT,
      steps: [
        {
          body: function () { return amountBlock("Amount to top up", "USDT", "You'll receive 0 AP"); },
          sub: function (a) { return "You'll receive " + fmt(a * 100) + " AP"; },
          primary: "Continue",
          guard: function (c) { return c.amount >= 10; }
        },
        {
          body: function (c) {
            return '<div class="muted" style="text-align:center;font:400 13px var(--font-body)">Send <b style="color:var(--c-text)">' + fmt2(c.amount) + ' USDT</b> — you\'ll receive <b style="color:var(--c-violet)">' + fmt(c.amount * 100) + ' AP</b></div>' +
              addrBlock("Binance Smart Chain (BEP-20)") +
              '<div class="callout warn"><span class="ico">' + I.shield + '</span><div class="txt">Send only USDT on the selected network. Wrong-network transfers may not be recoverable. Top-ups are credited after our finance team verifies your transfer.</div></div>';
          },
          primary: "Submit request",
          back: true
        },
        {
          body: function (c) {
            return successBlock("clock", "var(--c-amber-ink)", "var(--c-warn-bg)",
              "Top-up submitted",
              "Your request for " + fmt(c.amount * 100) + " AP is pending review. Aura Points are credited once your transfer is verified.",
              summaryRow("Amount", fmt2(c.amount) + " USDT") +
              summaryRow("Aura Points", "+" + fmt(c.amount * 100) + " AP", "var(--c-violet)") +
              summaryRow("Status", "Pending review", "var(--c-amber-ink)"));
          },
          primary: "Done",
          done: true
        }
      ]
    },

    withdraw: {
      title: "Withdraw USDT", unit: "USDT", chips: CHIPS_USDT,
      steps: [
        {
          body: function () { return amountBlock("Amount to withdraw", "USDT", "12,480.50 USDT available"); },
          sub: function (a) { return "$" + fmt2(Math.max(0, 12480.5 - a)) + " remaining"; },
          primary: "Continue",
          guard: function (c) { return c.amount >= 10 && c.amount <= 12480.5; }
        },
        {
          body: function (c) {
            return '<div class="muted" style="font:400 13px/1.5 var(--font-body)">Confirm the destination address and amount.</div>' +
              '<div class="tile" style="flex-direction:column;align-items:stretch;gap:10px">' +
              summaryRow("Amount", fmt2(c.amount) + " USDT") +
              summaryRow("Network", "BEP-20") +
              summaryRow("To", ADDR.slice(0, 10) + "…" + ADDR.slice(-6)) +
              summaryRow("Network fee", "0.80 USDT", "var(--c-muted)") +
              '</div>';
          },
          primary: "Withdraw",
          back: true
        },
        {
          body: function (c) {
            return successBlock("check", "var(--c-pos-ink)", "var(--c-pos-bg)",
              "Withdrawal sent",
              "Your withdrawal of " + fmt2(c.amount) + " USDT is being processed on-chain.",
              summaryRow("Status", "Broadcasting", "var(--c-info-ink)") +
              summaryRow("Est. arrival", "~2 min"));
          },
          primary: "Done",
          done: true
        }
      ]
    },

    redeem: {
      title: "Redeem AUR", unit: "AUR", chips: [100, 500, 1000, 1240],
      steps: [
        {
          body: function () { return amountBlock("Amount to redeem", "AUR", "1,240.50 AUR available"); },
          sub: function (a) { return "≈ $" + fmt2(a * 0.98) + " cash"; },
          primary: "Continue",
          guard: function (c) { return c.amount >= 1 && c.amount <= 1240.5; }
        },
        {
          body: function (c) {
            return successBlock("check", "var(--c-pos-ink)", "var(--c-pos-bg)",
              "Redeemed",
              "You redeemed " + fmt2(c.amount) + " AUR for cash.",
              summaryRow("Cash credited", "$" + fmt2(c.amount * 0.98), "var(--c-pos-ink)"));
          },
          primary: "Done",
          done: true
        }
      ]
    }
  };

  /* ---------- Modal engine ---------- */
  var modalEl, cur = null, stepIdx = 0, ctx = {};

  function buildModalShell() {
    var ov = document.createElement("div");
    ov.className = "modal-overlay"; ov.id = "modal";
    ov.innerHTML = '<div class="modal-card" role="dialog" aria-modal="true">' +
      '<div class="modal-head"><div class="modal-title" data-title></div>' +
      '<button class="icon-btn" data-close style="width:34px;height:34px">' + I.close + '</button></div>' +
      '<div class="modal-body" data-mbody></div>' +
      '<div class="modal-foot" data-mfoot style="display:flex;gap:10px;padding:0 22px 22px"></div></div>';
    return ov;
  }

  function openFlow(name, opts) {
    cur = FLOWS[name]; if (!cur) return;
    stepIdx = 0;
    ctx = {
      amount: 0,
      alloc: null,
      project: (opts && opts.project) || "",
      apy: (opts && opts.apy) || ""
    };
    modalEl.querySelector("[data-title]").textContent = cur.title;
    renderStep();
    modalEl.classList.add("open");
  }
  function closeFlow() { modalEl.classList.remove("open"); cur = null; }

  function renderStep() {
    var step = cur.steps[stepIdx];
    var body = modalEl.querySelector("[data-mbody]");
    body.innerHTML = step.body(ctx);

    /* progress segments */
    if (cur.steps.length > 1) {
      var dots = cur.steps.map(function (_, i) {
        return '<div style="flex:1;height:3px;border-radius:2px;background:' + (i <= stepIdx ? "var(--c-accent)" : "var(--c-divider)") + '"></div>';
      }).join("");
      body.insertAdjacentHTML("afterbegin", '<div style="display:flex;gap:6px;margin-bottom:10px">' + dots + '</div>');
    }

    /* amount chips wiring */
    var chipWrap = body.querySelector("[data-chips]");
    if (chipWrap) {
      cur.chips.forEach(function (v) {
        var b = document.createElement("button");
        b.className = "chip" + (ctx.amount === v ? " on" : "");
        b.textContent = fmt(v);
        b.onclick = function () { ctx.amount = v; updateAmount(); };
        chipWrap.appendChild(b);
      });
      updateAmount();
    }

    /* copy button */
    var copyBtn = body.querySelector("[data-copy]");
    if (copyBtn) copyBtn.onclick = function () {
      try { navigator.clipboard.writeText(ADDR); } catch (e) {}
      copyBtn.innerHTML = I.check + " Copied";
      setTimeout(function () { copyBtn.innerHTML = I.copy + " Copy address"; }, 1400);
    };

    /* allocation-type card wiring */
    body.querySelectorAll("[data-alloc]").forEach(function (el) {
      el.onclick = function () { ctx.alloc = el.getAttribute("data-alloc"); renderStep(); };
    });

    /* footer buttons */
    var foot = modalEl.querySelector("[data-mfoot]");
    foot.innerHTML = "";
    if (step.back) {
      var bk = document.createElement("button");
      bk.className = "btn btn-secondary"; bk.style.flex = "1"; bk.textContent = "Back";
      bk.onclick = function () { stepIdx--; renderStep(); };
      foot.appendChild(bk);
    }
    var pr = document.createElement("button");
    pr.className = "btn btn-accent"; pr.style.flex = step.back ? "2" : "1"; pr.textContent = step.primary;
    pr.id = "modalPrimary";
    pr.onclick = function () {
      if (step.guard && !step.guard(ctx)) return;
      if (step.done) { closeFlow(); return; }
      stepIdx++; renderStep();
    };
    foot.appendChild(pr);
    syncGuard();
  }

  function updateAmount() {
    var body = modalEl.querySelector("[data-mbody]");
    var n = body.querySelector("[data-amt]"); if (n) n.textContent = fmt(ctx.amount);
    var s = body.querySelector("[data-sub]"); var step = cur.steps[stepIdx];
    if (s && step.sub) s.textContent = step.sub(ctx.amount, ctx);
    body.querySelectorAll("[data-chips] .chip").forEach(function (c) {
      c.classList.toggle("on", c.textContent === fmt(ctx.amount));
    });
    syncGuard();
  }

  function syncGuard() {
    var step = cur && cur.steps[stepIdx]; if (!step) return;
    var pr = document.getElementById("modalPrimary"); if (!pr) return;
    pr.disabled = !!(step.guard && !step.guard(ctx));
  }

  /* ---------- Filter chip toggle ---------- */
  function initFilterChips() {
    document.querySelectorAll(".chip-filter").forEach(function (chip) {
      chip.onclick = function () {
        var group = chip.closest(".chip-group");
        if (group) group.querySelectorAll(".chip-filter").forEach(function (c) { c.classList.remove("on"); });
        chip.classList.add("on");
      };
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.querySelector(".app-root");
    var page = (root && root.getAttribute("data-page")) || "dashboard";
    setTheme(getTheme());

    var chrome = buildChrome(page);
    root.insertBefore(chrome.sidebar, root.firstChild);
    var main = root.querySelector(".app-main");
    main.insertBefore(chrome.header, main.firstChild);

    modalEl = buildModalShell();
    document.body.appendChild(modalEl);

    document.addEventListener("click", function (e) {
      var trig = e.target.closest("[data-modal]");
      if (trig) {
        openFlow(trig.getAttribute("data-modal"), {
          project: trig.getAttribute("data-project"),
          apy: trig.getAttribute("data-apy")
        });
        return;
      }
      if (e.target.closest("[data-close]")) { closeFlow(); return; }
      if (e.target.id === "themeToggle" || e.target.closest("#themeToggle")) {
        setTheme(getTheme() === "dark" ? "light" : "dark"); return;
      }
      if (e.target.classList && e.target.classList.contains("modal-overlay")) closeFlow();
    });

    document.querySelectorAll("[data-qr]").forEach(function (el) {
      el.innerHTML = qrSvg(el.getAttribute("data-qr") || "aurora");
    });

    /* Static copy-address buttons (outside modal) */
    document.querySelectorAll("[data-copy-addr]").forEach(function (btn) {
      var addr = btn.getAttribute("data-copy-addr") || ADDR;
      btn.onclick = function () {
        try { navigator.clipboard.writeText(addr); } catch (e) {}
        var orig = btn.innerHTML;
        btn.innerHTML = I.check + " Copied";
        setTimeout(function () { btn.innerHTML = orig; }, 1400);
      };
    });
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      var n = el.getAttribute("data-icon"); if (I[n]) el.innerHTML = I[n];
    });

    /* Aurora gradient on progress bars */
    var style = document.createElement("style");
    style.textContent = ".progress > i { background-image: linear-gradient(90deg,#4C0096,#7828E8,#2AD9B7) !important; background-color: transparent !important; }";
    document.head.appendChild(style);

    initFilterChips();
  });
})();
