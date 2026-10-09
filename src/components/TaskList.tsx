import { TaskItem } from './TaskItem';
export function TaskList() {
    return (
        <section className="panel" aria-labelledby="task-list-title">
            <div className="section-heading">
                <div>
                    <p className="section-heading__eyebrow">Actividades</p>
                    <h2 id="task-list-title">Tareas registradas</h2>
                </div>
                <span className="result-count">3 tareas</span>
            </div>
            <div className="task-list" role="list">
                <TaskItem
                    title="Configurar el proyecto React"
                    status="completed"
                />
                <TaskItem
                    title="Diseñar la estructura por componentes"
                    status="pending"
                />
                <TaskItem
                    title="Documentar el avance del proyecto"
                    status="pending"
                />
            </div>
        </section>
    );
}