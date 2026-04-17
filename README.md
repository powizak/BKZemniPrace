# Bez Komprese Technika

Webová prezentace firmy **Bez Komprese Technika** — zemní práce a půjčovna minibagru v regionu Klatovy.

**[bezkompresetechnika.cz](https://bezkompresetechnika.cz)**

---

## O projektu

Jednoduchý, rychlý a moderní one-page web pro lokální firmu nabízející:
- Zemní práce (výkopy, terénní úpravy, základy, přípojky)
- Půjčovnu minibagru CAT 301.5 s příslušenstvím

Web je optimalizovaný na maximální výkon, přístupnost a SEO/GEO viditelnost v regionu Klatovy.

## Tech stack

| Vrstva | Technologie |
|--------|------------|
| HTML | Sémantický HTML5, BEM pojmenování |
| CSS | Vanilla CSS, custom properties, system fonts |
| JS | Vanilla JavaScript (ES6+), žádný framework |
| Ikony | Inline SVG sprite (`src/icons.svg`) |
| Cookies | [CookieConsent v3](https://cookieconsent.orestbida.com/) (CDN) |
| Analytika | Google Analytics 4 (načítáno po cookie souhlasu) |
| Obrázky | WebP + JPEG fallback, responsive `<picture>` |

### Co nepoužíváme (záměrně)

- Žádné CSS frameworky (Bootstrap, Tailwind…)
- Žádné JS frameworky (React, Vue…)
- Žádné Google Fonts (system font stack)
- Žádné build nástroje / npm / bundlery
- Žádné Google Maps
- Žádný kontaktní formulář — přímé kontaktní odkazy (tel, email, WhatsApp)

## Struktura projektu

```
BKZemniPrace/
├── src/
│   ├── index.html            # Hlavní HTML stránka
│   ├── favicon.svg           # Favicon
│   ├── icons.svg             # SVG sprite s ikonami
│   ├── styles/
│   │   └── style.css         # Kompletní styly
│   ├── scripts/
│   │   └── main.js           # Cookie consent, GA4, navigace, animace
│   └── images/               # Obrázky (JPG + WebP, responsive varianty)
│       ├── minibagr-cat-*.{jpg,webp}
│       ├── zemni-prace-*.{jpg,webp}
│       └── ...
├── docs/
│   ├── SPEC.md               # Specifikace projektu
│   ├── TODO-vyvojari.md      # Vývojářské poznámky
│   └── faq-content.md        # Obsah FAQ sekce
├── sitemap.xml               # XML sitemap
├── robots.txt                # Robots.txt
└── README.md
```

## Funkce

### SEO & strukturovaná data
- `LocalBusiness` JSON-LD schema (oblast: Klatovy, adresa: Plánice)
- `FAQPage` JSON-LD schema (10 otázek a odpovědí)
- Kompletní Open Graph a Twitter Card meta tagy
- XML sitemap + robots.txt
- Sémantické HTML5 s korektní strukturou nadpisů

### Přístupnost
- Lighthouse Accessibility: **100/100**
- ARIA atributy, skip-to-content, správné alt texty
- Klávesová navigace, fokus management

### Výkon
- Žádné externí fonty — system font stack
- WebP obrázky s JPEG fallbackem
- Responsive obrázky přes `<picture>` + `srcset`
- Inline SVG ikony (žádné icon fonty)
- GA4 načítáno dynamicky až po cookie souhlasu

### Soukromí
- CookieConsent v3 (Google Consent Mode v2)
- GA4 se spouští až po explicitním souhlasu uživatele
- Žádné třetí strany před udělením souhlasu

## Nasazení

Web je statický (HTML/CSS/JS) — stačí nahrát obsah složky `src/` + `sitemap.xml` + `robots.txt` na jakýkoliv hosting s podporou statických souborů nebo PHP.

```bash
# Příklad: kopie na server přes rsync
rsync -avz src/ sitemap.xml robots.txt user@server:/var/www/bezkompresetechnika.cz/
```

### Požadavky na hosting
- Podpora HTML/CSS/JS (PHP volitelně)
- HTTPS (doporučeno pro SEO a cookie consent)

## Lighthouse skóre

| Metrika | Skóre |
|---------|-------|
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| Performance | ~81* |

*\* Performance skóre závisí na hostingovém prostředí (gzip, HTTP/2, CDN).*

## Kontakt

| | |
|---|---|
| Firma | Bez Komprese Technika |
| Majitel | Robin Valeš |
| IČ | 08850771 |
| DIČ | CZ9405122034 |
| Adresa | Pohoří 1, Plánice 340 34 |
| Telefon | [+420 731 466 375](tel:+420731466375) |
| Email | [info@bezkompresetechnika.cz](mailto:info@bezkompresetechnika.cz) |
| WhatsApp | [Napsat zprávu](https://wa.me/420731466375) |
| Web | [bezkompresetechnika.cz](https://bezkompresetechnika.cz) |

## Licence

&copy; 2026 Bez Komprese Technika. Všechna práva vyhrazena.
