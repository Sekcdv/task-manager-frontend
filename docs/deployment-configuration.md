# Configuración de despliegue EC3 F3 A12
## Frontend
- Repositorio: URL_FRONTEND
- Rama: main
- Servicio: task-manager-frontend-reemplaza
- URL: https://task-manager-frontend-reemplaza.onrender.com
- Build: pnpm verify
- Publicación: dist
- VITE_API_URL: <URL_DEL_BACKEND>/api
- Rewrite: /* hacia /index.html
## Backend relacionado
- Repositorio: URL_BACKEND
- Servicio: <NOMBRE_DEL_SERVICIO_BACKEND>
- URL: <URL_DEL_BACKEND>
- CORS_ORIGIN: https://task-manager-frontend-reemplaza.onrender.com
- Salud: /health
- Salud de Atlas: /health/database
- Documentación: /api-docs