import type { TaskStatus } from '../models/task.interface';

interface TaskStatusBadgeProps {
    status: TaskStatus;
}

export function TaskStatusBadge({
    status,
}: TaskStatusBadgeProps) {
    const label =
        status === 'completed'
            ? 'Completada'
            : 'Pendiente';

    return (
        <span className={`status-badge status-badge--${status}`}>
            {label}
        </span>
    );
}