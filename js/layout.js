/** Header condiviso: iniettato dopo il parse del DOM. */
(function () {
  'use strict';

  var LINKEDIN = 'https://www.linkedin.com/in/roberto-di-lena/';

  var LINKEDIN_ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';

  /** Link relativi: in /projects/ serve prefisso ../ */
  function basePrefix() {
    var path = window.location.pathname || '/';
    if (/\/projects(\/|$)/.test(path)) return '../';
    return '';
  }

  /** Link alla home risolto rispetto alla pagina corrente (affidabile anche con sottocartelle / GitHub Pages). */
  function homeHref(prefix) {
    var rel = prefix + 'index.html';
    try {
      return new URL(rel, window.location.href).href;
    } catch (e) {
      return rel;
    }
  }

  function navHTML(prefix) {
    var home = homeHref(prefix);
    var linkedinHref = LINKEDIN;
    return (
      '<div class="nav-inner">' +
      '<a class="logo logo--brand" id="site-logo" href="' +
      home +
      '" aria-label="Vai alla home">' +
      '<span class="logo__mark">RDL</span></a>' +
      '<div class="nav-end">' +
      '<nav class="nav-links" aria-label="Principale">' +
      '<a data-nav="home" href="' +
      home +
      '">Home</a>' +
      '</nav>' +
      '<a class="nav-linkedin" href="' +
      linkedinHref +
      '" rel="noopener noreferrer" target="_blank" aria-label="Profilo LinkedIn">' +
      LINKEDIN_ICON +
      '</a>' +
      '</div>' +
      '</div>'
    );
  }

  function setActiveNav() {
    var path = window.location.pathname || '';
    var key = 'home';
    if (/index\.html$/.test(path) || /\/$/.test(path) || path === '' || /\/projects(\/.*)?$/.test(path)) {
      key = 'home';
    }
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === key) a.classList.add('is-active');
      else a.classList.remove('is-active');
    });
  }

  window.PortfolioLayout = {
    inject: function () {
      var prefix = basePrefix();
      var header = document.getElementById('site-header');
      if (header) header.innerHTML = navHTML(prefix);
      setActiveNav();
    },
  };
})();
