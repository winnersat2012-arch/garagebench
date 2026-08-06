# Contributing to GarageBench

## Requisitos

- Node.js >= 18 (recomendado)
- Docker + Docker Compose
- Git

## Configuración inicial

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up -d
npm install
npm run bootstrap
```

## Commit

- Commits cortos y semánticos (`feat:`, `fix:`, `chore:`...)
- Mantener cambios de IA separados de cambios de dominio cuando sea posible.

## Validación

```bash
npm run build
npm run test
```

> Si no tienes acceso a claves de IA, deja `AI_PROVIDER=mock`.
