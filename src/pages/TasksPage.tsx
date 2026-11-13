import { useState } from 'react';
import { AsyncStatus } from '../components/AsyncStatus';
import { TaskFilters } from '../components/TaskFilters';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskPagination } from '../components/TaskPagination';
import { TaskSummary } from '../components/TaskSummary';
import { useAuth } from '../hooks/useAuth';
import { useTaskList } from '../hooks/useTaskList';
import type {
    SortOrder,
    TaskListQuery,
    TaskSortField,
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
    const { accessToken, user } = useAuth();
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState<TaskFilter>('all');
    const [sort, setSort] = useState<TaskSort>('updated-desc');
    const [page, setPage] = useState(1);
    const [isMutating, setIsMutating] = useState(false);
    const [operationMessage, setOperationMessage] = useState('');
    const [operationFailed, setOperationFailed] = useState(false);

    const mappedSort = mapSort(sort);
    const canDelete = user?.role === 'admin';
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
    } = useTaskList(taskListQuery, accessToken);

    function requireToken(): string | null {
        if (accessToken) {
            return accessToken;
        }
        setOperationFailed(true);
        setOperationMessage('La sesión no está disponible.');
        return null;
    }

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
            setPage(1);
            return;
        }
        reload();
    }

    async function handleAddTask(title: string): Promise<boolean> {
        const token = requireToken();
        if (!token) {
            return false;
        }

        const succeeded = await runMutation(
            () => createTaskRequest({ title }, token),
            'La tarea fue creada.',
        );

        if (succeeded) {
            refreshAfterMutation();
        }
        return succeeded;
    }

    async function handleToggleStatus(task: Task): Promise<boolean> {
        const token = requireToken();
        if (!token) {
            return false;
        }

        const nextStatus = task.status === 'pending' ? 'completed' : 'pending';
        const succeeded = await runMutation(
            () => updateTaskRequest(task.id, { status: nextStatus }, token),
            'El estado fue actualizado.',
        );

        if (succeeded) {
            reload();
        }
        return succeeded;
    }

    async function handleEditTask(task: Task, title: string): Promise<boolean> {
        const token = requireToken();
        if (!token) {
            return false;
        }

        const succeeded = await runMutation(
            () => updateTaskRequest(task.id, { title }, token),
            'La tarea fue actualizada.',
        );

        if (succeeded) {
            reload();
        }
        return succeeded;
    }

    async function handleDeleteTask(task: Task): Promise<boolean> {
        const token = requireToken();
        if (!token) {
            return false;
        }

        const succeeded = await runMutation(
            () => deleteTaskRequest(task.id, token),
            'La tarea fue eliminada.',
        );

        if (succeeded) {
            refreshAfterMutation();
        }
        return succeeded;
    }

    return (
        <section className="panel task-page" aria-labelledby="tasks-title">
            <header className="task-page__header">
                <div>
                    <p className="section-heading__eyebrow">Gestión</p>
                    <h2 id="tasks-title">Tareas</h2>
                </div>
                <span className="user-chip">
                    {user?.name ?? 'Usuario'}
                </span>
            </header>

            <TaskForm isSubmitting={isMutating} onAddTask={handleAddTask} />

            {operationMessage && (
                <p
                    className={
                        operationFailed
                            ? 'operation-message operation-message--error'
                            : 'operation-message operation-message--success'
                    }
                    role={operationFailed ? 'alert' : 'status'}
                >
                    {operationMessage}
                </p>
            )}

            <TaskSummary tasks={tasks} total={meta.total} />
            <TaskFilters
                query={query}
                filter={filter}
                sortBy={sort}
                resultCount={meta.total}
                isLoading={status === 'loading'}
                onQueryChange={setQuery}
                onFilterChange={setFilter}
                onSortChange={setSort}
                onClear={() => {
                    setQuery('');
                    setFilter('all');
                    setSort('updated-desc');
                    setPage(1);
                }}
            />

            <AsyncStatus
                status={status}
                errorMessage={errorMessage}
                onRetry={reload}
            />

            <TaskList
                tasks={tasks}
                canDelete={canDelete}
                onToggleStatus={handleToggleStatus}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
            />

            <TaskPagination
                meta={meta}
                disabled={isMutating || status === 'loading'}
                onPageChange={setPage}
            />
        </section>
    );
}
