# Intellecta Solutions — sito web

Sito di [intellectasolutions.it](https://intellectasolutions.it) (dominio su Aruba, hosting su Netlify), design "Liquid Glass" su fondo nero.

Questa versione è la ricostruzione statica del sito originale: **stessi contenuti, stessa grafica, stesso form contatti Netlify**, ma senza React/Babel/Tailwind caricati dal browser. Risultato: caricamento molto più rapido, contenuti indicizzabili dai motori di ricerca e menu di navigazione anche su mobile.

## Struttura

```
index.html              Pagina unica: Visione (hero), Il Metodo, Contatti
privacy.html / cookie.html   Informative (anche en/ e es/)
assets/css/style.css    Stili — include la ricetta "liquid glass" originale
assets/js/main.js       Video in dissolvenza, animazioni, menu mobile, invio form
assets/fonts/           Instrument Serif e Barlow auto-ospitati
```

## Note tecniche

- **Form contatti**: usa Netlify Forms (`data-netlify="true"`, form `contatti` con campi `nome`, `email`, `messaggio` come l'originale). Le richieste arrivano nel pannello Netlify → Forms. È stato aggiunto un campo honeypot anti-spam (`bot-field`).
- **Video di sfondo**: restano quelli originali su CloudFront (3 sezioni, 2 clip). Con `prefers-reduced-motion` i video rimangono fermi.
- **Logo**: caricato via `google.com/s2/favicons` come nell'originale. Meglio sostituirlo con un file locale (es. `assets/img/logo.png`) appena disponibile.
- **Font**: self-hosted in `assets/fonts/` (niente richieste a Google Fonts, meglio per GDPR e velocità).

## Deploy su Netlify

Il modo più pulito: su Netlify → **Site configuration → Build & deploy → Link repository** e collega questo repo (branch `main`, publish directory `/`, nessun build command). Da lì in poi ogni push pubblica in automatico. In alternativa, trascina la cartella del progetto in Netlify → Deploys.

## Da valutare

- [ ] Sostituire il logo remoto con un file locale
- [x] Footer con link privacy/cookie (IT/EN/ES). P.IVA ancora placeholder `[da inserire]`
- [ ] Ospitare i video su Netlify stesso se CloudFront dovesse cambiare
