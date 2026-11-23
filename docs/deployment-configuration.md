# Configuración de despliegue EC3 F3 A12
## Frontend
- Repositorio: URL_FRONTEND
- Rama: main
- Servicio: task-manager-frontend-reemplaza
- URL: https://task-manager-frontend-reemplaza.onrender.com
- Build: pnpm verify
- Publicación: dist
- VITE_API_URL: https://joseph-github-io-e4k2.onrender.com/api
- Rewrite: /* hacia /index.html
## Backend relacionado
- Repositorio: URL_BACKEND
- Servicio: joseph-github-io-e4k2
- URL: https://joseph-github-io-e4k2.onrender.com
- CORS_ORIGIN: https://task-manager-frontend-reemplaza.onrender.com
- Salud: /health
- Salud de Atlas: /health/database
- Documentación: /api-docs