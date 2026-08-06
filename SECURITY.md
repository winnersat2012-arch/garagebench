# Seguridad

## Variables sensibles

No se almacenan en repositorio claves de OpenAI, Ollama o cualquier otro proveedor.

- Usa secretos de entorno únicamente.
- Nunca commits de `.env` con secretos reales.

## Buenas prácticas iniciales

- Validación estricta de DTOs con class-validator.
- Autenticación básica preparada en módulos de guardia para evolución futura.
- Base de datos con credenciales desde `DATABASE_URL`.

## Reportar incidencias

Si detectas un posible riesgo, repórtalo en Issues con el nivel de impacto y pasos de reproducción.
