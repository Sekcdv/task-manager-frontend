import type {
    TaskFilter,
    TaskSort,
} from '../models/task-view.types';

export const DEFAULT_FILTER: TaskFilter = 'all';
export const DEFAULT_SORT: TaskSort = 'updated-desc';
export const DEFAULT_PAGE = 1;
export const SEARCH_MAX_LENGTH = 60;

const FILTERS: readonly TaskFilter[] = [
    'all',
    'pending',
    'completed',
];

const SORTS: readonly TaskSort[] = [
    'updated-desc',
    'updated-asc',
    'title-asc',
    'title-desc',
];

export interface TaskViewState {
    query: string;
    filter: TaskFilter;
    sort: TaskSort;
    page: number;
}

export function parseTaskViewParams(
    params: URLSearchParams,
): TaskViewState {
    const rawQuery = params.get('q') ?? '';
    const rawFilter = params.get('status');
    const rawSort = params.get('sort');
    const rawPage = Number(params.get('page'));

    return {
        query: rawQuery.slice(0, SEARCH_MAX_LENGTH),
        filter:
            FILTERS.find((item) => item === rawFilter) ??
            DEFAULT_FILTER,
        sort:
            SORTS.find((item) => item === rawSort) ??
            DEFAULT_SORT,
        page:
            Number.isInteger(rawPage) && rawPage >= 1
                ? rawPage
                : DEFAULT_PAGE,
    };
}

export function buildTaskViewParams(
    state: TaskViewState,
): URLSearchParams {
    const params = new URLSearchParams();

    if (state.query !== '') {
        params.set('q', state.query);
    }
    if (state.filter !== DEFAULT_FILTER) {
        params.set('status', state.filter);
    }
    if (state.sort !== DEFAULT_SORT) {
        params.set('sort', state.sort);
    }
    if (state.page !== DEFAULT_PAGE) {
        params.set('page', String(state.page));
    }

    return params;
}