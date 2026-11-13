import type { ApiDataResponse } from '../models/api.types';
import type {
    LoginCredentials,
    LoginData,
    MeData,
    RegisterCredentials,
    RegisterData,
} from '../models/auth.types';
import { httpRequest } from './http.service';
export function registerUser(
    credentials: RegisterCredentials,
): Promise<ApiDataResponse<RegisterData>> {
    return httpRequest<ApiDataResponse<RegisterData>>(
        '/auth/register',
        {
            method: 'POST',
            body: JSON.stringify(credentials),
        },
    );
}
export function loginUser(
    credentials: LoginCredentials,
): Promise<ApiDataResponse<LoginData>> {
    return httpRequest<ApiDataResponse<LoginData>>(
        '/auth/login',
        {
            method: 'POST',
            body: JSON.stringify(credentials),
        },
    );
}
export function getAuthenticatedUser(
    accessToken: string,
    signal?: AbortSignal,
): Promise<ApiDataResponse<MeData>> {
    return httpRequest<ApiDataResponse<MeData>>(
        '/auth/me',
        { signal },
        accessToken,
    );
}