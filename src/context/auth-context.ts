import { createContext } from 'react';
import type {
    AuthStatus,
    AuthUser,
    LoginCredentials,
    RegisterCredentials,
} from '../models/auth.types';
export interface AuthContextValue {
    status: AuthStatus;
    user: AuthUser | null;
    accessToken: string | null;
    sessionMessage: string;
    login: (
        credentials: LoginCredentials,
    ) => Promise<AuthUser>;
    register: (
        credentials: RegisterCredentials,
    ) => Promise<AuthUser>;
    logout: () => void;
    retrySession: () => Promise<void>;
    clearSessionMessage: () => void;
}
export const AuthContext =
    createContext<AuthContextValue | undefined>(
        undefined,
    );