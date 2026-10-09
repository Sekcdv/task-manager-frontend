interface AppFooterProps {
    courseName: string;
}

export function AppFooter({ courseName }: AppFooterProps) {
    return (
        <footer className="app-footer">
            <div className="app-footer__content">
                <p>Administrador de tareas - {courseName}</p>
            </div>
        </footer>
    );
}