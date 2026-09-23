/* Studio Fiore — interazioni del sito (nessuna dipendenza esterna) */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.remove("no-js");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: stato "scrolled" e scomparsa scrollando in giù ---------- */
  var header = document.querySelector(".site-header");
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    if (!header) return;
    header.classList.toggle("is-scrolled", y > 40);
    var goingDown = y > lastY && y > 600;
    header.classList.toggle("is-hidden", goingDown && !doc.classList.contains("menu-open"));
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    doc.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!doc.classList.contains("menu-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && doc.classList.contains("menu-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980 && doc.classList.contains("menu-open")) setMenu(false);
    });
  }

  /* ---------- Comparsa progressiva ---------- */
  var revealables = document.querySelectorAll(".reveal, .steps, .photo-frame");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Pannello "percorso" nella hero: avanza passo dopo passo ---------- */
  var journey = document.querySelector(".journey ol");
  if (journey && !reduceMotion) {
    var items = journey.querySelectorAll("li");
    var current = 0;
    var status = document.querySelector(".journey-status");
    function paint() {
      items.forEach(function (li, i) {
        li.classList.toggle("is-done", i < current);
        li.classList.toggle("is-active", i === current);
      });
      if (status) status.textContent = "Fase " + (current + 1) + " di " + items.length;
    }
    paint();
    setInterval(function () {
      current = (current + 1) % items.length;
      paint();
    }, 2600);
  }

  /* ---------- Intervista: YouTube caricato solo al clic (niente cookie prima) ---------- */
  document.querySelectorAll("[data-youtube]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-youtube");
      var start = parseInt(btn.getAttribute("data-start"), 10) || 0;
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0" + (start ? "&start=" + start : "");
      iframe.title = btn.getAttribute("data-title") || "Video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      btn.parentNode.replaceChild(iframe, btn);
    });
  });

  /* ---------- Form contatti (Netlify Forms) ---------- */
  var form = document.querySelector("form[data-netlify]");
  if (form && window.fetch) {
    var success = document.querySelector(".form-success");
    var error = form.querySelector(".form-error");
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) return;
      e.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      var label = button.innerHTML;
      button.disabled = true;
      button.textContent = "Invio in corso…";
      if (error) error.hidden = true;
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.hidden = true;
          if (success) {
            success.hidden = false;
            success.setAttribute("tabindex", "-1");
            success.focus();
          }
        })
        .catch(function () {
          button.disabled = false;
          button.innerHTML = label;
          if (error) error.hidden = false;
        });
    });
  }

  /* ---------- Anno nel footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
