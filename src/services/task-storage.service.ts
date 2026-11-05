import type {
    Task,
    TaskStatus,
} from '../models/task.interface';
const STORAGE_KEY = 'task-manager.tasks';
function isTaskStatus(
    value: unknown,
): value is TaskStatus {
    return value === 'pending' || value === 'completed';
}
function isTask(value: unknown): value is Task {
    if (!value || typeof value !== 'object') {
        return false;
    }
    const task = value as Partial<Task>;
    return (
        typeof task.id === 'string' &&
        typeof task.title === 'string' &&
        isTaskStatus(task.status) &&
        typeof task.createdAt === 'string' &&
        Number.isFinite(Date.parse(task.createdAt)) &&
        typeof task.updatedAt === 'string' &&
        Number.isFinite(Date.parse(task.updatedAt))
    );
}
export function loadTasks(
    fallbackTasks: Task[],
): Task[] {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        if (!savedTasks) {
            return [...fallbackTasks];
        }
        const parsedValue: unknown = JSON.parse(savedTasks);
        if (
            !Array.isArray(parsedValue) ||
            !parsedValue.every(isTask)
        ) {
            return [...fallbackTasks];
        }
        return parsedValue;
    } catch {
        return [...fallbackTasks];
    }
}

export function saveTasks(tasks: Task[]): void {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasks),
        );
    } catch (error) {
        console.error(
            'No fue posible guardar las tareas localmente.',
            error,
        );
    }
}