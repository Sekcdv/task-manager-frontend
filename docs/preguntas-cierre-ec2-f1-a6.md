## 1. ¿Qué función cumple la interfaz Task?
Define el contrato o estructura formal que debe cumplir cualquier objeto que represente una tarea dentro de la aplicación. Especifica las propiedades obligatorias (id, title, status, createdAt, updatedAt) y sus tipos de datos para que TypeScript valide la información en tiempo de desarrollo y prevenga errores antes de la ejecución.
## 2. ¿Qué diferencia existe entre Task y TaskStatus?
Task es una interfaz que define la estructura completa del objeto de una tarea con múltiples propiedades (id, title, etc.).   TaskStatus es un tipo unión (type TaskStatus = 'pending' | 'completed') que limita el valor de la propiedad status únicamente a esas dos opciones permitidas, evitando variantes inconsistentes del estado.
## 3. ¿Qué significa declarar un arreglo como Task[]?
Significa que el arreglo está estrictamente tipado y solo puede contener elementos que cumplan de forma exacta con la estructura definida por la interfaz Task. Si se intenta agregar un objeto al que le falte una propiedad obligatoria o tenga un tipo incorrecto, TypeScript arrojará un error.
## 4. ¿Qué hace el método map?
Es un método de los arreglos en JavaScript/TypeScript que recorre cada elemento de la colección y aplica una función para transformarlo en un nuevo elemento, devolviendo un nuevo arreglo con los resultados de dicha transformación.
## 5. ¿Qué resultado produce map dentro de TaskList?
Transforma cada objeto de tarea (Task) en una representación visual mediante un componente React (<TaskItem/>). Devuelve una lista de componentes React listos para ser renderizados dinámicamente en el DOM.
## 6. ¿Para qué utiliza React la propiedad key?
React utiliza la propiedad key como un identificador único y estable para rastrear qué elementos de una lista han sido cambiados, agregados o eliminados. Esto le permite a React actualizar de manera eficiente únicamente los elementos modificados en el DOM sin necesidad de reconstruir la lista entera.
## 7. ¿Por qué se utiliza task.id y no el índice?
Se utiliza task.id porque es una clave única e inmutable del modelo de datos. Usar el índice del arreglo (index) como clave provoca problemas cuando el arreglo se reordena, filtra o modifica (como al eliminar un elemento), ya que los índices cambian de posición y pueden causar errores visuales o de estado en los componentes.
## 8. ¿Cómo se envía una tarea de TaskList a TaskItem?
Se envía a través de propiedades (props). TaskList recorre la colección con map y le pasa cada objeto individual de la tarea a TaskItem utilizando la sintaxis de prop: <TaskItem task="{task}"/>.
## 9. ¿Cómo se comunican App, TaskSummary y TaskList?
Mediante un flujo de datos unidireccional (de padre a hijos). App actúa como componente coordinador y le pasa la colección completa de datos (tasks) mediante props tanto a TaskSummary (para calcular las estadísticas) como a TaskList (para renderizar la lista).
## 10. ¿Qué es el renderizado condicional?
Es la capacidad de un componente para evaluar una condición lógica en tiempo de ejecución y decidir qué estructura de interfaz mostrar según el resultado. En este proyecto, si tasks.length === 0 se muestra la vista del estado vacío (empty-state); de lo contrario, se renderiza la lista de tareas con map.
## 11. ¿Por qué el resumen se calcula a partir de la colección?
Es la capacidad de un componente para evaluar una condición lógica en tiempo de ejecución y decidir qué estructura de interfaz mostrar según el resultado. En este proyecto, si tasks.length === 0 se muestra la vista del estado vacío (empty-state); de lo contrario, se renderiza la lista de tareas con map.
## 12. ¿Qué dificultad encontraste durante la refactorización y cómo la resolviste? 
Una dificultad común durante esta refactorización fue adaptar los componentes para recibir objetos complejos completos en lugar de valores primitivos, ajustando el tipado de las props con TypeScript (TaskItemProps y TaskListProps). Se resolvió aplicando la correcta importación del tipo (import type { Task }...) y utilizando la desestructuración de objetos dentro de los componentes para acceder limpiamente a propiedades como status y updatedAt.