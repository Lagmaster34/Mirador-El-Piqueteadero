(function () {
  "use strict";

  /* =========================================================
   * CONFIGURACIÓN DE CONTACTO
   * WHATSAPP_NUMBER: reemplaza con el número real en formato
   * internacional sin espacios ni símbolos, ej: "573001234567".
   * Mientras esté vacío, los botones de WhatsApp abren
   * wa.me sin número (el usuario deberá elegir el contacto).
   * ========================================================= */
  const WHATSAPP_NUMBER = ""; // TODO: agregar número real de WhatsApp
  const WHATSAPP_MESSAGE = "Hola, quiero saber más sobre Mirador El Piqueteadero";

  const waLink = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : "https://wa.me/";

  ["whatsapp-float", "btn-whatsapp", "footer-whatsapp"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("href", waLink);
  });

  /* ---------- Año en footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header on scroll ---------- */
  const header = document.getElementById("site-header");
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Menú: render dinámico desde MENU_DATA ---------- */
  const tabsEl = document.getElementById("menu-tabs");
  const panelsEl = document.getElementById("menu-panels");

  function renderMenu() {
    MENU_DATA.forEach((cat, i) => {
      const tab = document.createElement("button");
      tab.className = "menu-tab" + (i === 0 ? " active" : "");
      tab.type = "button";
      tab.textContent = cat.name;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
      tab.dataset.target = cat.id;
      tab.addEventListener("click", () => activateCategory(cat.id));
      tabsEl.appendChild(tab);

      const panel = document.createElement("div");
      panel.className = "menu-panel" + (i === 0 ? " active" : "");
      panel.id = "panel-" + cat.id;
      panel.setAttribute("role", "tabpanel");

      if (cat.badge) {
        const badge = document.createElement("span");
        badge.className = "menu-badge";
        badge.textContent = cat.badge;
        panel.appendChild(badge);
      }
      if (cat.note) {
        const note = document.createElement("p");
        note.className = "menu-panel-note";
        note.textContent = cat.note;
        panel.appendChild(note);
      }

      const list = document.createElement("div");
      list.className = "menu-list";
      cat.items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "menu-item";

        const name = document.createElement("span");
        name.className = "menu-item-name";
        name.textContent = item.name;
        row.appendChild(name);

        if (item.variants) {
          const variants = document.createElement("span");
          variants.className = "menu-item-variants";
          variants.innerHTML = item.variants
            .map((v) => `<span>${v.label} <b>${v.price}</b></span>`)
            .join("");
          row.appendChild(variants);
        } else {
          const price = document.createElement("span");
          price.className = "menu-item-price";
          price.textContent = item.price;
          row.appendChild(price);
        }

        list.appendChild(row);
      });

      panel.appendChild(list);
      panelsEl.appendChild(panel);
    });
  }

  function activateCategory(id) {
    tabsEl.querySelectorAll(".menu-tab").forEach((t) => {
      const active = t.dataset.target === id;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
    });
    panelsEl.querySelectorAll(".menu-panel").forEach((p) => {
      p.classList.toggle("active", p.id === "panel-" + id);
    });
  }

  renderMenu();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }
})();
