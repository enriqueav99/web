# Efectos visuales e interactivos

---

## Terminal interactiva (About)

La seccion About tiene una terminal interactiva donde el usuario puede escribir comandos reales y recibir respuestas.

### Como funciona

- La terminal arranca con 3 comandos pre-ejecutados (`whoami`, `cat current_role.txt`, `cat interests.txt`)
- Debajo, un input con prompt `$` donde el usuario puede escribir
- El historial se almacena en un `signal<TermLine[]>` que se renderiza reactivamente
- Auto-scroll al fondo al anadir output
- Los outputs cambian con el idioma (usan `i18n.t()`)

### Comandos disponibles

| Comando | Output |
|---|---|
| `help` | Lista de todos los comandos disponibles |
| `whoami` | Descripcion profesional |
| `cat current_role.txt` | Rol actual en Inditex (con HTML highlights) |
| `cat interests.txt` | Intereses y pasiones |
| `ls` | Lista de ficheros disponibles |
| `cat skills.sh` | Script bash con el tech stack principal |
| `cat contact.json` | JSON con email, github, linkedin |
| `neofetch` | ASCII art con info del "sistema" (Kubernetes, Bash, etc.) |
| `echo [texto]` | Repite el texto que escriba el usuario |
| `clear` | Limpia el historial de la terminal |
| `sudo [cualquier cosa]` | "Nice try" — rechazo humoristico |
| Cualquier otro | `command not found: [cmd]` |

### Implementacion

- **Componente**: `about/about.ts` — `AboutComponent` con `AfterViewInit`
- **Signal**: `history = signal<TermLine[]>` — cada linea tiene `type: 'cmd'|'output'`, `text`, y `html?` opcional
- **Resolver**: `resolve(cmd)` — switch de comandos que devuelve TermLines
- **Traducciones**: claves `about.terminal.*` en `i18n.service.ts`
- **Auto-scroll**: `@ViewChild('terminalBody')` + `scrollTop = scrollHeight` tras cada comando

---

## Git Graph animado (Experience)

La seccion Experience tiene un timeline estilo `git log --graph` con animaciones al hacer scroll.

### Como funciona

- Cada timeline-item se observa con `IntersectionObserver`
- Al entrar en viewport, se le anade la clase `.revealed` que dispara las animaciones CSS
- La linea central se anima con un pseudo-element `::after` que crece de 0% a 100% height
- Los dots se transforman en "commits" estilo git con doble circulo y animacion de scale
- Las cards aparecen con slide-in desde su lado (izquierda o derecha)
- Los tech tags aparecen con stagger delay progresivo

### Animaciones CSS

| Elemento | Animacion | Duracion |
|---|---|---|
| Timeline track `::after` | height 0% -> 100% | 1.5s cubic-bezier |
| Commit dot | scale(0) -> scale(1) | 0.5s con bounce |
| Commit inner | border-color gray -> naranja | 0.5s ease |
| Timeline card | opacity 0, translateX(±30px) -> visible | 0.6s cubic-bezier |
| Tech tags | opacity 0, translateY(8px) -> visible | 0.4s con stagger 50ms |

### Implementacion

- **Componente**: `experience/experience.ts` — `ExperienceComponent` con `AfterViewInit` + `OnDestroy`
- **IntersectionObserver**: threshold 0.2, rootMargin `-60px` inferior
- **`@ViewChildren`**: `QueryList<ElementRef>` para todos los timeline items
- **Track reveal**: la linea central se anima cuando el primer item aparece
- **Unobserve**: cada item se deja de observar una vez revelado (one-shot)
- **Reduced motion**: si `prefers-reduced-motion: reduce`, se revela todo sin animacion

---

## Efectos por seccion

