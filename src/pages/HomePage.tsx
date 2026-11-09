import { Link } from 'react-router';
import type { Task } from '../models/task.interface';
import { TaskSummary } from '../components/TaskSummary';
interface HomePageProps {
    tasks: Task[];
}
export function HomePage({
    tasks,
}: HomePageProps) {
    return (
        <div className="page-stack">
            <section
                className="panel welcome-panel"
                aria-labelledby="home-title"
            >
                <p className="section-heading__eyebrow">
                    Inicio
                </p>
                <h2 id="home-title">
                    Organiza y consulta tus actividades
                </h2>
                <p>
                    Registra tareas, actualiza su estado y utiliza
                    las herramientas de consulta para concentrarte
                    en el trabajo importante.
                </p>
                <div className="welcome-panel__actions">
                    <Link
                        className="button-link"
                        to="/tasks"
                    >
                        Administrar tareas
                    </Link>
                </div>
            </section>
            <TaskSummary tasks={tasks} />
        </div>
    );
}