# GarageBench

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](LICENSE)
![Project status](https://img.shields.io/badge/status-early%20MVP-orange)
![Angular](https://img.shields.io/badge/frontend-Angular-red)
![NestJS](https://img.shields.io/badge/backend-NestJS-red)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)

GarageBench is a small, open-source pilot for assisted automotive diagnostics.

It is built as a monorepo with:

- `backend/` -> NestJS API
- `frontend/` -> Angular app
- `electron/` -> desktop wrapper and app launcher
- `docker-compose.yml` -> PostgreSQL for local development

This project includes a first MVP workflow:

- Create vehicle and diagnostic case
- Add symptom + DTC
- Ask assistant for guidance (missing information + hypotheses + tests + uncertainty)
- Record tests and results
- Keep evidence typed by origin (declared, observed, measured, retrieved, inferred)

---

## 1) First: prerequisites

You must use **Node.js 20+** (this repo will fail on old Node versions).

Check your versions:

```powershell
node -v
npm -v
```

If you have an old Node version, install/update it first:

### Quick install options (Windows)

```powershell
winget install OpenJS.NodeJS.LTS
```

or using `nvm-windows`:

```powershell
nvm install 20
nvm use 20
```

Then open a new terminal.

---

## 2) Clone and first setup

```powershell
git clone https://github.com/winnersat2012-arch/garagebench.git
cd garagebench
```

From now on run each command **on its own line** (not joined together):

```powershell
npm install
npm run bootstrap
```

`npm run bootstrap` installs both `backend/` and `frontend/` dependencies.

---

## 3) Run in development mode

Start backend and frontend together:

```powershell
npm run start:all
```

This serves:

- Backend on `http://127.0.0.1:3000`
- Frontend on `http://127.0.0.1:4200`

Start PostgreSQL locally:

```powershell
docker compose up -d
```

---

## 4) Build and create the Windows `.exe`

```powershell
npm run build:all
npm run desktop:pack
```

Output is created in:

- `release/` (for example `release\\GarageBench Setup X.X.X.exe`)

If you only want a local build package and not publish, we already pass `--publish=never`.

Optional alias:

```powershell
npm run desktop:pack:nsis
```

---

## 5) CI / GitHub release (official download link)

The workflow `.github/workflows/desktop-release.yml` builds a Windows installer automatically when you push a tag:

```powershell
git tag v0.1.0
git push origin v0.1.0
```

After this, create/edit the GitHub Release if you want to expose that `.exe` for users.

---

## 6) Common checks

Check tooling:

```powershell
npm --prefix frontend exec ng --version
npm --prefix backend exec tsc --version
```

Run lint/build/tests:

```powershell
npm run lint
npm run test
npm run build:all
```

---

## 7) Why previous errors happened

Most install/build failures came from running this repo with an old Node runtime (`Node 10.x`):

- `SyntaxError: Unexpected token ??`
- `tsc` or Electron installer failing with optional chaining parse errors

Root cause: tools require Node 20+.

Run the version check again:

```powershell
node -v
```

Expected: something like `v20.x` or newer.

---

## 8) Contributing and branch policy

- Work only on branches, never directly on `main`.
- Use:
  - `feature/initial-platform` for the MVP branch
  - Pull requests for review

See `CONTRIBUTING.md`, `AGENTS.md`, and `SECURITY.md`.

---

## License

AGPL-3.0-or-later
