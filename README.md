# GarageBench

Plataforma open source de diagnóstico asistido para talleres de automoción.

## MVP inicial

Este repositorio crea una base mínima, ejecutable y comprobable:

- Monorepo con `backend` (NestJS) y `frontend` (Angular).
- PostgreSQL con `docker-compose`.
- Entidades básicas: `Vehicle`, `DiagnosticCase`, `Symptom`, `DtcCode`,
  `Measurement`, `Hypothesis`, `DiagnosticTest`, `Evidence`.
- Flujo funcional mínimo:
  - crear vehículo
  - crear expediente/diagnostic case
  - añadir avería (síntomas y DTC)
  - solicitar orientación de copiloto
  - registrar una prueba y su resultado
- Capa de IA desacoplada con interfaz común e implementaciones:
  - `mock` (por defecto, sin claves reales)
  - `openai` (listo para configurar)
  - `ollama` (listo para configurar)
- Preparación para RAG en el futuro con fuentes técnicas aportadas legalmente por el taller.

## Primer arranque

```bash
npm install
npm run bootstrap
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up -d
npm run build
npm run start:all
```

## Estructura

```
garagebench/
  backend/
  frontend/
  docker-compose.yml
```

## Rutas del flujo MVP

- `POST /api/vehicles`
- `POST /api/cases`
- `POST /api/cases/:caseId/symptoms`
- `POST /api/cases/:caseId/dtcs`
- `POST /api/cases/:caseId/tests`
- `POST /api/cases/:caseId/assist`

## Seguridad y licencias

La licencia del proyecto permanece en `AGPL-3.0-or-later`.

No se incluyen secretos reales en este repositorio.
