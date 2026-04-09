/**
 * Portfolio home: Lenis + GSAP ScrollTrigger (ottimizzato GPU: yPercent, scrub 1–2, batch toArray).
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;

  /** Scrub numerico GSAP = secondi di smussamento (1–2 = movimento più fluido, meno scattoso). */
  var SCRUB = 1.65;

  function initCursor() {
    if (reduced || coarse) return;
    var ring = document.querySelector('.cine-cursor__ring');
    var dot = document.querySelector('.cine-cursor__dot');
    if (!ring || !dot) return;

    var mx = 0;
    var my = 0;
    var rx = 0;
    var ry = 0;
    var dx = 0;
    var dy = 0;
    var lerp = 0.18;
    var lerpDot = 0.35;

    window.addEventListener(
      'mousemove',
      function (e) {
        mx = e.clientX;
        my = e.clientY;
      },
      { passive: true }
    );

    function tick() {
      rx += (mx - rx) * lerp;
      ry += (my - ry) * lerp;
      dx += (mx - dx) * lerpDot;
      dy += (my - dy) * lerpDot;
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      dot.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    var hoverEls = document.querySelectorAll(
      '[data-cursor-hover], a, button, .cine-project-card, .btn'
    );
    hoverEls.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        ring.classList.add('is-hover');
      });
      el.addEventListener('mouseleave', function () {
        ring.classList.remove('is-hover');
      });
    });

    document.addEventListener(
      'cinematic:projects-ready',
      function () {
        document.querySelectorAll('.cine-project-card a, .cine-project-card').forEach(function (el) {
          el.addEventListener('mouseenter', function () {
            ring.classList.add('is-hover');
          });
          el.addEventListener('mouseleave', function () {
            ring.classList.remove('is-hover');
          });
        });
      },
      { once: true }
    );
  }

  function initLenis() {
    if (reduced || coarse || typeof window.Lenis === 'undefined') return null;
    var LenisCtor = window.Lenis;
    var lenis;
    try {
      lenis = new LenisCtor({
        duration: 0.55,
        easing: function (t) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        },
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 1.8,
        syncTouch: false,
      });
    } catch (e) {
      return null;
    }
    lenis.on('scroll', function () {
      if (window.ScrollTrigger) ScrollTrigger.update();
    });
    if (window.gsap) {
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
    return lenis;
  }

  function splitHeroLetters() {
    var h1 = document.querySelector('.cine-hero__name');
    if (!h1) return;
    var text = h1.textContent || '';
    h1.textContent = '';
    var i;
    var span;
    for (i = 0; i < text.length; i++) {
      span = document.createElement('span');
      span.className = 'cine-hero__letter';
      if (text[i] === ' ') {
        span.classList.add('cine-hero__letter--space');
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = text[i];
      }
      h1.appendChild(span);
    }
  }

  function initHeroMotion() {
    if (!window.gsap) return;
    if (reduced) return;

    splitHeroLetters();
    var letters = document.querySelectorAll('.cine-hero__letter');
    if (!letters.length) return;

    gsap.set(letters, { opacity: 0, yPercent: 110, rotateX: -55, transformOrigin: '50% 100%', force3D: true });

    var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to(letters, {
      opacity: 1,
      yPercent: 0,
      rotateX: 0,
      duration: 1.25,
      stagger: 0.038,
      delay: 0.15,
      force3D: true,
    });

    var eyebrow = document.querySelector('.cine-hero__eyebrow');
    var role = document.querySelector('.cine-hero__role');
    var focus = document.querySelector('.cine-hero__focus');
    var pills = document.querySelector('.cine-hero__pills');
    var cta = document.querySelector('.cine-hero__cta');
    var visual = document.querySelector('.cine-hero__visual');

    if (eyebrow) tl.from(eyebrow, { opacity: 0, yPercent: 100, duration: 0.7, force3D: true }, '-=0.45');
    if (role) tl.from(role, { opacity: 0, yPercent: 80, duration: 0.75, force3D: true }, '-=0.5');
    if (focus) tl.from(focus, { opacity: 0, yPercent: 60, duration: 0.65, force3D: true }, '-=0.45');
    if (pills) tl.from(pills, { opacity: 0, yPercent: 50, duration: 0.55, force3D: true }, '-=0.4');
    if (cta) tl.from(cta, { opacity: 0, yPercent: 40, duration: 0.5, force3D: true }, '-=0.35');
    if (visual)
      tl.from(visual, { opacity: 0, scale: 0.92, duration: 1, force3D: true }, '-=0.9');

    if (visual && !reduced) {
      gsap.to(visual, {
        yPercent: -8,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: '.cine-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: SCRUB,
        },
      });
    }
  }

  function initSectionFadeScale() {
    if (!window.gsap || !window.ScrollTrigger) return;
    var sections = gsap.utils.toArray('.cine-section');
    if (!sections.length) return;

    if (reduced) {
      gsap.set(sections, { opacity: 1, scale: 1 });
      return;
    }

    sections.forEach(function (sec) {
      gsap.fromTo(
        sec,
        {
          opacity: 0,
          scale: 0.92,
          transformOrigin: '50% 60%',
          force3D: true,
        },
        {
          opacity: 1,
          scale: 1,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sec,
            start: 'top 82%',
            end: 'top 45%',
            scrub: SCRUB,
          },
        }
      );
    });
  }

  /** Converte --cine-stack-scroll (es. 20vh) in px per allineare la corsia GSAP al CSS. */
  function stackScrollRunwayPx() {
    var h = window.innerHeight;
    var raw = getComputedStyle(document.documentElement).getPropertyValue('--cine-stack-scroll').trim();
    var n = parseFloat(raw);
    if (raw.indexOf('vh') !== -1 && !isNaN(n)) {
      return (n / 100) * h;
    }
    if (raw.indexOf('px') !== -1 && !isNaN(n)) {
      return n;
    }
    return 0.2 * h;
  }

  function initProjectStack() {
    if (!window.gsap || !window.ScrollTrigger) return;

    var cards = gsap.utils.toArray('.cine-project-card');
    var surfaces = gsap.utils.toArray('.cine-project-card__surface');
    if (!cards.length || !surfaces.length) return;

    cards.forEach(function (card, i) {
      card.style.setProperty('--z', String(100 + i * 10));
    });

    if (reduced) return;

    surfaces.forEach(function (surface) {
      var card = surface.closest('.cine-project-card');
      if (!card) return;

      gsap.fromTo(
        surface,
        {
          rotationX: 14,
          yPercent: 18,
          transformPerspective: 1400,
          transformOrigin: '50% 100%',
          force3D: true,
        },
        {
          rotationX: 0,
          yPercent: 0,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: 'top 96%',
            /**
             * Stessa distanza di scroll della corsia CSS (--cine-stack-scroll, uguale a last-pad).
             * '+=N' = N px di scroll dopo lo start → scrub allineato al padding sticky.
             */
            end: function () {
              return '+=' + stackScrollRunwayPx();
            },
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }

  /**
   * Rimuove solo il vuoto *oltre* la chiusura naturale stack + footer.
   * Non riduce l’altezza necessaria alle card (padding incluso): si agisce sul margine della sezione.
   */
  function trimProjectsStackTail() {
    var proj = document.getElementById('progetti');
    var stack = document.querySelector('.cine-projects__stack');
    var footer = document.getElementById('site-footer');
    if (!proj || !stack || !footer) return;
    var cards = stack.querySelectorAll('.cine-project-card');
    if (!cards.length) return;

    function apply() {
      var last = cards[cards.length - 1];
      var lastBottom = last.getBoundingClientRect().bottom + window.pageYOffset;
      var footerTop = footer.getBoundingClientRect().top + window.pageYOffset;
      var gap = footerTop - lastBottom;
      /** Respiro minimo sotto l’ultima card prima del bordo footer (non “mangiare” la corsia di scroll). */
      var minFooterGap = 14;
      if (gap <= minFooterGap + 2) {
        proj.style.marginBottom = '';
      } else {
        var pull = gap - minFooterGap;
        /** Evita tagli eccessivi se il layout non è ancora stabile. */
        var safeCap = window.innerHeight * 0.85;
        proj.style.marginBottom = -Math.round(Math.min(pull, safeCap)) + 'px';
      }
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(apply);
    });
  }

  var projectsInited = false;
  function onProjectsReady() {
    if (projectsInited) return;
    projectsInited = true;
    initProjectStack();
    trimProjectsStackTail();
    setTimeout(function () {
      trimProjectsStackTail();
    }, 150);
  }

  var projectDetailListenerAttached = false;

  /** Pagina singolo progetto: stessi scrub/lenis, animazioni su blocchi dopo inject. */
  function initProjectDetailPage() {
    if (projectDetailListenerAttached) return;
    projectDetailListenerAttached = true;

    var detailAnimRan = false;

    function runAnimations() {
      if (detailAnimRan) return;
      detailAnimRan = true;
      if (!window.gsap || !window.ScrollTrigger) return;

      var missingWrap = document.getElementById('project-missing');
      var missingSec = document.querySelector('.cine-project-detail--missing');
      if (missingWrap && !missingWrap.hidden && missingSec) {
        if (reduced) {
          gsap.set(missingSec, { opacity: 1 });
        } else {
          gsap.fromTo(
            missingSec,
            { opacity: 0, yPercent: 18, force3D: true },
            { opacity: 1, yPercent: 0, duration: 0.85, ease: 'power3.out', force3D: true }
          );
        }
        ScrollTrigger.refresh();
        return;
      }

      if (reduced) {
        gsap.set(
          [
            '.cine-breadcrumb',
            '.cine-project-detail__hero',
            '.cine-project-detail__title-block',
            '.cine-project-detail__banner',
            '.cine-project-detail__body-wrap',
            '.cine-project-detail__back',
          ],
          { opacity: 1, scale: 1, yPercent: 0 }
        );
        ScrollTrigger.refresh();
        return;
      }

      var breadcrumb = document.querySelector('.cine-breadcrumb');
      if (breadcrumb) {
        gsap.fromTo(
          breadcrumb,
          { opacity: 0, yPercent: 14, force3D: true },
          {
            opacity: 1,
            yPercent: 0,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: breadcrumb,
              start: 'top 92%',
              end: 'top 70%',
              scrub: SCRUB,
            },
          }
        );
      }

      var heroEl = document.getElementById('project-hero-wrap');
      if (heroEl && !heroEl.hidden) {
        gsap.fromTo(
          heroEl,
          { opacity: 0, scale: 0.96, force3D: true },
          {
            opacity: 1,
            scale: 1,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: heroEl,
              start: 'top 88%',
              end: 'top 50%',
              scrub: SCRUB,
            },
          }
        );
        var img = heroEl.querySelector('img');
        if (img) {
          gsap.to(img, {
            yPercent: -6,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: heroEl,
              scrub: SCRUB,
              start: 'top bottom',
              end: 'bottom top',
            },
          });
        }
      }

      var titleBlock = document.querySelector('.cine-project-detail__title-block');
      if (titleBlock) {
        gsap.fromTo(
          titleBlock,
          { opacity: 0, yPercent: 12, scale: 0.98, force3D: true },
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: titleBlock,
              start: 'top 90%',
              end: 'top 55%',
              scrub: SCRUB,
            },
          }
        );
      }

      var banner = document.getElementById('project-banner');
      if (banner && !banner.hidden) {
        gsap.fromTo(
          banner,
          { opacity: 0, yPercent: 10, force3D: true },
          {
            opacity: 1,
            yPercent: 0,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: banner,
              start: 'top 88%',
              end: 'top 55%',
              scrub: SCRUB,
            },
          }
        );
      }

      var bodyWrap = document.querySelector('.cine-project-detail__body-wrap');
      if (bodyWrap) {
        gsap.fromTo(
          bodyWrap,
          { opacity: 0, yPercent: 8, scale: 0.99, force3D: true },
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: bodyWrap,
              start: 'top 88%',
              end: 'top 48%',
              scrub: SCRUB,
            },
          }
        );
      }

      var back = document.querySelector('.cine-project-detail__back');
      if (back) {
        gsap.fromTo(
          back,
          { opacity: 0, yPercent: 18, force3D: true },
          {
            opacity: 1,
            yPercent: 0,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: back,
              start: 'top 95%',
              end: 'top 72%',
              scrub: SCRUB,
            },
          }
        );
      }

      ScrollTrigger.refresh();
    }

    document.addEventListener(
      'project-detail:ready',
      function () {
        requestAnimationFrame(runAnimations);
      },
      { once: true }
    );
  }

  /** Registra subito il listener su pagina progetto, prima di project-detail.js (evita race). */
  if (document.body && document.body.getAttribute('data-cinematic') === 'project') {
    initProjectDetailPage();
  }

  function boot() {
    document.documentElement.classList.add('cinematic-scroll');

    var header = document.getElementById('site-header');
    if (header) header.classList.add('page-cinematic-header');

    initCursor();

    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    initLenis();

    var mode = document.body.getAttribute('data-cinematic') || 'home';
    if (mode === 'project') {
      initProjectDetailPage();
    } else {
      initHeroMotion();
      initSectionFadeScale();
      document.addEventListener('cinematic:projects-ready', onProjectsReady);
      var root = document.getElementById('featured-projects-root');
      if (root && root.children.length) {
        onProjectsReady();
      }

      var trimResizeT;
      function onTrimResize() {
        clearTimeout(trimResizeT);
        trimResizeT = setTimeout(trimProjectsStackTail, 100);
      }
      window.addEventListener('resize', onTrimResize, { passive: true });
      window.addEventListener('load', function () {
        trimProjectsStackTail();
      });
    }

    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
