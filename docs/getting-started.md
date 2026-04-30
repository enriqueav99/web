# Getting Started

## Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo (http://localhost:4200)
npm start

# Build de produccion
npm run build

# Tests
npm test

# Build + watch en desarrollo
npm run watch
```

## Docker

```bash
# Construir imagen
docker build -t portfolio .

# Ejecutar en local
docker run -p 8080:80 portfolio
```

El Dockerfile usa **multi-stage build**: Node 22 Alpine para compilar, Nginx Alpine para servir. El `nginx.conf` incluye fallback SPA (`try_files $uri /index.html`) y cache de 1 ano para assets estaticos.

## Ficheros de proyecto

| Fichero | Que hace |
|---|---|
| `.dockerignore` | Excluye node_modules, dist, .angular, .git, docs, configs, tests de la imagen Docker |
| `.gitignore` | Excluye dist, node_modules, IDE configs, cache |
| `.editorconfig` | Indent 2 espacios, UTF-8, single quotes en TS |
| `.prettierrc` | printWidth 100, singleQuote, parser angular para HTML |
| `.prettierignore` | Ignora dist, node_modules, package-lock.json, .angular |
| `robots.txt` | Allow all (en `public/`) |
| `sitemap.xml` | Placeholder para rellenar con URL final (en `public/`) |
| `nginx.conf` | SPA fallback + cache 1 ano para assets estaticos, no-cache para sw.js y manifest.json |
| `Dockerfile` | Multi-stage: Node 22 Alpine (build) + Nginx Alpine (serve) |
| `manifest.json` | PWA manifest — nombre, colores, iconos, display standalone (en `public/`) |
| `sw.js` | Service Worker — cache network-first con offline fallback (en `public/`) |
