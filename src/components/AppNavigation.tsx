import {
    NavLink,
    useNavigate,
} from 'react-router';
import { useAuth } from '../hooks/useAuth';
function linkClass({
    isActive,
}: {
    isActive: boolean;
}): string {
    return [
        'app-navigation__link',
        isActive
            ? 'app-navigation__link--active'
            : '',
    ]
        .filter(Boolean)
        .join(' ');
}
export function AppNavigation() {
    const navigate = useNavigate();
    const { status, user, logout } = useAuth();
    const isAuthenticated =
        status === 'authenticated' && user;
    function handleLogout(): void {
        logout();
        navigate('/login', { replace: true });
    } return (
        <div className="app-navigation-bar">
            <nav
                className="app-navigation"
                aria-label="Navegación principal"
            >
                <ul className="app-navigation__list">
                    <li>
                        <NavLink to="/" end className={linkClass}>
                            Inicio
                        </NavLink>
                    </li>
                    {isAuthenticated ? (
                        <li>
                            <NavLink
                                to="/tasks"
                                className={linkClass}
                            >
                                Tareas
                            </NavLink>
                        </li>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    to="/login"
                                    className={linkClass}
                                >
                                    Iniciar sesión </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/register"
                                    className={linkClass}
                                >
                                    Crear cuenta
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            {isAuthenticated && (
                <div className="session-summary">
                    <span>
                        {user.name} · {user.role}
                    </span>
                    <button
                        type="button"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}