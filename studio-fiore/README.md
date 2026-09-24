# Studio Dott. Stefano Fiore — sito web

Sito del cliente **Studio Dott. Stefano Fiore** (Sassari), consulenze aziendali e
finanza agevolata. Realizzato da Intellecta Solutions.

La cartella è **autonoma**: HTML/CSS/JS statici, font e immagini in locale, link
relativi. Si può spostare così com'è su un proprio repository o sito Netlify
(publish directory = questa cartella, nessun build command).

## Pagine

| File | Contenuto |
|------|-----------|
| `index.html` | Home: hero, lo Studio, servizi, metodo, valori, intervista, CTA |
| `chi-siamo.html` | Lo Studio, profilo del Dott. Fiore, come si svolge la consulenza, in cosa crediamo |
| `cosa-facciamo.html` | Finanza agevolata (+ elenco in 9 punti), microcredito, certificazioni, formazione, metodo |
| `storie-di-successo.html` | 4 schede in attesa dei casi reali (istruzioni nel commento HTML) |
| `contatti.html` | Recapiti + form Netlify `contatti-studio-fiore` |
| `note-legali.html`, `privacy.html`, `cookie.html` | Note legali, privacy policy e cookie policy (bozze da completare con i dati del titolare) |
| `grazie.html` | Conferma invio del form senza JavaScript |

Header e footer sono ripetuti in ogni pagina: una modifica al menu o ai
recapiti va fatta in **tutti** i file `.html`.

## Da completare prima della messa online

- [ ] Email e telefono (footer di tutte le pagine + `contatti.html`): ora `[email da inserire]` / `[telefono da inserire]`
- [ ] P.IVA nel footer e dati del titolare (indirizzo, C.F., email, PEC, telefono) in `note-legali.html`, `privacy.html`, `cookie.html`
- [ ] Confermare il tempo di conservazione delle richieste in `privacy.html` (ora `[12] mesi`) e far verificare le informative
- [ ] Storie di successo: logo/foto, tipo di finanziamento, descrizione (4 schede)
- [ ] Far verificare al cliente i dati biografici in `chi-siamo.html` (presi dall'intervista su Microfinanza n. 49)
- Nessuna foto del Dott. Fiore per scelta: il sito punta su serietà e metodo, non sul volto
- [ ] Rimuovere `<meta name="robots" content="noindex, nofollow">` da tutte le pagine quando il sito va sul dominio definitivo, e aggiungere `canonical` e sitemap

## Note tecniche

- Font: Fraunces (titoli) e Manrope (testi), auto-ospitati in `assets/fonts/`.
- Logo: `logo.webp` per fondi chiari, `logo-light.webp` (contorno chiaro) per fondi scuri.
- Video intervista: YouTube in modalità `youtube-nocookie`, caricato solo al clic.
- Animazioni disattivate con "riduci movimento" del sistema operativo.