| Seccion | Efecto hover en cards | Archivo |
|---|---|---|
| **About** | Terminal interactiva + slide derecha en info cards | `about/about.ts` |
| **Skills** | 3D Tilt (sigue el cursor con perspective) | `skills/skills.ts` + `styles.scss` + `app.ts` |
| **Open Source** | Lift up fuerte (`translateY(-10px)`) + glow doble | `opensource/opensource.ts` |
| **Homelab** | Borde izquierdo naranja que aparece | `homelab/homelab.ts` |
| **Blog** | Scale zoom (`scale(1.02)`) | `blog/blog.ts` |
| **Experience** | Git graph animado + lift up en cards | `experience/experience.ts` |
| **Education** | Slide derecha (`translateX(8px)`) | `education/education.ts` |
| **Contact** | Lift up + glow pulse en icono | `contact/contact.ts` |

---

## Efectos globales

| Efecto | Que hace | Archivo |
|---|---|---|
| **Cursor Glow** | Gradiente radial naranja 600px que sigue al raton | `app.ts` |
| **Fade Sections** | Cada seccion aparece con fade-in + slide-up al hacer scroll | `app.ts` (IntersectionObserver) |
| **Staggered Fade-In** | Los skill chips aparecen secuencialmente | `styles.scss` (`.stagger-item`) |
| **3D Tilt (engine)** | Event delegation para `.tilt-card`: rotacion via CSS custom properties `--rx`/`--ry` | `app.ts` + `styles.scss` |

---

## Efectos del Hero

| Efecto | Que hace | Tecnica |
|---|---|---|
| **Particulas** | 60 puntos naranjas flotando con lineas de conexion | Canvas 2D + `requestAnimationFrame`, pausado con IntersectionObserver |
| **Glitch** | Hover en el nombre: copias fantasma se desplazan con clip-path | `::before`/`::after` con `attr(data-text)` |
| **Typed Text** | Subtitulo escribe/borra frases en loop | `signal()` + `setTimeout`, reiniciado con `effect()` al cambiar idioma |
| **Ripple (btn primario)** | Circulo blanco se expande desde el centro | `::before` + transition |
| **Shimmer (btn secundario)** | Barra de luz cruza de izquierda a derecha | `::before` con gradiente linear |
| **Mouse Pulse** | Anillo pulsante en el scroll indicator | `::after` con keyframe `mouse-pulse` |

---

## Navbar

| Efecto | Que hace | Tecnica |
|---|---|---|
| **Logo hover** | Brackets se separan, texto hace glow | `translateX` + `text-shadow` |
| **Nav underline** | Linea gradient aparece debajo del link | `::after` con `width: 0 -> 100%` + gradient |

---

## Easter Eggs

| Trigger | Resultado | Archivo |
|---|---|---|
| `Ctrl+K` > "rana" | Toast: La rana de la Universidad de Salamanca | `command-palette.ts` |
| `Ctrl+K` > "astronauta" | Toast: El astronauta de la Catedral Nueva | `command-palette.ts` |
| `Ctrl+K` > "salamanca" | Toast: "Lo que natura non da, Salmantica non praesta" | `command-palette.ts` |
| `Ctrl+K` > "hornazo" | Toast: Lunes de Aguas | `command-palette.ts` |
| Footer `·` hover | Se transforma en emoji rana | `contact.ts` |
| Console | Rana invisible en console.log | `app.ts` |
| Terminal > `sudo` | "Nice try" — rechazo humoristico | `about.ts` |

---

## Gotchas

- **No mezclar `transform` en hover de componente con `.tilt-card`**: la especificidad del componente gana y machaca el tilt.
- **`animation-fill-mode: forwards` + `transform`**: bloquea cualquier transform posterior. Usar `filter` o `opacity` en su lugar.
- **`background-clip: text` en pseudo-elementos**: no renderiza texto visible al desplazarlos. Usar color solido con `-webkit-text-fill-color`.
- **Doble scrollbar**: `overflow-x: hidden` en un solo contenedor puede crear un segundo scroll context.
