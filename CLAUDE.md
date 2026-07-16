# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Intellecta Solutions — sito web

Sito vetrina di **intellectasolutions.it** (dominio su Aruba, hosting Netlify).
Progetto: Intellecta Solutions, agenzia di ecosistemi digitali etici per PMI
(siti web, social, chatbot AI, automazioni, marketing con AI). Contatto:
info@intellectasolutions.it.

## Regole fondamentali

- **Tre lingue, sempre**: ogni modifica ai contenuti va replicata in
  `index.html` (IT, principale), `en/index.html` e `es/index.html`.
  Le tre pagine hanno struttura HTML identica; cambiano solo i testi,
  l'attributo `lang`, title/meta/canonical, `aria-current` nel selettore
  lingua e il campo hidden `lingua` del form. Le traduzioni devono essere
  naturali, non letterali — è la promessa del brand ("tre lingue, zero
  traduzioni").
- **Deploy automatico**: ogni push su questo branch va in produzione via
  Netlify (nessun build command, publish directory `/`). Non serve fare altro.
- **Niente framework**: HTML/CSS/JS statici puri. Non introdurre build step
  o dipendenze da CDN. Non ci sono test né lint.
- **Commit in italiano**, come tutto il repo (README, commenti nel codice).

## Verifica locale

Nessun build: `python3 -m http.server` dalla radice e apri
`http://localhost:8000`. Serve un server perché i percorsi degli asset
sono assoluti (`/assets/...`): aprendo i file con `file://` le pagine
`/en/` e `/es/` non trovano CSS e JS.

## Struttura

```
index.html         Pagina italiana (principale)
en/index.html      Inglese  ·  es/index.html  Spagnolo
assets/css/style.css   Stili (design "liquid glass" su nero)
assets/js/main.js      Video, animazioni, menu mobile, form
assets/fonts/          Instrument Serif + Barlow auto-ospitati
assets/img/            Logo (anche favicon)
sitemap.xml, robots.txt   SEO (hreflang it/en/es)
```

Ogni pagina è una one-page con quattro sezioni: Visione (hero, `#visione`),
Cosa facciamo (`#servizi`), Il Metodo (`#metodo`), Contatti (`#contatti`).
Le sezioni card ("Cosa facciamo" e "Il Metodo") condividono la classe CSS
`.metodo`. Se si aggiunge una pagina, aggiornare anche `sitemap.xml` e i
tag canonical/hreflang di tutte le lingue.

## Design system

- Effetto vetro: classi `.liquid-glass` (blur 4px) e `.liquid-glass-strong`
  (blur 50px), con bordo sfumato generato dal `::before` (mask xor).
- Font: Instrument Serif corsivo per i titoli, Barlow per il corpo.
  Self-hosted in `assets/fonts/` (niente Google Fonts, scelta GDPR).
- Animazioni d'ingresso: `.anim` (fade+blur con ritardo `--d`),
  `.hero-title .w` (parola per parola con `--i`), `.reveal` (card via
  IntersectionObserver in `main.js`). Tutte disattivate con
  `prefers-reduced-motion`.

## Sistema video di sfondo

- Sequenza: hero = bolla dorata · Cosa facciamo = oro liquido (generato con
  Higgsfield) · Il Metodo = fiori · Contatti = bolla (stesso clip dell'hero).
  Tutti da CloudFront.
- I video con attributo `loop` girano in continuo; quelli senza usano il
  ciclo con dissolvenza gestito da `main.js` (`setupFadingVideo`). Tutti al
  rallentatore (0.75x). I video partono con `opacity: 0` nel CSS: il fade-in
  lo fa `main.js`.
- Le sezioni sfumano nel nero ai bordi (`::after`, 30%) per transizioni
  cinematografiche; le sezioni card hanno un velo scuro (`.metodo::before`)
  per la leggibilità. Non aggiungere backdrop-blur alle card grandi: sfoca
  il video su mobile.
- iOS con risparmio energetico blocca l'autoplay: `main.js` riprova al primo
  tocco/scroll e il CSS nasconde il simbolo play sovrapposto. Non rimuovere
  quella logica.
- Con `prefers-reduced-motion` i video restano fermi sul primo frame.

## Form contatti

Netlify Forms, form `contatti` (campi `nome`, `email`, `messaggio` + hidden
`lingua` it/en/es + honeypot `bot-field`). Le richieste arrivano in
Netlify → Forms. Non rinominare form o campi: si perde lo storico.
`main.js` invia via fetch per restare sulla pagina e mostrare
`.form-success`; senza JavaScript il form fa comunque un normale POST.

## Da fare prima o poi

- P.IVA e privacy/cookie policy nel footer (obbligo GDPR, oggi assenti)
- Ospitare i video su Netlify se CloudFront dovesse cambiare (dal README)
