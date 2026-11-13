const ACCESS_TOKEN_KEY =
    'task-manager.access-token';
export function readAccessToken(): string | null {
    try {
        return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    } catch {
        return null;
    }
}
export function storeAccessToken(
    accessToken: string,
): void {
    sessionStorage.setItem(
        ACCESS_TOKEN_KEY,
        accessToken,
    );
}
export function removeAccessToken(): void {
    try {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch {
        // El estado de React también se limpia.
    }
}