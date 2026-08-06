# GarageBench

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](LICENSE)
![Project status](https://img.shields.io/badge/status-early%20MVP-orange)
![Angular](https://img.shields.io/badge/frontend-Angular-red)
![NestJS](https://img.shields.io/badge/backend-NestJS-red)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)

**Open-source, AI-assisted vehicle diagnostics and repair documentation for independent automotive workshops.**

GarageBench helps technicians record symptoms, diagnostic trouble codes, measurements, hypotheses, tests and evidence in a transparent workflow. Its AI layer is designed to assist the technician without hiding uncertainty or presenting unsupported conclusions as facts.

> GarageBench is an early-stage MVP under active development. It is not a substitute for professional judgement, manufacturer procedures or verified measurements.

## Why GarageBench?

Independent workshops often manage diagnostic knowledge across handwritten notes, messaging apps, disconnected tools and proprietary platforms. This makes previous work difficult to search, audit, compare or share.

GarageBench aims to provide an open and reproducible alternative built around:

- **Evidence-first diagnostics** rather than opaque answers.
- **Clear provenance** for declared, observed, measured, retrieved and inferred information.
- **Traceable hypotheses and tests** throughout each diagnostic case.
- **Provider independence** through adapters for OpenAI, Ollama and a local mock provider.
- **Workshop privacy** with no requirement to publish customer, vehicle or proprietary technical data.
- **Open collaboration** under the AGPL-3.0-or-later license.

## Current MVP

The initial platform includes:

- Vehicle records and diagnostic cases.
- Symptoms, DTC codes and technical measurements.
- Diagnostic hypotheses with rationale and estimated probability.
- Recommended tests and recorded test results.
- Evidence associated with diagnostic conclusions.
- An AI provider abstraction with `mock`, OpenAI and Ollama integration points.
- Angular frontend and NestJS REST backend.
- PostgreSQL persistence through TypeORM.
- Docker Compose configuration for local PostgreSQL.
- Initial unit tests and project documentation.

## Evidence model

GarageBench separates information by origin so technicians can understand why a conclusion was proposed:

| Evidence type | Meaning |
| --- | --- |
| Declared | Information supplied by the customer or technician. |
| Observed | Directly observed behaviour, damage, sound or condition. |
| Measured | Values obtained using diagnostic equipment or instruments. |
| Retrieved | Information recovered from an authorised technical source. |
| Inferred | A conclusion proposed from the available evidence. |

The AI assistant must expose uncertainty, identify missing information and recommend tests before a hypothesis can be treated as confirmed.

## Example workflow

1. Create a vehicle and diagnostic case.
2. Record the reported complaint and observed symptoms.
3. Add DTC codes and measured values.
4. Request an assisted analysis.
5. Review the proposed hypotheses and their supporting evidence.
6. Perform the recommended tests.
7. Record the results and update or reject each hypothesis.
8. Preserve the completed case as searchable workshop knowledge.

## Architecture

```text
GarageBench
├── frontend/          Angular web application
├── backend/           NestJS API and domain logic
│   ├── src/common/ai  AI provider abstraction and adapters
│   ├── src/diagnostics
│   └── docker/postgres
├── docker-compose.yml PostgreSQL development service
├── AGENTS.md          AI-assisted development guidelines
├── CONTRIBUTING.md    Contribution instructions
├── ROADMAP.md         Planned development phases
└── SECURITY.md        Security policy and practices
