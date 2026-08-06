# AGENTS.md

## Objetivo

Construir una base mínima y mantenible de GarageBench enfocada a:

- diagnósticos transparentes y trazables
- flujo asistido por IA con evidencia clara
- arquitectura modular y testeable

## Lineamientos

- Mantener separación frontend/backend.
- Capa de dominio en backend desacoplada de infraestructura.
- La IA nunca debe afirmar certezas técnicas sin evidencia registrada.
- Todo output del copiloto debe indicar:
  - Datos declarados por el usuario
  - Datos observados
  - Datos medidos
  - Datos recuperados de fuentes
  - Datos inferidos
- Registrar evidencia de hipótesis y pruebas.
- Sin módulos de facturación, agenda u OBD bidireccional en este MVP.

## Stack por defecto

- Backend: NestJS + TypeORM + PostgreSQL
- Frontend: Angular
- IA: interfaz (`IAssistantProvider`) + adaptadores `mock`, `openai`, `ollama`.
