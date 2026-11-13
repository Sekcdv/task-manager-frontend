import type { Task } from '../models/task.interface';
interface TaskSummaryProps {
    tasks: Task[];
    total: number;
}
export function TaskSummary({
    tasks,
    total,
}: TaskSummaryProps) {
    const pendingOnPage = tasks.filter(
        (task) => task.status === 'pending',
    ).length;
    const completedOnPage =
        tasks.length - pendingOnPage;
    return (
        <section
            className="task-summary"
            aria-label="Resumen de tareas"
        >
            <p>
                <strong>{total}</strong> resultado(s) en la consulta
            </p>
            <p>
                Página actual: {pendingOnPage} pendiente(s) y{' '}
                {completedOnPage} completada(s)
            </p>
        </section>
    );
}