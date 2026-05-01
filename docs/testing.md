# Testing

## Como ejecutar

```bash
# Ejecutar todos los tests
npm test

# Ejecutar con watch (re-ejecuta al guardar)
npx ng test

# Ejecutar solo un fichero
npx ng test --include='**/i18n.service.spec.ts'

# Lint (ESLint con angular-eslint)
npm run lint
```

## Stack de testing

- **Vitest 4.x** — test runner (configurado via `@angular/build:unit-test`)
- **jsdom** — entorno DOM para tests sin browser
- **Angular TestBed** — para crear componentes e inyectar servicios
- **Configuracion**: `tsconfig.spec.json` + `angular.json` (architect.test)

## Ficheros de test

| Fichero | Que testea | Tests |
|---|---|---|
| `services/i18n.service.spec.ts` | Toggle ES/EN, traducciones, claves faltantes, HTML en traducciones | 10 |
| `services/theme.service.spec.ts` | Toggle dark/light, persistencia localStorage, data-theme en DOM | 7 |
| `pipes/safe-html.pipe.spec.ts` | Pipe de sanitizacion HTML para templates con innerHTML | 4 |
| `components/command-palette/command-palette.spec.ts` | Abrir/cerrar, filtrado, easter eggs, navegacion con teclado, toasts, `toggle()`, chips rapidos, salida del terminal | 27 |
| `components/navbar/navbar.spec.ts` | Links, menu hamburguesa, toggle idioma, toggle tema, renderizado del DOM | 15 |
| `components/about/about.spec.ts` | Terminal interactiva (help, ls, neofetch, clear, sudo, echo, not found), info cards, cambio de idioma | 17 |
| `components/hero/hero.spec.ts` | Renderizado del hero, contenedor del boot-log, signals `bootLines` y `glitchActive`, trigger del glitch tactil | 6 |

**Total: 85 tests** — todos unitarios, sin dependencias externas.

## Que cubren los tests

- **I18nService**: Idioma por defecto `es`, `toggle()` alterna correctamente, `t()` devuelve traducciones, devuelve clave si no existe, actualiza `document.documentElement.lang`
- **ThemeService**: Tema por defecto `dark`, `toggle()` alterna, persiste en `localStorage`, pone `data-theme` en el DOM, actualiza `meta[theme-color]`
- **SafeHtmlPipe**: Bypassa sanitizer de Angular para inyectar HTML seguro
- **CommandPalette**: `Ctrl+K` abre/cierra, filtrado funciona, easter eggs ocultos por defecto pero aparecen al buscarlos, seleccion con flechas hace wrap, toasts aparecen
- **Navbar**: 8 links de navegacion, menu se abre/cierra, toggles de idioma y tema funcionan, renderiza logo/hamburger/links
- **About (terminal interactiva)**: Ejecutar `help` muestra lista, `ls` lista ficheros, `cat contact.json` muestra JSON, `neofetch` muestra ASCII, `echo` repite texto, `sudo` rechaza, comando desconocido muestra "not found", `clear` limpia historial, comandos vacios se ignoran
- **Hero**: El componente se renderiza, el contenedor del boot-log existe, `bootLines` empieza vacio (solo se llena en pointer coarse), `glitchActive` empieza en false y se activa al llamar a `triggerGlitch()`

## Lint

`npm run lint` ejecuta `ng lint`, que usa `@angular-eslint` con la config flat de `eslint.config.js`. Reglas activas:

- TypeScript: `eslint:recommended`, `tseslint:recommended` y `tseslint:stylistic`
- Angular TS: nombrado de selectores (componentes en `kebab-case`, directivas en `camelCase` con prefijo `app`), `@angular-eslint/prefer-inject` (favorece `inject()` sobre constructor injection)
- Plantillas HTML: `templateRecommended` + `templateAccessibility` (alt en imagenes, eventos teclado en handlers de click, focusable cuando hay interaccion, etc.)

El paso corre en CI antes de tests y build, asi que cualquier regresion bloquea el merge.
