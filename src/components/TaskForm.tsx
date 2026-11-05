import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    TASK_TITLE_MAX_LENGTH,
    validateTaskTitle,
} from '../utils/task-validation';
interface TaskFormProps {
    onAddTask: (title: string) => void;
}
export function TaskForm({
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
    function handleSubmit(event: FormEvent<HTMLFormElement>,
    ): void {
        event.preventDefault();
        const validationMessage = validateTaskTitle(title);
        if (validationMessage) {
            setError(validationMessage);
            return;
        }
        onAddTask(title.trim());
        setTitle('');
        setError('');
    }
    return (
        <section
            className="panel"
            aria-labelledby="task-form-title"
        >
            <div className="section-heading">
                <div>
                    <p className="section-heading__eyebrow">
                        Registro
                    </p>
                    <h2 id="task-form-title">Nueva tarea</h2>
                </div>
            </div>
            <form
                className="task-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <label htmlFor="task-title">
                    Título de la tarea
                </label>
                <div className="task-form__row">
                    <input
                        id="task-title"
                        name="title"
                        type="text"
                        placeholder="Ejemplo: revisar documentación"
                        maxLength={TASK_TITLE_MAX_LENGTH}
                        value={title}
                        onChange={(event) =>
                            handleTitleChange(event.target.value)
                        }
                        aria-invalid={Boolean(error)}
                        aria-describedby={
                            error
                                ? 'task-title-help task-title-error'
                                : 'task-title-help'
                        }
                    />
                    <button type="submit">
                        Agregar tarea
                    </button>
                </div>
                <p id="task-title-help" className="helper-text">
                    {title.length}/{TASK_TITLE_MAX_LENGTH} caracteres </p>
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
        </section>
    );
}