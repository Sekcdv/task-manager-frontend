import { Link } from 'react-router';
interface NotFoundPageProps {
    title?: string;
    message?: string;
}
export function NotFoundPage({
    title = 'Página no encontrada',
    message = 'La dirección solicitada no existe.',
}: NotFoundPageProps) {
    return (
        <section
            className="panel not-found"
            aria-labelledby="not-found-title"
        >
            <p className="section-heading__eyebrow">
                Error 404
            </p>
            <h2 id="not-found-title">
                {title}
            </h2>
            <p>{message}</p>
            <Link
                className="button-link"
                to="/"
            >
                Regresar al inicio
            </Link>
        </section>
    );
}