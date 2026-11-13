import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    TASK_TITLE_MAX_LENGTH,
    validateTaskTitle,
} from '../utils/task-validation';
interface TaskFormProps {
    isSubmitting: boolean;
    onAddTask: (title: string) => Promise<boolean>;
}
export function TaskForm({
    isSubmitting,
    onAddTask,
}: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    function handleTitleChange(value: string): void {
        setTitle(value);
        if (error) {
            setError(validateTaskTitle(value) ?? '');
        }
    }
    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();
        const validationMessage =
            validateTaskTitle(title);
        if (validationMessage) {
            setError(validationMessage);
            return;
        }
        const wasCreated = await onAddTask(
            title.trim(),
        );
        if (wasCreated) {
            setTitle(''); setError('');
        }
    }
    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <label htmlFor="task-title">
                Nueva tarea
            </label>
            <div className="task-form__row">
                <input
                    id="task-title"
                    value={title}
                    maxLength={TASK_TITLE_MAX_LENGTH}
                    disabled={isSubmitting}
                    onChange={(event) =>
                        handleTitleChange(event.target.value)
                    }
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                        error ? 'task-title-error' : undefined
                    }
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : 'Agregar'}
                </button>
            </div>
            {error && (
                <p
                    id="task-title-error"
                    className="field-error"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </form>
    );
}