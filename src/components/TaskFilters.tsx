export function TaskFilters() {
    return (
        <section className="panel" aria-labelledby="filters-title">
            <div className="section-heading">
                <div>
                    <p className="section-heading__eyebrow">Consulta</p>
                    <h2 id="filters-title">Buscar y organizar</h2>
                </div>
            </div>
            <div className="filters-grid">
                <div className="field">
                    <label htmlFor="task-search">Buscar por título</label>
                    <input
                        id="task-search"
                        type="search"
                        placeholder="Escribe una palabra"
                    />
                </div>
                <div className="field">
                    <label htmlFor="status-filter">Estado</label>
                    <select id="status-filter" defaultValue="all">
                        <option value="all">Todas</option>
                        <option value="pending">Pendientes</option>
                        <option value="completed">Completadas</option>
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="task-order">Orden</label>
                    <select id="task-order" defaultValue="newest">
                        <option value="newest">Más recientes</option>
                        <option value="oldest">Más antiguas</option>
                        <option value="title">Por título</option>
                    </select>
                </div>
            </div>
            <p className="helper-text">
                Los controles son demostrativos y todavía no modifican
                los resultados.
            </p>
        </section>
    );
}