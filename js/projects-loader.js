/** Accesso ai progetti: oggetto globale da projects-data.js, cache in RAM dopo la prima lettura. */
(function () {
  'use strict';

  var cache = null;

  function load() {
    if (cache) return Promise.resolve(cache);
    if (!window.PORTFOLIO_PROJECTS || typeof window.PORTFOLIO_PROJECTS !== 'object') {
      return Promise.reject(new Error('PORTFOLIO_PROJECTS non definito'));
    }
    cache = window.PORTFOLIO_PROJECTS;
    return Promise.resolve(cache);
  }

  function getProjects() {
    return load().then(function (d) {
      return Array.isArray(d.projects) ? d.projects : [];
    });
  }

  function getById(id) {
    if (!id) return Promise.resolve(null);
    return getProjects().then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) return list[i];
      }
      return null;
    });
  }

  window.PortfolioProjects = {
    load: load,
    getProjects: getProjects,
    getById: getById,
    clearCache: function () {
      cache = null;
    },
  };
})();
