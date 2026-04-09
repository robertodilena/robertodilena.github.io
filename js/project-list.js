/** Pagina projects/index.html: elenco completo ordinato. */
(function () {
  'use strict';

  function tagEl(text) {
    var s = document.createElement('span');
    s.className = 'tag';
    s.textContent = text;
    return s;
  }

  function render(list, container) {
    container.innerHTML = '';
    list.forEach(function (p, index) {
      var article = document.createElement('article');
      article.className = 'project-row reveal-on-scroll';
      article.style.setProperty('--reveal-delay', index * 65 + 'ms');

      var icon = document.createElement('div');
      icon.className = 'project-row-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = p.icon || '📁';

      var body = document.createElement('div');
      var h2 = document.createElement('h2');
      h2.textContent = p.title || 'Senza titolo';
      body.appendChild(h2);
      var para = document.createElement('p');
      para.textContent = p.summary || '';
      body.appendChild(para);

      var tags = document.createElement('div');
      tags.className = 'tags';
      (p.tags || []).forEach(function (t) {
        tags.appendChild(tagEl(t));
      });
      body.appendChild(tags);

      var link = document.createElement('a');
      link.className = 'btn btn-primary';
      link.href = 'project.html?id=' + encodeURIComponent(p.id);
      link.textContent = 'Apri scheda';

      article.appendChild(icon);
      article.appendChild(body);
      article.appendChild(link);
      container.appendChild(article);
    });
  }

  function init() {
    var container = document.getElementById('project-list-root');
    if (!container) return;

    PortfolioProjects.getProjects()
      .then(function (list) {
        list = list.slice().sort(function (a, b) {
          var oa = typeof a.featuredOrder === 'number' ? a.featuredOrder : 999;
          var ob = typeof b.featuredOrder === 'number' ? b.featuredOrder : 999;
          return oa - ob;
        });
        render(list, container);
        if (window.ScrollReveal) window.ScrollReveal.refresh();
      })
      .catch(function () {
        container.innerHTML = '<p class="lead">Impossibile caricare l’elenco. Ricarica la pagina.</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
