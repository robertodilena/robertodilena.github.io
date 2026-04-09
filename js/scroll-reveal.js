/** IO + classi .reveal-on-scroll / data-reveal-immediate; prefers-reduced-motion gestito in CSS/JS. */
(function () {
  'use strict';

  var io;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reveal(el) {
    el.classList.add('is-revealed');
  }

  function bindObserver(el) {
    if (el.hasAttribute('data-reveal-bound')) return;
    el.setAttribute('data-reveal-bound', '1');
    if (reduced) {
      reveal(el);
      return;
    }
    if (!io) {
      io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            reveal(entry.target);
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
      );
    }
    io.observe(el);
  }

  function bindImmediate(el) {
    if (el.hasAttribute('data-reveal-bound')) return;
    el.setAttribute('data-reveal-bound', '1');
    if (reduced) {
      reveal(el);
      return;
    }
    var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
    window.setTimeout(function () {
      reveal(el);
    }, delay);
  }

  function refresh() {
    document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
      if (el.hasAttribute('data-reveal-immediate')) {
        bindImmediate(el);
      } else {
        bindObserver(el);
      }
    });
  }

  window.ScrollReveal = {
    refresh: refresh,
    init: function () {
      try {
        refresh();
      } catch (e) {
        document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
          el.classList.add('is-revealed');
        });
      }
    },
  };
})();
