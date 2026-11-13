export type UserRole = 'user' | 'admin';
export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}
export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}
export interface LoginCredentials {
    email: string;
    password: string;
}
export interface RegisterData {
    user: AuthUser;
}
export interface LoginData {
    user: AuthUser;
    accessToken: string;
    tokenType: 'Bearer';
    expiresIn: string;
}
export interface MeData {
    user: AuthUser;
}
export type AuthStatus =
    | 'checking'
    | 'anonymous'
    | 'authenticated'
    | 'error';