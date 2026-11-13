import { API_URL } from '../config/env';
import type { ApiErrorBody } from '../models/api.types';
interface HttpErrorOptions {
    status: number;
    code: string;
    message: string;
    requestId?: string;
    details?: unknown;
}
export class HttpError extends Error {
    readonly status: number;
    readonly code: string;
    readonly requestId?: string;
    readonly details?: unknown;
    constructor(options: HttpErrorOptions) {
        super(options.message);
        this.name = 'HttpError';
        this.status = options.status;
        this.code = options.code;
        this.requestId = options.requestId;
        this.details = options.details;
    }
}
function isRecord(
    value: unknown,
): value is Record<string, unknown> {
    return typeof value === 'object' &&
        value !== null;
}
function isApiErrorBody(
    value: unknown,
): value is ApiErrorBody {
    if (!isRecord(value)) {
        return false;
    }
    const error = value.error;
    return isRecord(error) &&
        typeof error.code === 'string' &&
        typeof error.message === 'string';
}
async function readPayload(
    response: Response,
): Promise<unknown> {
    const contentType =
        response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
        return null;
    }
    try {
        return await response.json();
    } catch {
        throw new HttpError({
            status: response.status,
            code: 'INVALID_RESPONSE',
            message:
                'La API devolvió una respuesta JSON inválida.',
        });
    }
}
export async function httpRequest<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set('Accept', 'application/json');
    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }
    try {
        const response = await fetch(
            `${API_URL}${path}`,
            {
                ...options,
                headers,
            },
        );
        if (response.status === 204) {
            return undefined as T;
        }
        const payload = await readPayload(response);
        if (!response.ok) {
            if (isApiErrorBody(payload)) {
                throw new HttpError({
                    status: response.status,
                    code: payload.error.code,
                    message: payload.error.message,
                    requestId: payload.error.requestId,
                    details: payload.error.details,
                });
            }
            throw new HttpError({
                status: response.status,
                code: 'HTTP_ERROR',
                message:
                    'La API respondió con un error.',
            });
        }
        return payload as T;
    } catch (error) {
        if (
            error instanceof HttpError ||
            isAbortError(error)) {
            throw error;
        }
        throw new HttpError({
            status: 0,
            code: 'NETWORK_ERROR',
            message:
                'No fue posible conectar con la API.',
        });
    }
}
export function isAbortError(
    error: unknown,
): boolean {
    return error instanceof DOMException &&
        error.name === 'AbortError';
}
export function isHttpError(
    error: unknown,
): error is HttpError {
    return error instanceof HttpError;
}
export function getHttpErrorMessage(
    error: unknown,
): string {
    if (!isHttpError(error)) {
        return 'Ocurrió un error inesperado.';
    }
    const reference = error.requestId
        ? ` Referencia: ${error.requestId}.`
        : '';
    return `${error.message}${reference}`;
}