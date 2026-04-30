# Arquitectura

## Estructura del proyecto

```
src/
├── main.ts                          # Bootstrap: bootstrapApplication(App, appConfig)
├── index.html                       # HTML base con Google Fonts (Inter + JetBrains Mono)
├── styles.scss                      # Variables CSS, reset, scrollbar, stagger animations, tilt-card
└── app/
    ├── app.ts                       # Componente raiz: cursor glow, fade sections, tilt engine
    ├── app.config.ts                # Configuracion Angular (providers)
    ├── services/
    │   ├── i18n.service.ts          # Servicio de internacionalizacion (signal-based)
    │   └── theme.service.ts         # Servicio dark/light mode (signal + localStorage)
    ├── pipes/
    │   └── safe-html.pipe.ts        # Pipe para inyectar HTML seguro en templates
    └── components/
        ├── navbar/navbar.ts         # Navegacion fija + menu mobile + toggles idioma y tema
        ├── hero/hero.ts             # Landing: particulas canvas, typed text, glitch
        ├── about/about.ts           # Terminal interactiva + info cards
        ├── skills/skills.ts         # Tech stack con 3D tilt cards
        ├── opensource/opensource.ts  # Contribuciones OSS
        ├── homelab/homelab.ts       # Servicios self-hosted por categorias
        ├── blog/blog.ts             # Articulos de Medium
        ├── experience/experience.ts # Timeline laboral con git graph animado
        ├── education/education.ts   # Formacion + hackathons
        ├── contact/contact.ts       # Links de contacto + footer
        └── command-palette/         # Ctrl+K command palette con easter eggs
            └── command-palette.ts
```

Todos los componentes son **standalone** — no hay NgModules. Cada componente tiene template y estilos inline.

---

## Flujo de la app

1. `main.ts` arranca con `bootstrapApplication(App, appConfig)`
2. `App` (componente raiz) monta el layout: navbar, command palette, hero, y 8 secciones envueltas en `.fade-section`
3. En `ngAfterViewInit`, App configura:
   - **Cursor glow**: gradiente radial que sigue al raton (solo desktop)
   - **3D tilt engine**: event delegation en `document` para `.tilt-card`
   - **Fade-in observer**: IntersectionObserver que anade `.visible` a cada seccion
4. Cada componente inyecta `I18nService` para obtener textos traducidos

---

## Sistema i18n

Servicio con estado reactivo via `signal()`:

- `lang` — signal con valor `'es'` o `'en'`
- `toggle()` — alterna idioma y actualiza `document.documentElement.lang`
- `t(key)` — devuelve la traduccion para el idioma actual

Las traducciones estan en un `Record<string, Record<Lang, string>>` dentro del propio servicio. No usa ficheros JSON externos — todo en memoria.

Algunas traducciones contienen HTML (`<strong>`, `<span class="accent">`), que se renderizan con `[innerHTML]` o el pipe `safeHtml`.

---

## Secciones (orden en la pagina)

| # | Seccion | Selector | id |
|---|---|---|---|
| — | Navbar | `app-navbar` | — |
| — | Hero | `app-hero` | `hero` |
| 01 | About | `app-about` | `about` |
| 02 | Skills | `app-skills` | `skills` |
| 03 | Open Source | `app-opensource` | `opensource` |
| 04 | Homelab | `app-homelab` | `homelab` |
| 05 | Blog | `app-blog` | `blog` |
| 06 | Experience | `app-experience` | `experience` |
| 07 | Education | `app-education` | `education` |
| 08 | Contact | `app-contact` | `contact` |

---

## Command Palette

`Ctrl+K` (o `Cmd+K` en Mac) abre una paleta estilo terminal con 13 comandos visibles + 4 easter eggs ocultos. Filtrado fuzzy por label e id. Navegacion con flechas + Enter. Los easter eggs solo aparecen al escribir su nombre exacto.

---

## Modo claro / oscuro

Toggle en la navbar. Implementado con CSS custom properties + `data-theme` attribute en `<html>`.

