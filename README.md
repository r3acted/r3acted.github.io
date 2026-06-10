# r3acted.github.io

Sito personale statico per GitHub Pages.

## Come personalizzare

### Avatar

Metti la tua immagine profilo in `assets/avatar.png`. Se il file non esiste, viene mostrata una lettera rossa come fallback.

### Contatti

In `index.html`:

- **Discord** — cerca `data-copy="8qtw"` e cambia `8qtw` con il tuo tag Discord attuale
- **Telegram** — cerca `href="https://t.me/YOUR_USERNAME"` e cambia `YOUR_USERNAME` con il tuo username Telegram

### Aggiungere un'esperienza staff

Copia questo blocco dentro la `<div class="exp-list">` della sezione appropriata:

```html
<div class="exp-item">
    <span class="exp-name">Nome Server</span>
    <span class="exp-role">Ruolo</span>
</div>
```

### Rimuovere un'esperienza

Cancella il blocco `<div class="exp-item">...</div>` corrispondente.

### Colore accento

In `style.css`, modifica le variabili nella sezione `:root`:

```css
--accent: #dc2626;       /* rosso principale */
--accent-hover: #ef4444; /* rosso hover */
```

## Deploy su GitHub Pages

1. Vai su [github.com/new](https://github.com/new) e crea un repository chiamato **r3acted.github.io**
2. Carica tutti i file di questa cartella nel repository (tramite drag & drop o `git push`)
3. Vai su **Settings → Pages → Source** e seleziona il branch `main`
4. Dopo qualche minuto il sito sarà online su `https://r3acted.github.io`

## Struttura

```
r3acted.github.io/
├── index.html      ← Pagina principale
├── style.css       ← Stili
├── script.js       ← Copy-to-clipboard
├── assets/
│   └── avatar.png  ← La tua immagine profilo
└── README.md       ← Questo file
```

## Sicurezza

- Nessuna API key
- Nessun JavaScript esterno
- Nessun cookie o tracking
- Nessun form
- Content Security Policy attiva
- Sito 100% statico
