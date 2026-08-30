# Intellecta Solutions — sito web

Sito vetrina di **intellectasolutions.it** (dominio su Aruba, hosting Netlify).
Progetto: Intellecta Solutions, agenzia di ecosistemi digitali etici per PMI
(siti web, social, chatbot AI, automazioni, marketing con AI). Contatto:
info@intellectasolutions.it.

## Regole fondamentali

- **Tre lingue, sempre**: ogni modifica ai contenuti va replicata in
  `index.html` (IT, principale), `en/index.html` e `es/index.html`.
  Le traduzioni devono essere naturali, non letterali — è la promessa
  del brand ("tre lingue, zero traduzioni").
- **Deploy automatico**: ogni push su questo branch va in produzione via
  Netlify (nessun build command, publish directory `/`). Non serve fare altro.
- **Niente framework**: HTML/CSS/JS statici puri. Non introdurre build step
  o dipendenze da CDN.

## Struttura

```
index.html         Pagina italiana (principale)
en/index.html      Inglese  ·  es/index.html  Spagnolo
assets/css/style.css   Stili (design "liquid glass" su nero)
assets/js/main.js      Video, animazioni, menu mobile, form
assets/fonts/          Instrument Serif + Barlow auto-ospitati
assets/img/            Logo (anche favicon)
privacy.html / cookie.html  Informative (en/, es/)
```

## Sistema video di sfondo

- Sequenza: hero = bolla dorata · Cosa facciamo = oro liquido (generato con
  Higgsfield) · Il Metodo = fiori · Contatti = bolla. Tutti da CloudFront.
- I video con attributo `loop` girano in continuo; quelli senza usano il
  ciclo con dissolvenza gestito da `main.js`. Tutti al rallentatore (0.75x).
- Le sezioni sfumano nel nero ai bordi (`::after`, 30%) per transizioni
  cinematografiche; le sezioni card hanno un velo scuro (`.metodo::before`)
  per la leggibilità. Non aggiungere backdrop-blur alle card grandi: sfoca
  il video su mobile.
- iOS con risparmio energetico blocca l'autoplay: `main.js` riprova al primo
  tocco/scroll. Non rimuovere quella logica.

## Form contatti

Netlify Forms, form `contatti` (campi `nome`, `email`, `messaggio` + hidden
`lingua` it/en/es + honeypot `bot-field`). Le richieste arrivano in
Netlify → Forms. Non rinominare form o campi: si perde lo storico.

## Da fare prima o poi

- P.IVA nel footer: ancora placeholder `[da inserire]` (privacy/cookie stub già in pagina)
