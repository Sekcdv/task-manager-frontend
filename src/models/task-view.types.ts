import type { TaskStatus } from './task.interface';
export type TaskFilter = 'all' | TaskStatus;
export type TaskSort =
    | 'updated-desc'
    | 'created-desc'
    | 'title-asc';
export interface TaskViewOptions {
    query: string;
    filter: TaskFilter;
    sortBy: TaskSort;
}