import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    Link,
    useLocation,
    useNavigate,
} from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { getHttpErrorMessage } from '../services/http.service';
interface LoginLocationState {
    from?: {
        pathname: string;
        search?: string;
    };
    registeredEmail?: string;
    registrationMessage?: string;
}
export function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        login,
        sessionMessage,
        clearSessionMessage,
    } = useAuth();
    const state =
        location.state as LoginLocationState | null;
    const [email, setEmail] = useState(
        state?.registeredEmail ?? '',
    );
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] =
        useState('');
    const [isSubmitting, setIsSubmitting] =
        useState(false); async function handleSubmit(
            event: FormEvent<HTMLFormElement>,
        ): Promise<void> {
        event.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            await login({
                email: email.trim(),
                password,
            });
            clearSessionMessage();
            const destination = state?.from
                ? `${state.from.pathname}${state.from.search ?? ''}`
                : '/tasks';
            navigate(destination, { replace: true });
        } catch (error) {
            setErrorMessage(getHttpErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <section
            className="panel auth-panel"
            aria-labelledby="login-title"
        >
            <p className="section-heading__eyebrow">
                Acceso
            </p>
            <h2 id="login-title">Iniciar sesión</h2>
            <p> Utiliza una cuenta registrada en la API.
            </p>
            {(state?.registrationMessage || sessionMessage) && (
                <p className="operation-message" role="status">
                    {state?.registrationMessage || sessionMessage}
                </p>
            )}
            {errorMessage && (
                <p
                    className="operation-message operation-message--error"
                    role="alert"
                >
                    {errorMessage}
                </p>
            )}
            <form
                className="auth-form"
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
            >
                <div className="form-field">
                    <label htmlFor="login-email">
                        Correo electrónico
                    </label>
                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        value={email}
                        autoComplete="username"
                        required
                        disabled={isSubmitting}
                        onChange={(event) =>
                            setEmail(event.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="login-password">
                        Contraseña
                    </label>
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        value={password}
                        autoComplete="current-password"
                        required
                        disabled={isSubmitting}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Comprobando...'
                        : 'Iniciar sesión'}
                </button>
            </form>
            <p className="auth-alternative">
                ¿No tienes cuenta?{' '}
                <Link to="/register">Crear cuenta</Link>
            </p>
        </section>
    );
}