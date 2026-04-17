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
    ensureAnalyticsLoaded();
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
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

})();
