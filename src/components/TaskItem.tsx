import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import type { Task } from '../models/task.interface';
import {
    TASK_TITLE_MAX_LENGTH,
    validateTaskTitle,
} from '../utils/task-validation';
import { formatTaskDate } from '../utils/date';
interface TaskItemProps {
    task: Task;
    onToggleStatus: (id: string) => void;
    onEditTask: (
        id: string,
        title: string,
    ) => void;
    onDeleteTask: (id: string) => boolean;
}
export function TaskItem({
    task,
    onToggleStatus,
    onEditTask,
    onDeleteTask,
}: TaskItemProps) {
    const {
        id,
        title,
        status,
        updatedAt,
    } = task;
    const [isEditing, setIsEditing] =
        useState(false);
    const [draftTitle, setDraftTitle] =
        useState(title);
    const [error, setError] = useState('');
    const statusLabel =
        status === 'completed'
            ? 'Completada'
            : 'Pendiente';
    function handleStartEdit(): void {
        setDraftTitle(title);
        setError('');
        setIsEditing(true);
    }
    function handleCancelEdit(): void {
        setDraftTitle(title);
        setError('');
        setIsEditing(false);
    }
    function handleDraftChange(
        value: string,
    ): void {
        setDraftTitle(value);
        if (error) {
            setError(
                validateTaskTitle(value) ?? '',
            );
        }
    }
    function handleEditSubmit(
        event: FormEvent<HTMLFormElement>,
    ): void {
        event.preventDefault();
        const validationMessage =
            validateTaskTitle(draftTitle);
        if (validationMessage) {
            setError(validationMessage);
            return;
        }
        onEditTask(
            id,
            draftTitle.trim(),
        );
        setError('');
        setIsEditing(false);
    }
    return (
        <article
            className={`task-item task-item--${status}`}
            role="listitem"
        >
            <div className="task-item__content">
                {isEditing ? (
                    <form
                        className="task-item__edit-form"
                        onSubmit={handleEditSubmit}
                        noValidate
                    >
                        <label
                            className="sr-only"
                            htmlFor={`edit-task-${id}`}
                        >
                            Editar título de la tarea
                        </label>
                        <input
                            id={`edit-task-${id}`}
                            className="task-item__edit-input"
                            value={draftTitle}
                            maxLength={
                                TASK_TITLE_MAX_LENGTH
                            }
                            onChange={(event) =>
                                handleDraftChange(
                                    event.target.value,
                                )
                            }
                            aria-invalid={Boolean(error)}
                            aria-describedby={
                                error
                                    ? `edit-error-${id}`
                                    : undefined
                            }
                            autoFocus
                        />
                        {error && (
                            <p
                                id={`edit-error-${id}`}
                                className="field-error"
                                role="alert" >
                                {error}
                            </p>
                        )}
                        <div className="task-item__edit-actions">
                            <button type="submit">
                                Guardar
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h3 className="task-item__title">
                            {title}
                        </h3>
                        <span
                            className={
                                `status-badge status-badge--${status}`
                            }
                        >
                            {statusLabel}
                        </span>
                        <p className="task-item__date">
                            Actualizada:{' '}
                            <time dateTime={updatedAt}>
                                {formatTaskDate(updatedAt)}
                            </time>
                        </p>
                    </>
                )}
            </div>
            <div
                className="task-item__actions"
                role="group" aria-label={`Acciones para ${title}`}
            >
                {!isEditing && (
                    <Link
                        className="button-link button-link--secondary"
                        to={`/tasks/${id}`}
                    >
                        Ver detalle
                    </Link>
                )}
                <button
                    type="button"
                    onClick={() =>
                        onToggleStatus(id)
                    }
                    disabled={isEditing}
                >
                    {status === 'completed'
                        ? 'Reabrir'
                        : 'Completar'}
                </button>
                <button
                    type="button"
                    onClick={handleStartEdit}
                    disabled={isEditing}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="button-danger"
                    onClick={() => {
                        onDeleteTask(id);
                    }}
                    disabled={isEditing}
                >
                    Eliminar
                </button>
            </div>
        </article>
    );
}