# Administrador de tareas - Frontend
Aplicación desarrollada con React, TypeScript, Vite y PNPM
para administrar tareas.
## Alcance actual
La aplicación permite visualizar una colección local de tareas
mediante componentes React.
Actualmente incluye:
- Modelo de tarea con TypeScript.
- Cinco tareas locales.
- Renderizado mediante map.
- Uso de claves estables.
- Estados pendiente y completada.
- Resumen calculado.
- Mensaje para una colección vacía.
- Diseño adaptable.
Los formularios, eventos y operaciones CRUD se implementarán
en actividades posteriores.
## Tecnologías
- React
- TypeScript
- Vite
- PNPM
- CSS
- Git y GitHub
## Instalación
pnpm install
## Ejecución
pnpm dev
## Validación
pnpm lint
pnpm build
## Estructura principal
- components: componentes visuales.
- data: colección local de tareas.
- models: tipos e interfaces.
- styles: estilos globales.
- docs: preguntas y documentación.
## Modelo Task
Cada tarea contiene id, title, status, createdAt y updatedAt.