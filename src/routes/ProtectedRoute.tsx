import {
    Navigate,
    Outlet,
    useLocation,
} from 'react-router';
import { useAuth } from '../hooks/useAuth';
export function ProtectedRoute() {
    const location = useLocation();
    const {
        status,
        retrySession,
        logout,
    } = useAuth();
    if (status === 'checking') {
        return (
            <p className="request-status" role="status">
                Validando la sesión...
            </p>
        );
    }
    if (status === 'error') {
        return (
            <section className="panel" role="alert">
                <h2>No fue posible validar la sesión</h2>
                <p>
                    Comprueba la API e intenta nuevamente. </p>
                <div className="auth-actions">
                    <button
                        type="button"
                        onClick={() => void retrySession()}
                    >
                        Reintentar
                    </button>
                    <button type="button" onClick={logout}>
                        Cerrar sesión local
                    </button>
                </div>
            </section>
        );
    }
    if (status !== 'authenticated') {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }
    return <Outlet />;
}