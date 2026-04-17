# SPEC.md — Bez Kompromis Technika (BKZemniPrace)

## 1. Základní informace

| Položka | Hodnota |
|---|---|
| **Název projektu** | Bez Kompromis Technika |
| **URL webu** | `www.bezkompresetechnika.cz` |
| **Typ** | Webové stránky firmy — jednoduchý informační web s kontaktním formulářem |
| **Jazyk** | Čeština (cs-CZ) |
| **Cílová skupina** | Majitelé rodinných domů, zahradníci, drobní stavebníci v regionu Klatovy a Plzeňský kraj |
| **Hlavní barva** | `#F2B513` (žlutá — „bezkomprese") |
| **Sekundární barvy** | Tmavá: `#1a1a1a`, světlá: `#f5f5f5`, šedá text: `#555555`, bíla: `#ffffff` |
| **Sídlo firmy / region** | Klatovy, Plzeňský kraj |
| **Kontaktní e-mail** | `info@bezkompresetechnika.cz` |
| **Kontaktní telefon** | `+420 731 466 375` |

---

## 2. Rozsah práce

### 2.1 Stránky / sekce webu

| Stránka / sekce | Popis |
|---|---|
| **Homepage** | Hero banner, krátký úvod, přehled služeb, výhody, CTA sekce, kontakt |
| **Služby** | Zemní práce — výčet činností |
| **Technika** | Minibagr Easy E10 Pro + Minidumper Rypex DP8R — popis, parametry, příslušenství |
| **Ceník** | Kompletní ceník půjčovny i prací s obsluhou |
| **Kontakt** | Kontaktní formulář + telefonní číslo + e-mail + region |

> **Poznámka:** Realizovat jako **Single Page Application (SPA)** s smooth-scroll navigací mezi sekcemi.

### 2.2 Fotografie

Klient dodá fotografie techniky. Do vývojové složky `src/images/` přidá programátor **placeholder obrázky** (vhodně pojmenované, např. `minibagr-e10-pro.jpg`, `dumper-dp8r.jpg`, `hero-banner.jpg`). Rozměry a počet upřesní klient.

---

## 3. Design & UX

### 3.1 Vizuální styl
- **Moderní, čistý, industriální** — strojní technika, stavebnictví
- **Responzivní** — mobilní telefon, tablet, desktop (breakpointy: 480px, 768px, 1024px, 1280px)
- **Přístupnost (a11y):** kontrastní poměr min. 4.5:1 pro text, alt texty u všech obrázků, sémantický HTML

### 3.2 Barevná paleta

```
Primární (žlutá):    #F2B513  ← hlavní barva akcentů, CTA tlačítek, hover efektů
Primární tmavá:      #D9A012  ← hover na žluté
Tmavá pozadí:        #1a1a1a  ← hero sekce, footer
Světlé pozadí:       #f5f5f5  ← sekce s variantním pozadím
Bílá:                #ffffff  ← hlavní pozadí stránky
Text primární:       #1a1a1a  ← nadpisy
Text sekundární:     #555555  ← běžný text, popisky
Text na tmavém:      #ffffff  ← text na tmavém pozadí
Okraj / dividers:    #e0e0e0
```

### 3.3 Typografie
- **Nadpisy:** system-font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`) nebo Google Font — rozhodnutí programátora
- **Velikost nadpisů:** H1: 48–56px desktop / 32px mobil; H2: 36px / 26px; H3: 24px / 20px
- **Text:** 16–18px, řádkování 1.6–1.8
- **Font pro sekce s "industriálním" vzhledem:** lze použít např. `Oswald` nebo `Bebas Neue` (Google Fonts)

### 3.4 Komponenty UI

| Komponenta | Specifikace |
|---|---|
| **Header / Navigace** | Fixní header s logem vlevo, navigační menu vpravo. Na mobilu hamburger menu. Scroll: změna pozadí po scroll 50px. |
| **Hero sekce** | Velký banner s fotografií techniky / pozadím, nadpis, podnadpis, CTA tlačítko „Kontaktujte nás". Výška: 100vh nebo min. 80vh. |
| **Sekce Služby** | Ikony + nadpis + krátký popis. 2–4 sloupce dle viewportu. |
| **Karta techniky** | Velký obrázek, nadpis, výčet výhod (ikony ✓), tabulka parametrů, seznam příslušenství. |
| **Ceník** | Přehledné tabulky / karty — barva řádku sudý/lichý. Zvýrazněný „set" a „doporučené" položky. |
| **Sekce Proč my** | Ikony + text, 2–3 sloupce. |
| **CTA sekce** | Tmavé pozadí, velký nadpis, tlačítko s telefonním číslem (klikatelelné `tel:`). |
| **Kontaktní formulář** | Jméno, telefon, e-mail (volitelně), zpráva, tlačítko Odeslat. Odeslání přes `mailto:` nebo formulář service (např. formspree.io / e-mail). |
| **Footer** | Logo, kontakt, region, copyright. Tmavé pozadí. |

---

## 4. Technická specifikace

### 4.1 Technologie

| Oblast | Doporučení |
|---|---|
| **Framework / stack** | Čistý HTML + CSS + Vanilla JS, NEBO jednoduchý SSG (např. 11ty, Hugo). Bez Reactu/Vue — zbytečná komplexita. |
| **CSS** | Custom CSS (žádný framework typu Bootstrap) NEBO Tailwind CDN. Proměnné CSS pro barvy. |
| **Responzivita** | CSS Grid + Flexbox. Media queries. |
| **Formulář** | HTML formulář → `mailto:` (jednoduchá varianta) NEBO Formspree / Netlify Forms. |
| **Galerie / obrázky** | Placeholder obrázky v `src/images/` s popisnými názvy. Alt texty povinné. |
| **Favicon** | SVG favicon v barvě #F2B513 s iniciálou „BK" nebo ikonou bagru. |
| **Hosting** | Klient si zajistí samostatně. Programátor dodá hotové soubory. |

### 4.2 SEO — 100% optimalizace

| Prvek | Implementace |
|---|---|
| **Meta title** | `Drobné zemní práce a půjčovna techniky | Klatovy, Plzeňský kraj — Bez Kompromis Technika` |
| **Meta description** | `Nabízíme drobné zemní práce v Klatovech a okolí. Půjčovna minibagru Easy E10 Pro a dumperu Rypex DP8R. Férové ceny, rychlá domluva. Zavolejte!` |
| **Open Graph** | Title, description, image, url, type: website |
| **Canonical URL** | `https://www.bezkompresetechnika.cz/` |
| **Viewport** | `width=device-width, initial-scale=1` |
| **Lang attribute** | `<html lang="cs">` |
| **H1** | Právě jedna H1 na stránce: „Drobné zemní práce a půjčovna techniky Klatovy" |
| **Strukturovaná data (JSON-LD)** | `LocalBusiness` schema — region Klatovy, služby, kontakt |
| **Sitemap.xml** | Generovat automaticky nebo ručně |
| **Robots.txt** | Povolit indexaci, odkaz na sitemap |
| **Alt texty** | Všechny obrázky musí mít smysluplný alt text |
| **Sémantický HTML** | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, správná hierarchie nadpisů |
| **Rychlost načtení** | Obrázky lazy-loaded, minifikované CSS/JS, fonty preconnect |

### 4.3 GEO optimalizace (Lokální SEO)

| Prvek | Implementace |
|---|---|
| **Region v textu** | Opakovaně zmiňovat „Klatovy", „Plzeňský kraj", „Klatovy a okolí", „západní Čechy" |
| **Google Business** | Odkaz na Google Business Profile (do footeru po vytvoření) |
| **Mapa** | V sekci Kontakt — embedded Google Maps iframe (po vytvoření Google Business) |
| **Kontaktní údaje** | Konistentní Název / Adresa / Telefon / E-mail všude stejně (NAP = Name, Address, Phone) |
| **Schema LocalBusiness** | V JSON-LD: geo souřadnice Klatov, region, opening hours, cena |

---

## 5. Obsah stránek

### 5.1 Homepage / Hero

**H1:** Drobné zemní práce a půjčovna techniky — Klatovy a okolí

**Banner text:**
```
NOVĚ V NABÍDCE
Minibagr Easy E10 Pro + dumper Rypex DP8R
👉 Zemní práce i půjčovna techniky
```

**Úvodní text:**
> Nabízíme drobné zemní práce a zapůjčení stavební techniky v regionu Klatovy a Plzeňský kraj. K dispozici máme kompaktní minibagr Easy E10 Pro a pásový minidumper Rypex DP8R. Možnost prací s obsluhou i samostatného zapůjčení stroje.

### 5.2 Služby — výčet

- výkopy pro obrubníky a základy
- terénní úpravy
- výkopy pro kabely a trubky
- úpravy zahrad
- srovnání terénu
- odvoz zeminy a materiálu
- práce ve stísněných prostorech

### 5.3 Technika — Minibagr Easy E10 Pro

**Parametry (tabulka):**

| Parametr | Hodnota |
|---|---|
| Hmotnost | 930 kg |
| Motor | Koop KD192 |
| Výkon | 7,6 kW |
| Hloubka kopání | cca 1650 mm |
| Max. výška kopání | 2590 mm |
| Šířka | 920 mm |
| Pracovní tlak | 16 MPa |

**Výhody:** kompaktní rozměry, jednoduchá manipulace, ideální na zahrady a kolem domu

**Příslušenství:** úzká lžíce 20 cm, lžíce 40 cm, svahová lžíce 80 cm, rýpací trn, hrabě

### 5.4 Technika — Minidumper Rypex DP8R

**Parametry:**

| Parametr | Hodnota |
|---|---|
| Nosnost | až 800 kg |
| Podvozek | pásový |
| Vhodný terén | bláto, svah |

**Výhody:** vysoká nosnost, pásový podvozek, ideální doplněk k bagru

### 5.5 Ceník

#### Zemní práce s obsluhou
| Položka | Cena |
|---|---|
| Minibagr Easy E10 Pro + obsluha | 790 Kč / hod |
| Minimální zakázka | 3 hodiny |
| Doprava | 25 Kč / km |
| Manipulace (nakládka/složení) | 500 Kč |

#### Půjčovna techniky — Minibagr
| Položka | Cena |
|---|---|
| 1 den | 1 690 Kč |
| 3+ dní | 1 490 Kč / den |
| Víkend (pá–po) | 2 990 Kč |

#### Půjčovna techniky — Dumper
| Položka | Cena |
|---|---|
| 1 den | 1 590 Kč |
| 3+ dní | 1 390 Kč / den |
| Víkend (pá–po) | 2 790 Kč |

#### Výhodný set
| Položka | Cena |
|---|---|
| Minibagr + dumper | 2 990 Kč / den |

#### Příslušenství
| Položka | Cena |
|---|---|
| Lžíce 20 / 40 cm | ZDARMА |
| Svahová lžíce 80 cm | +200 Kč / den |
| Rýpací trn | +200 Kč / den |
| Hrabě | +200 Kč / den |

#### Kauce
| Položka | Kauce |
|---|---|
| Minibagr | 15 000 Kč |
| Dumper | 10 000 Kč |
| Set | 20 000 Kč |

### 5.6 Proč my

- Férové ceny
- Možnost půjčení i práce na klíč
- Kompaktní technika i do malých prostor
- Rychlá domluva
- Možnost dlouhodobé spolupráce

### 5.7 Kontakt

**Telefon:** +420 731 466 375 (klikatelné: `tel:+420731466375`)
**E-mail:**  info@bezkompresetechnika.cz (klikatelné: `mailto:info@bezkompresetechnika.cz`)
**Region:** Klatovy a okolí, Plzeňský kraj
**Provoz:** Po–Pá 8:00–18:00, So 9:00–14:00 (dle domluvy)

**Kontaktní formulář:** Jméno *, Telefon *, E-mail (volitelně), Zpráva *

---

## 6. Důležitá doporučení od klienta

> 1. **Lžíce 20/40 cm nechat ZDARMA** — marketingově působí líp než účtovat 100–200 Kč. Vydělává se na hodinové práci, dopravě a setu bagr+dumper.
> 2. **Set za 2 990 Kč** je hlavní prodejní tahák — zvýraznit na webu.
> 3. Všechny cenové položky musí být **na webu uvedeny s DPH** (nebo poznámka „cena s DPH").
> 4. Fotografie techniky jsou v /images - všechny na výšku, na šířku momentálně nemáme.

---

## 7. Soubory k odevzdání

Programátor dodá:

```
BKZemniPrace/
├── index.html          # Hlavní HTML soubor (nebo více .html dle architektury)
├── src/
│   ├── images/         # obrázky, prozatím více nemáme
│   ├── styles/
│   │   └── style.css   # Všechny styly
│   └── scripts/
│       └── main.js     # Interakce (smooth scroll, mobilní menu, formulář)
├── docs/
│   └── SPEC.md         # Tento dokument
├── sitemap.xml
├── robots.txt
└── favicon.svg
```

---

## 8. Akceptační kritéria (pro kontrolu před převzetím)

- [ ] Web je 100% responzivní (mobil, tablet, desktop)
- [ ] Všechny externí odkazy a tlačítka fungují
- [ ] Kontaktní formulář odesílá / předvyplní mailto
- [ ] Všechny obrázky mají alt text
- [ ] Title a meta description jsou vyplněny správně
- [ ] JSON-LD schema je validní (otestovat přes Google Rich Results Test)
- [ ] Lighthouse SEO skóre > 90
- [ ] Stránka se načítá pod 3 sekundy (na běžném připojení)
- [ ] Na tmavém pozadí je viditelný text bez problémů
- [ ] Klikatelné telefonní číslo funguje na mobilu
