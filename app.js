/* NAI · sbírka příkladů
   Pochopit (vysvětlení z NAI průvodce, schéma se zvýrazněním) a Procvičit (kroky z MPC-NAI) v jedné aplikaci.
   Každá otázka v Procvičit odkazuje na krok vysvětlení (tabulka LINK) a naopak. Postup se ukládá do localStorage. */
(function () {
"use strict";

var KEY = "nai-sbirka-v1";
var NAI_EX = window.NAI_EX, PATTERNS = window.PATTERNS, TAHAK = window.TAHAK, LINK = window.LINK || {};

var COL = { r: "#e5484d", o: "#ef6c00", b: "#1e88e5", g: "#2e9e5b", p: "#8e44ad", k: "#d6409f", t: "#00979c", y: "#b38600", s: "#546e7a" };
var CHAP = { "2": "Kapitola 2 · návrh", "3": "Kapitola 3 · přesný návrh", "4": "Kapitola 4 · šum", "K": "Kmitočtové charakteristiky" };
var CH_ORDER = ["2", "3", "4", "K"];
function chapOf(m) { return m.num.indexOf(".") > 0 ? m.num.split(".")[0] : m.num.replace(/[0-9]+$/, ""); }
function idxOf(m) { return m.num.indexOf(".") > 0 ? Number(m.num.split(".")[1]) : Number(m.num.replace(/^[^0-9]+/, "")); }

var MPC = window.MPC.slice().sort(function (a, b) {
  return CH_ORDER.indexOf(chapOf(a)) - CH_ORDER.indexOf(chapOf(b)) || idxOf(a) - idxOf(b);
});
var PROBS = MPC.map(function (m) {
  var nai = NAI_EX.find(function (e) { return e.id === m.num; }) || null;
  return { id: m.num, m: m, nai: nai, img: m.img, w: m.w, h: m.h, link: nai ? (LINK[m.num] || null) : null, ch: chapOf(m) };
});

/* ---------- state + persistence ---------- */
var st = { view: "ex", pi: 0, mode: "learn", ns: 0, pf: null, showall: false, allhl: false,
           known: {}, prog: {}, patFocus: null, theme: null, lastId: null, q: "", confirmReset: false };
var DR = { open: false, top: 120, w: 380, h: 420 }; /* formula drawer geometry, px */

function pg(p) {
  return st.prog[p.id] || (st.prog[p.id] = { ok: [], rev: [], hint: [], val: [], fb: [], plot: false });
}
function snapshot() {
  var prog = {};
  Object.keys(st.prog).forEach(function (k) {
    var s = st.prog[k];
    var any = s.plot || [s.ok, s.rev, s.hint, s.val, s.fb].some(function (a) { return a.some(function (x) { return !!x; }); });
    if (any) prog[k] = s;
  });
  var known = {};
  Object.keys(st.known).forEach(function (k) { if (st.known[k]) known[k] = true; });
  return { v: 1, prog: prog, known: known, last: PROBS[st.pi].id, mode: st.mode, ns: st.ns, theme: st.theme, drawer: DR };
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(snapshot())); } catch (e) {}
}
/* sanitise one saved/imported progress record against the real number of steps */
function cleanProg(p, src) {
  if (!src || typeof src !== "object") return null;
  var n = p.m.steps.length, o = { ok: [], rev: [], hint: [], val: [], fb: [], plot: !!src.plot };
  function at(a, i) { return Array.isArray(a) ? a[i] : undefined; }
  for (var i = 0; i < n; i++) {
    o.ok[i] = at(src.ok, i) === true; o.rev[i] = at(src.rev, i) === true; o.hint[i] = at(src.hint, i) === true;
    var v = at(src.val, i); o.val[i] = typeof v === "string" ? v.slice(0, 40) : "";
    var f = at(src.fb, i); o.fb[i] = f === "ok" || f === "bad" || f === "warn" ? f : null;
  }
  return o;
}
function mergeProg(dst, c, n) {
  for (var i = 0; i < n; i++) {
    dst.ok[i] = !!dst.ok[i] || c.ok[i]; dst.rev[i] = !!dst.rev[i] || c.rev[i]; dst.hint[i] = !!dst.hint[i] || c.hint[i];
    if (!dst.val[i]) dst.val[i] = c.val[i];
    dst.fb[i] = dst.ok[i] ? "ok" : (dst.fb[i] || c.fb[i]);
  }
  dst.plot = !!dst.plot || c.plot;
}
function mergeState(src) {
  var changed = 0;
  if (!src || typeof src !== "object" || !src.prog || typeof src.prog !== "object") return -1;
  PROBS.forEach(function (p) {
    var c = cleanProg(p, src.prog[p.id]);
    if (c) { mergeProg(pg(p), c, p.m.steps.length); changed++; }
    if (src.known && src.known[p.id] === true) st.known[p.id] = true;
  });
  return changed;
}
function load() {
  try {
    var raw = localStorage.getItem(KEY);
    if (!raw) return;
    var s = JSON.parse(raw);
    if (!s || typeof s !== "object") return;
    mergeState(s);
    /* The page always opens in Pochopit; the saved mode is not restored. */
    if (s.theme === "light" || s.theme === "dark") st.theme = s.theme;
    if (s.drawer && typeof s.drawer === "object") {
      ["top", "w", "h"].forEach(function (k) { if (isFinite(s.drawer[k])) DR[k] = +s.drawer[k]; });
      DR.open = s.drawer.open === true;
    }
    var i = PROBS.findIndex(function (p) { return p.id === s.last; });
    if (i >= 0) { st.pi = i; st.lastId = PROBS[i].id; if (typeof s.ns === "number" && s.ns >= 0) st.ns = s.ns | 0; }
  } catch (e) {}
}

/* ---------- helpers ---------- */
function $(s) { return document.querySelector(s); }
function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function fmt(t) { return esc(t).replace(/_\{([^}]+)\}/g, "<sub>$1</sub>").replace(/_([A-Za-z0-9]+)/g, "<sub>$1</sub>"); }
function parseNum(t) {
  var s = String(t).replace(/\s+/g, "").replace(/[\u2212\u2013]/g, "-").replace(",", ".");
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return NaN;
  return parseFloat(s);
}
function solved(p, i) { var s = pg(p); return !!(s.ok[i] || s.rev[i]); }
function frontier(p) { for (var i = 0; i < p.m.steps.length; i++) if (!solved(p, i)) return i; return p.m.steps.length; }
function doneCount(p) { var c = 0; for (var i = 0; i < p.m.steps.length; i++) if (solved(p, i)) c++; return c; }
function focusIdx(p) { var n = p.m.steps.length; if (st.pf != null && st.pf < n && st.pf <= frontier(p)) return st.pf; return Math.min(frontier(p), n - 1); }
function pinsHtml(p) { var h = ""; for (var i = 0; i < p.m.steps.length; i++) h += '<i class="' + (solved(p, i) ? "on" : "") + '"></i>'; return '<span class="pins" aria-label="' + doneCount(p) + " z " + p.m.steps.length + ' kroků">' + h + "</span>"; }
function curMode(p) { return p.nai ? st.mode : "practice"; }
function nsClamp(p) { if (p.nai) st.ns = Math.max(0, Math.min(st.ns, p.nai.steps.length - 1)); else st.ns = 0; }
function typeset(el) {
  if (window.MathJax && MathJax.typesetPromise) {
    try { MathJax.typesetClear([el]); } catch (e) {}
    MathJax.typesetPromise([el]).catch(function () {});
  }
}
window.__typeset = function () { typeset($("#main")); typeset($("#dbody")); };
function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

