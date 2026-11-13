import type {
    ApiDataResponse,
    TaskListQuery,
    TaskListResponse,
} from '../models/api.types';
import type {
    CreateTaskInput,
    Task,
    UpdateTaskInput,
} from '../models/task.interface';
import { httpRequest } from './http.service';
function createQueryString(
    query: TaskListQuery,
): string {
    const params = new URLSearchParams({
        page: String(query.page),
        limit: String(query.limit),
        sortBy: query.sortBy,
        order: query.order,
    });
    if (query.search) {
        params.set('search', query.search);
    }
    if (query.status) {
        params.set('status', query.status);
    }
    return params.toString();
}
export function listTasks(
    query: TaskListQuery,
    signal?: AbortSignal,
): Promise<TaskListResponse> {
    return httpRequest<TaskListResponse>(
        `/tasks?${createQueryString(query)}`,
        { signal },
    );
}
export function getTaskById(
    id: string,
    signal?: AbortSignal,
): Promise<ApiDataResponse<Task>> {
    return httpRequest<ApiDataResponse<Task>>(
        `/tasks/${encodeURIComponent(id)}`,
        { signal },
    );
}
export function createTask(
    input: CreateTaskInput,
): Promise<ApiDataResponse<Task>> {
    return httpRequest<ApiDataResponse<Task>>(
        '/tasks',
        {
            method: 'POST',
            body: JSON.stringify(input),
        },
    );
}
export function updateTask(
    id: string,
    input: UpdateTaskInput,
): Promise<ApiDataResponse<Task>> {
    return httpRequest<ApiDataResponse<Task>>(
        `/tasks/${encodeURIComponent(id)}`,
        {
            method: 'PATCH',
            body: JSON.stringify(input),
        },
    );
}
export function deleteTask(
    id: string,
): Promise<void> {
    return httpRequest<void>(
        `/tasks/${encodeURIComponent(id)}`,
        { method: 'DELETE' },
    );
}