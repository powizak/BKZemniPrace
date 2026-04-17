# Poznámky pro vývojáře

## Naming conventions

```
Stránky:        index.html, index.html (SPA s sekcemi)
Složky:         lowercase, pomlčky: src/images, src/styles
CSS soubory:    style.css, components.css (případně)
JS soubory:     main.js, form.js
Obrázky:        minibagr-easy-e10-pro.jpg
                dumper-rypex-dp8r.jpg
                hero-banner.jpg
                kontakt-背景.jpg
Favicon:        favicon.svg
```

## Proměnné CSS (doporučené)

```css
:root {
  --color-primary: #F2B513;
  --color-primary-dark: #D9A012;
  --color-dark: #1a1a1a;
  --color-light: #f5f5f5;
  --color-white: #ffffff;
  --color-text: #1a1a1a;
  --color-text-muted: #555555;
  --color-border: #e0e0e0;

  --font-heading: 'Oswald', sans-serif;
  --font-body: 'Open Sans', sans-serif;

  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;

  --radius: 8px;
  --shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

## Sémantická struktura HTML

```html
<body>
  <header>           <!-- fixní navigace -->
  <main>
    <section id="hero">
    <section id="sluzby">
    <section id="technika">
    <section id="cenik">
    <section id="proc-my">
    <section id="kontakt">
  </main>
  <footer>
</body>
```

## Navigace — anchor links

```
#hero        → Hero sekce
#sluzby      → Služby
#technika    → Technika (minibagr + dumper)
#cenik       → Ceník
#kontakt     → Kontaktní formulář
```

## Checklist před spuštěním

- [ ] Nahradit placeholder telefonní číslo (+420 xxx xxx xxx → skutečné)
- [ ] Nahradit placeholder obrázky skutečnými fotografiemi od klienta
- [ ] Zkontrolovat všechny externí odkazy
- [ ] Otestovat formulář
- [ ] Zvalidovat JSON-LD přes https://search.google.com/test/rich-results
- [ ] Změřit rychlost přes PageSpeed Insights
- [ ] Otestovat na mobilu (Chrome DevTools → device toolbar)
- [ ] Nastavit Google Business Profile a přidat odkaz do footeru
- [ ] Vytvořit Google Analytics / Search Console účet
