import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
export function HomePage() {
    const { status, user } = useAuth();
    const isAuthenticated =
        status === 'authenticated' && user;
    return (
        <section
            className="panel welcome-panel"
            aria-labelledby="home-title"
        >
            <p className="section-heading__eyebrow">
                Inicio
            </p>
            <h2 id="home-title">
                Administrador de tareas protegido
            </h2>
            <p>
                La aplicación utiliza la API REST de Express,
                MongoDB Atlas y autenticación mediante JWT.
            </p>
            {isAuthenticated && (
                <p> Sesión activa para {user.name} con rol{' '}
                    <strong>{user.role}</strong>.
                </p>
            )}
            <div className="welcome-panel__actions">
                <Link
                    className="button-link"
                    to={isAuthenticated ? '/tasks' : '/login'}
                >
                    {isAuthenticated
                        ? 'Administrar tareas'
                        : 'Iniciar sesión'}
                </Link>
                {!isAuthenticated && (
                    <Link
                        className="button-link button-link--secondary"
                        to="/register"
                    >
                        Crear cuenta
                    </Link>
                )}
            </div>
        </section>
    );
}