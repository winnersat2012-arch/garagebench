# GarageBench
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](LICENSE)
![Project status](https://img.shields.io/badge/status-early%20MVP-orange)
![Angular](https://img.shields.io/badge/frontend-Angular-red)
![NestJS](https://img.shields.io/badge/backend-NestJS-red)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)

**Open-source, AI-assisted vehicle diagnostics and repair documentation for independent automotive workshops.**

GarageBench helps technicians record symptoms, diagnostic trouble codes, measurements, hypotheses, tests, and evidence in a transparent workflow. Its AI layer is designed to assist the technician without hiding uncertainty or presenting unsupported conclusions as facts.

> GarageBench is an early-stage MVP under active development. It is not a substitute for professional judgement, manufacturer procedures, or verified measurements.

## Why GarageBench?

Independent workshops often keep diagnostic information split across notes, chat messages, and disconnected tools. This makes it hard to search, audit, compare, and reuse previous work.

GarageBench aims to provide an open, reproducible alternative built around:

- Evidence-first diagnostics rather than opaque answers.
- Clear provenance for declared, observed, measured, retrieved, and inferred information.
- Traceable hypotheses and tests throughout each diagnostic case.
- AI provider abstraction with adapters for a mock provider by default and optional OpenAI/Ollama integration.
- Privacy-friendly data handling and open collaboration under AGPL-3.0-or-later.

## Current MVP

The initial platform includes:

- Vehicle and diagnostic case management.
- Symptoms, DTC codes, and technical measurements.
- Diagnostic hypotheses with rationale and estimated confidence.
- Recommended tests and recorded test results.
- Evidence tracking per hypothesis.
- Angular frontend and NestJS REST backend.
- PostgreSQL persistence through TypeORM.
- Docker Compose configuration for local PostgreSQL.
- Initial tests and developer documentation.

## Evidence model

GarageBench separates information by origin so technicians can understand why a conclusion was proposed:

| Evidence type | Meaning |
| --- | --- |
| Declared | Information supplied by the customer or technician. |
| Observed | Directly observed behaviour, damage, sound, or condition. |
| Measured | Values obtained using instruments or diagnostic equipment. |
| Retrieved | Information recovered from an authorised technical source. |
| Inferred | A conclusion proposed from the available evidence. |

The AI assistant must:
- show uncertainty,
- ask for missing information,
- suggest tests,
- and avoid confirming faults without evidence.

## Requirements

- Node.js 20+
- Git
- Docker Desktop (optional, for local PostgreSQL)
- Windows (to build/use `.exe`), macOS/Linux for source development.

## Repository structure

```text
garagebench/
├── backend/   # NestJS API
├── frontend/  # Angular app
├── electron/  # Electron shell for desktop packaging
├── docker-compose.yml
└── .github/workflows/desktop-release.yml
```

## Quick start

1. Clone the repository:

```bash
git clone https://github.com/winnersat2012-arch/garagebench.git
cd garagebench
```

2. Install dependencies:

```bash
npm run bootstrap
```

3. Start backend + frontend:

```bash
npm run start:all
```

4. Optional: start PostgreSQL locally:

```bash
docker compose up -d
```

## Common commands

```bash
npm run build:all      # compile backend + frontend
npm run build          # same as above
npm run test           # run tests
npm run lint           # run linters
npm run start:all      # run web dev mode
npm run desktop:dev    # run Electron desktop in dev
npm run desktop:pack   # build Windows installer (release/.exe)
```

## Desktop (.exe) workflow

### Local packaging

```bash
npm run build:all
npm run desktop:pack
```

The installer is generated under `release/`.

### Direct download for users

If you want users to run the app immediately:
1. Go to **Releases** in this repository.
2. Download the latest `.exe` installer.
3. Run it and follow the installer steps.

### GitHub release automation

This repository includes an Action workflow that builds and uploads a Windows installer when a tag `v*` is pushed.

```bash
git tag v0.1.0
git push origin v0.1.0
```

That publishes the new `.exe` in the release assets.

## Contributing & branch flow

- Use `feature/initial-platform` for changes.
- Do not modify `main` directly.
- Follow `CONTRIBUTING.md` for PR expectations.

## License

AGPL-3.0-or-later.