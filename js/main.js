// Initialisation des icônes Lucide
// Remarque: les icônes sont chargées via CDN dans index.html,
// ici on ne fait que remplacer les <i data-lucide> par des SVG.
if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}

// ============================================================
// Gestion de la navigation (approche CSS-first)
// - Le state "ouvert/fermé" du menu est piloté par une checkbox cachée (#nav-toggle)
// - Le bouton burger (<button>.burger-menu) bascule la checkbox en JS
// - Le CSS (sélecteurs .nav-toggle:checked ~ ...) affiche/masque la sidebar et anime le burger
// - Le JS synchronise aria-expanded + évite tout retour à #top
// ============================================================
(function() {
  const navToggle = document.getElementById('nav-toggle');
  const burgerLabel = document.querySelector('.burger-menu'); // bouton visible
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  let wasDesktop = window.innerWidth > 768;

  // ------------------------------------------------------------
  // Scroll spy performant (rAF) + offset du header
  // - Calcule la section active selon scrollY + hauteur du header
  // - Met .active sur le lien correspondant (un seul actif)
  // ------------------------------------------------------------
  (function initScrollSpy() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;
    const links = Array.from(document.querySelectorAll('.sidebar-link'));
    const linkById = new Map(
      sections.map(sec => [sec.id, document.querySelector('.sidebar-link[href="#' + sec.id + '"]')])
    );

    function setActive(id) {
      links.forEach(l => l.classList.remove('active'));
      const link = linkById.get(id);
      if (link) link.classList.add('active');
    }

    function updateLinkProgress(scrollY) {
      const headerOffset = getHeaderHeight();
      const viewportHeight = Math.max(window.innerHeight || 0, headerOffset + 1);

      metrics.forEach((metric) => {
        const link = linkById.get(metric.id);
        if (!link) return;

        const start = Math.max(metric.titleTop - viewportHeight, 0);
        const end = Math.max(metric.bottom - headerOffset, start + 1);
        const range = end - start || 1;
        let progress = (scrollY - start) / range;

        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        const percent = (progress * 100).toFixed(2) + '%';
        link.style.setProperty('--link-fill', percent);
        link.classList.toggle('is-progress', progress > 0);
        link.classList.toggle('is-complete', progress >= 0.999);
      });
    }

    function getHeaderHeight() {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
      const n = parseInt(v, 10);
      return isNaN(n) ? 70 : n;
    }

    let ticking = false;
    let metrics = [];
    function recalc() {
      const currentScroll = window.scrollY || window.pageYOffset;
      metrics = sections.map(sec => {
        const container = sec.querySelector('.section-content') || sec;
        const containerRect = container.getBoundingClientRect();
        const title = sec.querySelector('.section-title');
        const titleRect = title ? title.getBoundingClientRect() : containerRect;

        return {
          id: sec.id,
          top: containerRect.top + currentScroll,
          bottom: containerRect.bottom + currentScroll,
          titleTop: titleRect.top + currentScroll
        };
      });
      onScroll();
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const pos = window.scrollY + getHeaderHeight() + 2; // 2px de marge
        const activeEl = document.activeElement;
        if (activeEl && activeEl.classList && activeEl.classList.contains('sidebar-link')) {
          activeEl.blur();
        }
        let activeId = metrics[0] ? metrics[0].id : null;
        for (let i = 0; i < metrics.length; i++) {
          if (metrics[i].top <= pos) {
            activeId = metrics[i].id;
          } else {
            break;
          }
        }
        if (activeId) setActive(activeId);
        updateLinkProgress(pos);
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recalc);
    // Recalcul après chargement complet (images, etc.)
    window.addEventListener('load', recalc);
    recalc();
  })();

  // Synchroniser ARIA avec l'état de la checkbox
  function syncAria() {
    if (!burgerLabel || !navToggle) return;
    const expanded = navToggle.checked;
    burgerLabel.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    burgerLabel.setAttribute('aria-label', expanded ? 'Fermer le menu' : 'Ouvrir le menu');
  }

  if (navToggle) {
    // État initial: ouvert sur desktop, fermé sur mobile
    // Initialiser l'état du menu selon la largeur
    navToggle.checked = window.innerWidth > 768;
    syncAria();

    // Clic sur le bouton burger (bascule la checkbox sans navigation)
    if (burgerLabel) {
      burgerLabel.addEventListener('click', () => {
        navToggle.checked = !navToggle.checked;
        syncAria();
        burgerLabel.focus();
      });
    }

    navToggle.addEventListener('change', () => {
      syncAria();
      // Ramener le focus sur le contrôle visible
      if (burgerLabel) burgerLabel.focus();
    });

    // Adapter l'état si on franchit un breakpoint (mobile <-> desktop)
    window.addEventListener('resize', () => {
      const isDesktop = window.innerWidth > 768;
      if (isDesktop !== wasDesktop) {
        navToggle.checked = isDesktop; // ouvert par défaut sur desktop, fermé sur mobile
        syncAria();
        wasDesktop = isDesktop;
      }
    });
  }

  // Smooth scroll programmatique sur clic des liens du menu
  // (pour une expérience homogène même sans support natif)
  if (sidebarLinks) {
    // Gestion explicite du lien "Fermer le menu"
    const closeLinks = document.querySelectorAll('.sidebar-link[data-close-menu="true"]');
    closeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (navToggle) {
          navToggle.checked = false;
          syncAria();
        }
        if (burgerLabel) burgerLabel.focus();
      });
    });

    function getHeaderHeight() {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
      const n = parseInt(v, 10);
      return isNaN(n) ? 70 : n;
    }
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#')) {
          const id = href.slice(1);
          const target = document.getElementById(id);
          if (target) {
            e.preventDefault();
            const y = target.offsetTop - 0; // sections déjà décalées sous le header
            window.scrollTo({ top: y, behavior: 'smooth' });
            if (id) {
              if (history.replaceState) {
                history.replaceState(null, '', '#' + id);
              } else {
                window.location.hash = id;
              }
            }
          }
        }
      });
    });
  }

  // Fermer le menu au clic sur un lien (mobile uniquement)
  if (sidebarLinks && navToggle) {
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navToggle.checked) {
          navToggle.checked = false;
          syncAria();
        }
      });
    });
  }
})();

