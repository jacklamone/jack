# Intellecta Solutions — sito web

Sito vetrina statico di [intellectasolutions.it](https://intellectasolutions.it): nessun framework, nessuna dipendenza esterna, nessun processo di build. Basta un qualsiasi hosting statico.

## Struttura

```
index.html              Pagina unica (hero, servizi, metodo, chi siamo, contatti)
assets/css/style.css    Stili — i colori e i font sono definiti come token in cima al file
assets/js/main.js       Menu mobile, animazioni di comparsa, griglia animata dell'hero
assets/fonts/           Font auto-ospitati (Bricolage Grotesque, Instrument Sans, Spline Sans Mono)
```

## Come modificare i contenuti

Tutti i testi sono in `index.html`, in italiano, organizzati per sezione (cerca i commenti `<!-- ============ SERVIZI ============ -->` ecc.).

- **Colori e tipografia**: token CSS in cima a `assets/css/style.css` (`--paper`, `--ink`, `--cobalto`, `--arancio`). Il tema scuro si adatta automaticamente alle preferenze del visitatore.
- **Email di contatto**: cercare `info@intellectasolutions.it` in `index.html`.

## Da completare prima della pubblicazione

- [ ] Inserire **P.IVA** e sede legale nel footer (c'è un commento `TODO` in `index.html`)
- [ ] Aggiungere link a **privacy e cookie policy** (obbligo GDPR)
- [ ] Verificare e adattare i testi di servizi e "Chi siamo" alla realtà aziendale
- [ ] Eventuali profili social nel footer

## Pubblicazione

Qualsiasi hosting statico va bene (GitHub Pages, Netlify, Cloudflare Pages, o l'hosting attuale via FTP). Per GitHub Pages: Settings → Pages → deploy dal branch, cartella root. Il file `.nojekyll` è già presente.
