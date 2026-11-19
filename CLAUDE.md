# Car Showcase — Professional 3D Website

## Stack
- **Three.js + GSAP** — 3D models, animations
- **Vite** — build, dev server
- **Netlify Functions** — backend (forms, auth, rate-limit)
- **Web Crypto API** — session encryption (same as Sakura admin)

## Structure
```
car-site/
├── public/
│   ├── models/           # .glb car models
│   ├── _headers          # CSP, security headers
│   └── _redirects        # SPA fallback
├── src/
│   ├── main.js           # Three.js scene, car loader
│   ├── ui.js             # UI interactions, config panel
│   ├── auth.js           # Client crypto (PBKDF2, AES-GCM, HMAC)
│   ├── api.js            # Netlify Functions client
│   └── style.css         # Design system
├── netlify/functions/
│   ├── auth.js           # Login, register, session
│   ├── cars.js           # CRUD cars (admin)
│   ├── inquiry.js        # Contact form + rate-limit
│   └── utils/crypto.js   # Server crypto (Node Web Crypto)
├── package.json
└── vite.config.js
```

## Security (no holes)
- **CSP** strict: `script-src 'self'; object-src 'none'; frame-ancestors 'none'`
- **PBKDF2 100k** + **AES-GCM** sessions, **HMAC-SHA256** tokens
- **Rate-limit** per IP (Netlify + client)
- **CSRF** tokens on all mutations
- **Input validation** server-side (zod)
- **No secrets in client** — only public keys
- **HTTPS only** (Netlify default)

## Features
- 3D car viewer (orbit, explode, color change, interior cam)
- Car configurator (paint, wheels, interior, packages)
- Compare models side-by-side
- Test-drive booking (calendar + email)
- Brochure PDF download
- Admin panel (protected route, same crypto as Sakura)
- Multi-lang (i18n ready)

## Models
- Use **Kenney** / **Sketchfab** free .glb (CC0/CC-BY)
- Optimize: Draco compression, <2MB each
- Fallback: static images if WebGL fails

## Commands
```bash
npm create vite@latest car-site -- --template vanilla
cd car-site && npm i three gsap @netlify/functions zod
npm run dev
```