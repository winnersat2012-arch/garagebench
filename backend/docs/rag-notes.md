# Preparación de RAG (fase 1)

Objetivo: incorporar documentación técnica del taller de forma legal y trazable, sin incluir manuales propietarios en este repositorio.

Implementación recomendada:

- Carpeta `./rag-docs` (fuera de git o en storage protegido) donde el taller carga sus manuales.
- Proceso de ingesta:
  - extracción de texto
  - chunking por bloques de 800-1200 caracteres
  - metadatos: `origin`, `model`, `vehicle_family`, `version`
  - vector store local o cloud (por ejemplo pgvector, LanceDB)
- El copiloto solo debe consultar evidencia recuperada de RAG cuando `RAG_ENABLED=true`.

Reglas:
- No incorporar textualmente contenido de marcas sin permiso.
- Toda evidencia recuperada debe registrarse con `kind=RETRIEVED` y `source=rag`.
