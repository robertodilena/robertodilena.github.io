/** Scheda progetto: parametro ?id= e dati da projects-data.js tramite il loader. */
(function () {
  'use strict';

  function notifyReady(detail) {
    document.dispatchEvent(
      new CustomEvent('project-detail:ready', {
        bubbles: true,
        detail: detail || {},
      })
    );
  }

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

  function splitBodyLabel(paragraph) {
    var text = typeof paragraph === 'string' ? paragraph : '';
    var i;
    var lab;
    var prefix;
    for (i = 0; i < BODY_LABELS.length; i++) {
      lab = BODY_LABELS[i];
      prefix = lab + ':';
      if (text.indexOf(prefix) === 0) {
        return {
          label: lab,
          text: text.slice(prefix.length).replace(/^\s*/, ''),
        };
      }
    }
    return {
      label: '',
      text: text,
    };
  }

  function appendDetailCard(container, title, text, modifier) {
    if (!container || !text) return;
    var article = document.createElement('article');
    article.className = 'cine-project-detail__card';
    if (modifier) article.className += ' ' + modifier;

    var h = document.createElement('h3');
    h.className = 'cine-project-detail__card-title';
    h.textContent = title;
    article.appendChild(h);

    var p = document.createElement('p');
    p.className = 'cine-project-detail__card-copy';
    p.textContent = text;
    article.appendChild(p);

    container.appendChild(article);
  }

  function appendUnifiedStoryCard(container, solution, challenge, result) {
    if (!container) return;
    var article = document.createElement('article');
    article.className = 'cine-project-detail__card cine-project-detail__card--story';

    function addBlock(title, text) {
      if (!text) return;
      var block = document.createElement('section');
      block.className = 'cine-project-detail__story-block';

      var h = document.createElement('h3');
      h.className = 'cine-project-detail__card-title';
      h.textContent = title;
      block.appendChild(h);

      var p = document.createElement('p');
      p.className = 'cine-project-detail__card-copy';
      p.textContent = text;
      block.appendChild(p);
      article.appendChild(block);
    }

    addBlock('Soluzione', solution);
    addBlock('Sfida Tecnica', challenge);
    addBlock('Risultato', result);
    container.appendChild(article);
  }

  function extractSections(project) {
    var sections = {};
    var intro = [];
    var paragraphs = project && Array.isArray(project.body) ? project.body : [];
    (paragraphs || []).forEach(function (paragraph) {
      var parsed = splitBodyLabel(paragraph);
      if (!parsed.text) return;
      if (!parsed.label) {
        intro.push(parsed.text);
        return;
      }
      sections[parsed.label] = parsed.text;
    });
    if (intro.length && !sections.Scenario) {
      sections.Scenario = intro.join(' ');
    }
    if (!sections.Focus && project.summary) {
      sections.Focus = project.summary;
    }
    return sections;
  }

  function renderBodyCards(container, project) {
    var sections = extractSections(project);
    var shortScenario = sections.Scenario || project.metaDescription || '';
    var shortFocus = sections.Focus || project.summary || '';
    var solution = sections.Soluzione || '';
    var challenge = sections['Sfida Tecnica'] || '';
    var result = sections.Risultato || '';

    appendDetailCard(container, 'Scenario', shortScenario, 'cine-project-detail__card--half');
    appendDetailCard(container, 'Focus', shortFocus, 'cine-project-detail__card--half');
    appendUnifiedStoryCard(container, solution, challenge, result);
  }

  function init() {
    var id = getQueryId();
    var root = document.getElementById('project-root');
    var missing = document.getElementById('project-missing');

    if (!id) {
      document.title = 'Progetto non trovato | Roberto Di Lena';
      if (root) root.hidden = true;
      if (missing) missing.hidden = false;
      notifyReady({ missing: true });
      return;
    }

    PortfolioProjects.getById(id)
      .then(function (p) {
        if (!p) {
          document.title = 'Progetto non trovato | Roberto Di Lena';
          if (root) root.hidden = true;
          if (missing) missing.hidden = false;
          notifyReady({ missing: true });
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
            heroImg.addEventListener(
              'load',
              function () {
                if (window.ScrollTrigger) window.ScrollTrigger.refresh();
              },
              { once: true }
            );
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
            s.className = 'cine-project-card__tag';
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
          renderBodyCards(bodyEl, p);
        }

        notifyReady({ missing: false, id: id });
      })
      .catch(function () {
        document.title = 'Progetto non trovato | Roberto Di Lena';
        if (root) root.hidden = true;
        if (missing) missing.hidden = false;
        notifyReady({ missing: true, error: true });
      });
  }

  function scheduleInit() {
    function run() {
      init();
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      setTimeout(run, 0);
    }
  }
  scheduleInit();
})();
