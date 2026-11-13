import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { AsyncStatus } from '../components/AsyncStatus';
import { TaskFilters } from '../components/TaskFilters';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskPagination } from '../components/TaskPagination';
import { TaskSummary } from '../components/TaskSummary';
import { useTaskList } from '../hooks/useTaskList';
import type {
    TaskListQuery,
    TaskSortField,
    SortOrder,
} from '../models/api.types';
import type { Task } from '../models/task.interface';
import type {
    TaskFilter,
    TaskSort,
} from '../models/task-view.types';
import { getHttpErrorMessage } from '../services/http.service';
import {
    createTask as createTaskRequest,
    deleteTask as deleteTaskRequest,
    updateTask as updateTaskRequest,
} from '../services/task.api.service';
import {
    buildTaskViewParams,
    DEFAULT_FILTER,
    DEFAULT_SORT,
    parseTaskViewParams,
} from '../utils/task-search-params';
import type { TaskViewState } from '../utils/task-search-params';

const PAGE_SIZE = 5;

function mapSort(sort: TaskSort): {
    sortBy: TaskSortField;
    order: SortOrder;
} {
    switch (sort) {
        case 'updated-asc':
            return { sortBy: 'updatedAt', order: 'asc' };
        case 'title-asc':
            return { sortBy: 'title', order: 'asc' };
        case 'title-desc':
            return { sortBy: 'title', order: 'desc' };
        default:
            return { sortBy: 'updatedAt', order: 'desc' };
    }
}

export function TasksPage() {
    // La URL es la fuente de verdad de la consulta
    const [searchParams, setSearchParams] = useSearchParams();
    const { query, filter, sort, page } =
        parseTaskViewParams(searchParams);

    const [isMutating, setIsMutating] = useState(false);
    const [operationMessage, setOperationMessage] =
        useState('');
    const [operationFailed, setOperationFailed] =
        useState(false);

    function updateView(
        changes: Partial<TaskViewState>,
        replace = false,
    ): void {
        setSearchParams(
            buildTaskViewParams({
                query,
                filter,
                sort,
                page,
                ...changes,
            }),
            { replace },
        );
    }

    const mappedSort = mapSort(sort);
    const taskListQuery: TaskListQuery = {
        page,
        limit: PAGE_SIZE,
        search: query.trim() || undefined,
        status: filter === 'all' ? undefined : filter,
        sortBy: mappedSort.sortBy,
        order: mappedSort.order,
    };

    const {
        tasks,
        meta,
        status,
        errorMessage,
        reload,
    } = useTaskList(taskListQuery);

    // Si la URL pide una página inexistente (ej. ?page=99),
    // se redirige a la última página disponible.
    useEffect(() => {
        if (
            status === 'empty' &&
            meta.totalPages > 0 &&
            page > meta.totalPages
        ) {
            updateView({ page: meta.totalPages }, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, meta.totalPages, page]);

    async function runMutation(
        operation: () => Promise<unknown>,
        successMessage: string,
    ): Promise<boolean> {
        setIsMutating(true);
        setOperationMessage('');
        setOperationFailed(false);

        try {
            await operation();
            setOperationMessage(successMessage);
            return true;
        } catch (error) {
            setOperationFailed(true);
            setOperationMessage(getHttpErrorMessage(error));
            return false;
        } finally {
            setIsMutating(false);
        }
    }

    function refreshAfterMutation(): void {
        if (page !== 1) {
            updateView({ page: 1 });
            return;
        }
        reload();
    }

    async function handleAddTask(
        title: string,
    ): Promise<boolean> {
        const succeeded = await runMutation(
            () => createTaskRequest({ title }),
            'La tarea fue creada.',
        );
        if (succeeded) {
            refreshAfterMutation();
        }
        return succeeded;
    }

    async function handleToggleStatus(
        task: Task,
    ): Promise<boolean> {
        const nextStatus =
            task.status === 'pending' ? 'completed' : 'pending';
        const succeeded = await runMutation(
            () =>
                updateTaskRequest(task.id, {
                    status: nextStatus,
                }),
            'El estado fue actualizado.',
        );
        if (succeeded) {
            reload();
        }
        return succeeded;
    }

    async function handleEditTask(
        task: Task,
        title: string,
    ): Promise<boolean> {
        const succeeded = await runMutation(
            () => updateTaskRequest(task.id, { title }),
            'El título fue actualizado.',
        );
        if (succeeded) {
            reload();
        }
        return succeeded;
    }

    async function handleDeleteTask(
        task: Task,
    ): Promise<boolean> {
        const shouldDelete = window.confirm(
            `¿Eliminar la tarea "${task.title}"?`,
        );
        if (!shouldDelete) {
            return false;
        }

        const succeeded = await runMutation(
            () => deleteTaskRequest(task.id),
            'La tarea fue eliminada.',
        );
        if (succeeded) {
            if (tasks.length === 1 && page > 1) {
                updateView({ page: page - 1 }, true);
            } else {
                reload();
            }
        }
        return succeeded;
    }

    function handleQueryChange(value: string): void {
        // replace: true evita una entrada de historial por cada tecla
        updateView({ query: value, page: 1 }, true);
    }

    function handleFilterChange(value: TaskFilter): void {
        updateView({ filter: value, page: 1 });
    }

    function handleSortChange(value: TaskSort): void {
        updateView({ sort: value, page: 1 });
    }

    function handleClear(): void {
        updateView({
            query: '',
            filter: DEFAULT_FILTER,
            sort: DEFAULT_SORT,
            page: 1,
        });
        setOperationMessage('');
    }

    return (
        <div className="page-stack">
            <section
                className="page-introduction"
                aria-labelledby="tasks-page-title"
            >
                <p className="section-heading__eyebrow">
                    Gestión remota
                </p>
                <h2 id="tasks-page-title">Mis tareas</h2>
                <p>Los cambios se guardan mediante la API REST.</p>
            </section>

            <TaskForm
                isSubmitting={isMutating}
                onAddTask={handleAddTask}
            />

            {operationMessage && (
                <p
                    className={
                        operationFailed
                            ? 'operation-message operation-message--error'
                            : 'operation-message'
                    }
                    role={operationFailed ? 'alert' : 'status'}
                >
                    {operationMessage}
                </p>
            )}

            <TaskFilters
                query={query}
                filter={filter}
                sortBy={sort}
                resultCount={meta.total}
                isLoading={status === 'loading'}
                onQueryChange={handleQueryChange}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onClear={handleClear}
            />

            <AsyncStatus
                status={status}
                errorMessage={errorMessage}
                onRetry={reload}
            />

            {status !== 'error' && (
                <>
                    <TaskSummary tasks={tasks} total={meta.total} />
                    <TaskList
                        tasks={tasks}
                        onToggleStatus={handleToggleStatus}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                    />
                    <TaskPagination
                        meta={meta}
                        disabled={status === 'loading' || isMutating}
                        onPageChange={(nextPage) =>
                            updateView({ page: nextPage })
                        }
                    />
                </>
            )}
        </div>
    );
}