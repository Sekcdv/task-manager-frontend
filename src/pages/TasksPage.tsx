import { TaskFilters } from '../components/TaskFilters';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskSummary } from '../components/TaskSummary';
import type { Task } from '../models/task.interface';
import type {
    TaskFilter,
    TaskSort,
} from '../models/task-view.types';
interface TasksPageProps {
    tasks: Task[];
    visibleTasks: Task[];
    query: string;
    filter: TaskFilter;
    sortBy: TaskSort;
    emptyMessage: string;
    onAddTask: (title: string) => void;
    onQueryChange: (value: string) => void;
    onFilterChange: (value: TaskFilter) => void;
    onSortChange: (value: TaskSort) => void;
    onClearCriteria: () => void;
    onToggleStatus: (id: string) => void;
    onEditTask: (
        id: string,
        title: string,
    ) => void;
    onDeleteTask: (id: string) => boolean;
}
export function TasksPage({
    tasks,
    visibleTasks,
    query,
    filter,
    sortBy,
    emptyMessage,
    onAddTask,
    onQueryChange,
    onFilterChange,
    onSortChange,
    onClearCriteria,
    onToggleStatus,
    onEditTask,
    onDeleteTask,
}: TasksPageProps) {
    return (
        <div className="page-stack">
            <section
                className="page-introduction"
                aria-labelledby="tasks-page-title"
            >
                <p className="section-heading__eyebrow">
                    Gestión
                </p>
                <h2 id="tasks-page-title">
                    Mis tareas
                </h2>
                <p>
                    Registra, consulta y actualiza las actividades
                    almacenadas en el navegador.
                </p>
            </section>
            <TaskForm onAddTask={onAddTask} />
            <TaskFilters
                query={query}
                filter={filter}
                sortBy={sortBy}
                resultCount={visibleTasks.length}
                onQueryChange={onQueryChange}
                onFilterChange={onFilterChange}
                onSortChange={onSortChange}
                onClear={onClearCriteria}
            />
            <TaskSummary tasks={tasks} />
            <TaskList
                tasks={visibleTasks}
                emptyMessage={emptyMessage}
                onToggleStatus={onToggleStatus}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
            />
        </div>
    );
}