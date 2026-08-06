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
```

## Technology stack

- **Frontend:** Angular 17
- **Backend:** NestJS 10 and TypeScript
- **Database:** PostgreSQL 16 and TypeORM
- **AI providers:** mock adapter by default, with OpenAI and Ollama integration points
- **Development:** Node.js, npm and Docker Compose

## Quick start

### Requirements

- Node.js 18 or newer
- npm
- Docker and Docker Compose
- Git

### Installation

```bash
git clone https://github.com/winnersat2012-arch/garagebench.git
cd garagebench

cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

docker compose up -d
npm install
npm run bootstrap
npm run start:all
```

The frontend starts on `http://localhost:4200` and the backend uses port `3000` by default.

The backend health endpoint is available at:

```text
GET http://localhost:3000/health
```

### Development without an AI key

The default provider is the local mock adapter:

```env
AI_PROVIDER=mock
```

This allows contributors to build, test and review the diagnostic workflow without sending information to an external AI provider.

### OpenAI configuration

Keep all credentials outside version control:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=your_supported_model
```

Never commit `.env` files, API keys, customer information or full vehicle identification numbers.

## Project commands

```bash
npm run bootstrap   # Install backend and frontend dependencies
npm run start:all   # Run backend and frontend in development mode
npm run build       # Build both applications
npm run test        # Run the available test suites
npm run lint        # Run project linters
```

## Responsible AI principles

GarageBench is designed around several non-negotiable rules:

- AI-generated output is assistance, not a confirmed diagnosis.
- Technical certainty must be supported by recorded evidence.
- Missing information and uncertainty must remain visible.
- Recommended tests should reduce uncertainty rather than merely repeat a hypothesis.
- Safety-critical work must follow verified procedures and competent professional review.
- Proprietary manuals must not be copied into the repository without permission.

## Security and privacy

The project is intended to handle potentially sensitive workshop information. Contributors must:

- Store secrets only in environment variables or a dedicated secrets manager.
- Avoid committing personal data, customer records or complete VINs.
- Validate file uploads and external content before processing.
- Review authentication, authorisation and tenant isolation before production use.
- Report suspected vulnerabilities according to [SECURITY.md](SECURITY.md).

## Roadmap

### Phase 1

- User and workshop authentication.
- Complete evidence provenance for every diagnostic step.
- Database-backed end-to-end tests in CI.
- Improved validation and error handling.

### Phase 2

- Production-ready OpenAI and Ollama adapters.
- Legally sourced RAG for workshop-provided technical documents.
- Diagnostic history and case comparison.
- Expanded privacy, permissions and audit controls.

See [ROADMAP.md](ROADMAP.md) for the maintained roadmap.

## Contributing

Contributions are welcome, including documentation, testing, accessibility, security review, frontend improvements and diagnostic-domain modelling.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. New contributors can begin with a small issue, include tests where appropriate and explain how their change preserves evidence traceability.

## Project status and adoption

GarageBench was publicly released as an early MVP in August 2026. The project is currently focused on establishing a stable technical foundation and validating workflows derived from real independent repair-shop needs. No unverified claims about users, downloads or production adoption are made.

## Maintainer

GarageBench is maintained by **Aitor Torre Martínez** through the GitHub account [`winnersat2012-arch`](https://github.com/winnersat2012-arch).

## License

GarageBench is licensed under the **GNU Affero General Public License v3.0 or later**. See [LICENSE](LICENSE) for the complete terms.
