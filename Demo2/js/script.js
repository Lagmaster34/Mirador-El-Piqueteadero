/* ============================================================
   MIRADOR EL PIQUETEADERO — interacciones
   1. El cielo pasa de día → atardecer → noche según la sección
   2. Reveals suaves al hacer scroll
   3. Parallax muy sutil en las montañas
   4. Placeholder automático mientras no existan las fotos reales
   5. Menú de categorías renderizado desde menu-data.js
   6. Menú móvil (topnav)
   7. WhatsApp: número configurable en un solo lugar
   ============================================================ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var root = document.documentElement;

  /* =========================================================
   * CONFIGURACIÓN DE CONTACTO
   * WHATSAPP_NUMBER: reemplaza con el número real en formato
   * internacional sin espacios ni símbolos, ej: "573001234567".
   * No se incluyó ningún número porque no fue provisto.
   * ========================================================= */
  var WHATSAPP_NUMBER = ''; // TODO: agregar número real de WhatsApp
  var WHATSAPP_MESSAGE = 'Hola, quiero saber más sobre Mirador El Piqueteadero';
  var waLink = WHATSAPP_NUMBER
    ? 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE)
    : 'https://wa.me/';

  ['whatsapp-float', 'btn-whatsapp', 'foot-whatsapp'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.setAttribute('href', waLink);
  });

  /* ---------- Año en footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  /* ---------- 2. MENÚ MÓVIL ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var topnav = document.getElementById('topnav');
  var navScrim = document.querySelector('.nav-scrim');

  function closeNav() {
    topnav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú');
    body.classList.remove('nav-open');
  }

  if (navToggle && topnav) {
    navToggle.addEventListener('click', function () {
      var isOpen = topnav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      body.classList.toggle('nav-open', isOpen);
    });
    topnav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
    if (navScrim) navScrim.addEventListener('click', closeNav);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- 3. RENDER DEL MENÚ (desde menu-data.js) ---------- */
  var menuGrid = document.getElementById('menu-grid');
  if (menuGrid && typeof MENU_DATA !== 'undefined') {
    MENU_DATA.forEach(function (cat) {
      var card = document.createElement('article');
      card.className = 'card reveal';

      var top = document.createElement('header');
      top.className = 'card__top';
      top.innerHTML = '<span class="card__icon" aria-hidden="true">' + cat.icon + '</span><h3>' + cat.name + '</h3>';
      card.appendChild(top);

      var list = document.createElement('ul');
      list.className = 'card__list' + (cat.twoCol ? ' card__list--two' : '');

      cat.items.forEach(function (item) {
        var li = document.createElement('li');
        if (item.variants) {
          var variants = item.variants.map(function (v) { return v.label + ' ' + v.price; }).join(' · ');
          li.innerHTML = '<span class="li__name">' + item.name + '</span><span class="li__variants">' + variants + '</span>';
          li.className = 'has-variants';
        } else {
          li.innerHTML = '<span class="li__name">' + item.name + '</span><b>' + item.price + '</b>';
        }
        list.appendChild(li);
      });
      card.appendChild(list);

      if (cat.note) {
        var note = document.createElement('p');
        note.className = 'card__note';
        note.textContent = cat.note;
        card.appendChild(note);
      }

      menuGrid.appendChild(card);
    });
  }

  /* ---------- 4. REVEALS ---------- */
  function armReveals() {
    var revealables = document.querySelectorAll('.reveal');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () { el.classList.add('is-in'); }, i * 90);
            revealObserver.unobserve(el);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

      revealables.forEach(function (el) { revealObserver.observe(el); });
    }
  }
  armReveals();

  /* ---------- 5. SCROLL: progreso, parallax y topbar ---------- */
  var topbar = document.querySelector('.topbar');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(y / max, 1) : 0;

    root.style.setProperty('--p', progress.toFixed(4));

    if (topbar) {
      topbar.classList.toggle('is-stuck', y > 60);
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

  /* ---------- 6. FOTOS: placeholder si el archivo no existe ---------- */
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

  /* ---------- 7. Scroll suave con offset para el header ---------- */
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
