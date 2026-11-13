import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import type { ReactNode } from 'react';
import {
    AuthContext,
    type AuthContextValue,
} from '../context/auth-context';
import type {
    AuthStatus,
    AuthUser,
    LoginCredentials,
    RegisterCredentials,
} from '../models/auth.types';
import {
    getAuthenticatedUser,
    loginUser,
    registerUser,
} from '../services/auth.api.service';
import {
    getHttpErrorMessage,
    isAbortError,
    isHttpError,
    setUnauthorizedHandler,
} from '../services/http.service';
import {
    readAccessToken,
    removeAccessToken,
    storeAccessToken,
} from '../services/session.service';
interface AuthProviderProps {
    children: ReactNode;
}
export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [initialToken] = useState<string | null>(
        () => readAccessToken(),
    );
    const [accessToken, setAccessToken] =
        useState<string | null>(initialToken);
    const [user, setUser] =
        useState<AuthUser | null>(null);
    const [status, setStatus] =
        useState<AuthStatus>(
            initialToken ? 'checking' : 'anonymous',
        );
    const [sessionMessage, setSessionMessage] =
        useState('');
    const endSession = useCallback(
        (message: string): void => {
            removeAccessToken();
            setAccessToken(null);
            setUser(null);
            setStatus('anonymous');
            setSessionMessage(message);
        },
        [],
    );
    useEffect(() => {
        return setUnauthorizedHandler(() => {
            endSession(
                'Tu sesión expiró o ya no es válida. Inicia sesión nuevamente.',
            );
        });
    }, [endSession]);
    const validateSession = useCallback(
        async (
            token: string,
            signal?: AbortSignal,
        ): Promise<void> => {
            setStatus('checking');
            setSessionMessage(''); try {
                const response = await getAuthenticatedUser(
                    token,
                    signal,
                );
                setUser(response.data.user);
                setAccessToken(token);
                setStatus('authenticated');
            } catch (error) {
                if (isAbortError(error)) {
                    return;
                }
                if (isHttpError(error) && error.status === 401) {
                    return;
                }
                setUser(null);
                setStatus('error');
                setSessionMessage(
                    getHttpErrorMessage(error),
                );
            }
        },
        [],
    );
    useEffect(() => {
        if (!initialToken) {
            return;
        }
        const controller = new AbortController();
        void validateSession(
            initialToken,
            controller.signal,
        );
        return () => controller.abort();
    }, [initialToken, validateSession]);
    const login = useCallback(
        async (
            credentials: LoginCredentials,
        ): Promise<AuthUser> => {
            const response = await loginUser(credentials);
            const nextToken = response.data.accessToken;
            storeAccessToken(nextToken);
            setAccessToken(nextToken);
            setUser(response.data.user);
            setStatus('authenticated');
            setSessionMessage('');
            return response.data.user;
        },
        [],
    );
    const register = useCallback(
        async (
            credentials: RegisterCredentials,
        ): Promise<AuthUser> => {
            const response = await registerUser(credentials);
            return response.data.user;
        },
        [],
    );
    const logout = useCallback((): void => {
        endSession('Cerraste sesión correctamente.');
    }, [endSession]);
    const retrySession = useCallback(
        async (): Promise<void> => {
            if (!accessToken) {
                endSession('Inicia sesión para continuar.');
                return;
            } await validateSession(accessToken);
        }, [accessToken, endSession, validateSession]);
    const clearSessionMessage = useCallback(
        (): void => setSessionMessage(''),
        [],
    );
    const value = useMemo<AuthContextValue>(
        () => ({
            status,
            user,
            accessToken,
            sessionMessage,
            login,
            register,
            logout,
            retrySession,
            clearSessionMessage,
        }),
        [
            status,
            user,
            accessToken,
            sessionMessage,
            login,
            register,
            logout,
            retrySession,
            clearSessionMessage,
        ],
    );
    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    );
}