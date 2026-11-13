import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import type {
    PageMeta,
    TaskListQuery,
} from '../models/api.types';
import type { RequestStatus } from '../models/request-status.tyoe';
import type { Task } from '../models/task.interface';
import {
    getHttpErrorMessage,
    isAbortError,
} from '../services/http.service';
import { listTasks } from '../services/task.api.service';
interface TaskListState {
    tasks: Task[];
    meta: PageMeta;
    status: RequestStatus;
    errorMessage: string;
}
const EMPTY_META: PageMeta = {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
};
export function useTaskList(
    query: TaskListQuery,
    accessToken: string | null,
) {
    const {
        page,
        limit,
        search,
        status: statusFilter,
        sortBy,
        order, } = query;
    const [state, setState] =
        useState<TaskListState>({
            tasks: [],
            meta: { ...EMPTY_META, page, limit },
            status: 'idle',
            errorMessage: '',
        });
    const [reloadKey, setReloadKey] = useState(0);
    const reload = useCallback(() => {
        setReloadKey((current) => current + 1);
    }, []);
    useEffect(() => {
        if (!accessToken) {
            setState({
                tasks: [],
                meta: { ...EMPTY_META, page, limit },
                status: 'idle',
                errorMessage: '',
            });
            return;
        }

        const token = accessToken;
        const controller = new AbortController();
        async function load(): Promise<void> {
            setState((current) => ({
                ...current,
                status: 'loading',
                errorMessage: '',
            }));
            try {
                const response = await listTasks(
                    {
                        page,
                        limit,
                        search,
                        status: statusFilter,
                        sortBy,
                        order,
                    },
                    token,
                    controller.signal,
                );
                setState({
                    tasks: response.data,
                    meta: response.meta,
                    status:
                        response.data.length === 0
                            ? 'empty'
                            : 'success',
                    errorMessage: '',
                });
            } catch (error) {
                if (isAbortError(error)) {
                    return;
                }
                setState({
                    tasks: [],
                    meta: { ...EMPTY_META, page, limit },
                    status: 'error',
                    errorMessage: getHttpErrorMessage(error),
                });
            }
        }
        void load();
        return () => controller.abort();
    }, [
        accessToken,
        page,
        limit,
        search,
        statusFilter,
        sortBy,
        order,
        reloadKey,
    ]);
    return { ...state, reload };
}