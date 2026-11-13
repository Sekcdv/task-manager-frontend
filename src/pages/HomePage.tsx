import { Link } from 'react-router';
export function HomePage() {
    return (
        <section
            className="panel welcome-panel"
            aria-labelledby="home-title"
        >
            <p className="section-heading__eyebrow">
                Inicio
            </p>
            <h2 id="home-title">
                Administrador de tareas conectado
            </h2>
            <p>
                Las tareas se consultan y actualizan mediante
                la API REST de Express y MongoDB Atlas.
            </p>
            <div className="welcome-panel__actions">
                <Link className="button-link" to="/tasks">
                    Administrar tareas
                </Link>
            </div>
        </section>
    );
}