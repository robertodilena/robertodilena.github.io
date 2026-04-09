/** Sezione progetti home: slice featured, PREVIEW_MAX, CTA verso projects/index.html. */
(function () {
  'use strict';

  var PREVIEW_MAX = 3;

  function render(list, container) {
    container.innerHTML = '';
    list.forEach(function (p, index) {
      var article = document.createElement('article');
      article.className = 'card card--showcase reveal-on-scroll';
      article.style.setProperty('--reveal-delay', index * 80 + 'ms');

      var icon = document.createElement('div');
      icon.className = 'card-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = p.icon || '📁';

      var h3 = document.createElement('h3');
      h3.textContent = p.title || 'Senza titolo';

      var para = document.createElement('p');
      para.textContent = p.summary || '';

      var footer = document.createElement('div');
      footer.className = 'card-footer';
      var a = document.createElement('a');
      a.href = 'projects/project.html?id=' + encodeURIComponent(p.id);
      a.textContent = 'Scheda progetto';
      footer.appendChild(a);

      article.appendChild(icon);
      article.appendChild(h3);
      article.appendChild(para);
      article.appendChild(footer);
      container.appendChild(article);
    });
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
          container.innerHTML = '<p class="lead">Nessun progetto in evidenza al momento.</p>';
          return;
        }

        var prevMore = container.nextElementSibling;
        if (prevMore && prevMore.classList && prevMore.classList.contains('home-showcase__more')) {
          prevMore.remove();
        }

        var total = featured.length;
        var preview = featured.slice(0, PREVIEW_MAX);
        render(preview, container);

        if (total > PREVIEW_MAX) {
          var more = document.createElement('div');
          more.className = 'home-showcase__more reveal-on-scroll';
          more.style.setProperty('--reveal-delay', preview.length * 80 + 40 + 'ms');

          var dots = document.createElement('span');
          dots.className = 'home-showcase__ellipsis';
          dots.setAttribute('aria-hidden', 'true');
          dots.textContent = '···';

          var link = document.createElement('a');
          link.className = 'btn btn-ghost home-showcase__all-link';
          link.href = 'projects/index.html';
          link.setAttribute('aria-label', 'Apri l’elenco degli altri progetti');
          link.appendChild(document.createTextNode('Altri progetti'));
          var arr = document.createElement('span');
          arr.className = 'home-showcase__more-arrow';
          arr.setAttribute('aria-hidden', 'true');
          arr.textContent = ' →';
          link.appendChild(arr);

          more.appendChild(dots);
          more.appendChild(link);
          container.insertAdjacentElement('afterend', more);
        }

        if (window.ScrollReveal) window.ScrollReveal.refresh();
      })
      .catch(function () {
        container.innerHTML = '<p class="lead">Impossibile caricare i progetti. Ricarica la pagina.</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
