import {
    useEffect,
    useState,
} from 'react';
import {
    Link,
    Navigate,
    useNavigate,
    useParams,
} from 'react-router';
import { useAuth } from '../hooks/useAuth';
import type { Task } from '../models/task.interface';
import {
    getHttpErrorMessage,
    isAbortError,
    isHttpError,
} from '../services/http.service';
import {
    deleteTask,
    getTaskById,
} from '../services/task.api.service';
import { formatTaskDate } from '../utils/date';
import { NotFoundPage } from './NotFoundPage';

type DetailStatus =
    | 'loading'
    | 'success'
    | 'not-found'
    | 'error';

export function TaskDetailPage() {
    const { taskId } = useParams<{ taskId: string }>();
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [task, setTask] = useState<Task | null>(null);
    const [status, setStatus] = useState<DetailStatus>('loading');
    const [errorMessage, setErrorMessage] = useState('');
    const [reloadKey, setReloadKey] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!taskId) {
            setStatus('not-found');
            return;
        }
        if (!accessToken) {
            setStatus('error');
            setErrorMessage('La sesión no está disponible.');
            return;
        }

        const currentTaskId = taskId;
        const currentAccessToken = accessToken;
        const controller = new AbortController();

        async function loadTask(): Promise<void> {
            setStatus('loading');
            setErrorMessage('');
            try {
                const response = await getTaskById(
                    currentTaskId,
                    currentAccessToken,
                    controller.signal,
                );
                setTask(response.data);
                setStatus('success');
            } catch (error) {
                if (isAbortError(error)) {
                    return;
                }
                if (isHttpError(error) && error.status === 404) {
                    setStatus('not-found');
                    return;
                }
                setStatus('error');
                setErrorMessage(getHttpErrorMessage(error));
            }
        }

        void loadTask();
        return () => controller.abort();
    }, [accessToken, taskId, reloadKey]);

    async function handleDelete(): Promise<void> {
        if (!task || !accessToken) {
            return;
        }

        const shouldDelete = window.confirm(
            `¿Eliminar la tarea "${task.title}"?`,
        );
        if (!shouldDelete) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteTask(task.id, accessToken);
            navigate('/tasks', { replace: true });
        } catch (error) {
            setStatus('error');
            setErrorMessage(getHttpErrorMessage(error));
            setIsDeleting(false);
        }
    }

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    if (status === 'loading') {
        return <p role="status">Consultando tarea...</p>;
    }

    if (status === 'not-found') {
        return (
            <NotFoundPage
                title="Tarea no encontrada"
                message="La tarea no existe o fue eliminada."
            />
        );
    }

    if (status === 'error' || !task) {
        return (
            <section className="panel" role="alert">
                <h2>No fue posible consultar la tarea</h2>
                <p>{errorMessage}</p>
                <button
                    type="button"
                    onClick={() => setReloadKey((current) => current + 1)}
                >
                    Reintentar
                </button>
            </section>
        );
    }

    return (
        <article
            className="panel task-detail"
            aria-labelledby="task-detail-title"
        >
            <p className="section-heading__eyebrow">Detalle remoto</p>
            <h2 id="task-detail-title">{task.title}</h2>
            <dl className="task-detail__grid">
                <div>
                    <dt>Identificador</dt>
                    <dd>{task.id}</dd>
                </div>
                <div>
                    <dt>Estado</dt>
                    <dd>
                        {task.status === 'completed'
                            ? 'Completada'
                            : 'Pendiente'}
                    </dd>
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
                <Link className="button-link button-link--secondary" to="/tasks">
                    Volver a tareas
                </Link>
                <button
                    type="button"
                    className="button-danger"
                    disabled={isDeleting}
                    onClick={() => void handleDelete()}
                >
                    {isDeleting ? 'Eliminando...' : 'Eliminar tarea'}
                </button>
            </div>
        </article>
    );
}
