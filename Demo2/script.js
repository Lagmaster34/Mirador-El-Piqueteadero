/* ============================================================
   MIRADOR EL PIQUETEADERO — interacciones
   1. El cielo pasa de día → atardecer → noche según la sección
   2. Reveals suaves al hacer scroll
   3. Parallax muy sutil en las montañas y en la foto del hero
   4. Placeholder automático mientras no existan las fotos
   ============================================================ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var root = document.documentElement;

  /* ---------- 1. MOOD: día / atardecer / noche ---------- */
  var moodSections = document.querySelectorAll('[data-mood]:not(body)');

  if ('IntersectionObserver' in window) {
    var moodObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var mood = entry.target.getAttribute('data-mood');
          if (mood && body.getAttribute('data-mood') !== mood) {
            body.setAttribute('data-mood', mood);
          }
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    moodSections.forEach(function (section) {
      moodObserver.observe(section);
    });
  }

  /* ---------- 2. REVEALS ---------- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // escalonado suave cuando varios entran a la vez
          setTimeout(function () { el.classList.add('is-in'); }, i * 90);
          revealObserver.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 3. SCROLL: progreso, parallax y topbar ---------- */
  var topbar = document.querySelector('.topbar');
  var heroPhoto = document.querySelector('.hero__photo');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(y / max, 1) : 0;

    root.style.setProperty('--p', progress.toFixed(4));

    if (topbar) {
      topbar.classList.toggle('is-stuck', y > 60);
    }

    if (heroPhoto && !reduceMotion) {
      var shift = Math.min(y * 0.16, 140);
      heroPhoto.style.transform = 'translate3d(0,' + shift + 'px,0) scale(1.06)';
    }

    ticking = false;
  }

  function requestScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }

  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll, { passive: true });
  onScroll();

  /* ---------- 4. FOTOS: placeholder si el archivo no existe ---------- */
  document.querySelectorAll('.photo').forEach(function (el) {
    var raw = getComputedStyle(el).getPropertyValue('--src').trim();
    var match = raw.match(/url\((['"]?)(.*?)\1\)/);

    if (!match || !match[2]) {
      el.classList.add('photo--empty');
      return;
    }

    var probe = new Image();
    probe.onerror = function () { el.classList.add('photo--empty'); };
    probe.src = match[2];
  });

  /* ---------- 5. Scroll suave con offset para el header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
})();