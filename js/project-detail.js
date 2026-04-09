/** Scheda progetto: parametro ?id= e dati da projects-data.js tramite il loader. */
(function () {
  'use strict';

  function getQueryId() {
    var params = new URLSearchParams(window.location.search);
    return (params.get('id') || '').trim();
  }

  function setMetaDescription(text) {
    var m = document.querySelector('meta[name="description"]');
    if (m && text) m.setAttribute('content', text);
  }

  /** Etichette progetto (ordine: la più lunga prima per match corretto). */
  var BODY_LABELS = [
    'Sfida Tecnica',
    'Scenario',
    'Soluzione',
    'Risultato',
    'Focus',
    'Stack',
  ];

  function appendBodyParagraph(container, paragraph) {
    var text = typeof paragraph === 'string' ? paragraph : '';
    var i;
    var lab;
    var prefix;
    for (i = 0; i < BODY_LABELS.length; i++) {
      lab = BODY_LABELS[i];
      prefix = lab + ':';
      if (text.indexOf(prefix) === 0) {
        var rest = text.slice(prefix.length).replace(/^\s*/, '');
        var p = document.createElement('p');
        var strong = document.createElement('strong');
        strong.textContent = lab;
        p.appendChild(strong);
        p.appendChild(document.createTextNode(': ' + rest));
        container.appendChild(p);
        return;
      }
    }
    var el = document.createElement('p');
    el.textContent = text;
    container.appendChild(el);
  }

  function init() {
    var id = getQueryId();
    var root = document.getElementById('project-root');
    var missing = document.getElementById('project-missing');

    if (!id) {
      document.title = 'Progetto non trovato | Roberto Di Lena';
      if (root) root.hidden = true;
      if (missing) missing.hidden = false;
      if (window.ScrollReveal) window.ScrollReveal.refresh();
      return;
    }

    PortfolioProjects.getById(id)
      .then(function (p) {
        if (!p) {
          document.title = 'Progetto non trovato | Roberto Di Lena';
          if (root) root.hidden = true;
          if (missing) missing.hidden = false;
          if (window.ScrollReveal) window.ScrollReveal.refresh();
          return;
        }

        if (missing) missing.hidden = true;
        if (root) root.hidden = false;

        document.title = (p.title || 'Progetto') + ' | Roberto Di Lena';
        setMetaDescription(p.metaDescription || p.summary || '');

        var crumbCurrent = document.getElementById('project-crumb-current');
        if (crumbCurrent) crumbCurrent.textContent = p.title || '';

        var heroWrap = document.getElementById('project-hero-wrap');
        var heroImg = document.getElementById('project-hero-img');
        if (heroWrap && heroImg) {
          if (p.heroImage) {
            heroImg.src = p.heroImage;
            heroImg.alt = p.heroImageAlt || '';
            heroWrap.hidden = false;
          } else {
            heroWrap.hidden = true;
          }
        }

        var h1 = document.getElementById('project-title');
        if (h1) h1.textContent = p.title || '';

        var tagsRoot = document.getElementById('project-tags');
        if (tagsRoot) {
          tagsRoot.innerHTML = '';
          (p.tags || []).forEach(function (t) {
            var s = document.createElement('span');
            s.className = 'tag badge';
            s.textContent = t;
            tagsRoot.appendChild(s);
          });
        }

        var banner = document.getElementById('project-banner');
        if (banner) {
          if (p.banner) {
            banner.textContent = p.banner;
            banner.hidden = false;
          } else {
            banner.hidden = true;
          }
        }

        var bodyEl = document.getElementById('project-body');
        if (bodyEl) {
          bodyEl.innerHTML = '';
          (p.body || []).forEach(function (paragraph) {
            appendBodyParagraph(bodyEl, paragraph);
          });
          bodyEl.classList.add('reveal-on-scroll');
          bodyEl.setAttribute('data-reveal-immediate', '');
          bodyEl.setAttribute('data-reveal-delay', '200');
        }

        if (window.ScrollReveal) window.ScrollReveal.refresh();
      })
      .catch(function () {
        document.title = 'Progetto non trovato | Roberto Di Lena';
        if (root) root.hidden = true;
        if (missing) missing.hidden = false;
        if (window.ScrollReveal) window.ScrollReveal.refresh();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
