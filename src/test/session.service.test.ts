import {
    beforeEach,
    describe,
    expect,
    it,
} from 'vitest';
import {
    readAccessToken,
    removeAccessToken,
    storeAccessToken,
} from '../services/session.service';
describe('session.service', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });
    it('devuelve null cuando no existe token', () => {
        expect(readAccessToken()).toBeNull();
    });
    it('guarda lee y elimina el token', () => {
        storeAccessToken('token-de-prueba');
        expect(readAccessToken()).toBe(
            'token-de-prueba',
        );
        removeAccessToken();
        expect(readAccessToken()).toBeNull();
    });
});
