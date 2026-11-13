import type { RequestStatus } from '../models/request-status.tyoe';
interface AsyncStatusProps {
    status: RequestStatus;
    errorMessage: string;
    onRetry: () => void;
}
export function AsyncStatus({
    status,
    errorMessage,
    onRetry,
}: AsyncStatusProps) {
    if (status === 'idle' || status === 'success') {
        return null;
    }
    if (status === 'loading') {
        return (
            <p className="request-status" role="status">
                Consultando tareas...
            </p>
        );
    } if (status === 'empty') {
        return (
            <p className="request-status" role="status">
                No existen tareas que coincidan con la consulta.
            </p>
        );
    }
    return (
        <section
            className="request-status request-status--error"
            aria-labelledby="request-error-title"
        >
            <h3 id="request-error-title">
                No fue posible consultar las tareas
            </h3>
            <p>{errorMessage}</p>
            <button type="button" onClick={onRetry}>
                Reintentar
            </button>
        </section>
    );
}