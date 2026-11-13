import type {
    Task,
    TaskStatus,
} from './task.interface';
export interface ApiDataResponse<T> {
    data: T;
}
export interface ApiErrorBody {
    error: {
        code: string;
        message: string;
        details?: unknown;
        requestId?: string;
    };
}
export interface PageMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export interface TaskListResponse {
    data: Task[];
    meta: PageMeta;
}
export type TaskSortField =
    | 'title'
    | 'status'
    | 'createdAt'
    | 'updatedAt';
export type SortOrder = 'asc' | 'desc';
export interface TaskListQuery {
    page: number;
    limit: number;
    search?: string;
    status?: TaskStatus;
    sortBy: TaskSortField;
    order: SortOrder;
}