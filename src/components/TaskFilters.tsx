import type {
    TaskFilter,
    TaskSort,
} from '../models/task-view.types';
interface TaskFiltersProps {
    query: string;
    filter: TaskFilter;
    sortBy: TaskSort;
    resultCount: number;
    isLoading: boolean;
    onQueryChange: (value: string) => void;
    onFilterChange: (value: TaskFilter) => void;
    onSortChange: (value: TaskSort) => void;
    onClear: () => void;
}
export function TaskFilters({
    query,
    filter,
    sortBy,
    resultCount,
    isLoading,
    onQueryChange,
    onFilterChange,
    onSortChange,
    onClear,
}: TaskFiltersProps) {
    return (
        <section
            className="task-filters"
            aria-labelledby="filters-title"
        >
            <h3 id="filters-title">Consultar tareas</h3>
            <div className="task-filters__grid">
                <label>
                    Buscar
                    <input
                        type="search"
                        value={query}
                        maxLength={60}
                        placeholder="Ejemplo: preparar"
                        onChange={(event) =>
                            onQueryChange(event.target.value)
                        }
                    />
                </label>
                <label>
                    Estado
                    <select
                        value={filter}
                        onChange={(event) =>
                            onFilterChange(
                                event.target.value as TaskFilter,
                            )
                        }
                    >
                        <option value="all">Todas</option>
                        <option value="pending">Pendientes</option>
                        <option value="completed">Completadas</option>
                    </select>
                </label>
                <label>
                    Orden
                    <select
                        value={sortBy}
                        onChange={(event) => onSortChange(
                            event.target.value as TaskSort,
                        )
                        }
                    >
                        <option value="updated-desc">
                            Actualizadas recientemente
                        </option>
                        <option value="updated-asc">
                            Actualizadas anteriormente
                        </option>
                        <option value="title-asc">
                            Título A-Z
                        </option>
                        <option value="title-desc">
                            Título Z-A
                        </option>
                    </select>
                </label>
            </div>
            <div className="task-filters__footer">
                <p role="status">
                    {isLoading
                        ? 'Actualizando resultados...'
                        : `${resultCount} resultado(s)`}
                </p>
                <button type="button" onClick={onClear}>
                    Limpiar criterios
                </button>
            </div>
        </section>
    );
}