// ============================================================
// Checklist avec localStorage (indépendant de la navigation)
// - Sauvegarde l'état des cases
// - Met à jour la barre de progression
// ============================================================
(function(){
  const STORAGE_KEY = 'module741_checklist';
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const progressBar = document.querySelector('.progress-bar');

  // Charger l'état sauvegardé
  function loadChecklistState() {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const state = JSON.parse(savedState);
        checkboxes.forEach(checkbox => {
          if (state[checkbox.id]) {
            checkbox.checked = true;
            updateItemState(checkbox);
          }
        });
      }
    } catch (error) {
      console.warn('Erreur lors du chargement de la checklist:', error);
    }
  }

  // Sauvegarder l'état
  function saveChecklistState() {
    try {
      const state = {};
      checkboxes.forEach(checkbox => {
        state[checkbox.id] = checkbox.checked;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde de la checklist:', error);
    }
  }

  // Mettre à jour l'état visuel d'un item
  function updateItemState(checkbox) {
    const item = checkbox.closest('.checklist-item');
    if (checkbox.checked) {
      item.classList.add('completed');
    } else {
      item.classList.remove('completed');
    }
  }

  // Mettre à jour la progression
  function updateProgress() {
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    const percentage = Math.round((checked / total) * 100);

    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '% complété';
    progressBar.setAttribute('aria-valuenow', percentage);

    // Animation de félicitations à 100%
    if (percentage === 100) {
      progressText.textContent = '🎉 100% complété - Félicitations !';
      progressText.style.color = 'var(--color-accent)';
      progressFill.style.background = 'linear-gradient(90deg, var(--color-accent), #4CAF50)';
    } else {
      progressText.style.color = 'var(--color-primary)';
      progressFill.style.background = 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))';
    }
  }

  // Initialiser la checklist
  function initChecklist() {
    loadChecklistState();
    updateProgress();

    // Ajouter les événements
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        updateItemState(this);
        updateProgress();
        saveChecklistState();
      });
    });
  }


  // Initialiser au chargement
  initChecklist();
})();
