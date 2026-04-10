/** Home cinematic: 5 progetti featured, markup card stack + evento per GSAP. */
(function () {
  'use strict';

  var PREVIEW_MAX = 5;

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function render(list, container) {
    container.innerHTML = '';
    list.forEach(function (p, index) {
      var article = document.createElement('article');
      article.className = 'cine-project-card';
      article.setAttribute('data-cursor-hover', '');
      article.setAttribute('data-project-index', String(index));

      var glow = document.createElement('div');
      glow.className = 'cine-project-card__glow';
      glow.setAttribute('aria-hidden', 'true');

      var surface = document.createElement('div');
      surface.className = 'cine-project-card__surface';

      var inner = document.createElement('div');
      inner.className = 'cine-project-card__inner';

      var idx = document.createElement('span');
      idx.className = 'cine-project-card__index';
      idx.textContent = pad2(index + 1) + ' / ' + pad2(list.length);

      var icon = document.createElement('div');
      icon.className = 'cine-project-card__icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = p.icon || '📁';

      var h3 = document.createElement('h3');
      h3.className = 'cine-project-card__title';
      h3.textContent = p.title || 'Senza titolo';

      var para = document.createElement('p');
      para.className = 'cine-project-card__summary';
      para.textContent = p.summary || '';

      var tags = document.createElement('div');
      tags.className = 'cine-project-card__tags';
      (p.tags || []).slice(0, 8).forEach(function (t) {
        var s = document.createElement('span');
        s.className = 'cine-project-card__tag';
        s.textContent = t;
        tags.appendChild(s);
      });

      var footer = document.createElement('div');
      footer.className = 'cine-project-card__footer';
      var cta = document.createElement('span');
      cta.className = 'cine-project-card__link';
      cta.setAttribute('aria-hidden', 'true');
      cta.textContent = 'Apri la scheda →';

      var projectHref = 'projects/project.html?id=' + encodeURIComponent(p.id);
      var hit = document.createElement('a');
      hit.className = 'cine-project-card__hit';
      hit.href = projectHref;
      hit.setAttribute('data-cursor-hover', '');
      hit.setAttribute('aria-label', 'Apri la scheda: ' + (p.title || 'Progetto'));

      inner.appendChild(idx);
      inner.appendChild(icon);
      inner.appendChild(h3);
      inner.appendChild(para);
      if (tags.childNodes.length) inner.appendChild(tags);
      footer.appendChild(cta);
      inner.appendChild(footer);

      surface.appendChild(glow);
      surface.appendChild(inner);
      surface.appendChild(hit);
      article.appendChild(surface);
      container.appendChild(article);
    });
  }

  function dispatchReady() {
    document.dispatchEvent(new CustomEvent('cinematic:projects-ready', { bubbles: true }));
  }

  function init() {
    var container = document.getElementById('featured-projects-root');
    if (!container) return;

    PortfolioProjects.getProjects()
      .then(function (all) {
        var featured = all.filter(function (p) {
          return p.featured === true;
        });
        featured.sort(function (a, b) {
          var oa = typeof a.featuredOrder === 'number' ? a.featuredOrder : 999;
          var ob = typeof b.featuredOrder === 'number' ? b.featuredOrder : 999;
          return oa - ob;
        });
        if (featured.length === 0) {
          container.innerHTML =
            '<p class="cine-projects__empty">Nessun progetto in evidenza al momento.</p>';
          dispatchReady();
          return;
        }

        var preview = featured.slice(0, PREVIEW_MAX);
        render(preview, container);
        dispatchReady();
      })
      .catch(function () {
        container.innerHTML =
          '<p class="cine-projects__empty">Impossibile caricare i progetti. Ricarica la pagina.</p>';
        dispatchReady();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
