import {
    Link,
    useNavigate,
    useParams,
} from 'react-router';
import type { Task } from '../models/task.interface';
import { formatTaskDate } from '../utils/date';
import { NotFoundPage } from './NotFoundPage';
interface TaskDetailPageProps {
    tasks: Task[];
    onDeleteTask: (id: string) => boolean;
}
export function TaskDetailPage({
    tasks,
    onDeleteTask,
}: TaskDetailPageProps) {
    const { taskId } = useParams<{
        taskId: string;
    }>();
    const navigate = useNavigate();
    const task = tasks.find(
        (currentTask) => currentTask.id === taskId,
    );
    if (!task) {
        return (
            <NotFoundPage
                title="Tarea no encontrada"
                message={
                    'La tarea solicitada no existe o fue eliminada.'
                }
            />
        );
    }
    const statusLabel =
        task.status === 'completed'
            ? 'Completada'
            : 'Pendiente';
    function handleDeleteTask(): void {
        const wasDeleted = onDeleteTask(task!.id);
        if (wasDeleted) {
            navigate('/tasks', {
                replace: true,
            });
        }
    }
    return (
        <article
            className="panel task-detail"
            aria-labelledby="task-detail-title"
        >
            <p className="section-heading__eyebrow">
                Detalle
            </p>
            <h2 id="task-detail-title">
                {task.title}
            </h2>
            <dl className="task-detail__grid">
                <div>
                    <dt>Identificador</dt>
                    <dd>{task.id}</dd>
                </div>
                <div>
                    <dt>Estado</dt>
                    <dd>{statusLabel}</dd>
                </div>
                <div>
                    <dt>Fecha de creación</dt>
                    <dd>
                        <time dateTime={task.createdAt}>
                            {formatTaskDate(task.createdAt)}
                        </time>
                    </dd>
                </div>
                <div>
                    <dt>Última actualización</dt>
                    <dd>
                        <time dateTime={task.updatedAt}>
                            {formatTaskDate(task.updatedAt)}
                        </time>
                    </dd>
                </div>
            </dl>
            <div className="task-detail__actions">
                <Link
                    className="button-link button-link--secondary"
                    to="/tasks"
                >
                    Volver a tareas
                </Link>
                <button
                    type="button"
                    className="button-danger"
                    onClick={handleDeleteTask}
                >
                    Eliminar tarea
                </button>
            </div>
        </article>
    );
}