# Administrador de tareas Frontend
SPA con React TypeScript Vite y React Router.
Consume una API REST protegida mediante JWT Bearer.
## Funciones
- Registro login restauración y logout.
- Rutas públicas y protegidas.
- CRUD remoto.
- Búsqueda filtros orden y paginación.
- Detalle por identificador.
- Permisos user y admin.
- Pruebas y despliegue estático.
## Instalación
pnpm install --frozen-lockfile
## Desarrollo
1. Copiar .env.example como .env.local.
2. Confirmar VITE_API_URL=/api.
3. Iniciar Backend en localhost:3000.
4. Ejecutar pnpm dev.
## Verificación
pnpm verify
## Producción
- Frontend: URL_FRONTEND
- API: https://express-task-api-0c9g.onrender.com
- Versión: 1.0.0
Consulta docs/deployment-configuration.md y
docs/release-checklist.md