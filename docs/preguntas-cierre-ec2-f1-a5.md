# Preguntas de cierre - EC2 F1 A5
## 1. ¿Qué problema resuelve React al construir una interfaz?
React resuelve la complejidad de manipular e interactuar directamente con el DOM de forma manual. Permite construir interfaces dinámicas mediante un enfoque declarativo y basado en componentes reutilizables, manteniendo la vista sincronizada de manera eficiente cada vez que cambian los datos o el estado de la aplicación
## 2. ¿Qué es un componente?
Es un bloque de construcción independiente, modular y reutilizable de la interfaz de usuario. En React, un componente es una función de JavaScript/TypeScript que devuelve la estructura visual (TSX) de una parte de la aplicación y puede recibir información externa mediante propiedades.
## 3. ¿Por qué los componentes comienzan con mayúscula?
Comienzan con mayúscula (sintaxis PascalCase) para que React y el compilador de JSX/TSX puedan diferenciar las etiquetas de elementos nativos de HTML (como <header>, <div> o <button>, escritas en minúsculas) de los componentes personalizados creados por el desarrollador (como <TaskItem/> o <AppHeader/>).
## 4. ¿Qué diferencia existe entre HTML y TSX?
HTML es un lenguaje de marcado puro, mientras que TSX es una extensión de sintaxis que permite escribir una estructura similar a HTML directamente dentro de archivos de TypeScript. Además, TSX exige ciertas reglas especiales como el cierre obligatorio de etiquetas (<input />), el uso de camelCase para atributos (className en vez de class, htmlFor en vez de for) y el uso de llaves {} para evaluar expresiones dinámicas de TypeScript.
## 5. ¿Para qué se utiliza className?
Se utiliza para asignar clases de CSS a los elementos dentro de TSX. En JavaScript/TypeScript, class es una palabra reservada del lenguaje, por lo que React utiliza className para definir las clases de estilos sin generar conflictos de sintaxis.   
## 6. ¿Qué son las propiedades o props?
Son las entradas o parámetros de información que un componente padre le pasa a un componente hijo para personalizar su contenido, aspecto o comportamiento. Permiten que los componentes sean dinámicos y reutilizables con datos distintos.   
## 7. ¿Cómo ayuda TypeScript a validar las propiedades?
Ayuda definiendo interfaces o tipos (interface o type) que especifican los nombres exactos y tipos de datos que cada propiedad debe recibir. Si se intenta enviar un tipo de dato incorrecto (por ejemplo, una cadena en lugar de un número) o se omite una propiedad requerida, TypeScript genera un error en tiempo de desarrollo antes de ejecutar o compilar el código.   
## 8. ¿Cuál es la responsabilidad de App.tsx?
Funciona como el componente principal e integrador de la aplicación. Su responsabilidad es coordinar la composición global de la interfaz, organizando la jerarquía de los componentes secundarios (AppHeader, TaskForm, TaskFilters, TaskSummary, TaskList) e insertando la estructura base de la página.   
## 9. ¿Por qué la interfaz se dividió en varios componentes?
Se dividió para aplicar el principio de separación de responsabilidades. Esto hace que el código sea más organizado, legible, mantenible y escalable, permitiendo trabajar o modificar partes específicas de la interfaz (como el encabezado, los filtros o el resumen) sin afectar el resto de la aplicación.   
## 10. ¿Por qué los botones todavía están deshabilitados?
Porque en esta actividad inicial únicamente se construyó la maquetación y estructura visual estática de la interfaz. La lógica interactiva, el manejo de eventos, el estado (useState) y el control del formulario se incorporarán en actividades posteriores.   
## 11. ¿Qué componente consideras más reutilizable y por qué?
TaskItem. Es el más reutilizable porque no depende de datos fijos; recibe propiedades tipadas (title y status) y se puede renderizar múltiples veces dentro de una lista o en diferentes partes de la aplicación para representar cualquier tarea con distintas estructuras visuales según su estado.   
## 12. ¿Qué dificultad encontraste y cómo la resolviste?
Al integrar los nombres de las clases CSS en los componentes, un error común fue escribir accidentalmente class en lugar de className o cometer un error tipográfico en la asignación de las propiedades tipadas de TaskSummary. Se resolvió revisando la consola de la terminal, los mensajes de error de TypeScript en Visual Studio Code y ejecutando pnpm lint para corregir la sintaxis.   