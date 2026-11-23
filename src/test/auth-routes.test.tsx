import { render, screen } from '@testing-library/react';
import {
    MemoryRouter,
    Route,
    Routes,
} from 'react-router';
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';
import type {
    AuthContextValue,
} from '../context/auth-context';
import { useAuth } from '../hooks/useAuth';
import type { AuthUser } from '../models/auth.types';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { PublicOnlyRoute } from '../routes/PublicOnlyRoute';
vi.mock('../hooks/useAuth', () => ({
    useAuth: vi.fn(),
}));
const mockedUseAuth = vi.mocked(useAuth);
const user: AuthUser = {
    id: 'user-01',
    name: 'Ana Torres',
    email: 'ana@example.com',
    role: 'user',
    createdAt: '2026-10-14T00:00:00.000Z',
    updatedAt: '2026-10-14T00:00:00.000Z',
}; function createAuthValue(
    overrides: Partial<AuthContextValue> = {},
): AuthContextValue {
    return {
        status: 'anonymous',
        user: null,
        accessToken: null,
        sessionMessage: '',
        login: vi.fn(async () => user),
        register: vi.fn(async () => user),
        logout: vi.fn(),
        retrySession: vi.fn(async () => undefined),
        clearSessionMessage: vi.fn(),
        ...overrides,
    };
}
function renderRoutes(initialPath: string) {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
                <Route element={<PublicOnlyRoute />}>
                    <Route
                        path="/login"
                        element={<h1>Iniciar sesión</h1>}
                    />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/tasks"
                        element={<h1>Mis tareas</h1>}
                    />
                </Route>
            </Routes>
        </MemoryRouter>,
    );
} describe('guardas de autenticación', () => {
    beforeEach(() => {
        mockedUseAuth.mockReturnValue(
            createAuthValue(),
        );
    });
    it('redirige al visitante hacia login', () => {
        renderRoutes('/tasks');
        expect(
            screen.getByRole('heading', {
                name: 'Iniciar sesión',
            }),
        ).toBeInTheDocument();
    });
    it('muestra la validación de sesión', () => {
        mockedUseAuth.mockReturnValue(
            createAuthValue({ status: 'checking' }),
        );
        renderRoutes('/tasks');
        expect(
            screen.getByRole('status'),
        ).toHaveTextContent('Validando la sesión');
    });
    it('representa la ruta privada', () => {
        mockedUseAuth.mockReturnValue(createAuthValue({
            status: 'authenticated',
            user,
            accessToken: 'token-de-prueba',
        }),
        );
        renderRoutes('/tasks');
        expect(
            screen.getByRole('heading', {
                name: 'Mis tareas',
            }),
        ).toBeInTheDocument();
    });
    it('evita volver a login con sesión', () => {
        mockedUseAuth.mockReturnValue(
            createAuthValue({
                status: 'authenticated',
                user,
                accessToken: 'token-de-prueba',
            }),
        );
        renderRoutes('/login');
        expect(
            screen.getByRole('heading', {
                name: 'Mis tareas',
            }),
        ).toBeInTheDocument();
    });
});
