# Draft PR: Initial GarageBench MVP platform

## Branch

`feature/initial-platform`

## Summary

- Add monorepo scaffold with Angular frontend (`frontend`) and NestJS backend (`backend`).
- Add PostgreSQL stack with Docker Compose and initial schema stub.
- Add base domain entities:
  - `Vehicle`, `DiagnosticCase`, `Symptom`, `DtcCode`, `Measurement`, `Hypothesis`,
    `DiagnosticTest`, `Evidence`
- Add MVP flow:
  - create vehicle
  - create case
  - add symptom and DTC
  - request assistant guidance
  - register test results
- Add decoupled AI provider interface and adapters:
  - `mock` (default, no secrets)
  - `openai` and `ollama` placeholders
- Add base documentation and project templates:
  - `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `ROADMAP.md`
- Keep repository on AGPL-3.0-or-later reference.

## How to test

```bash
npm run bootstrap
npm run build
docker compose up -d
npm run start:all
```

## Known limitations

- `openai-ai.adapter.ts` and `ollama-ai.adapter.ts` are currently placeholders.
  They are intentionally safe and throw clear messages if configured as active without implementation.
- Angular and Nest dependencies are declared but not yet installed on this environment.
- No GitHub PR has been opened automatically due workspace network restrictions.
