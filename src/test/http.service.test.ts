import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';
import {
    httpRequest,
    setUnauthorizedHandler,
} from '../services/http.service';
const fetchMock = vi.fn<typeof fetch>();
describe('http.service', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', fetchMock);
    });
    afterEach(() => {
        vi.unstubAllGlobals();
    });
    it('envía Accept y Bearer', async () => {
        fetchMock.mockResolvedValue(
            new Response(
                JSON.stringify({ data: { ok: true } }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            ),
        ); await httpRequest('/tasks', {}, 'token-demo');
        const [url, init] = fetchMock.mock.calls[0];
        const headers = new Headers(init?.headers);
        expect(url).toBe('/api/tasks');
        expect(headers.get('Accept')).toBe(
            'application/json',
        );
        expect(headers.get('Authorization')).toBe(
            'Bearer token-demo',
        );
    });
    it('acepta 204 sin JSON', async () => {
        fetchMock.mockResolvedValue(
            new Response(null, { status: 204 }),
        );
        await expect(
            httpRequest<void>(
                '/tasks/task-01',
                { method: 'DELETE' },
                'token-demo',
            ),
        ).resolves.toBeUndefined();
    });
    it('notifica 401 autenticado', async () => {
        const onUnauthorized = vi.fn();
        const unsubscribe = setUnauthorizedHandler(
            onUnauthorized,
        );
        fetchMock.mockResolvedValue(
            new Response(
                JSON.stringify({
                    error: {
                        code: 'TOKEN_INVALID',
                        message: 'Token inválido.',
                    },
                }),
                {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            ),
        );
        await expect(
            httpRequest('/tasks', {}, 'token-demo'),
        ).rejects.toMatchObject({
            status: 401,
            code: 'TOKEN_INVALID',
        });
        expect(onUnauthorized).toHaveBeenCalledOnce();
        unsubscribe();
    });
});