# GarageBench

Plataforma open source de **diagnóstico asistido** para talleres de automoción.

AGPL-3.0-or-later.

## Requisitos

- Node.js 20+
- Git
- Docker Desktop (si quieres usar PostgreSQL con Docker)
- Windows (para generar `.exe`), Linux/Mac (para compilar y ejecutar en código fuente)

## Inicio rápido

1. Clonar el repositorio:

```bash
 git clone https://github.com/winnersat2012-arch/garagebench.git
 cd garagebench
```

2. Instalar dependencias:

```bash
 npm run bootstrap
```

3. Levantar backend y frontend:

```bash
 npm run start:all
```

4. Base de datos PostgreSQL (opcional local con Docker):

```bash
 docker compose up -d
```

## Ejecutar como app de escritorio (Windows)

### Probar en modo escritorio (desarrollo)

```bash
npm run desktop:dev
```

### Generar instalador `.exe`

1. Compilar frontend y backend:

```bash
npm run build:all
```

2. Empaquetar app para Windows:

```bash
npm run desktop:pack
```

El instalador se guardará en `release/`.

## Descargar e instalar directamente

1. En GitHub, abrir **Releases** del repositorio.
2. Descargar el archivo `.exe` más reciente (por ejemplo `GarageBench Setup ... .exe`).
3. Ejecutarlo y seguir el asistente.

## Rama y aportes

- Trabaja siempre en `feature/initial-platform`.
- No editar `main` directamente.
- Ver también `CONTRIBUTING.md`.

## Qué hace este MVP

- Alta de vehículo y expediente.
- Gestión de averías, DTC, síntomas, medidas y pruebas.
- Primera capa de copiloto con hipótesis y recomendaciones.
- Registro de evidencia para no afirmar diagnósticos sin datos.
