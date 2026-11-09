import { Outlet } from 'react-router';
import { AppHeader } from '../components/AppHeader';
import { AppNavigation } from '../components/AppNavigation';
export function AppLayout() {
    return (
        <div className="app-shell">
            <AppHeader />
            <AppNavigation />
            <main className="app-main">
                <Outlet />
            </main>
            <footer className="app-footer">
                <div className="app-footer__content">
                    <p>
                        Administrador de tareas - Frontend EC3
                    </p>
                </div>
            </footer>
        </div>
    );
}