- **ThemeService** (`services/theme.service.ts`): signal `'dark' | 'light'`, persiste en `localStorage`
- **Dark** es el default — solo cambia a light si el usuario lo eligio previamente
- Las variables CSS se sobreescriben en `styles.scss` bajo `[data-theme="light"]`

### Paleta de colores

| Variable | Dark | Light | Uso |
|---|---|---|---|
| `--bg-primary` | `#0a0a0f` | `#f5f5f5` | Fondo principal |
| `--bg-secondary` | `#12121a` | `#ffffff` | Fondo terminal, paleta |
| `--bg-card` | `#1a1a2e` | `#ffffff` | Fondo de cards |
| `--accent` | `#f57c00` | `#e65100` | Naranja principal |
| `--accent-light` | `#ffb74d` | `#f57c00` | Hover, gradientes |
| `--text-primary` | `#e8e8e8` | `#1a1a2e` | Texto principal |
| `--text-secondary` | `#a0a0b0` | `#4a4a5a` | Texto secundario |
| `--terminal-green` | `#00e676` | `#00c853` | Prompt de terminal |

---

## Accesibilidad

| Mejora | Que hace | Archivo |
|---|---|---|
| **Skip to content** | Enlace oculto que aparece al pulsar Tab — salta la navbar entera | `app.ts` |
| **aria-labels** | Labels descriptivos en botones de tema, idioma, hamburger y logo | `navbar.ts` |
| **prefers-reduced-motion** | Desactiva TODAS las animaciones, transiciones, particulas y typed text | `styles.scss` + `hero.ts` + `app.ts` + `experience.ts` |
| **Texto en footer** | Linea que indica las features de accesibilidad implementadas | `contact.ts` |
| **role="main"** | Landmark role en el `<main>` para navegacion por screen reader | `app.ts` |

---

## Responsive

Breakpoint principal en `768px`:
- Navbar: hamburger menu con overlay fullscreen
- Grid layouts: colapsan a 1 columna
- Cursor glow y tilt: desactivados en tactiles via `matchMedia('(pointer: fine)')`
- Cmd hint (`Ctrl+K`): oculto en mobile

---

## Experiencia movil

| Mejora | Que hace | Archivo |
|---|---|---|
| **PWA** | Manifest + Service Worker — se puede instalar en la home del movil con icono y splash | `public/manifest.json` + `public/sw.js` |
| **Touch feedback** | `:active` con `scale(0.97)` en cards y `scale(0.95)` en botones (solo `pointer: coarse`) | `styles.scss` |
| **Viewport notch** | `viewport-fit=cover` + `env(safe-area-inset-*)` padding para pantallas con notch | `index.html` + `styles.scss` |
| **Apple PWA** | `apple-touch-icon`, `apple-mobile-web-app-capable`, status bar translucida | `index.html` |

---

## Open Graph

Meta tags en `index.html` para previews al compartir en redes sociales:
- `og:title`, `og:description`, `og:type`, `og:image` (placeholder)

---

## Fuentes

- **Inter** — texto general (sans-serif)
- **JetBrains Mono** — terminal, codigo, monospace
- Cargadas desde Google Fonts con `preconnect`

---

## Tecnicas Angular

| Tecnica | Donde se usa |
|---|---|
| `signal()` / `effect()` | Typed text, idioma, tema, scroll, menu, terminal history |
| Standalone components | Todos los componentes (`standalone: true`) |
| `::ng-deep` | Estilos que penetran innerHTML (about terminal, hero description) |
| `@HostListener` | Scroll en navbar, keydown en command palette |
| `IntersectionObserver` | Fade sections (`app.ts`), pausa canvas (`hero.ts`), git graph (`experience.ts`) |
| Event delegation | Un solo mousemove en document para tilt de todas las cards |
| CSS custom properties | `--rx`/`--ry` como puente JS -> CSS para el tilt |
| SCSS `@for` | Genera delays progresivos para stagger animation |
| `@ViewChildren` + `QueryList` | Observar multiples timeline items en experience |
