/* Intellecta Solutions — interazioni di pagina (senza dipendenze) */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector(".nav-burger");
  var menu = document.getElementById("mobile-menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Video di sfondo con dissolvenza in loop ----------
     Riproduzione automatica silenziata; dissolvenza in entrata al
     caricamento e in uscita a fine clip, poi si riparte da capo.
     Con prefers-reduced-motion i video restano fermi sul primo frame. */
  function setupFadingVideo(video) {
    var fadingOut = false;
    var raf = null;

    function fadeTo(target, duration) {
      var start = parseFloat(video.style.opacity) || 0;
      var t0 = performance.now();
      if (raf) cancelAnimationFrame(raf);
      function step(now) {
        var p = Math.min((now - t0) / duration, 1);
        video.style.opacity = String(start + (target - start) * p);
        if (p < 1) raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    }

    var started = false;
    function start() {
      if (started) return;
      started = true;
      if (reducedMotion) {
        video.pause();
        video.style.opacity = "0.6";
        return;
      }
      video.style.opacity = "0";
      video.play().catch(function () {});
      fadeTo(1, 500);
    }

    /* Il video può essere già pronto prima che questo script si attivi:
       in quel caso 'loadeddata' non arriverà mai, quindi si parte subito. */
    if (video.readyState >= 2) {
      start();
    } else {
      video.addEventListener("loadeddata", start);
      video.addEventListener("canplay", start);
    }

    video.addEventListener("timeupdate", function () {
      if (reducedMotion) return;
      var left = video.duration - video.currentTime;
      if (!fadingOut && left <= 0.55 && left > 0) {
        fadingOut = true;
        fadeTo(0, 500);
      }
    });

    video.addEventListener("ended", function () {
      if (reducedMotion) return;
      video.style.opacity = "0";
      setTimeout(function () {
        video.currentTime = 0;
        video.play().catch(function () {});
        fadingOut = false;
        fadeTo(1, 500);
      }, 100);
    });
  }
  document.querySelectorAll(".bg-video").forEach(setupFadingVideo);

  /* ---------- Comparsa progressiva delle card ---------- */
  var cards = document.querySelectorAll(".reveal");
  cards.forEach(function (el, i) {
    el.style.setProperty("--d", (i % 3) * 0.2 + "s");
  });
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
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    cards.forEach(function (el) { io.observe(el); });
  } else {
    cards.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Form contatti (Netlify) ----------
     Invio via fetch per restare sulla pagina e mostrare la conferma.
     Senza JavaScript il form viene comunque inviato a Netlify
     con un normale POST. */
  var form = document.querySelector('form[name="contatti"]');
  var success = document.querySelector(".form-success");
  if (form && success && window.fetch) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = "Invio...";

      var body = new URLSearchParams(new FormData(form)).toString();
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          form.hidden = true;
          success.hidden = false;
        })
        .catch(function () {
          button.disabled = false;
          button.textContent = "Riprova — invio non riuscito";
        });
    });
  }
})();