/* ---------- schematic overlay (from NAI průvodce) ---------- */
function overlay(W, H, items) {
  var sx = W / 100, sy = H / 100, fs = Math.max(22, Math.round(Math.max(W, H) / 34));
  var defs = "<defs>";
  for (var k in COL) defs += '<marker id="ah-' + k + '" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + COL[k] + '"/></marker>';
  defs += "</defs>";
  var g = "", lbl = "";
  var used = {};
  (items || []).forEach(function (it) {
    if (!it) return;
    var ck = it.c || "r", c = COL[ck] || ck;
    used[ck] = used[ck] || [];
    if (it.t) used[ck].push(it.t);
    if (it.b) {
      var X = it.b[0] * sx, Y = it.b[1] * sy, WW = it.b[2] * sx, HH = it.b[3] * sy;
      g += '<rect class="ov-box" x="' + X + '" y="' + Y + '" width="' + WW + '" height="' + HH + '" rx="' + fs * .35 + '" fill="' + c + '" fill-opacity="0.13" stroke="' + c + '" stroke-width="' + fs * .17 + '"/>';
      if (it.t) {
        var above = Y > fs * 1.3, ty = above ? Y - fs * .35 : Y + HH + fs * .95;
        lbl += '<text x="' + Math.min(X, W - fs * it.t.length * .55) + '" y="' + ty + '" font-size="' + fs + '" font-weight="700" fill="' + c + '" stroke="#fff" stroke-width="' + fs * .28 + '" paint-order="stroke" font-family="system-ui,Segoe UI,Arial">' + esc(it.t) + "</text>";
      }
    }
    if (it.a) {
      var pts = it.a.map(function (q) { return [q[0] * sx, q[1] * sy]; });
      var d = "M" + pts.map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join(" L");
      g += '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-opacity=".28" stroke-width="' + fs * .55 + '" stroke-linejoin="round" stroke-linecap="round"/>';
      g += '<path class="ov-arrow" d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + fs * .26 + '" stroke-dasharray="' + fs * .9 + " " + fs * .55 + '" style="--dp:' + -fs * 1.45 + '" stroke-linejoin="round" marker-end="url(#ah-' + ck + ')"/>';
      if (it.t) {
        var best = 0, bi = 0;
        for (var i = 0; i < pts.length - 1; i++) { var L = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); if (L > best) { best = L; bi = i; } }
        var mx = (pts[bi][0] + pts[bi + 1][0]) / 2, my = (pts[bi][1] + pts[bi + 1][1]) / 2;
        var vert = Math.abs(pts[bi + 1][0] - pts[bi][0]) < Math.abs(pts[bi + 1][1] - pts[bi][1]);
        var lx = vert ? mx + fs * .55 : mx - fs * it.t.length * .27, ly = vert ? my : my - fs * .5;
        lbl += '<text x="' + Math.min(lx, W - fs * it.t.length * .56) + '" y="' + ly + '" font-size="' + fs * 1.02 + '" font-weight="800" fill="' + c + '" stroke="#fff" stroke-width="' + fs * .3 + '" paint-order="stroke" font-family="system-ui,Segoe UI,Arial">' + esc(it.t) + "</text>";
      }
    }
    if (it.n) {
      var NX = it.n[0] * sx, NY = it.n[1] * sy;
      g += '<circle class="ov-box" cx="' + NX + '" cy="' + NY + '" r="' + fs * .55 + '" fill="' + c + '" fill-opacity=".25" stroke="' + c + '" stroke-width="' + fs * .18 + '"/>';
      if (it.t) lbl += '<text x="' + Math.min(NX + fs * .75, W - fs * it.t.length * .56) + '" y="' + (NY - fs * .6) + '" font-size="' + fs + '" font-weight="800" fill="' + c + '" stroke="#fff" stroke-width="' + fs * .28 + '" paint-order="stroke" font-family="system-ui,Segoe UI,Arial">' + esc(it.t) + "</text>";
    }
  });
  return { svg: '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + defs + g + lbl + "</svg>", used: used };
}
function resolve(e, list) { return (list || []).map(function (x) { return typeof x === "string" ? (e.parts && e.parts[x]) : x; }).filter(Boolean); }

/* ---------- search ---------- */
function hay(p) {
  if (p.hay) return p.hay;
  var parts = [p.id, p.m.id, p.m.title, p.m.task, p.m.kind];
  if (p.nai) {
    parts.push(p.nai.title, p.nai.task);
    (p.nai.pat || []).forEach(function (k) { parts.push(PATTERNS[k] ? PATTERNS[k].name : k); });
  }
  p.hay = norm(parts.join(" ").replace(/<[^>]+>/g, " ").replace(/\$/g, "").replace(/\\[a-zA-Z]+/g, " ").replace(/[{}_^\\]/g, ""));
  return p.hay;
}
function matches(p) {
  var q = norm(st.q).trim();
  if (!q) return true;
  var h = hay(p);
  return q.split(/\s+/).every(function (t) { return h.indexOf(t) >= 0; });
}

/* ---------- sidebar ---------- */
function renderSide() {
  var tabs = [["ex", "Příklady"], ["vzory", "Vzory"], ["tahak", "Co na tahák"]];
  $("#tabs").innerHTML = tabs.map(function (t) { return '<button type="button" data-tab="' + t[0] + '" aria-current="' + (t[0] === st.view) + '">' + t[1] + "</button>"; }).join("");
  var h = "", last = null, shown = 0;
  /* Mobile strip: each chapter is a tile; only the open chapter's problems show (CSS hides .fold). Search shows all matches. */
  if (!st.openCh) st.openCh = PROBS[st.pi].ch;
  var folding = !st.q;
  PROBS.forEach(function (p, i) {
    if (!matches(p)) return;
    shown++;
    if (p.ch !== last) {
      h += '<li class="group">' + CHAP[p.ch] + "</li>";
      if (folding) {
        var inCh = PROBS.filter(function (x) { return x.ch === p.ch; });
        var knCh = inCh.filter(function (x) { return st.known[x.id]; }).length, open = st.openCh === p.ch;
        h += '<li class="chtile"><button type="button" data-chap="' + p.ch + '" aria-expanded="' + open + '"><span class="n">' + p.ch + '</span><span class="t">' + CHAP[p.ch] + '</span><span class="k"><span>' + inCh.length + " příkladů · umím " + knCh + "</span><span>" + (open ? "▾ otevřeno" : "▸ otevřít") + "</span></span></button></li>";
      }
      last = p.ch;
    }
    var k = pinsHtml(p) + (st.known[p.id] ? '<span class="known">✓ umím</span>' : "") + "<span>" + esc(p.m.kind) + "</span>";
    h += '<li' + (folding && p.ch !== st.openCh ? ' class="fold"' : "") + '><button type="button" data-pi="' + i + '" aria-current="' + (st.view === "ex" && i === st.pi) + '"><span class="n">' + p.id + '</span><span class="t">' + fmt(p.m.title) + '</span><span class="k">' + k + "</span></button></li>";
  });
  if (!shown) h = '<li class="nores">Nic nenalezeno.</li>';
  $("#list").innerHTML = h;
  var kn = PROBS.filter(function (p) { return st.known[p.id]; }).length;
  var tot = 0, dn = 0; PROBS.forEach(function (p) { tot += p.m.steps.length; dn += doneCount(p); });
  $("#prog").textContent = "Umím: " + kn + " / " + PROBS.length + " · kroků: " + dn + " / " + tot;
  var cf = $("#confirm");
  cf.innerHTML = st.confirmReset
    ? '<div class="confirm"><p>Opravdu smazat veškerý postup v tomto prohlížeči? Nejde to vrátit zpět. Předem si ho můžeš exportovat.</p><div><button class="btn danger" type="button" data-sys="reset-yes">Ano, smazat</button><button class="btn" type="button" data-sys="reset-no">Zrušit</button></div></div>'
    : "";
}
function scrollListToCurrent() {
  var b = document.querySelector('#list [aria-current="true"]');
  if (!b) return;
  if (window.innerWidth <= 760) { var l = $("#list"); l.scrollLeft = Math.max(0, b.parentNode.offsetLeft - 20); }
  else { var a = document.querySelector(".app > aside"); a.scrollTop = Math.max(0, b.offsetTop - a.clientHeight / 3); }
}

/* ---------- problem page ---------- */
function headHtml(p) {
  var m = p.m;
  var src = m.src === "RC_EXPLAIN" ? "podklady RC_EXPLAIN, str. " + m.page : "sbírka, str. " + m.page;
  return '<header class="head"><div class="bignum">' + p.id + '</div><div class="meta"><span class="chip">' + esc(m.kind) + "</span><span>" + src + '</span></div><div class="tools">' +
    '<button class="btn ' + (st.known[p.id] ? "good" : "") + '" type="button" data-know="1">' + (st.known[p.id] ? "✓ Umím" : "Označit „umím“") + "</button>" +
    "</div><h2>" + fmt(m.title) + "</h2></header>";
}
function taskHtml(p) {
  var nai = p.nai, m = p.m;
  var h = '<section class="task"><p class="section-label">Zadání</p><div class="txt">' + (nai ? nai.task : fmt(m.task)) + "</div>";
  if (m.given) h += '<ul class="given">' + m.given.map(function (g) { return "<li>" + fmt(g) + "</li>"; }).join("") + "</ul>";
  if (nai) h += '<div class="tags">' + nai.pat.map(function (k) { return '<button class="tag" type="button" data-pat="' + k + '">' + esc(PATTERNS[k] ? PATTERNS[k].name : k) + "</button>"; }).join("") + "</div>";
  return h + "</section>";
}
function learnHtml(p) {
  var e = p.nai, st_ = "";
  e.steps.forEach(function (s, k) {
    var eq = "";
    if (s.g && s.g.length) eq += s.g.map(function (x) { return '<div class="row gen">$' + x + "$</div>"; }).join("");
    if (s.eq && s.eq.length) eq += s.eq.map(function (x) { return '<div class="row">$' + x + "$</div>"; }).join("");
    var x = "";
    if (p.link) {
      var pr = [];
      p.link.forEach(function (nk, i) { if (nk === k) pr.push(i); });
      x = pr.length ? '<div class="xlinks">' + pr.map(function (i) { return '<button class="xlink" type="button" data-prac="' + i + '">Procvič: ' + fmt(p.m.steps[i].q) + " →</button>"; }).join("") + "</div>"
                    : '<p class="xnone">K tomuto kroku nic nepočítáš, jen vysvětluje zapojení.</p>';
    }
    st_ += '<li class="lstep ' + (k === st.ns ? "on" : "") + " " + (k < st.ns ? "done" : "") + '"><button class="lhead" type="button" data-k="' + k + '"><span class="n">' + (k + 1) + '</span><span class="t">' + s.t + "</span></button>" +
      '<div class="lbody">' + (s.x || "") + (eq ? '<div class="eq">' + eq + "</div>" : "") + (s.r ? '<div class="res">' + s.r + "</div>" : "") + (s.m ? '<div class="mem">' + s.m + "</div>" : "") + (s.w ? '<div class="warn">' + s.w + "</div>" : "") + x + "</div></li>";
  });
  var tk = (e.tk || []).map(function (t) {
    var cls = t[1] === "T" ? "on" : t[1] === "+" ? "add" : "der", lab = t[1] === "T" ? "na taháku" : t[1] === "+" ? "doplnit" : "odvodit";
    return '<div class="tk"><span class="badge ' + cls + '">' + lab + "</span><div>$" + t[0] + "$" + (t[2] ? ' <span class="kbd">· ' + t[2] + "</span>" : "") + "</div></div>";
  }).join("");
  return '<div class="idea"><b>Myšlenka v jedné větě:</b> ' + e.idea + "</div>" +
    '<ol class="lsteps ' + (st.showall ? "showall" : "") + '">' + st_ + "</ol>" +
    '<div class="navrow"><button class="btn" type="button" data-nav="prev">← Předchozí krok</button><button class="btn" type="button" data-nav="all">' + (st.showall ? "Sbalit kroky" : "Rozbalit všechny kroky") + '</button><button class="btn primary" type="button" data-nav="next">Další krok →</button></div>' +
    '<p class="kbd">Klávesy: → nebo mezerník další krok, ← předchozí krok, J další příklad, K předchozí příklad.</p>' +
    (e.res ? '<div class="box"><h3>Výsledky</h3><div>' + e.res + "</div></div>" : "") +
    (tk ? '<div class="box"><h3>Vzorce v tomto příkladu</h3>' + tk + "</div>" : "");
}
function practiceHtml(p) {
  var m = p.m, s = pg(p), f = frontier(p), fi = focusIdx(p), C = !!(p.link && p.nai);
  var h = "";
  if (f >= m.steps.length && !st.known[p.id]) {
    var clean = m.steps.every(function (_, i) { return !s.rev[i]; });
    if (clean) h += '<div class="suggest"><span>Všechny kroky máš bez odkrytí řešení.</span><button class="btn good" type="button" data-know="1">Označit „umím“</button></div>';
  }
  h += '<ol class="psteps">';
  m.steps.forEach(function (stp, i) {
    var done = solved(p, i), locked = i > f;
    var cls = "pstep " + (done ? "done" : locked ? "locked" : "active") + (i === fi && !locked ? " focus" : "");
    var idp = "ans-" + p.id.replace(/\./g, "-") + "-" + i;
    h += '<li class="' + cls + '"><span class="node" aria-hidden="true"></span><div class="pbody">';
    h += '<button class="ptitle" type="button" data-pf="' + i + '"' + (locked ? " disabled" : "") + '><span class="step-no">Krok ' + (i + 1) + "/" + m.steps.length + "</span><h3>" + (locked ? "Odemkne se po vyřešení předchozího kroku" : fmt(stp.q)) + "</h3></button>";
    if (!locked) {
      if (stp.ans != null) {
        var fb = s.fb[i];
        h += '<div class="answer"><input id="' + idp + '" data-inp="' + i + '" inputmode="decimal" autocomplete="off" aria-label="Výsledek v ' + esc(stp.unit) + '" value="' + esc(s.val[i] || "") + '"><span class="unit">' + esc(stp.unit) + '</span><button class="btn primary" type="button" data-act="check" data-i="' + i + '">Zkontrolovat</button>' +
          (fb === "ok" ? '<span class="fb ok">Sedí</span>' : fb === "bad" ? '<span class="fb bad">Nesedí. Zkontroluj jednotku (' + esc(stp.unit) + ") nebo si vezmi nápovědu.</span>" : fb === "warn" ? '<span class="fb warn">Zadej číslo, třeba 12,5</span>' : "") + "</div>";
      } else {
        h += '<p class="noans">Tento krok je odvození. Napiš si ho na papír a porovnej s řešením.</p>';
      }
      h += '<div class="row-actions"><button class="btn" type="button" data-act="hint" data-i="' + i + '">' + (s.hint[i] ? "Skrýt nápovědu" : "Nápověda") + '</button><button class="btn" type="button" data-act="rev" data-i="' + i + '"' + (s.rev[i] ? " disabled" : "") + ">" + (s.rev[i] ? "Řešení odkryto" : "Odkrýt řešení") + "</button>" +
        (C ? '<button class="xlink" type="button" data-nai="' + p.link[i] + '">Vysvětlení · krok ' + (p.link[i] + 1) + ": " + p.nai.steps[p.link[i]].t + "</button>" : "") + "</div>";
      if (s.hint[i]) h += '<p class="hint"><b>Nápověda.</b> ' + fmt(stp.hint) + "</p>";
      if (s.rev[i]) h += '<div class="solution"><div class="tex">\\[' + stp.tex + "\\]</div>" + (stp.why ? '<p class="why">' + fmt(stp.why) + "</p>" : "") + "</div>";
    }
    h += "</div></li>";
  });
  h += "</ol>";
  if (m.plot) {
    h += '<section class="plot"><p class="section-label">Kmitočtová charakteristika ze simulace</p><p>Graf obsahuje výsledky. Otevři ho, až budeš mít spočítané nuly, póly a zisky.</p><button class="btn" type="button" data-plot="1" style="align-self:flex-start">' + (s.plot ? "Skrýt graf" : "Zobrazit graf") + "</button>" +
      (s.plot ? '<div class="pbox"><img alt="Simulovaná kmitočtová charakteristika příkladu ' + p.id + '" src="' + m.plot + '" width="' + m.pw + '" height="' + m.ph + '"></div>' : "") + "</section>";
  }
  return h;
}
function overlayItems(p, mode) {
  if (!p.nai) return { items: [], src: "" };
  if (st.clean) return { items: [], src: "Zobrazeno původní schéma bez zvýraznění." };
  if (mode === "learn") {
    if (st.allhl) { var a = []; p.nai.steps.forEach(function (s) { a = a.concat(resolve(p.nai, s.h)); }); return { items: a, src: "" }; }
    return { items: resolve(p.nai, p.nai.steps[st.ns] ? p.nai.steps[st.ns].h : []), src: "" };
  }
  if (p.link) {
    var k = p.link[focusIdx(p)];
    return { items: resolve(p.nai, p.nai.steps[k].h), src: "Zvýrazněno podle kroku " + (k + 1) + " vysvětlení: <b>" + p.nai.steps[k].t + "</b>" };
  }
  return { items: [], src: "" };
}
function renderExample() {
  var p = PROBS[st.pi], mode = curMode(p);
  nsClamp(p);
  var ov = overlayItems(p, mode);
  var o = overlay(p.w, p.h, ov.items);
  var lg = "";
  for (var k in o.used) { var ts = Array.from(new Set(o.used[k])); if (ts.length) lg += '<span><i style="background:' + (COL[k] || k) + '"></i>' + esc(ts.join(", ")) + "</span>"; }
  if (ov.src) lg = '<span class="src">' + ov.src + "</span>" + lg;
  if (!lg) lg = mode === "practice" ? (p.nai ? "<span>V tomto kroku se ve schématu nic nezvýrazňuje.</span>" : "<span>K tomuto příkladu není zvýraznění, jen schéma.</span>") : "<span>V tomto kroku nic nezvýrazňuji.</span>";
  var ctl = "";
  if (p.nai) {
    ctl = '<div class="seg" role="group" aria-label="Režim"><button type="button" data-mode="learn" aria-pressed="' + (mode === "learn") + '">Pochopit <small>' + p.nai.steps.length + ' kroků</small></button><button type="button" data-mode="practice" aria-pressed="' + (mode === "practice") + '">Procvičit <small>' + doneCount(p) + "/" + p.m.steps.length + "</small></button></div>";
  }
  var solo = !p.nai;
  return '<div class="sheet">' + headHtml(p) + taskHtml(p) +
    '<div class="grid ' + (solo ? "solo" : "") + '"><figure class="schem"><div class="paper"><img alt="Schéma příkladu ' + p.id + '" src="' + p.img + '" width="' + p.w + '" height="' + p.h + '">' + o.svg + "</div>" +
    '<figcaption class="legend">' + lg + "</figcaption>" +
    (p.nai ? '<div class="opts">' +
      (mode === "learn" ? '<label><input type="checkbox" id="allhl" ' + (st.allhl ? "checked " : "") + (st.clean ? "disabled" : "") + "> zvýraznit vše najednou</label>" : "") +
      '<label><input type="checkbox" id="clean" ' + (st.clean ? "checked" : "") + "> původní schéma bez anotací</label></div>" : "") + "</figure>" +
    '<div class="col">' + ctl + (mode === "learn" ? learnHtml(p) : practiceHtml(p)) + "</div></div></div>";
}

/* ---------- Vzory and Tahák pages ---------- */
function exLinks(ids) {
  return '<span class="exl">' + ids.map(function (id) {
    var i = PROBS.findIndex(function (p) { return p.id === id; });
    return i < 0 ? "<span>" + id + "</span>" : '<button type="button" data-go="' + i + '">' + id + "</button>";
  }).join("") + "</span>";
}
function renderVzory() {
  var h = '<div class="sheet"><header class="head"><div class="bignum">V</div><div class="meta"><span>Vzory z příkladů 2.1 až 4.19</span></div><div class="tools"></div><h2>Vzory, které se ve sbírce opakují</h2></header><div class="cards">';
  Object.keys(PATTERNS).forEach(function (k) {
    var pt = PATTERNS[k];
    var ids = PROBS.filter(function (p) { return p.nai && p.nai.pat.indexOf(k) >= 0; }).map(function (p) { return p.id; });
    h += '<div class="card ' + (st.patFocus === k ? "focus" : "") + '" id="pat-' + k + '"><h3>' + esc(pt.name) + "</h3><div>" + pt.d + "</div>" +
      (pt.f ? '<div class="eq">' + pt.f.map(function (x) { return '<div class="row">$' + x + "$</div>"; }).join("") + "</div>" : "") +
      (ids.length ? '<div><b>Příklady:</b> ' + exLinks(ids) + "</div>" : "") + "</div>";
  });
  return h + "</div></div>";
}
function renderTahak() {
  var h = '<div class="sheet"><header class="head"><div class="bignum">T</div><div class="meta"><span>Vzorce seřazené podle důležitosti</span></div><div class="tools"></div><h2>Co dopsat na tahák</h2></header>';
  h += '<div class="card"><p class="section-label">Konstanty (T = 300 K)</p><dl class="consts">' +
    [["V<sub>T</sub>", "26 mV"], ["V<sub>BG</sub>", "1,25 V"], ["TC(V<sub>BE</sub>)", "−2 mV/K"], ["k", "1,38·10⁻²³ J/K"], ["q", "1,602·10⁻¹⁹ C"], ["4kT", "1,656·10⁻²⁰ J"]]
      .map(function (c) { return "<div><dt>" + c[0] + "</dt><dd>" + c[1] + "</dd></div>"; }).join("") + "</dl></div>";
  h += '<div class="card"><p class="section-label">Vzorce</p><div class="tbl"><table><tr><th>Priorita</th><th>Vzorec</th><th>K čemu</th><th>Kde se použije</th></tr>';
  TAHAK.forEach(function (t) { h += "<tr><td><b>" + t.p + "</b></td><td>" + t.f.map(function (x) { return '<div style="padding:3px 0">$' + x + "$</div>"; }).join("") + "</td><td>" + t.d + "</td><td>" + exLinks(t.ex) + "</td></tr>"; });
  return h + "</table></div></div></div>";
}

/* ---------- render ---------- */
function render(focusSel) {
  renderSide();
  var main = $("#main");
  try { if (window.MathJax && MathJax.typesetClear) MathJax.typesetClear([main]); } catch (e) {}
  main.innerHTML = st.view === "vzory" ? renderVzory() : st.view === "tahak" ? renderTahak() : renderExample();
  typeset(main);
  if (focusSel) { var el = document.getElementById(focusSel); if (el) el.focus({ preventScroll: true }); }
  if (st.view === "vzory" && st.patFocus) { var c = document.getElementById("pat-" + st.patFocus); if (c) c.scrollIntoView({ block: "nearest" }); }
  updateReport();
  save();
  rtAfterRender();
}
/* prefill the GitHub issue with where the reader is */
function updateReport() {
  var a = document.getElementById("report");
  if (!a) return;
  var base = "https://github.com/machmar-claude/nai-sbirka/issues/new";
  var where, title;
  if (st.view === "vzory" || st.view === "tahak") {
    where = st.view === "vzory" ? "Stránka: Vzory" : "Stránka: Co na tahák";
    title = st.view === "vzory" ? "[Vzory] " : "[Tahák] ";
  } else {
    var p = PROBS[st.pi], mode = curMode(p);
    var step = mode === "learn" ? "Pochopit, krok " + (st.ns + 1) : "Procvičit, krok " + (focusIdx(p) + 1);
    where = "Příklad: " + p.id + " · " + p.m.title + "\nRežim: " + step;
    title = "[" + p.id + "] ";
  }
  var body = where + "\nOdkaz: " + location.href + "\n\nCo je špatně (a jak by to mělo být):\n\n";
  a.href = base + "?title=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(body);
}
function applyTheme() {
  var r = document.documentElement;
  if (st.theme) r.setAttribute("data-theme", st.theme); else r.removeAttribute("data-theme");
}

/* ---------- routing (hash: #p2-1, #k1, #vzory, #tahak) ---------- */
function showProblem(i) {
  var p = PROBS[i], changed = st.lastId !== p.id;
  if (changed) { st.ns = 0; st.pf = null; st.allhl = false; }
  st.view = "ex"; st.pi = i; st.lastId = p.id; st.patFocus = null; st.openCh = p.ch;
  render();
  if (changed) { window.scrollTo(0, 0); scrollListToCurrent(); }
}
function showPage(v) { st.view = v; st.patFocus = st.patFocus || null; render(); window.scrollTo(0, 0); }
function routeFromHash() {
  var h = "";
  try { h = decodeURIComponent(location.hash.replace(/^#/, "")); } catch (e) {}
  if (h === "vzory" || h === "tahak") { showPage(h); return true; }
  var i = PROBS.findIndex(function (p) { return p.m.id === h; });
  if (i >= 0) { showProblem(i); return true; }
  return false;
}
function go(i) {
  var h = PROBS[i].m.id;
  if (location.hash === "#" + h) showProblem(i); else location.hash = h;
}
function goPage(v) {
  if (location.hash === "#" + v) showPage(v); else location.hash = v;
}

/* ---------- answer check ---------- */
function check(i) {
  var p = PROBS[st.pi], s = pg(p), stp = p.m.steps[i];
  var inp = document.querySelector('[data-inp="' + i + '"]');
  var raw = inp ? inp.value : (s.val[i] || "");
  s.val[i] = raw;
  var v = parseNum(raw);
  if (isNaN(v)) { s.fb[i] = "warn"; render(inp ? inp.id : null); return; }
  var good = [stp.ans].concat(stp.alt || []).some(function (a) { return Math.abs(v - a) <= (stp.tolAbs != null ? stp.tolAbs : 0.02 * Math.abs(a) + 1e-12); });
  if (good) {
    s.ok[i] = true; s.fb[i] = "ok"; st.pf = null;
    var f = frontier(p);
    render(f < p.m.steps.length && p.m.steps[f].ans != null ? "ans-" + p.id.replace(/\./g, "-") + "-" + f : null);
  } else { s.fb[i] = "bad"; render(inp ? inp.id : null); }
}

/* ---------- export / import / reset ---------- */
function msg(t, err) { var m = $("#msg"); m.textContent = t; m.className = "msg" + (err ? " err" : ""); }
function doExport() {
  try {
    var payload = { app: "nai-sbirka", v: 1, exported: new Date().toISOString(), state: snapshot() };
    var blob = new Blob([JSON.stringify(payload, null, 1)], { type: "application/json" });
    var url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = "nai-postup-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    msg("Postup exportován.");
  } catch (e) { msg("Export se nepovedl.", true); }
}
function doImport(file) {
  if (!file) return;
  var rd = new FileReader();
  rd.onload = function () {
    var n = -1;
    try {
      var obj = JSON.parse(String(rd.result));
      var src = obj && obj.state && typeof obj.state === "object" ? obj.state : obj;
      n = mergeState(src);
    } catch (e) { n = -1; }
    if (n < 0) { msg("Soubor nevypadá jako export z této sbírky. Nic se nezměnilo.", true); return; }
    render();
    msg("Postup sloučen s tím v prohlížeči (příklady v souboru: " + n + ").");
  };
  rd.onerror = function () { msg("Soubor se nepodařilo přečíst.", true); };
  rd.readAsText(file);
}
function doReset() {
  st.prog = {}; st.known = {}; st.ns = 0; st.pf = null; st.confirmReset = false;
  try { localStorage.removeItem(KEY); } catch (e) {}
  render(); msg("Postup smazán.");
}

/* ---------- events ---------- */
document.addEventListener("click", function (ev) {
  var t = ev.target.closest("button, input");
  if (!t) return;
  var d = t.dataset;
  var p = PROBS[st.pi];
  if (d.rt) {
    if (d.rt === "create") rtJoin(newCode(), true);
    else if (d.rt === "join") rtJoin(($("#rtcode") || {}).value, false);
    else if (d.rt === "leave") rtLeave();
    else if (d.rt === "copy") { var l = $("#rtlink"); (navigator.clipboard ? navigator.clipboard.writeText(l.value) : Promise.reject()).then(function () { rtMsg("Odkaz zkopírován."); }, function () { l.select(); rtMsg("Zkopíruj odkaz ručně (Ctrl+C)."); }); }
    return;
  }
  if (d.pin) {
    var q = RT && RT.pins[d.pin];
    if (q && window.confirm(q.t ? "Smazat poznámku „" + q.t + "“ pro všechny?" : "Smazat tuto značku pro všechny?")) { delete RT.pins[d.pin]; RT.a.unpin.send(d.pin); drawShared(); }
    return;
  }
  if (d.sys) {
    if (d.sys === "export") doExport();
    else if (d.sys === "import") { var f = $("#file"); f.value = ""; f.click(); }
    else if (d.sys === "reset") { st.confirmReset = true; renderSide(); }
    else if (d.sys === "reset-no") { st.confirmReset = false; renderSide(); }
    else if (d.sys === "reset-yes") doReset();
    return;
  }
  if (t.id === "theme") {
    var dark = st.theme ? st.theme === "dark" : (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
    st.theme = dark ? "light" : "dark"; applyTheme(); save(); return;
  }
  if (d.tab) { if (d.tab === "ex") go(st.pi); else goPage(d.tab); return; }
  if (d.pi) { go(+d.pi); return; }
  if (d.chap) {
    st.openCh = d.chap; renderSide();
    var tile = document.querySelector('#list [data-chap="' + d.chap + '"]');
    if (tile) $("#list").scrollLeft = Math.max(0, tile.parentNode.offsetLeft);
    return;
  }
  if (d.go) { go(+d.go); return; }
  if (d.mode) { st.mode = d.mode; render(); return; }
  if (d.k) { st.ns = +d.k; render(); return; }
  if (d.nav) {
    if (d.nav === "all") st.showall = !st.showall;
    else if (d.nav === "next" && st.ns < p.nai.steps.length - 1) st.ns++;
    else if (d.nav === "prev" && st.ns > 0) st.ns--;
    render(); return;
  }
  if (d.act) {
    var i = +d.i, s = pg(p);
    if (d.act === "check") { check(i); return; }
    if (d.act === "hint") s.hint[i] = !s.hint[i];
    if (d.act === "rev") { s.rev[i] = true; st.pf = i; }
    render(); return;
  }
  if (d.pf) { st.pf = +d.pf; render(); return; }
  if (d.nai) { st.mode = "learn"; st.ns = +d.nai; render(); return; }
  if (d.prac) { st.mode = "practice"; st.pf = +d.prac; render(); return; }
  if (d.pat) { st.patFocus = d.pat; if (location.hash === "#vzory") showPage("vzory"); else location.hash = "vzory"; return; }
  if (d.know) { st.known[p.id] = !st.known[p.id]; render(); return; }
  if (d.plot) { pg(p).plot = !pg(p).plot; render(); return; }
});
document.addEventListener("change", function (ev) {
  if (ev.target.id === "allhl") { st.allhl = ev.target.checked; render(); }
  if (ev.target.id === "clean") { st.clean = ev.target.checked; render(); }
  if (ev.target.id === "rtfollow" && RT) RT.follow = ev.target.checked;
  if (ev.target.id === "file") doImport(ev.target.files && ev.target.files[0]);
});
document.addEventListener("input", function (ev) {
  var tg = ev.target;
  if (tg.id === "q") { st.q = tg.value; renderSide(); return; }
  var i = tg.dataset && tg.dataset.inp;
  if (i != null) { var s = pg(PROBS[st.pi]); s.val[+i] = tg.value; s.fb[+i] = null; save(); }
});
document.addEventListener("keydown", function (ev) {
  var tg = ev.target, i = tg.dataset && tg.dataset.inp;
  if (i != null) { if (ev.key === "Enter") { ev.preventDefault(); check(+i); } return; }
  if (tg.id === "rtcode" && ev.key === "Enter") { rtJoin(tg.value, false); return; }
  if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
  var tag = tg.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tg.isContentEditable) return;
  if (st.view !== "ex") return;
  var p = PROBS[st.pi], key = ev.key;
  if (key === "j" || key === "J") { if (st.pi < PROBS.length - 1) { ev.preventDefault(); go(st.pi + 1); } return; }
  if (key === "k" || key === "K") { if (st.pi > 0) { ev.preventDefault(); go(st.pi - 1); } return; }
  if (!p.nai || curMode(p) !== "learn") return;
  var step = 0;
  if (key === "ArrowRight") step = 1;
  else if (key === "ArrowLeft") step = -1;
  else if (key === " " || key === "Spacebar") { if (tag === "BUTTON" || tag === "A" || tag === "SUMMARY") return; step = 1; }
  else return;
  ev.preventDefault();
  var n = Math.max(0, Math.min(p.nai.steps.length - 1, st.ns + step));
  if (n !== st.ns) {
    st.ns = n; render();
    var on = document.querySelector(".lstep.on");
    if (on) on.scrollIntoView({ block: "nearest" });
  }
});
window.addEventListener("hashchange", routeFromHash);

/* ---------- Spolu: optional live room. Peers connect directly over WebRTC (Trystero, public Nostr relays only for the
   handshake). The library is loaded only when someone creates or joins a room, so solo use never touches the network. ---------- */
var RT = null;
var TRYSTERO = "https://cdn.jsdelivr.net/npm/trystero@0.26.0/+esm";
var PCOL = ["#e5484d", "#1e88e5", "#2e9e5b", "#8e44ad", "#ef6c00", "#00979c", "#d6409f"];
function peerCol(id) { var h = 0; id = String(id); for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0; return PCOL[Math.abs(h) % PCOL.length]; }
function newCode() { var a = "abcdefghjkmnpqrstuvwxyz23456789", r = crypto.getRandomValues(new Uint8Array(6)), s = ""; for (var i = 0; i < 6; i++) s += a[r[i] % a.length]; return s; }
function setUrlRoom(code) { var u = new URL(location.href); if (code) u.searchParams.set("room", code); else u.searchParams.delete("room"); history.replaceState(null, "", u.href); }
function rtMsg(t) { var m = $("#rtmsg"); if (m) m.textContent = t; }
function rtUi() {
  var b = $("#rtbody"), n = RT ? Object.keys(RT.peers).length : 0;
  $("#rtbtn").classList.toggle("on", !!RT);
  $("#rtn").textContent = RT ? String(n + 1) : "";
  if (!RT) {
    b.innerHTML = "<h2>Spolu</h2><p>Otevřete sbírku na více počítačích a propojte je kódem. Uvidíte, kde je ten druhý, jeho ukazatel ve schématu a společné poznámky. Spojení jde přímo mezi prohlížeči, nic se nikam neukládá.</p>" +
      '<button class="btn primary" type="button" data-rt="create">Vytvořit místnost</button>' +
      '<div class="rtrow"><input id="rtcode" placeholder="nebo zadej kód místnosti" autocomplete="off" aria-label="Kód místnosti"><button class="btn" type="button" data-rt="join">Připojit</button></div><p class="msg" id="rtmsg" role="status"></p>';
    return;
  }
  var url = new URL(location.href); url.hash = "";
  b.innerHTML = "<h2>Místnost <code>" + RT.code + "</code></h2><p>" + (n ? "Připojeno: " + (n + 1) + " (vy + " + n + ")." : "Čekám na ostatní… pošli jim odkaz nebo kód.") + "</p>" +
    '<div class="rtrow"><input id="rtlink" readonly aria-label="Odkaz do místnosti" value="' + url.href.replace(/"/g, "&quot;") + '"><button class="btn" type="button" data-rt="copy">Kopírovat</button></div>' +
    '<label><input type="checkbox" id="rtfollow"' + (RT.follow ? " checked" : "") + "> sledovat ostatní (přejdu tam, kam oni)</label>" +
    "<p>Ukazatel: najeď myší na schéma. Poznámka: dvojklik na schéma. Smazání: klik na poznámku.</p>" +
    '<button class="btn" type="button" data-rt="leave">Opustit místnost</button><p class="msg" id="rtmsg" role="status"></p>';
}
function viewNow() {
  var p = PROBS[st.pi];
  return st.view !== "ex" ? { v: st.view } : { v: "ex", id: p.id, mode: curMode(p), ns: st.ns, pf: st.pf, allhl: !!st.allhl, clean: !!st.clean };
}
/* called from render(): broadcast my view when it changed, and redraw the shared layer */
function rtAfterRender() {
  if (!RT) return;
  var v = viewNow(), k = JSON.stringify(v);
  if (k !== RT.lastKey) { RT.lastKey = k; if (!RT.applying) RT.a.view.send(v); }
  drawShared();
}
function applyView(d) {
  if (!RT || !RT.follow || !d || typeof d !== "object") return;
  RT.need = false;
  RT.applying = true;
  try {
    if (d.v === "vzory" || d.v === "tahak") { st.view = d.v; history.replaceState(null, "", "#" + d.v); render(); return; }
    var i = PROBS.findIndex(function (p) { return p.id === d.id; });
    if (i < 0) return;
    var p = PROBS[i], changed = st.lastId !== p.id;
    st.view = "ex"; st.pi = i; st.lastId = p.id; st.openCh = p.ch; st.patFocus = null;
    st.mode = d.mode === "practice" ? "practice" : "learn";
    st.ns = isFinite(d.ns) ? Math.max(0, d.ns | 0) : 0;
    st.pf = d.pf == null || !isFinite(d.pf) ? null : Math.max(0, d.pf | 0);
    st.allhl = d.allhl === true; st.clean = d.clean === true;
    history.replaceState(null, "", "#" + p.m.id);
    render();
    if (changed) { window.scrollTo(0, 0); scrollListToCurrent(); }
  } finally { RT.applying = false; }
}
/* everything below arrives from other people's browsers: validate before use */
function pct(v) { return typeof v === "number" && v >= 0 && v <= 100 ? v : null; }
function mergePins(list) {
  if (!Array.isArray(list)) return;
  list.slice(0, 300).forEach(function (q) {
    if (!q || typeof q.k !== "string" || q.k.length > 24 || typeof q.id !== "string") return;
    if (!PROBS.some(function (p) { return p.id === q.id; })) return;
    var x = pct(q.x), y = pct(q.y);
    if (x == null || y == null) return;
    RT.pins[q.k] = { k: q.k, id: q.id, x: x, y: y, t: typeof q.t === "string" ? q.t.slice(0, 200) : "", by: String(q.by || "").slice(0, 40) };
  });
}
function drawShared() {
  var pap = document.querySelector("#main .paper"), old = pap && pap.querySelector(".shared");
  if (old) old.remove();
  if (!RT || !pap || st.view !== "ex") return;
  var id = PROBS[st.pi].id, lay = document.createElement("div");
  lay.className = "shared";
  Object.keys(RT.pins).forEach(function (k) {
    var q = RT.pins[k];
    if (q.id !== id) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = "pin" + (q.t ? "" : " dot"); b.dataset.pin = k;
    b.style.left = q.x + "%"; b.style.top = q.y + "%"; b.style.setProperty("--c", peerCol(q.by));
    b.textContent = q.t; b.title = "Klikni pro smazání";
    lay.appendChild(b);
  });
  Object.keys(RT.cur).forEach(function (pid) {
    var c = RT.cur[pid];
    if (c.id !== id || Date.now() - c.at > 4000) return;
    var i = document.createElement("i");
    i.className = "pcur"; i.style.left = c.x + "%"; i.style.top = c.y + "%"; i.style.setProperty("--c", peerCol(pid));
    lay.appendChild(i);
  });
  pap.appendChild(lay);
}
function rtJoin(code, creator) {
  code = String(code || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 16);
  if (code.length < 4) { rtMsg("Kód má aspoň 4 znaky."); return; }
  rtMsg("Připojuji…");
  import(TRYSTERO).then(function (T) {
    if (RT) RT.room.leave();
    var room = T.joinRoom({ appId: "nai-sbirka-machmar-claude", password: code }, code);
    RT = { room: room, self: T.selfId, code: code, peers: {}, pins: {}, cur: {}, a: {}, follow: true, need: !creator, lastKey: null, applying: false };
    ["view", "ptr", "pin", "unpin", "hi"].forEach(function (n) { RT.a[n] = room.makeAction(n); });
    room.onPeerJoin = function (pid) {
      RT.peers[pid] = true;
      RT.a.hi.send({ need: RT.need, pins: Object.keys(RT.pins).map(function (k) { return RT.pins[k]; }) }, { target: pid });
      rtUi();
    };
    room.onPeerLeave = function (pid) { delete RT.peers[pid]; delete RT.cur[pid]; drawShared(); rtUi(); };
    /* a newcomer asks for the current view once; old members never follow the newcomer's start page */
    RT.a.hi.onMessage = function (d, m) {
      if (!d || typeof d !== "object") return;
      mergePins(d.pins);
      if (d.need === true && !RT.need) RT.a.view.send(viewNow(), { target: m.peerId });
      drawShared();
    };
    RT.a.view.onMessage = function (d) { applyView(d); };
    RT.a.ptr.onMessage = function (d, m) {
      if (!d || typeof d.id !== "string") return;
      var x = pct(d.x), y = pct(d.y);
      if (x == null || y == null) delete RT.cur[m.peerId]; else RT.cur[m.peerId] = { id: d.id, x: x, y: y, at: Date.now() };
      drawShared();
    };
    RT.a.pin.onMessage = function (d, m) { if (d && typeof d === "object") { d.by = m.peerId; mergePins([d]); drawShared(); } };
    RT.a.unpin.onMessage = function (k) { if (typeof k === "string" && RT.pins[k]) { delete RT.pins[k]; drawShared(); } };
    setUrlRoom(code);
    RT.lastKey = JSON.stringify(viewNow());
    rtUi(); drawShared();
  }).catch(function () { rtMsg("Spojení se nepodařilo spustit (jste online?)."); });
}
function rtLeave() {
  if (!RT) return;
  RT.room.leave(); RT = null;
  setUrlRoom(null); drawShared(); rtUi();
}
var ptrAt = 0, ptrIn = false;
document.addEventListener("pointermove", function (e) {
  if (!RT || st.view !== "ex") return;
  var pap = e.target.closest && e.target.closest("#main .paper");
  if (!pap) { if (ptrIn) { ptrIn = false; RT.a.ptr.send({ id: PROBS[st.pi].id, x: null }); } return; }
  var now = Date.now();
  if (now - ptrAt < 40) return; /* ~25 updates/s is plenty for a pointer */
  ptrAt = now; ptrIn = true;
  var r = pap.getBoundingClientRect();
  RT.a.ptr.send({ id: PROBS[st.pi].id, x: +((e.clientX - r.left) / r.width * 100).toFixed(2), y: +((e.clientY - r.top) / r.height * 100).toFixed(2) });
});
document.addEventListener("dblclick", function (e) {
  if (!RT || st.view !== "ex") return;
  var pap = e.target.closest && e.target.closest("#main .paper");
  if (!pap || e.target.closest(".pin")) return;
  var r = pap.getBoundingClientRect();
  var t = window.prompt("Poznámka k tomuto místu (uvidí ji všichni v místnosti, může být prázdná):", "");
  if (t === null) return;
  var q = { k: newCode() + newCode(), id: PROBS[st.pi].id, x: +((e.clientX - r.left) / r.width * 100).toFixed(2), y: +((e.clientY - r.top) / r.height * 100).toFixed(2), t: t.trim().slice(0, 200) };
  q.by = RT.self; mergePins([q]); RT.a.pin.send(q); drawShared();
});
setInterval(function () { if (RT && Object.keys(RT.cur).length) drawShared(); }, 1000); /* drop idle pointers */

/* ---------- formula drawer: click the handle to slide it, drag the handle to move it
   up/down or (when open) push it back toward the edge, drag the bottom grip to resize ---------- */
/* fit to the window for display only, so a small window never overwrites the remembered size */
function drFit(o) {
  var vw = window.innerWidth, vh = window.innerHeight;
  var w = Math.max(160, Math.min(o.w, vw - 36)), h = Math.max(90, Math.min(o.h, vh - 16));
  return { w: w, h: h, top: Math.max(8, Math.min(o.top, vh - h - 8)) };
}
function drApply() {
  var d = $("#drawer"), p = $("#dpanel"), f = drFit(DR);
  d.classList.toggle("open", DR.open);
  d.style.top = f.top + "px"; d.style.setProperty("--dt", f.top + "px");
  p.style.width = f.w + "px"; p.style.height = f.h + "px";
  p.inert = !DR.open;
  $("#dhandle").setAttribute("aria-expanded", String(DR.open));
}
function drDrag(el, move) {
  var g = null;
  el.addEventListener("pointerdown", function (e) { g = drFit(DR); g.x = e.clientX; g.y = e.clientY; g.moved = false; el.setPointerCapture(e.pointerId); el.moved = false; });
  el.addEventListener("pointermove", function (e) {
    if (!g) return;
    var dx = e.clientX - g.x, dy = e.clientY - g.y;
    if (!g.moved && Math.abs(dx) + Math.abs(dy) < 6) return; /* below this it is a click */
    g.moved = el.moved = true;
    move(g, dx, dy); var f = drFit(DR); DR.top = f.top; DR.w = f.w; DR.h = f.h; drApply();
  });
  function end() { if (g && g.moved) save(); g = null; }
  el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);
}
drDrag($("#dhandle"), function (g, dx, dy) { DR.top = g.top + dy; if (DR.open) DR.w = g.w - dx; });
drDrag($("#dgrip"), function (g, dx, dy) { DR.h = g.h + dy; });
$("#dhandle").addEventListener("click", function () {
  if (this.moved) { this.moved = false; return; } /* the click that ends a drag */
  DR.open = !DR.open; drApply(); save();
});
window.addEventListener("resize", drApply);
/* the closed handle grows by the scrollbar width. Classic scrollbars can be measured; overlay ones read 0 and are drawn
   over the page, so assume 12px and add that as padding the scrollbar covers, plus 12px visible. Re-measured on page resize. */
new ResizeObserver(function () {
  var r = document.documentElement, w = window.innerWidth - r.clientWidth;
  r.style.setProperty("--sb", (w > 0 ? w : 24) + "px");
  r.style.setProperty("--sbo", (w > 0 ? 0 : 12) + "px");
}).observe(document.documentElement);
$("#dbody").innerHTML = (window.VZORCE || []).map(function (g) {
  return "<h3>" + esc(g.g) + "</h3><dl>" + g.f.map(function (x) { return "<dt>" + esc(x[0]) + "</dt><dd>$" + x[1] + "$</dd>"; }).join("") + "</dl>";
}).join("");

/* ---------- start ---------- */
load();
applyTheme();
drApply();
rtUi();
var rtq = new URLSearchParams(location.search).get("room");
if (rtq) rtJoin(rtq, false);
if (window.innerWidth > 760) { var ft = $("#foot"); if (ft) ft.open = true; }
if (!routeFromHash()) {
  try { history.replaceState(null, "", "#" + PROBS[st.pi].m.id); } catch (e) {}
  showProblem(st.pi);
  scrollListToCurrent();
} else {
  scrollListToCurrent();
}
})();
