/* Intellecta Solutions — interazioni di pagina */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Anno corrente nel footer ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("nav-list");
  if (toggle && navList) {
    toggle.addEventListener("click", function () {
      var open = navList.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navList.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navList.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Comparsa progressiva delle card ---------- */
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Griglia di punti animata nell'hero ----------
     Una griglia regolare di punti; due onde lente la attraversano
     e accendono i punti in cobalto. Con prefers-reduced-motion
     la griglia resta statica. */
  var canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var hero = canvas.parentElement;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, cols = 0, rows = 0;
  var GAP = 34;

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.replace(/./g, "$&$&");
    var n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  var inkRgb, blueRgb;
  function readColors() {
    try {
      inkRgb = hexToRgb(cssVar("--ink") || "#101d30");
      blueRgb = hexToRgb(cssVar("--cobalto") || "#1b3b9e");
    } catch (e) {
      inkRgb = [16, 29, 48];
      blueRgb = [27, 59, 158];
    }
  }
  readColors();

  var themeWatcher = window.matchMedia("(prefers-color-scheme: dark)");
  if (themeWatcher.addEventListener) {
    themeWatcher.addEventListener("change", function () {
      readColors();
      if (reducedMotion) drawStatic();
    });
  }
  new MutationObserver(function () {
    readColors();
    if (reducedMotion) drawStatic();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  function resize() {
    W = hero.clientWidth;
    H = hero.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(W / GAP) + 1;
    rows = Math.ceil(H / GAP) + 1;
    if (reducedMotion) drawStatic();
  }

  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(" + inkRgb.join(",") + ",0.14)";
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        ctx.beginPath();
        ctx.arc(i * GAP, j * GAP, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  var start = performance.now();
  function frame(now) {
    var t = (now - start) / 1000;
    ctx.clearRect(0, 0, W, H);
    // Due fronti d'onda diagonali che attraversano la griglia
    var w1 = ((t * 60) % (W + H * 0.6 + 600)) - 300;
    var w2 = ((t * 38 + (W + H * 0.6) * 0.55) % (W + H * 0.6 + 600)) - 300;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var x = i * GAP;
        var y = j * GAP;
        var d = x + y * 0.6;
        var g1 = Math.max(0, 1 - Math.abs(d - w1) / 220);
        var g2 = Math.max(0, 1 - Math.abs(d - w2) / 260);
        var glow = Math.max(g1, g2 * 0.7);
        var base = 0.12;
        if (glow > 0.02) {
          var r = Math.round(inkRgb[0] + (blueRgb[0] - inkRgb[0]) * glow);
          var g = Math.round(inkRgb[1] + (blueRgb[1] - inkRgb[1]) * glow);
          var b = Math.round(inkRgb[2] + (blueRgb[2] - inkRgb[2]) * glow);
          ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (base + glow * 0.55).toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(x, y, 1 + glow * 1.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(" + inkRgb.join(",") + "," + base + ")";
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    raf = requestAnimationFrame(frame);
  }

  var raf = null;
  resize();
  window.addEventListener("resize", resize);

  if (!reducedMotion) {
    // Anima solo quando l'hero è visibile, per non sprecare batteria
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && raf === null) {
            start = performance.now() - 1000;
            raf = requestAnimationFrame(frame);
          } else if (!entry.isIntersecting && raf !== null) {
            cancelAnimationFrame(raf);
            raf = null;
          }
        });
      }).observe(hero);
    } else {
      raf = requestAnimationFrame(frame);
    }
  }
})();
