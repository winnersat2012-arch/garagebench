# GarageBench

Plataforma open source de **diagnóstico asistido** para talleres de automoción.

## Requisitos

- Node.js 20+
- Git
- Docker Desktop (si quieres usar PostgreSQL con Docker)
- Windows (para generar `.exe`), Linux/Mac (para compilar y ejecutar en código fuente)

## Ejecutar en modo desarrollo

1. Instalar dependencias:

```bash
npm run bootstrap
```

2. Levantar backend + frontend:

```bash
npm run start:all
```

3. Si quieres usar Docker para la base de datos:

```bash
docker compose up -d
```

## Ejecutar como app de escritorio (Windows)

### 1) Probar en modo escritorio (desarrollo)

```bash
npm run desktop:dev
```

Esto abre la app y arranca backend/frontend desde código fuente.

### 2) Generar instalador `.exe` de Windows

1. Primero compila backend y frontend:

```bash
npm run build:all
```

2. Empaqueta la app:

```bash
npm run desktop:pack
```

El instalador se guarda en `release/`.

### 3) Probar el `.exe` generado

- Abre el instalador de `release/` y ejecuta la app instalada.
- Al abrir, el cliente usa la versión compilada del frontend y backend incluido en el paquete.

## Rama de trabajo

La rama recomendada para cambios es `feature/initial-platform` (no se edita `main` directamente).

## Licencia

AGPL-3.0-or-later.
