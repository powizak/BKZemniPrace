/**
 * BKZemniPrace — Main JavaScript
 * Bez Komprese Technika
 * Minimal vanilla JS: hamburger menu, header scroll, nav highlight, smooth scroll
 */

(function() {
  'use strict';

  var analyticsId = 'G-73ZDG80TKM';
  var analyticsScriptLoaded = false;
  var cookieConsentScriptLoaded = false;

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  window.gtag = window.gtag || gtag;

  function loadScript(src, options, callback) {
    if (document.querySelector('script[src="' + src + '"]')) {
      if (callback) callback();
      return;
    }

    var script = document.createElement('script');
    script.src = src;
    script.async = !!(options && options.async);
    script.defer = !!(options && options.defer);

    if (options && options.dataAttributes) {
      Object.keys(options.dataAttributes).forEach(function(key) {
        script.setAttribute(key, options.dataAttributes[key]);
      });
    }

    script.onload = function() {
      if (callback) callback();
    };

    document.head.appendChild(script);
  }

  function applyDeniedConsent() {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  function ensureAnalyticsLoaded() {
    if (analyticsScriptLoaded) {
      return;
    }

    analyticsScriptLoaded = true;
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + analyticsId, {
      async: true,
      dataAttributes: {
        'data-cookiecategory': 'analytics'
      }
    }, function() {
      window.gtag('js', new Date());
      window.gtag('config', analyticsId);
    });
  }

  function grantConsent() {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    ensureAnalyticsLoaded();
  }

  function applyConsentState() {
    if (window.CookieConsent && window.CookieConsent.acceptedCategory('analytics')) {
      grantConsent();
      return;
    }

    applyDeniedConsent();
  }

  function initCookieConsent() {
    if (!window.CookieConsent) {
      return;
    }

    window.CookieConsent.run({
      page_scripts: true,
      categories: {
        necessary: {
          enabled: true,
          readOnly: true
        },
        analytics: {}
      },
      language: {
        default: 'cs',
        translations: {
          cs: {
            consentModal: {
              title: 'Souhlas s cookies',
              description: 'Používáme nezbytné cookies pro chod webu a analytické cookies pro měření návštěvnosti.',
              acceptAllBtn: 'Povolit vše',
              acceptNecessaryBtn: 'Pouze nezbytné',
              showPreferencesBtn: 'Nastavení'
            },
            preferencesModal: {
              title: 'Nastavení cookies',
              acceptAllBtn: 'Povolit vše',
              acceptNecessaryBtn: 'Pouze nezbytné',
              savePreferencesBtn: 'Uložit nastavení',
              closeIconLabel: 'Zavřít',
              sections: [
                {
                  title: 'Použití cookies',
                  description: 'Nezbytné cookies drží web v chodu. Analytické cookies pomáhají vyhodnocovat návštěvnost a výkon webu.'
                },
                {
                  title: 'Nezbytné cookies',
                  description: 'Tyto cookies jsou vždy aktivní a zajišťují základní funkce webu.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Analytické cookies',
                  description: 'Slouží k anonymnímu měření návštěvnosti a vyhodnocení výkonu jednotlivých sekcí.',
                  linkedCategory: 'analytics'
                }
              ]
            }
          }
        }
      },
      onFirstAccept: applyConsentState,
      onAccept: applyConsentState,
      onReject: applyDeniedConsent,
      onFirstConsent: applyConsentState,
      onConsent: applyConsentState,
      onChange: applyConsentState
    });
  }

  function ensureCookieConsentLoaded() {
    if (cookieConsentScriptLoaded) {
      initCookieConsent();
      return;
    }

    cookieConsentScriptLoaded = true;
    loadScript('https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js', {
      defer: true
    }, initCookieConsent);
  }

  function delayedCookieConsentInit() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(ensureCookieConsentLoaded, { timeout: 3000 });
      return;
    }

    window.setTimeout(ensureCookieConsentLoaded, 2000);
  }

  applyDeniedConsent();

  // ===== Hamburger Menu Toggle =====
  var navToggle = document.getElementById('nav-toggle');
  var navList = document.getElementById('nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      navToggle.setAttribute('aria-expanded',
        navList.classList.contains('active') ? 'true' : 'false'
      );
    });

    // Close menu when clicking a nav link
    navList.querySelectorAll('.nav__link').forEach(function(link) {
      link.addEventListener('click', function() {
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== Header Scroll Effect =====
  var header = document.getElementById('header');

  function handleHeaderScroll() {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Run on load

  // ===== Active Navigation Highlight using IntersectionObserver =====
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    var observerOptions = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    var currentSection = null;

    var navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          currentSection = entry.target.getAttribute('id');
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function(section) {
      navObserver.observe(section);
    });
  }

  if (document.readyState === 'complete') {
    delayedCookieConsentInit();
  } else {
    window.addEventListener('load', delayedCookieConsentInit, { once: true });
  }

  // ===== Lightbox Gallery =====
  // Each entry: { slug, alt } — slug is filename without size suffix/extension.
  // Image variants are auto-generated from slug: <slug>-480.{webp,jpg}, <slug>-768.{webp,jpg}, <slug>.{webp,jpg}
  var GALLERIES = {
    minibagr: [
      { slug: 'minibagr-easy-e10-pro', alt: 'Minibagr Easy E10 Pro – pohled zepředu' },
      { slug: 'minibagr-pohled-na-lzici', alt: 'Detail lžíce minibagru pro přesné výkopy' },
      { slug: 'minibagr-pohled-na-rameno', alt: 'Detail ramene minibagru Easy E10 Pro při práci v omezeném prostoru' },
      { slug: 'minibagr-na-odtahovce', alt: 'Minibagr naložený na odtahovce – připravený k dopravě' }
    ],
    dumper: [
      { slug: 'dumper-rypex-dp8r', alt: 'Minidumper Rypex DP8R pro odvoz zeminy a materiálu' }
    ],
    set: [
      { slug: 'minibagr-a-dumper-spolecne', alt: 'Minibagr a dumper společně jako výhodný set' }
    ],
    iveco: [
      { slug: 'iveco-daily-iveta-predek', alt: 'Iveco Daily 35S12 (Iveta) – pohled zepředu' },
      { slug: 'iveco-daily-iveta-zadek', alt: 'Iveco Daily 35S12 – pohled zezadu' },
      { slug: 'iveco-daily-iveta-lozna-plocha', alt: 'Iveco Daily – ložná plocha 16 m³' },
      { slug: 'iveco-daily-iveta-interier', alt: 'Iveco Daily – interiér kabiny' },
      { slug: 'iveco-daily-iveta-polepy', alt: 'Iveco Daily s polepy Bez Komprese Technika' },
      { slug: 'iveco-daily-iveta-oddalena', alt: 'Iveco Daily – celkový pohled' },
      { slug: 'iveta-a-helga-zepredu', alt: 'Iveco Daily a Citroën Jumper společně zepředu' },
      { slug: 'iveta-a-helga-zezadu', alt: 'Iveco Daily a naložená odtahovka Citroën Jumper zezadu' }
    ],
    helga: [
      { slug: 'odtahovka-citroen-helga-nalozena', alt: 'Citroën Jumper – odtahovka s naloženým vozidlem' },
      { slug: 'odtahovka-citroen-helga-zezadu', alt: 'Citroën Jumper – pohled zezadu' },
      { slug: 'odtahovka-citroen-helga-zadek', alt: 'Citroën Jumper s naloženým vozidlem – pohled na zadek' },
      { slug: 'odtahovka-citroen-helga-mercedes', alt: 'Odtahovka Citroën Jumper s naloženým Mercedesem' },
      { slug: 'odtahovka-citroen-helga-rapid', alt: 'Odtahovka Citroën Jumper s naloženou Škodou Rapid' },
      { slug: 'odtahovka-citroen-helga-trabant', alt: 'Odtahovka Citroën Jumper s naloženým Trabantem' },
      { slug: 'odtahovka-citroen-helga-vilik', alt: 'Odtahovka Citroën Jumper s naloženým vozidlem zepředu' },
      { slug: 'iveta-a-helga-zezadu', alt: 'Iveco Daily a naložená odtahovka Citroën Jumper zezadu' }
    ]
  };

  var lightbox = document.getElementById('lightbox');

  if (lightbox) {
    var lbImage = lightbox.querySelector('.lightbox__image');
    var lbSource = lightbox.querySelector('.lightbox__source');
    var lbCaption = lightbox.querySelector('.lightbox__caption');
    var lbCounter = lightbox.querySelector('.lightbox__counter');
    var lbClose = lightbox.querySelector('.lightbox__close');
    var lbPrev = lightbox.querySelector('.lightbox__nav--prev');
    var lbNext = lightbox.querySelector('.lightbox__nav--next');

    var currentItems = [];
    var currentIndex = 0;
    var lastFocused = null;
    var touchStartX = 0;
    var touchStartY = 0;

    function buildSrcset(slug, ext) {
      return 'images/' + slug + '-480.' + ext + ' 480w, ' +
             'images/' + slug + '-768.' + ext + ' 768w, ' +
             'images/' + slug + '.' + ext + ' 1536w';
    }

    function renderItem(index) {
      var item = currentItems[index];
      if (!item) return;
      lbSource.setAttribute('srcset', buildSrcset(item.slug, 'webp'));
      lbImage.setAttribute('srcset', buildSrcset(item.slug, 'jpg'));
      lbImage.setAttribute('src', 'images/' + item.slug + '.jpg');
      lbImage.setAttribute('alt', item.alt || '');
      lbImage.setAttribute('sizes', '100vw');
      lbCaption.textContent = item.alt || '';
      if (currentItems.length > 1) {
        lbCounter.textContent = (index + 1) + ' / ' + currentItems.length;
        lbPrev.hidden = false;
        lbNext.hidden = false;
      } else {
        lbCounter.textContent = '';
        lbPrev.hidden = true;
        lbNext.hidden = true;
      }
    }

    function openLightbox(galleryId, startIndex) {
      var items = GALLERIES[galleryId];
      if (!items || !items.length) return;
      currentItems = items;
      currentIndex = startIndex || 0;
      lastFocused = document.activeElement;
      lightbox.hidden = false;
      // Force reflow so transition fires
      void lightbox.offsetWidth;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      renderItem(currentIndex);
      // Focus close button for keyboard users
      window.setTimeout(function() { lbClose.focus(); }, 0);
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      window.setTimeout(function() {
        lightbox.hidden = true;
        lbImage.removeAttribute('src');
        lbImage.removeAttribute('srcset');
        lbSource.removeAttribute('srcset');
        if (lastFocused && typeof lastFocused.focus === 'function') {
          lastFocused.focus();
        }
      }, 250);
    }

    function showRelative(delta) {
      if (currentItems.length < 2) return;
      currentIndex = (currentIndex + delta + currentItems.length) % currentItems.length;
      renderItem(currentIndex);
    }

    // Trigger buttons
    document.querySelectorAll('.tech-card__media-trigger[data-gallery]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        openLightbox(btn.getAttribute('data-gallery'), 0);
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', function() { showRelative(-1); });
    lbNext.addEventListener('click', function() { showRelative(1); });

    // Click on backdrop closes
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard
    document.addEventListener('keydown', function(e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); showRelative(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); showRelative(1); }
    });

    // Touch swipe
    lightbox.addEventListener('touchstart', function(e) {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
      if (!touchStartX) return;
      var t = e.changedTouches[0];
      var dx = t.clientX - touchStartX;
      var dy = t.clientY - touchStartY;
      touchStartX = 0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        showRelative(dx < 0 ? 1 : -1);
      }
    });
  }

})();
