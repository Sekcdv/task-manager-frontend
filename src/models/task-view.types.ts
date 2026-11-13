import type { TaskStatus } from './task.interface';
export type TaskFilter = 'all' | TaskStatus;
export type TaskSort =
    | 'updated-desc'
    | 'updated-asc'
    | 'title-asc'
    | 'title-desc';